import {Ship} from "./ships.js"

class Gameboard{
    constructor(){
    this.board = this.newBoard();
    this.shipsOnBoard = [];
    }

    newBoard = () => {
        let board = []
        for (let i = 0; i < 10; i++) {
            board[i] = new Array(10)
        }
        return board
    }

    placeShip = (length, direction, coordinate) => {
        let newShip = new Ship(length);

        if (direction === "topToBot"){
            for (let index = 0; index < length; index++) {
                if (this.board[coordinate[0] + index][coordinate[1]] instanceof Ship)
                    {return "ERROR: overlapping ships"}
            }
            for (let index = 0; index < length; index++){
                this.board[coordinate[0] + index][coordinate[1]] = newShip
            }
            this.shipsOnBoard.push(newShip)
        }
        if (direction === "leftToRight"){
            for (let index = 0; index < length; index++) {
                if (this.board[coordinate[0]][coordinate[1] + index] instanceof Ship)
                    {return "ERROR: overlapping ships"}
            }
            for (let index = 0; index < length; index++){
                this.board[coordinate[0]][coordinate[1] + index] = newShip
            }
            this.shipsOnBoard.push(newShip)
        }
        return this.board
    }

    receiveAttack = (coordinate) => {
        if (this.board[coordinate[0]][coordinate[1]] instanceof Ship){
            return this.board[coordinate[0]][coordinate[1]].hit();
        } else {
            this.board[coordinate[0]][coordinate[1]] = "miss"
            return "miss"
        }
    }

    checkIfAllShipsAreSunken = () => {
        if (this.shipsOnBoard.some(ship => ship.sunk === false)){
            return false
        } else {
            return true
        }               
    }
}

export {Gameboard, Ship}