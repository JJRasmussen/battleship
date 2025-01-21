    //make container for greeting message 
    let greetingsPlayer = (mainPage, playerName) => {
    const greetingMessage = document.createElement("h2");
    greetingMessage.setAttribute("id", "Greeting");
    greetingMessage.textContent  = "Greetings, Admiral " + playerName
    mainPage.appendChild(greetingMessage);
    }

    export {greetingsPlayer}