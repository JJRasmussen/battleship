import {boardCreation} from "../makeGameBoard.js"
import {greetingsPlayer} from "./greetingMessage.js"
import {setupShips} from "./setupShips.js"
import {drag, dragOver, dropOnDisplay, getCellIndex, changeAxis} from "./dragAndDrop.js"


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

    //make location where the setup board and ship display shall be placed
    const setupPage = document.createElement("div");
    setupPage.setAttribute("class", "setupPage");
    mainPage.appendChild(setupPage)
    //make boardContainer
    const boardContainer = document.createElement("div");
    boardContainer.setAttribute("class", "boardContainer");
    boardContainer.setAttribute("id", "boardPreparation");
    setupPage.appendChild(boardContainer);

    //create setupBoard where ships will be placed
    boardCreation(boardContainer, "setupBoard");
    
    //create and place the ships next to the board
    //create the display where the ships are located
    const shipDisplay = document.createElement("div");
    shipDisplay.setAttribute("class", "shipDisplay");
    shipDisplay.addEventListener("dragover", dragOver)
    shipDisplay.addEventListener("drop", dropOnDisplay)
    setupPage.appendChild(shipDisplay);
    //make the ships dragable
    setupShips(shipDisplay, drag, getCellIndex);

    //add axis button
    const axisToggleButton = document.createElement("button");
    axisToggleButton.setAttribute("type", "button")
    axisToggleButton.classList.add("axisButton")
    axisToggleButton.textContent = "Change the axis of the ships in the display"
    axisToggleButton.addEventListener("click", changeAxis)
    setupPage.appendChild(axisToggleButton)

    //clean up the page
    gameTitle.remove();
    newGameButton.remove();
    gameForm.remove();
};

newGameButton.addEventListener("click", startNewGame);

