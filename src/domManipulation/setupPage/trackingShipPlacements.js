import {shipPosition} from "./shipPosition.js"
let shipPositionsForGameBoard = [[],[],[],[],[]]

function recordPlacementOfShip(shipId, shipLength, startCell, shipAxis){
    let placedShip = new shipPosition(shipId, shipLength, startCell, shipAxis)
    shipPositionsForGameBoard[shipId] = placedShip
}

function shipPutBackOnDisplay(shipId){
    shipPositionsForGameBoard[shipId] = []
}

function getShipLocations(){
    return shipPositionsForGameBoard;
}

export{recordPlacementOfShip, shipPutBackOnDisplay, getShipLocations}