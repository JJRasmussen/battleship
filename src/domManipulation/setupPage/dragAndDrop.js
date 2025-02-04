import {recordPlacementOfShip, shipPutBackOnDisplay, getShipAxis} from "./helperFunctions/trackingShipPlacements.js"
import {getQueriedShips} from "./helperFunctions/queryShips.js"
import {getAxis, changeAxis} from "./helperFunctions/axis.js"
import {getShipLocations} from "./helperFunctions/trackingShipPlacements.js"
import {startingCoordinate, coordinateWalk, validPlacement, queryValidatedCells} from "./helperFunctions/queryCells.js"

let grabbedCellIndex = null
let shipId = null
let shipLength = null
let shipAxis = null
let currentValidationResult = []
let currentCellsValidated = false
let currentQueriedCells = []
let lastQueriedCells = []
let lastCellsValidated = []
let lastValidationResult = []
let currentCellsEntered = null
let cellsLeftBehind = null
let cellEntered = false
let occupiedCells = ""
let validShipCoordinates = null
let startCoordinate = ""

function getCellIndex(e){
    grabbedCellIndex = e.target.getAttribute('data-index')
}

function dragOver(e){
    e.preventDefault()
}

function placementClassToggle(addOrRemove, cellsTargeted, validation){
    if(addOrRemove === "add"){
        for (let i = 0; i < cellsTargeted.length; i++) {
            if(cellsTargeted[i] === null){continue}
            if(validation === "true"){
                cellsTargeted[i].classList.add("validPlacement")
            } else {
                cellsTargeted[i].classList.add("invalidPlacement")
            }
        }
    }
    if(addOrRemove === "remove"){ 
        for (let i = 0; i < cellsTargeted.length; i++) {
            if(cellsTargeted[i] === null){continue}
            cellsTargeted[i].classList.remove("validPlacement")
            cellsTargeted[i].classList.remove("invalidPlacement")
        }
    }
}

function dragEnter(e){
    //flag that new cells were entered
    cellEntered = true
    lastQueriedCells = currentQueriedCells;
    startCoordinate = startingCoordinate(grabbedCellIndex, this.id, shipAxis)
    let validationResults = validPlacement(startCoordinate, shipLength, shipAxis);
    //query validated positions
    let shipCoordinates = coordinateWalk(startCoordinate, shipLength, shipAxis)
    currentQueriedCells = queryValidatedCells(shipCoordinates, validationResults)
    if(currentQueriedCells.length === shipLength){
        validShipCoordinates = "true"
    } else {
        validShipCoordinates = "false"
    }
    placementClassToggle("remove", currentQueriedCells, validShipCoordinates)
    placementClassToggle("add", currentQueriedCells, validShipCoordinates);
}

function dragLeave(e){
    if(cellEntered === false){
        //if CellEntered is false the drag has left the board or hovers a ship
        cellsLeftBehind = currentQueriedCells
        currentCellsEntered = []
        lastQueriedCells = []
    } else { 
        cellsLeftBehind = lastQueriedCells.filter(cell => !currentQueriedCells.includes(cell))
    }
    placementClassToggle("remove", cellsLeftBehind, undefined)
    cellEntered = false
}

function drag(e){
    e.stopPropagation()
    shipLength = parseInt(e.target.getAttribute('data-shipLength'));
    shipId = e.target.id;
    shipAxis = getShipAxis(shipId)
    if (e.target.getAttribute('data-onBoard') === "true") {
    for (let i = 0; i < shipLength; i++) {
        getShipLocations(shipId)[i].classList.remove('placedShip','validPlacement')
        }
    }
}

function drop(e){
    e.preventDefault();
    //all cells where the ship is being dropped needs to be available
    if(validShipCoordinates === false){return}

    let droppedShip = getQueriedShips()[shipId.slice(-1)]
    //if the ship is on the display move it to the board
    if (droppedShip.getAttribute('data-onBoard') === "false"){
        let boardContainer = document.querySelector("#boardPreparation")
        droppedShip.setAttribute('data-onBoard', "true")
        boardContainer.appendChild(droppedShip)
        droppedShip.classList.add("onBoard")
        droppedShip.classList.remove("shipInDisplay")
    }       
    //calculate the absolute placement on the board:
    let cellWidth = e.target.offsetWidth
    let xCoordinate = startCoordinate.slice(-1)
    let yCoordinate = startCoordinate.slice(-2, -1)    
    droppedShip.style.left = `${cellWidth * (yCoordinate)}px`
    droppedShip.style.top = `${cellWidth * (xCoordinate)  }px`

    //mark cells in the grid as occupied
    for (let i = 0; i < currentQueriedCells.length; i++) {
        currentQueriedCells[i].classList.remove("validPlacement", "invalidPlacement")
        currentQueriedCells[i].classList.add("placedShip")
    }
    //make shipPlacementObjects for game board
    recordPlacementOfShip(parseInt(shipId.slice(-1)), shipLength, startCoordinate, shipAxis)

    //reset varriables
    currentValidationResult = []
    lastValidationResult = []
    currentQueriedCells = []
    lastQueriedCells = []
}

function dropOnDisplay(e){
    e.preventDefault();
    let shipInDisplay = getQueriedShips()[shipId.slice(-1)]
    //change data and class on ship
    shipInDisplay.setAttribute('data-onBoard', "false");
    //change css styling so the ship shrinks in the display
    shipInDisplay.classList.remove("onBoard")
    //change css styling so the ship is no longer locked in its axis
    shipInDisplay.classList.add("shipInDisplay")
    //flip the axis of the ship so it matches the current axis setting
    if(!shipInDisplay.classList.contains(`${getAxis()}`)){            
        if(getAxis() === "topToBottom"){
        shipInDisplay.classList.remove("leftToRight")
        shipInDisplay.classList.add("topToBottom")
    } else{
        shipInDisplay.classList.remove("topToBottom")
        shipInDisplay.classList.add("leftToRight")
    }
}
    //place it in the proper container on the display
    let shipContainer = document.querySelector("#container" + shipId.slice(-1))
    shipContainer.appendChild(shipInDisplay);

    //remove the created object that recorded the placement of the ship
    shipPutBackOnDisplay(parseInt(shipId.slice(-1)))

    //reset varriables
    currentValidationResult = []
    lastValidationResult = []
    currentQueriedCells = []
    lastQueriedCells = []
}


export {dragOver, drop, dropOnDisplay, drag, dragEnter, dragLeave, getCellIndex, changeAxis, validPlacement}