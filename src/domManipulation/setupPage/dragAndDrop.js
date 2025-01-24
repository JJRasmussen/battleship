//used in getCellindex to know which specific childElement was being grabbed when the parent ship is being dragged
let grabbedCellIndex = null
let shipId = null
let shipLength = null
let currentValidatedCells = []
let lastValidatedCells = []
let currentQueriedCells = []
let lastQueriedCells = []
let currentCellsEntered = null
let cellsLeftBehind = null

//the ships are located on and between the noted coordinate
let shipPositions = [[],[],[],[],[]]

function getCellIndex(e){
    grabbedCellIndex = e.target.getAttribute('data-index')
}

function dragOver(e){
    e.preventDefault()
    //console.log(this.id)
    console.log(this.id)
}

function validPlacement(cellId){
    let targetCells = []
    let cellValidity = []
    for (let i = 0; i < shipLength; i++) {
        let shiftAccordingToGrabbedCell = parseInt(cellId.slice(-1)) + i - grabbedCellIndex
        targetCells[i] = cellId.slice(0, -1)
        targetCells[i] = targetCells[i].concat(shiftAccordingToGrabbedCell)
        //check if a cell will end outside of the board
        if (document.querySelector("#" + targetCells[i]) === null){
            targetCells[i] = null
            cellValidity[i] = false
            continue
        }
        targetCells[i] = document.querySelector("#" + targetCells[i])
        //check if there already is a ship on one of the cells
        if(targetCells[i].classList.contains("placedShip")) {
            cellValidity[i] = false
            continue
        }
        else{
            cellValidity[i] = true
        }        
    }
    currentValidatedCells = cellValidity
    currentQueriedCells = targetCells
}

function dragEnter(e){
    console.log("enter")
    //identify if placement is valid
    lastQueriedCells = currentQueriedCells;
    lastValidatedCells = currentValidatedCells;
    validPlacement(this.id);
    currentCellsEntered = currentQueriedCells.filter(cell => !lastQueriedCells.includes(cell));
    for (let i = 0; i < currentCellsEntered.length; i++) {
        if(currentCellsEntered[i] === null){continue}
        if(currentValidatedCells.filter(Boolean).length.toString() === shipLength){
            currentCellsEntered[i].classList.add("validPlacement")  
        } else { console.log("currentQueriedCells are: " + currentQueriedCells)
            currentCellsEntered[i].classList.add("invalidPlacement")
        }
    }
}

function dragLeave(e){
    console.log("leave")
    let cellsLeftBehind = lastQueriedCells.filter(cell => !currentQueriedCells.includes(cell));
    console.log("cellsLeftBehind: " + cellsLeftBehind)

    for (let i = 0; i < cellsLeftBehind.length; i++) {
        if(cellsLeftBehind[i] === null){continue}
        if(cellsLeftBehind[i].classList.contains("validPlacement")){
            cellsLeftBehind[i].classList.remove("validPlacement")  
        } else {
            cellsLeftBehind[i].classList.remove("invalidPlacement")
        }
    }
}

function dragLeaveBoard(e){
    console.log("boardLeft")
}

function drag(e){
    shipLength = e.target.getAttribute('data-shipLength');
    shipId = e.target.id;
    console.log("length of ship is: " + shipLength);
    console.log("grabbedShipCell is: " + grabbedCellIndex);
    console.log("shipId is: " + shipId)

    if (e.target.getAttribute('data-onBoard') === "true"){
        for (let i = 0; i < shipLength; i++) {
            console.log("a ship is being moved around")
            shipPositions[parseInt(shipId.slice(-1))][i].classList.remove('placedShip', 'validPlacement')
        }
    }
}

function drop(e){
    e.preventDefault();
    //all cells where the ship is being dropped needs to be available
    if(currentValidatedCells.filter(Boolean).length.toString() != shipLength){return}

    let shipInDisplay = document.querySelector("#" +  shipId)
    //if the ship is moved from the display onto the board
    if (shipInDisplay.getAttribute('data-onBoard') === "false"){
        //ship element moved to the board
        let boardContainer = document.querySelector("#boardPreparation")
        shipInDisplay.setAttribute('data-onBoard', "true")
        boardContainer.appendChild(shipInDisplay)
        //change css styling so the ship overlaps correct cells
        shipInDisplay.classList.add("onBoard")
    }       
    //calculate the absolute placement is used so the movement goes downwards:
    let cellWidth = e.target.offsetWidth
    let offset = grabbedCellIndex
    let targetRow = e.target.id.slice(-1) - offset
    let targetColumn = e.target.id.slice(-2, -1)
    let columnPlacement = cellWidth * (targetColumn)
    let rowPlacement = cellWidth * (targetRow)      
    shipInDisplay.style.left = `${columnPlacement}px`
    shipInDisplay.style.top = `${rowPlacement}px`

    //mark cells in the grid as occupied
    for (let i = 0; i < currentQueriedCells.length; i++) {
        currentQueriedCells[i].classList.remove("validPlacement", "invalidPlacement")
        currentQueriedCells[i].classList.add("placedShip")
    }

    //record placement of the ships
    for (let i = 0; i < shipLength; i++) {
        shipPositions[parseInt(shipId.slice(-1))][i] = currentQueriedCells[i]
    }
    for (let i = 0; i < shipPositions.length; i++) {
        console.log("shipPositions of ship" + i + " are " + shipPositions[i])   
    }
    console.log(`Dropped cell ${grabbedCellIndex} of ship with id ${shipId} and ship length of ${shipLength}`)
    
    //reset varriables
    currentValidatedCells = []
    lastValidatedCells = []
    currentQueriedCells = []
    lastQueriedCells = []
}

export {dragOver, drop, drag, dragEnter, dragLeave, dragLeaveBoard, getCellIndex}