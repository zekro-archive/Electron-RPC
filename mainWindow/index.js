const { webFrame } = require('electron');

const submitButton = document.getElementById('submit');


window.values = {};

function setValues(){
    const titleValue = document.getElementById('title').value;
    const stateValue = document.getElementById('state').value;
    const lkey = document.getElementById('lkey').value;
    const ltext = document.getElementById('ltext').value;
    const skey = document.getElementById('skey').value;
    const stext = document.getElementById('stext').value;
    const timestampValue = document.getElementById('timestamp').checked;
    window.values = {
        title: titleValue,
        state: stateValue,
        timestamp: timestampValue,
        largeImageKey: lkey,
        largeImageText: ltext,
        smallImageKey: skey,
        smallImageText: stext
    }
}



submitButton.onclick = () => {
    setValues();
}