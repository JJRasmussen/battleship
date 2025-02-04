import {getAxis} from "./axis.js"
import {coordinateWalk} from "./queryCells.js"
import {validPlacement} from "../dragAndDrop.js"

class shipPosition {
    constructor(shipId, length, startCoordinate, axis){
        this.shipId = shipId
        this.length = length
        this.startCoordinate = startCoordinate
        this.axis = axis
    }
}

let shipPositionsForGameBoard = [[],[],[],[],[]]

function recordPlacementOfShip(shipId, shipLength, startCell, shipAxis){
    let placedShip = new shipPosition(shipId, shipLength, startCell, shipAxis)
    shipPositionsForGameBoard[shipId] = placedShip
}

function shipPutBackOnDisplay(shipId){
    shipPositionsForGameBoard[shipId] = []
}

function getShipAxis(shipId){
    let targetShip = shipPositionsForGameBoard[parseInt(shipId.slice(-1))]
    let targetShipAxis = targetShip.axis
    if (targetShipAxis === undefined){
        //ship is still in the display
        return getAxis()
    }
    return targetShipAxis
}

function getShipLocations(shipId){
    let targetShip = shipPositionsForGameBoard[parseInt(shipId.slice(-1))]
    let shipCoordinates = coordinateWalk(targetShip.startCoordinate, targetShip.length, targetShip.axis)
    //tracking cells
    let queriedCellsCoveredByShip = []
    for (let i = 0; i < shipCoordinates.length; i++) {
        queriedCellsCoveredByShip[i] = document.querySelector("#cell_" + shipCoordinates[i])
    }
    return queriedCellsCoveredByShip;
}

const getOccupiedCells = () => {
    let occupiedCells = []
    for (let i = 0; i < shipPositionsForGameBoard.length; i++) {
        if(shipPositionsForGameBoard[i].length === 0){
            continue
        }
        let targetShip = shipPositionsForGameBoard[i]
        let shipCoordinates = coordinateWalk(targetShip.startCoordinate, parseInt(targetShip.length), targetShip.axis)
        for (let j = 0; j < shipCoordinates.length; j++) {
            occupiedCells.push(shipCoordinates[j])
        }
    }
    return occupiedCells
}
export{recordPlacementOfShip, shipPutBackOnDisplay, getShipLocations, getOccupiedCells, getShipAxis}