//used in getCellindex to know which specific childElement was being grabbed when the parent ship is being dragged
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
let axis = "topToBottom"

//the ships are located on and between the noted coordinate
let shipPositionsOnSetupBoard = [[],[],[],[],[]]
let shipPositionsForGameBoard = [[],[],[],[],[]]

function changeAxis(){
    axis = axis === "topToBottom" ? "leftToRight" : "topToBottom";

    let shipInDisplay = document.querySelectorAll(".shipInDisplay")
    if(axis === "topToBottom"){
        for (let i = 0; i < shipInDisplay.length; i++) {
            shipInDisplay[i].classList.remove("leftToRight")
            shipInDisplay[i].classList.add("topToBottom")
        }
    } else {
        for (let i = 0; i < shipInDisplay.length; i++) {
            shipInDisplay[i].classList.remove("topToBottom")
            shipInDisplay[i].classList.add("leftToRight")
        } 
    }
    let axisToggleButton = document.querySelector(".axisButton")
    axisToggleButton.textContent = `${axis}`    
}

function getCellIndex(e){
    grabbedCellIndex = e.target.getAttribute('data-index')
}

function dragOver(e){
    e.preventDefault()
}

function validPlacement(cellId){
    let targetCells = []
    let cellValidity = []
    for (let i = 0; i < shipLength; i++) {
        //
        if(shipAxis === "topToBottom"){
            let shiftAccordingToGrabbedCell = parseInt(cellId.slice(-1)) + i - grabbedCellIndex
            targetCells[i] = cellId.slice(0, -1)
            targetCells[i] = targetCells[i].concat(shiftAccordingToGrabbedCell)
        } else {
            let shiftAccordingToGrabbedCell = parseInt(cellId.slice(-2, -1)) + i - grabbedCellIndex
            let rowStorage = cellId.slice(-1)
            targetCells[i] = cellId.slice(0, -2)
            targetCells[i] = targetCells[i].concat(shiftAccordingToGrabbedCell)
            targetCells[i] = targetCells[i].concat(rowStorage)
        }
        //check if a cell will end outside of the board
        if (document.querySelector("#" + targetCells[i]) === null){
            targetCells[i] = null
            cellValidity[i] = false
            continue
        }
        targetCells[i] = document.querySelector("#" + targetCells[i])
        //check if there already is a ship on one of the cells
        if(targetCells[i].classList.contains("placedShip")) {
            cellValidity[i] = false
            continue
        }
        else{
            cellValidity[i] = true
        }        
    }
    currentValidationResult = cellValidity
    currentQueriedCells = targetCells    
    console.log("currentQueriedCells:")
    for (let i = 0; i < shipLength; i++) {
        console.log(currentQueriedCells[i]);
        
    }
}

function placementClassToggle(addOrRemove, cellsTargeted, testRequirement){
    if(addOrRemove === "add"){
        for (let i = 0; i < cellsTargeted.length; i++) {
            if(cellsTargeted[i] === null){continue}
            if(testRequirement){
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
    //log queries and validation of the last cells
    lastQueriedCells = currentQueriedCells;
    lastValidationResult = currentValidationResult;
    lastCellsValidated = currentCellsValidated
    //validate and query new cells
    validPlacement(this.id);
    currentCellsEntered = currentQueriedCells.filter(cell => cell != null);
    currentCellsValidated = currentValidationResult.filter(Boolean).length.toString() === shipLength
    console.log(currentCellsValidated)
    //add class "validPlacement" or "invalidPlacement"
    if(currentCellsValidated === true){
        placementClassToggle("remove", currentQueriedCells, currentCellsValidated)
        placementClassToggle("add", currentQueriedCells, currentCellsValidated)
    } else {
        placementClassToggle("remove", currentCellsEntered, currentCellsValidated)
        placementClassToggle("add", currentCellsEntered, currentCellsValidated)
    }
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
    shipLength = e.target.getAttribute('data-shipLength');
    shipId = e.target.id;
    if(e.target.classList.contains("topToBottom")){
        shipAxis = "topToBottom"
    } else {
        shipAxis = "leftToRight"
    }
    if (e.target.getAttribute('data-onBoard') === "true") {
    for (let i = 0; i < shipLength; i++) {
        shipPositionsOnSetupBoard[parseInt(shipId.slice(-1))][i].classList.remove('placedShip', 'validPlacement')
        }
    }
}

class shipPosition {
    constructor(shipId, length, startCoordinate, axis){
        this.shipId = shipId
        this.length = length
        this.startCoordinate = startCoordinate
        this.axis = axis
    }
}

function drop(e){
    e.preventDefault();
    //all cells where the ship is being dropped needs to be available
    if(currentValidationResult.filter(Boolean).length.toString() != shipLength){return}

    let droppedShip = document.querySelector("#" +  shipId)
    //if the ship is moved from the display onto the board
    if (droppedShip.getAttribute('data-onBoard') === "false"){
        //ship element moved to the board
        let boardContainer = document.querySelector("#boardPreparation")
        droppedShip.setAttribute('data-onBoard', "true")
        boardContainer.appendChild(droppedShip)
        //change css styling so the ship overlaps correct cells
        droppedShip.classList.add("onBoard")
        //change css styling so the ship is locked to its axis
        droppedShip.classList.remove("shipInDisplay")

    }       
    //calculate the absolute placement is used so the movement goes downwards:
    let cellWidth = e.target.offsetWidth
    let columnPlacement = null
    let rowPlacement = null
    let targetColumn = null
    let targetRow  = null
    if (droppedShip.classList.contains("topToBottom")){
        let shipAxis = "topToBottom"
    } else {
        let shipAxis = "leftToRight"
    }
    if(shipAxis === "topToBottom"){
        let rowOffSet = grabbedCellIndex
        targetRow = e.target.id.slice(-1) - rowOffSet
        targetColumn = e.target.id.slice(-2, -1)
    } else {
        let columnOffSet = grabbedCellIndex
        targetRow = e.target.id.slice(-1)
        targetColumn = e.target.id.slice(-2, -1) - columnOffSet
    }
    columnPlacement = cellWidth * (targetColumn)
    rowPlacement = cellWidth * (targetRow)      
    droppedShip.style.left = `${columnPlacement}px`
    droppedShip.style.top = `${rowPlacement}px`

    //mark cells in the grid as occupied
    for (let i = 0; i < currentQueriedCells.length; i++) {
        currentQueriedCells[i].classList.remove("validPlacement", "invalidPlacement")
        currentQueriedCells[i].classList.add("placedShip")
    }

    //record placement of the ships    
    for (let i = 0; i < shipLength; i++) {
        shipPositionsOnSetupBoard[parseInt(shipId.slice(-1))][i] = currentQueriedCells[i]
    }
    //make shipPlacementObjects for game board
    let placedShip = new shipPosition(shipId, shipLength, currentQueriedCells[0].id.slice(-2), shipAxis)
    shipPositionsForGameBoard[parseInt(shipId.slice(-1))] = placedShip

    //reset varriables
    currentValidationResult = []
    lastValidationResult = []
    currentQueriedCells = []
    lastQueriedCells = []
}

function dropOnDisplay(e){
    e.preventDefault();
    let shipInDisplay = document.querySelector("#" +  shipId)
    //change data and class on ship
    shipInDisplay.setAttribute('data-onBoard', "false");
    //change css styling so the ship shrinks in the display
    shipInDisplay.classList.remove("onBoard")
    //change css styling so the ship is no longer locked in its axis
    shipInDisplay.classList.add("shipInDisplay")
    //flip the axis of the ship so it matches the current axis setting
    if(!shipInDisplay.classList.contains(`${axis}`)){            
        if(axis === "topToBottom"){
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
    shipPositionsForGameBoard[parseInt(shipId.slice(-1))] = []

    //reset varriables
    currentValidationResult = []
    lastValidationResult = []
    currentQueriedCells = []
    lastQueriedCells = []
}


export {dragOver, drop, dropOnDisplay, drag, dragEnter, dragLeave, getCellIndex, changeAxis}