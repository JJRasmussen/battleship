import {getQueriedShips} from "./queryShips.js"

let axis = "topToBottom"
let axisToggleButton = null

function changeAxis(){
    axis = axis === "topToBottom" ? "leftToRight" : "topToBottom";

    let shipInDisplay = document.querySelectorAll(".shipInDisplay")
    if(axis === "topToBottom"){
        for (let i = 0; i < shipInDisplay.length; i++) {
            shipInDisplay[i].classList.remove("leftToRight")
            shipInDisplay[i].classList.add("topToBottom")
        }
    } else {
        for (let i = 0; i < shipInDisplay.length; i++) {
            shipInDisplay[i].classList.remove("topToBottom")
            shipInDisplay[i].classList.add("leftToRight")
        } 
    }
    updateAxisToggleButton()
}

function queryToggleButton(){
    axisToggleButton = document.querySelector(".axisButton")
}

function updateAxisToggleButton(){
    axisToggleButton.textContent = `${axis}` 
}

function getAxis(){
    return axis
}

export {changeAxis, queryToggleButton, updateAxisToggleButton, getAxis}