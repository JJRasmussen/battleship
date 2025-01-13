import {
    Gameboard,
    Ship
} from "./gameboard.js"; 

class Player {
    constructor(name, type){
        this.name = name
        this.type = type
        this.board = new Gameboard;
    }
}

export {Gameboard, Ship, Player}