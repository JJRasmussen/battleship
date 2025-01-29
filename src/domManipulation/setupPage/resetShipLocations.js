import {shipPutBackOnDisplay, getShipLocations} from "./trackingShipPlacements.js"
import {getQueriedShips, getQueriedShipContainers} from "./queryShips.js"
import {getAxis} from "./axis.js"
let queriedShipContainers = null

function queryContainers(){
    queriedShipContainers = getQueriedShipContainers()
}

function resetShipLocations(){
    let queriedShips = getQueriedShips()
    for (let i = 0; i < 5; i++) {
        shipPutBackOnDisplay(i)
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
