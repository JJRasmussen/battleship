import "./styles.css";
import {
    Gameboard,
    Ship
} from "./gamelogic/gameboard.js"; 
console.log("hello");

const board = new Gameboard;

board.placeShip(1, "topToBot", [0,0])
board.placeShip(2, "topToBot", [3,1])

board.receiveAttack([0,0]);
board.receiveAttack([3,1]);

console.log(board.checkIfAllShipsAreSunken())
board.receiveAttack([4,1]);
console.log(board.checkIfAllShipsAreSunken())
console.log(board)
