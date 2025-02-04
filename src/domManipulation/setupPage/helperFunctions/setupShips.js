//used to track which ship cell was clicked.

const setupShips = (mainPage, drag, getCellIndex) => {
    const shipLengths = [2,3,3,4,5]
for (let i = 0; i < shipLengths.length; i++) {
    const shipContainer = document.createElement("div");
    shipContainer.classList.add("shipContainer", "containerSize" + shipLengths[i].toString());
    shipContainer.setAttribute("id", "container" + i.toString());
    mainPage.appendChild(shipContainer)
    let dragAndDropShip = document.createElement("div");
    dragAndDropShip.setAttribute("id", "ship" + i.toString());
    dragAndDropShip.classList.add("dragAndDropShip", "shipInDisplay", "topToBottom");
    dragAndDropShip.setAttribute("data-shipLength", shipLengths[i].toString())
    dragAndDropShip.setAttribute("data-onBoard", false)
    
    for (let j = 0; j < shipLengths[i]; j++) {
        const shipCell = document.createElement("div");
        shipCell.setAttribute("id", "ship" + i + "cell" + j);
        shipCell.classList.add("cell", "shipCell")
        shipCell.setAttribute("data-index", j.toString())
        shipCell.addEventListener("mousedown", getCellIndex)
        dragAndDropShip.appendChild(shipCell)
    }
    dragAndDropShip.setAttribute("draggable", "true");
    dragAndDropShip.addEventListener("dragstart", drag)
    shipContainer.appendChild(dragAndDropShip);
    }
}

export {setupShips}