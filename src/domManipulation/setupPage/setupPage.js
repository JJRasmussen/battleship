import {boardCreation} from "../makeGameBoard.js"
import {greetingsPlayer} from "./helperFunctions/greetingMessage.js"
import {setupShips} from "./helperFunctions/setupShips.js"
import {queryShips, queryShipContainers} from "./helperFunctions/queryShips.js"
import {drag, dragOver, dropOnDisplay, getCellIndex, changeAxis} from "./dragAndDrop.js"
import {resetShipLocations, queryContainers} from "./resetShipLocations.js"
import {queryToggleButton} from "./helperFunctions/axis.js"
import {randomizeBoard} from "./randomizeBoard"


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
    //make the ships dragable and query them
    setupShips(shipDisplay, drag, getCellIndex);
    queryShips()
    queryShipContainers()
    queryContainers()

    //add axis button
    const axisToggleButton = document.createElement("button");
    axisToggleButton.setAttribute("type", "button")
    axisToggleButton.classList.add("axisButton", "setupButton")
    axisToggleButton.textContent = "Change the axis of the ships in the display"
    axisToggleButton.addEventListener("click", changeAxis)
    setupPage.appendChild(axisToggleButton)
    queryToggleButton()

    //add reset button
    const resetSetupBoardButton = document.createElement("button");
    resetSetupBoardButton.setAttribute("type", "button")
    resetSetupBoardButton.classList.add("axisButton", "setupButton")
    resetSetupBoardButton.textContent = "reset ship locations"
    resetSetupBoardButton.addEventListener("click", resetShipLocations)
    setupPage.appendChild(resetSetupBoardButton)

    //add randomize button
    const randomizeBoardButton = document.createElement("button");
    randomizeBoardButton.setAttribute("type", "button");
    randomizeBoardButton.classList.add("randomizeButton", "setupButton")
    randomizeBoardButton.textContent = "Randomize ship positions"
    randomizeBoardButton.addEventListener("click", randomizeBoard)
    setupPage.appendChild(randomizeBoardButton)
    //clean up the page
    gameTitle.remove();
    newGameButton.remove();
    gameForm.remove();
};

newGameButton.addEventListener("click", startNewGame);

