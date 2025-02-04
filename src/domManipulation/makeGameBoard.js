import {drop, dragOver, dragEnter, dragLeave} from "./setupPage/dragAndDrop.js"

const boardCreation = (container, boardType) => {
    for (let i = 0; i < 10; i++) {
        let rowId= "r" + i.toString();
        const createRow = document.createElement("div");
        createRow.setAttribute("class", "rowContainer");
        createRow.setAttribute("id", boardType + rowId);
        container.appendChild(createRow);
        //query the given row, so cells can be attached later
        const targetRow = document.querySelector("#" + boardType +rowId);
        
        for (let j = 0; j < 10; j++){
            let columnId = "c" + j.toString();
            let cellId = "cell_" + rowId.slice(-1) +  columnId.slice(-1);
            //create cells 10 cells for each row
            const createCell = document.createElement("div");
            createCell.setAttribute("class", "cell");
            //if the board is used for setup purposes
            if (boardType === "setupBoard"){
                createCell.setAttribute("id", "setup_" + cellId);
                createCell.addEventListener("drop", drop);
                createCell.addEventListener("dragover", dragOver);
                createCell.addEventListener("dragleave", dragLeave);
                createCell.addEventListener("dragenter", dragEnter);
            }
            if (boardType === "playerBoard"){
                createCell.setAttribute("id", "player_" + cellId);
            }
            if (boardType === "enemyBoard"){
                createCell.setAttribute("id", "enemy_" + cellId);
            }
            //DEV FEATURE:
            //
            createCell.textContent = String(i) + String(j)
            //
            //
            //attach cell to the given row
            targetRow.appendChild(createCell)
        }
    }
}

export {boardCreation}


