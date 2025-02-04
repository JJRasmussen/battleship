import {coordinateWalk} from "../../setupPage/helperFunctions/queryCells.js"
let targetCell = ""
function placeShipsOnBoard(shipPlacements, targetBoard){
    for (let i = 0; i < shipPlacements.length; i++) {
        let shipCoordinates = coordinateWalk(shipPlacements[i].startCoordinate, shipPlacements[i].length, shipPlacements[i].axis)
        for (let j = 0; j < shipCoordinates.length; j++) {
            if(targetBoard === "player")
            targetCell = document.querySelector("#player_cell_" + shipCoordinates[j])
            targetCell.classList.add("shipOnPlayerBoard")
            if(targetBoard === "enemy")
            targetCell = document.querySelector("#enemy_cell_" + shipCoordinates[j])
            targetCell.classList.add("shipOnPlayerBoard")

        }
    }
};

export {placeShipsOnBoard}