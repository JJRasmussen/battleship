class Ship {
    constructor(length){
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }
    hit = () => {
        this.hits = this.hits + 1
        this.sunk = isSunk()
    }

    isSunk = () => {
        if (this.length === this.hits){
            return true
        } else {
            return false
        }
    }
}

export {Ship}