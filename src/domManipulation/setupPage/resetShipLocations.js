import {shipPutBackOnDisplay, getShipLocations} from "./trackingShipPlacements.js"
import {getQueriedShips, getQueriedShipContainers} from "./queryShips.js"
import {getAxis} from "./axis.js"
import {getShipPositionsOnSetupBoard} from "./dragAndDrop.js"
let queriedShipContainers = null

function queryContainers(){
    queriedShipContainers = getQueriedShipContainers()
}

function resetShipLocations(){
    let queriedShips = getQueriedShips()
    let shipLocations = getShipPositionsOnSetupBoard()
    for (let i = 0; i < 5; i++) {
        shipPutBackOnDisplay(i)
        if (queriedShips[i].getAttribute('data-onBoard') === "true") {
            for (let j = 0; j < (queriedShips[i].getAttribute('data-shipLength')); j++) {
                shipLocations[i][j].classList.remove('placedShip', 'validPlacement')
                }
            }

        queriedShips[i].setAttribute('data-onBoard', "false");
        queriedShips[i].classList.remove("onBoard")
        queriedShips[i].classList.add("shipInDisplay")
        if(!queriedShips[i].classList.contains(`${getAxis()}`)){            
            if(getAxis() === "topToBottom") {
                queriedShips[i].classList.remove("leftToRight")
                queriedShips[i].classList.add("topToBottom")
            } else {
                queriedShips[i].classList.remove("topToBottom")
                queriedShips[i].classList.add("leftToRight")
            }
        }        
        queriedShipContainers[i].appendChild(queriedShips[i]) 
    }
    console.log(getShipLocations())
}

export {resetShipLocations, queryContainers}
