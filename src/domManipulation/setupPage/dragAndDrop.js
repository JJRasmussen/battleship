//used in getCellindex to know which specific childElement was being grabbed when the parent ship is being dragged
let grabbedCellIndex = null;
let shipLength = null;

function getCellIndex(e){
    grabbedCellIndex = e.target.getAttribute('data-index');
}

function dragOver(e){
    e.preventDefault();
    //console.log(this.id)
    console.log(this.id)
}

function dragEnter(e){
    console.log("enter")
    for (let i = 0; i < shipLength; i++) {
        let changingNumber = parseInt(this.id.slice(-1)) + i - grabbedCellIndex
        let targetCell = this.id.slice(0, -1)
        targetCell = targetCell.concat(changingNumber)
        let showShip = document.querySelector("#" + targetCell)
        showShip.classList.add("shipHighlight")
    }
}

function dragLeave(e){
    console.log("leave")
    for (let i = 0; i < shipLength; i++) {
        let changingNumber = parseInt(this.id.slice(-1)) + i - grabbedCellIndex
        let targetCell = this.id.slice(0, -1)
        targetCell = targetCell.concat(changingNumber)
        let removeShip = document.querySelector("#" + targetCell)
        removeShip.classList.remove("shipHighlight");
    }
}

function drag(e){
    shipLength = e.target.getAttribute('data-shipLength');
    console.log("length of ship is: " + shipLength);
    console.log("grabbedShipCell is: " + grabbedCellIndex);

}

function drop(e){
    e.preventDefault();
    const grabbedShipCell = e.dataTransfer.getData('grabbedShipCell')
    const shipId = e.dataTransfer.getData('shipId');
    

    for (let i = 0; i < shipLength; i++) {
        let changingNumber = parseInt(this.id.slice(-1)) + i - grabbedCellIndex
        let targetCell = this.id.slice(0, -1)
        targetCell = targetCell.concat(changingNumber)
        let placeShip = document.querySelector("#" + targetCell)
        placeShip.classList.remove("shipHighlight")


    }
    console.log(`Dropped cell ${grabbedShipCell} of ship ${shipId} with ship length of ${shipLength}`)
}

export {dragOver, drop, drag, dragEnter, dragLeave, getCellIndex}