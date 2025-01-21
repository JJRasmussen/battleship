const setupShips = (mainPage, drag, getCellId) => {
    const shipLengths = [2,3,3,4,5]
    const shipContainer = document.createElement("div");
    shipContainer.setAttribute("id", "shipContainer");
    mainPage.appendChild(shipContainer)

for (let i = 0; i < shipLengths.length; i++) {
    let dragAndDropShip = document.createElement("div");
    dragAndDropShip.setAttribute("id", "ship" + i.toString());
    dragAndDropShip.setAttribute("class", "dragAndDropShip");
    
    for (let j = 0; j < shipLengths[i]; j++) {
        const shipCell = document.createElement("div");
        shipCell.setAttribute("id", "ship" + i + "cell" + j);
        shipCell.setAttribute("class", "shipCell")
        shipCell.setAttribute("class", "cell");
        shipCell.addEventListener("mousedown", let clickedCell = getCellId)
        dragAndDropShip.appendChild(shipCell)
    }
    dragAndDropShip.setAttribute("draggable", "true");
    dragAndDropShip.addEventListener("dragstart", drag);
    shipContainer.appendChild(dragAndDropShip);
    }
}

export {setupShips}