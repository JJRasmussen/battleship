import {getAxis} from "./axis.js"
import {getOccupiedCells} from "./trackingShipPlacements.js"

let xCoordinate = ""
let yCoordinate = ""
let shiftingXCoordinate = ""
let shiftingYCoordinate = ""
let coordinateArray = []
let targetCell = ""

function startingCoordinate(grabbedCellIndex, cellId, shipAxis){
    xCoordinate = cellId.slice(-2,-1)
    yCoordinate = cellId.slice(-1)
    if (shipAxis === "topToBottom"){
        yCoordinate = String(parseInt(yCoordinate - grabbedCellIndex))
    } else {
        xCoordinate = String(parseInt(xCoordinate - grabbedCellIndex))
    }
    let startCoordinate = xCoordinate.concat(yCoordinate)
    return startCoordinate
}

function coordinateWalk(startCoordinate, shipLength, axis = getAxis()){
    coordinateArray = []
    xCoordinate = startCoordinate.slice(0,1)
    yCoordinate = startCoordinate.slice(-1)
    for (let i = 0; i < shipLength; i++) {
        if (axis === "topToBottom"){
            shiftingYCoordinate = String(parseInt(yCoordinate) + i)
            targetCell = xCoordinate + shiftingYCoordinate
        } 
        if (axis ==="leftToRight"){
            shiftingXCoordinate = String(parseInt(xCoordinate) + i)
            targetCell = shiftingXCoordinate + yCoordinate
        }   
    coordinateArray.push(targetCell)
    }
    return coordinateArray
}

function validPlacement(startingCoordinate, shipLength, axis = getAxis()){
    let occupiedCells = getOccupiedCells()
    let targetCells = []
    let cellValidations = []
    //get starting coordinate and all covered coordinates
    let shipCoordinates = coordinateWalk(startingCoordinate, shipLength, axis);
    //determine validity of all coordinates
    for (let i = 0; i < shipCoordinates.length; i++) {
        // validate that the cells are on the board
        if(document.querySelector("#cell_" + shipCoordinates[i]) === null || occupiedCells.includes(shipCoordinates[i])){
            console.log("out of bounds or occupied")
            targetCells[i] = null
            cellValidations[i] = false
            continue
        } else {
            console.log(shipCoordinates[i] + " is not occupied")
            cellValidations[i] = true
        } 
    }  
    return cellValidations
}

function queryValidatedCells(shipCoordinates, cellValidations){
    let queriedCells = []
    for (let i = 0; i < shipCoordinates.length; i++) {
        if(cellValidations[i] === true){
            queriedCells.push(document.querySelector("#cell_" + shipCoordinates[i]))
        } else {
            continue
        }   
    }
    return queriedCells
}

export {startingCoordinate, coordinateWalk, validPlacement, queryValidatedCells}
