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
    
    test('creation of a Ship on the board in corner', () => {
        expect(board.placeShip(1, "topToBot", [0, 0])[0][0]).toBeInstanceOf(Ship),
        expect(board.placeShip(5, "topToBot", [0, 0])[4][0]).toBeInstanceOf(Ship)
    })
    
    test('top to bottom and left to right', () => {
        expect(board.placeShip(3, "topToBot", [3, 2])[4][2]).toBeInstanceOf(Ship),
        expect(board.placeShip(4, "leftToRight", [5, 2])[5][3]).toBeInstanceOf(Ship)
    });

    test('receiveAttack', () => {
        expect(board.receiveAttack([0,0])).toBe("miss")
    });
});
