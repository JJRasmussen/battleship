import "./styles.css";
import {
    Gameboard,
    Ship
} from "./gamelogic/gameboard.js"; 
//import {addBoardCreation} from "./ui/gameboard.js"
console.log("hello");

function cellHover(){
    const squareTouched = document.querySelector("#" + this.id);
    squareTouched.setAttribute("class", "touchedCell");

};

const container = document.querySelector("#container")

let boardCreation = () => {
    for (let i = 0; i < 10; i++) {
        let rowId= "r" + i.toString();
        const createRow = document.createElement("div");
        createRow.setAttribute("class", "rowContainer");
        createRow.setAttribute("id", rowId);
        container.appendChild(createRow);
        //query the given row, so cells can be attached later
        const targetRow = document.querySelector("#"+rowId);
        
        for (let j = 0; j < 10; j++){
            let columnId = "c" + j.toString();
            let cellId = rowId + columnId
            //create cells 10 cells for each row
            const createCell = document.createElement("div");
            createCell.setAttribute("class", "cell");
            createCell.setAttribute("id", cellId);
            //attach cell to the given row
            targetRow.appendChild(createCell)
        }
    }
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i < 100; i++) {
        cells[i].addEventListener("mouseover", cellHover)
    }
}
const createGridButton = document.querySelector("#createGrid");
    createGridButton.addEventListener("click", boardCreation);
/*
let addBoardCreation = () => {
    const createGridButton = document.querySelector("#createGrid");
    createGridButton.addEventListener("click", boardCreation());
}

*/