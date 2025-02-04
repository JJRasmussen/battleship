let shipsQueried = null
let shipContainers = null

let queryShips = () => {
    shipsQueried = document.querySelectorAll(".dragAndDropShip")
}

let getQueriedShips = () => {
    return shipsQueried
}

let queryShipContainers = () => {
    shipContainers = document.querySelectorAll(".shipContainer")
}

let getQueriedShipContainers = () => {
    return shipContainers
}

export {queryShips, queryShipContainers, getQueriedShipContainers, getQueriedShips}