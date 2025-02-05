import {
    Gameboard,
    Ship
} from "./gamelogic/gameboard.js"; 

class gameController{
    constructor(playerOneName, playerTwoName, playerOneBoard, playerTwoBoard){
        this.players = [playerOneName, playerTwoName]
        this.activePlayer = playerOneName
        this.playerBoards = [playerOneBoard, playerTwoBoard]
    }
    swapActivePlayer = () => {
        this.activePlayer = this.activePlayer === this.players[0] ? this.players[1] : this.players[0];
    }

    getActivePlayer = () => this.activePlayer;

    checkForWinner = () => {
        let shipCounter = 0
        for (let index = 0; index < this.shipsOnBoard; index++) {
            if (this.shipsOnBoard[i].sunk === true){
                shipCounter += 1
            } else {
                return this.activePlayer
            }
        }
    }
    playRound = (chosenCell) => {
        //drop token on board
        validTarget = board.dropToken(chosenCell, getActivePlayer().token);
    
        if (validTarget === true){
            winner = checkForWinner();
            if (winner === ""){
                switchPlayerTurn();
                controlDom.updateTextContent(getActivePlayer().name);
            }
            if (winner === getActivePlayer().token){
                controlDom.updateTextContent("Congratulations " + getActivePlayer().name + ", you won!");
                controlDom.removeGameEventListener(board.getBoard().length, cachedCells, playRound, board);
            }
            if (winner === "tie"){
                controlDom.updateTextContent("It's a tie");
                controlDom.removeGameEventListener(board.getBoard().length, cachedCells, playRound, board);
            }
        }
        else{
            controlDom.updateTextContent("Please, " + getActivePlayer().name + "choose another space")
            return
        }
    }
}

let activeGame = new gameController