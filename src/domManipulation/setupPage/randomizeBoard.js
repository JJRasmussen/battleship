import {resetShipLocations} from "./resetShipLocations.js"
import {recordPlacementOfShip, getAllShipLocations} from "./helperFunctions/trackingShipPlacements.js"
import {getQueriedShips} from "./helperFunctions/queryShips.js"
import {randomAxis, getAxis} from "./helperFunctions/axis.js"
import {coordinateWalk, validPlacement, queryValidatedCells} from "./helperFunctions/queryCells.js"

const getRandomShipPlacement = (shipLength, axis) => {
    // get an unoccupied cell array of cells that are already occupied
    let startCoordinate = String(Math.floor(Math.random() * 100))
    if(parseInt(startCoordinate) < 10){
        startCoordinate = "0" + startCoordinate
    }
    let validation = validPlacement(startCoordinate, shipLength)
    let shipCoordinates = []
    if (validation.filter(Boolean).length === shipLength){
        shipCoordinates = coordinateWalk(startCoordinate, shipLength)
    } else {
        return getRandomShipPlacement(shipLength, axis)
    }
    return shipCoordinates
}

const randomizeBoard = () => {
    resetShipLocations();
    let queriedShips = getQueriedShips()
    let boardContainer = document.querySelector("#boardPreparation")
    let axis = "topToBottom"

    //get each ship element on the board
    for (let i = 0; i < queriedShips.length; i++) {
        // get a random axis for the ships to be placed on
        randomAxis()
        //get valid starting coordinate of the ship
        let shipLength = parseInt(queriedShips[i].getAttribute('data-shipLength'))
        let shipCoordinates = getRandomShipPlacement(shipLength, getAxis()) 
        let shipValidation = validPlacement(shipCoordinates[0], shipLength)
        //calculate the absolute placement on the board:
        let cellWidth = document.querySelector(".cell").offsetWidth
        let xCoordinate = shipCoordinates[0].slice(-1)
        let yCoordinate = shipCoordinates[0].slice(-2, -1)    
        queriedShips[i].style.left = `${cellWidth * (yCoordinate)}px`
        queriedShips[i].style.top = `${cellWidth * (xCoordinate)}px`

        let queriedCells = queryValidatedCells(shipCoordinates, shipValidation)
        //mark cells in the grid as occupied
        for (let j = 0; j < shipCoordinates; j++) {
            queriedCells[j].classList.remove("validPlacement", "invalidPlacement")
            queriedCells[j].classList.add("placedShip")
        }
        //make shipPlacementObjects for game board
        recordPlacementOfShip(i, queriedShips[i].getAttribute('data-shipLength'), shipCoordinates[0], getAxis())

        //move ship element to board
        queriedShips[i].setAttribute('data-onBoard', "true")
        boardContainer.appendChild(queriedShips[i])
        //change css styling so the ship overlaps correct cells
        queriedShips[i].classList.add("onBoard")
        //change css styling so the ship is locked to its axis
        queriedShips[i].classList.remove("shipInDisplay")
    }
    console.log(getAllShipLocations())
}

const getRandomEnemyShips = () => {
    randomizeBoard()
    let enemyShips = getAllShipLocations()
    return enemyShips
}

export {randomizeBoard, getRandomEnemyShips}