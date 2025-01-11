import {Ship} from "./ships.js"

class Gameboard{
    constructor(){
    this.board = this.newBoard();
    }

    newBoard = () => {
        let board = []
        for (let i = 0; i < 10; i++) {
            board[i] = new Array(10)
        }
        return board
    }

    placeShip = (length, direction, startingCoordinate) => {
        let newShip = new Ship;

        let x = startingCoordinate[0];
        let y = startingCoordinate[1];

        if (direction === "topToBot"){
            for (let index = 0; index < length; index++){
                this.board[x + index][y] = newShip
            }
        }
        if (direction === "leftToRight"){
            for (let index = 0; index < length; index++){
                this.board[x][y + index] = newShip
            }
        }
        return this.board
    }

    receiveAttack = (coordinate) => {
        
    }
}

export {Gameboard, Ship}