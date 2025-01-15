const addEvent = (targetInDom, addedFunction) => {
    targetInDom.addEventListener("click", () => {
        addedFunction();
    });
};

export {addEvent};