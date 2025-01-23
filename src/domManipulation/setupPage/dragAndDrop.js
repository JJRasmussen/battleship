//used in getCellindex to know which specific childElement was being grabbed when the parent ship is being dragged
let grabbedCellIndex = null;
let shipId = null
let shipLength = null;
let validPlacement = null

function getCellIndex(e){
    grabbedCellIndex = e.target.getAttribute('data-index');
}

function dragOver(e){
    e.preventDefault();
    //console.log(this.id)
    console.log(this.id)
}

function validPlacement(cellId){
    let targetCells = []
    let cellValidity = []
    for (let i = 0; i < shipLength; i++) {
        targetCells[i] = parseInt(this.id.slice(-1)) + i - grabbedCellIndex
        targetCells[i] = this.id.slice(0, -1)
        targetCells[i] = targetCells[i].concat(changingNumber)
        //check if a cell will end outside of the board
        if (targetCells[i] = document.querySelector("#" + targetCells[i]) === null){
            cellValidity[i] = null } else {
                targetCells[i] = document.querySelector("#" + targetCells[i])
                //check if there already is a ship on one of the cells
                if(targetCells[i].classList.contains("placedShip")) {
                    
                }
            }
    }
    return targetCells
}

function dragEnter(e){
    console.log("enter")
    //identify if placement is valid
    if (validPlacement(this.id) === false){
        for (let i = 0; i < array.length; i++) {
            
            
        }
        cellElement.classList.add("unvalidPlacement")
    }
    if(countValid === shipLength){

}
        cellElement.classList.add("shipHighlight")
    
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
    shipId = e.target.id;
    console.log("length of ship is: " + shipLength);
    console.log("grabbedShipCell is: " + grabbedCellIndex);
    console.log("shipId is: " + shipId)

}

function drop(e){
    e.preventDefault();

    let shipInDisplay = document.querySelector("#" +  shipId)
    if (shipInDisplay.getAttribute('data-onBoard') === "false"){
        //ship element moved to the board
        let boardContainer = document.querySelector("#boardPreparation")
        shipInDisplay.setAttribute("data-onBoard", "true")
        boardContainer.appendChild(shipInDisplay)

        //change css styling so the ship overlaps correct cells
        shipInDisplay.classList.add("onBoard")
        //calculate the absolute placement is used so the movement goes downwards:
        let cellWidth = e.target.offsetWidth
        let offset = grabbedCellIndex
        let targetRow = e.target.id.slice(-1) - offset
        let targetColumn = e.target.id.slice(-2, -1)
        let columnPlacement = cellWidth * (targetColumn)
        let rowPlacement = cellWidth * (targetRow)      
        shipInDisplay.style.left = `${columnPlacement}px`
        shipInDisplay.style.top = `${rowPlacement}px`

        //cells blocked for future placement of ships
        for (let i = 0; i < shipLength; i++) {
            let changingNumber = parseInt(this.id.slice(-1)) + i - grabbedCellIndex
            let targetCell = this.id.slice(0, -1)
            targetCell = targetCell.concat(changingNumber)
            let placeShip = document.querySelector("#" + targetCell)
            placeShip.classList.remove("shipHighlight")
            placeShip.classList.add("placedShip")
        }
    } 
    if (shipInDisplay.getAttribute('data-onBoard') === "true"){
        let cellWidth = e.target.offsetWidth
        let offset = grabbedCellIndex
        let targetRow = e.target.id.slice(-1) - offset
        let targetColumn = e.target.id.slice(-2, -1)
        let columnPlacement = cellWidth * (targetColumn)
        let rowPlacement = cellWidth * (targetRow)      
        shipInDisplay.style.left = `${columnPlacement}px`
        shipInDisplay.style.top = `${rowPlacement}px`
    }


    
        //cells blocked for future placement of ships
        for (let i = 0; i < shipLength; i++) {
            let changingNumber = parseInt(this.id.slice(-1)) + i - grabbedCellIndex
            let targetCell = this.id.slice(0, -1)
            targetCell = targetCell.concat(changingNumber)
            let placeShip = document.querySelector("#" + targetCell)
            placeShip.classList.remove("shipHighlight")
            placeShip.classList.add("placedShip")
        }
    
    console.log(`Dropped cell ${grabbedCellIndex} of ship with id ${shipId} and ship length of ${shipLength}`)
}

export {dragOver, drop, drag, dragEnter, dragLeave, getCellIndex}