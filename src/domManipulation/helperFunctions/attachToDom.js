const addToDom = (setId, setClass, attachTo, type, content) => {
    //sanitize input:
    setId = setId;
    setClass = setClass.split(" ").join("");
    attachTo = attachTo.split(" ").join("");
  
    let target = document.querySelector(attachTo);
  
    let newAddition = document.createElement(type);
    newAddition.setAttribute("id", setId);
    newAddition.setAttribute("class", setClass);
    newAddition.textContent = content;
  
    target.appendChild(newAddition);
  };
  
  export { addToDom };