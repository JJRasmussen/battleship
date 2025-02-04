import {getAllShipLocations} from "../setupPage/helperFunctions/trackingShipPlacements.js"
import {placeShipsOnBoard} from "./helperFunctions/shipsOnGameBoard.js"
import {boardCreation} from "../makeGameBoard.js"
import {getRandomEnemyShips} from "../setupPage/randomizeBoard.js"
const mainPage = document.querySelector(".mainPage")
const newGameButton = document.querySelector(".newGameButton")

function startGame(){
    //make location where the setup board and ship display shall be placed
    const gamePage = document.createElement("div");
    gamePage.setAttribute("class", "gamePage");
    mainPage.appendChild(gamePage)

    //make player boardContainer
    const playerBoard = document.createElement("div");
    playerBoard.setAttribute("class", "boardContainer");
    playerBoard.setAttribute("id", "playerBoard");
    gamePage.appendChild(playerBoard);

    //create gameBoard with players ships
    boardCreation(playerBoard, "playerBoard")
    let shipLocations = getAllShipLocations()
    placeShipsOnBoard(shipLocations, "player");

    //make enemy boardContainer
    const enemyBoard = document.createElement("div");
    enemyBoard.setAttribute("class", "boardContainer");
    enemyBoard.setAttribute("id", "enemyBoard");
    gamePage.appendChild(enemyBoard);
    //get enemy positions
    let enemyShipLocations = getRandomEnemyShips()
    //create gameBoard with players ships
    boardCreation(enemyBoard, "enemyBoard")
    placeShipsOnBoard(enemyShipLocations, "enemy");


/*
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
    //clean up the page*/
    const setupPage = document.querySelector(".setupPage")
    setupPage.remove();
};

export{startGame}