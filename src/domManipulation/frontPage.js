import {boardCreation} from "./makeGameBoard.js"
import {Gameboard, Ship} from "../gamelogic/gameboard.js"
import {drag} from "./dragAndDrop.js"


const mainPage = document.querySelector(".mainPage")
const gameTitle = document.querySelector("#gameTitle")
const newGameButton = document.querySelector(".newGameButton")
const gameForm = document.querySelector("#newGame")

function startNewGame(event){
    //get player name or default to "John Doe"
    let playerName = document.forms["newGame"]["playerName"].value
    if (playerName === ""){
        playerName = "John Doe"
    }

    //make container for greeting message 
    const greetingMessage = document.createElement("h2");
    greetingMessage.setAttribute("id", "Greeting");
    greetingMessage.textContent  = "Greetings, Admiral " + playerName
    mainPage.appendChild(greetingMessage);

    const boardContainer = document.createElement("div");
        boardContainer.setAttribute("class", "boardContainer");
        boardContainer.setAttribute("id", "boardPreperation");
        mainPage.appendChild(boardContainer);

    boardCreation(boardContainer, "setupBoard");
    

    //make ships available for placement
    const dragAndDropShip = document.createElement("div");
    dragAndDropShip.setAttribute("id", "ship" + "1");
    dragAndDropShip.setAttribute("class", "dragAndDropShip");
    //make ships dragable
    dragAndDropShip.setAttribute("draggable", "true");
    dragAndDropShip.addEventListener("dragstart", drag)
    mainPage.appendChild(dragAndDropShip)

    //add axis button
    const axisButton = document.createElement("buttton");
    
    mainPage.appendChild(axisButton)


    //clean up the page
    gameTitle.remove();
    newGameButton.remove();
    gameForm.remove();
};

newGameButton.addEventListener("click", startNewGame);

