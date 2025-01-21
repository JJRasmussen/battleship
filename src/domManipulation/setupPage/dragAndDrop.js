function dragOver(ev){
    ev.preventDefault();
    //console.log(this.id)

    console.log(this.id)
}

function dragEnter(ev){
    console.log("enter")
    for (let i = 0; i < 3; i++) {
        let changingNumber = parseInt(this.id.slice(-1)) + i
        let targetCell = this.id.slice(0, -1)
        targetCell = targetCell.concat(changingNumber)
        let showShip = document.querySelector("#" + targetCell)
        showShip.classList.add("shipHighlight")
    }
}

function dragLeave(ev){
    console.log("leave")
    for (let i = 0; i < 3; i++) {
        let changingNumber = parseInt(this.id.slice(-1)) + i
        let targetCell = this.id.slice(0, -1)
        targetCell = targetCell.concat(changingNumber)
        let removeShip = document.querySelector("#" + targetCell)
        removeShip.classList.remove("shipHighlight");
    }
}

function drag(ev){
    let shipDragged = this.id
    console.log(this.id + " recieved");
    console.log(ev.target)
    return shipDragged
}

function getCellId(ev){
    return ev.target.id;
}

function drop(ev){
    console.log("dropped at " + this.id);
}

export {dragOver, drop, drag, dragEnter, dragLeave, getCellId}