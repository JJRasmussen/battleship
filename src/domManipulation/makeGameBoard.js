import {allowDrop, drop} from "./dragAndDrop.js"

const boardCreation = (container, boardType) => {
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
            if (boardType === "setupBoard"){
            createCell.addEventListener("drop", drop);
            createCell.addEventListener("dragover", allowDrop);
            }
            //attach cell to the given row
            targetRow.appendChild(createCell)
        }
    }
}

export {boardCreation}


