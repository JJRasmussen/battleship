import {boardCreation} from "../makeGameBoard.js"
import {greetingsPlayer} from "./greetingMessage.js"
import {setupShips} from "./setupShips.js"
import {drag, drop, dragOver, dragEnter, dragLeave, getCellIndex} from "./dragAndDrop.js"

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
    greetingsPlayer(mainPage, playerName)

    //make location where the setup board shall be placed
    const boardContainer = document.createElement("div");
    boardContainer.setAttribute("class", "boardContainer");
    boardContainer.setAttribute("id", "boardPreparation");
    mainPage.appendChild(boardContainer);

    //create setupBoard where ships will be placed
    boardCreation(boardContainer, "setupBoard");
    
    //create and place the ships next to the board
    //make the ships dragable
    setupShips(mainPage, drag, getCellIndex);

    //add axis button

    //clean up the page
    gameTitle.remove();
    newGameButton.remove();
    gameForm.remove();
};

newGameButton.addEventListener("click", startNewGame);

