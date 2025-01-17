function allowDrop(ev){
    ev.preventDefault();
    //console.log(this.id)
    console.log(this.id)
}

function drag(ev){
    console.log(this.id + " recieved");
}

function drop(ev){
    ev.preventDefault();
    console.log("dropped at " + this.id);
}

export {allowDrop, drop, drag}