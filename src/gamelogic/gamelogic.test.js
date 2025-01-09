import {
    Gameboard,
    Ship
} from "./gameboard.js"; 

describe('board and ship tests', () => {
    const board = new Gameboard;
    const ship = new Ship;

    test('creation of a Ship', () => {
        expect(ship).toBeInstanceOf(Ship)
    })
    
    test('creation of a Ship on the board', () => {
        expect(board.placeShip(1, "topToBot", [0][0])[0][0]).toBeInstanceOf(Ship)
    });
});
