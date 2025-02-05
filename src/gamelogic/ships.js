class Ship {
    constructor(length){
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.coordinate = []
    }

    hit = () => {
        this.hits = this.hits + 1;
        this.sunk = this.isSunk();
        return this.sunk;
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