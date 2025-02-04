import {shipPutBackOnDisplay, getShipLocations} from "./helperFunctions/trackingShipPlacements.js"
import {getQueriedShips, getQueriedShipContainers} from "./helperFunctions/queryShips.js"
import {getAxis} from "./helperFunctions/axis.js"
let queriedShipContainers = null

function queryContainers(){
    queriedShipContainers = getQueriedShipContainers()
}

function resetShipLocations(){
    let queriedShips = getQueriedShips()

    let shipLocations = []
    for (let i = 0; i < 5; i++) {
        if (queriedShips[i].getAttribute('data-onBoard') === "true") {
            shipLocations = getShipLocations(queriedShips[i].id)
            for (let j = 0; j < parseInt(shipLocations.length); j++) {
                shipLocations[j].classList.remove('placedShip', 'validPlacement')
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
        shipPutBackOnDisplay(i)
    }
}

export {resetShipLocations, queryContainers}
