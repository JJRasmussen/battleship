import {boardCreation} from "./makeGameBoard.js"
const mainPage = document.querySelector(".mainPage")
const gameTitle = document.querySelector("#gameTitle")
const newGameButton = document.querySelector(".newGameButton")
const gameForm = document.querySelector("#newGame")
const test = document.querySelector(".test")


function newGame(event){
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

    boardCreation(boardContainer);
    
    
    //clear the page
    gameTitle.remove();
    newGameButton.remove();
    gameForm.remove();
};

newGameButton.addEventListener("click", newGame);

