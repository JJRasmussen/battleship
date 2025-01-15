import {
    Gameboard,
    Ship,
    player
} from "./player.js"; 



describe('Setup of board', () => {

    let board = new Gameboard;
    let ship = new Ship;

    test('creation of a Ship', () => {
        expect(ship).toBeInstanceOf(Ship)
    })
    
    test('creation of a Ship on the board in corner', () => {
        expect(board.placeShip(1, "topToBot", [0, 0])[0][0]).toBeInstanceOf(Ship),
        expect(board.placeShip(5, "topToBot", [1, 0])[4][0]).toBeInstanceOf(Ship)
    })
    
    test('top to bottom and left to right', () => {
        expect(board.placeShip(3, "topToBot", [3, 2])[3][2]).toBeInstanceOf(Ship),
        expect(board.placeShip(4, "leftToRight", [7, 2])[7][3]).toBeInstanceOf(Ship)
    })

    test('error if ship is placed on another ship', () => {
        expect(board.placeShip(3, "topToBot", [3, 2])).toBe("ERROR: overlapping ships")
    })
});

describe('Interact with board', () => {

    let board = new Gameboard;

    board.placeShip(2, "topToBot", [1, 0])

    test('counting ships on board', () => {
        expect(board.shipsOnBoard.length).toBe(1)
    })

    test('receiveAttack - miss', () => {
        expect(board.receiveAttack([9,9])).toStrictEqual("miss")
    })

    test('receiveAttack - hit, but did not sink', () => {
        expect(board.receiveAttack([1,0])).toBe(false)
    })

    test('receiveAttack - hit and sunk ship', () => {
        expect(board.receiveAttack([2,0])).toBe(true)
    })
});

describe('Check for victory condition', () => {

    let board = new Gameboard;

    board.placeShip(1, "topToBot", [0,0])
    board.placeShip(2, "topToBot", [3,1])

    board.receiveAttack([0,0]);
    board.receiveAttack([3,1]);

    test('counting ships on board', () => {
        expect(board.shipsOnBoard.length).toBe(2)
    })

    test('check if all ships are sunk: not sunk', () => {
        expect(board.checkIfAllShipsAreSunken()).toBe(false)
    })

    test('check if all ships are sunk: sunk', () => {
        board.receiveAttack([4,1]);
        expect(board.checkIfAllShipsAreSunken()).toBe(true)
    })
});


