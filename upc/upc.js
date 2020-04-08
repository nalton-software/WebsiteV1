const messageSep = '|';
const setupMessage = '{"username":"UPC-SETUP","content":"Welcome to Unnamed Protoype chat"}';
const inputField = document.getElementById('inputField');
const nameField = document.getElementById('nameField');
const resultBox = document.getElementById('resultBox');

const newMessageNoise1 = {pitch: 610, durationInSeconds: 0.15, waveForm: 'square'};
const newMessageNoise2 = {pitch: 590, durationInSeconds: 0.23, waveForm: 'square'};
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// these are all lowercase as the username is converted to lowercase before being checked
const bannedUsernames = ['status', 'upc-setup', 'warn', 'error', 'server', 'james bond', 'upcsetup', 'upc setup'];
const bannedChars = [messageSep];

var lastInfoDownload = '';
var isFirstUpdate = true;

var Message = function(username, content) {
    this.username = username;
    this.content = content;
};

Message.prototype.stringify = function() {
    return JSON.stringify(this);
};

function playNote(pitch, durationInSeconds, waveFormOptional) {
    if (waveFormOptional == undefined) {
        waveForm = 'sine'
    }
    else {
        waveForm = waveFormOptional;
    }
    // create Oscillator node
    var oscillator = audioCtx.createOscillator();

    oscillator.type = waveForm;
    oscillator.frequency.value = pitch; // value in hertz
    oscillator.connect(audioCtx.destination);
    oscillator.start(0);
    oscillator.stop(audioCtx.currentTime + durationInSeconds);
}

function submit() {
    var content = inputField.value;
    
    var username = nameField.value
    if (username.length < 1) {
        username = 'anonymous';
    }

    if (usernameValid(username)) {
        var message = new Message(username, content);
        sendToServer(messageSep + message.stringify(), 'upctxt.txt');
        inputField.value = '';
        stickScroll();
    }
    else {
        if (findBannedCharacters(username).length > 0) { // if problem is a banned character
            alert('There are some banned characters in your username: ' + findBannedCharacters(username));
        }
        else { // if it is a system username
            alert('Your username is banned! You cannot use it, as it is system-specific');
        }
        nameField.value = '';
    }
}

function usernameValid(username) {
    var valid = true;
    if (bannedUsernames.includes(username.toLocaleLowerCase())) {
        valid = false;
    }
    if (findBannedCharacters(username).length > 0) {
        valid = false;
    }
    return valid;
}

function findBannedCharacters(username) {
    var bannedCharactersFound = [];
    for (var i = 0; i < bannedChars.length; i ++) {
        if (username.includes(bannedChars[i])) {
            bannedCharactersFound.push(bannedChars[i]);
        }
    }
    return bannedCharactersFound;
}

function sendToServer(data, file) {// file is file to write into, not the php file
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = xmlhttp.responseText;
        }
    }
    xmlhttp.open('POST', 'editTxt.php', true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('txtFile=' + file + '&data=' + data);
}

function stickScroll() {
    resultBox.scrollTop = resultBox.scrollHeight;
}

function isScrolledToBottom() {
    if ((resultBox.scrollHeight - resultBox.offsetHeight) - resultBox.scrollTop < 5) { // if within 5px of bottom
        return true;
    }
    else {
        return false;
    }
}

function checkIfNewMessage(currentInfoDownload) {
    if (lastInfoDownload == currentInfoDownload) {
        return false;
    }
    else {
        return true;
    }
}

function update() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {// Typical action to be performed when the document is ready:
        var response = xhttp.responseText;
        updateDisplay(response);
    }
    };
    xhttp.open('GET', 'readTxt.php?file=' + 'upctxt.txt');
    xhttp.send();
}

function updateDisplay(messagesAsString) {
    var wasScrolledToBottom = isScrolledToBottom();
    var prevScroll = resultBox.scrollTop;
    var isNewMessage = checkIfNewMessage(messagesAsString);

    // if there is a new message, redraw the text
    if (isNewMessage) {
        var messagesAsArray = messagesAsString.split(messageSep);
        resultBox.innerText = ''; // it is important that innertext is used here and not innerhtml,
        // as if innerhtml is used, then you can write html code and possibly embed a script somehow,
        // and that is bad for security
        for (var messageNum = 0; messageNum < messagesAsArray.length; messageNum ++) {
            var message = JSON.parse(messagesAsArray[messageNum]);
            resultBox.innerText += message.username + ': ' + message.content + '\n\n';
        }
    }
    if (isFirstUpdate) {
        stickScroll();
    }
    else if (wasScrolledToBottom && isNewMessage) {
        stickScroll();
    }
    else {
        resultBox.scrollTop = prevScroll;
    }

    var lastMessage = JSON.parse(messagesAsArray[messagesAsArray.length -1]);
    var username = nameField.value;

    if (lastInfoDownload != messagesAsString && lastMessage.username != username) { // if new message
        makeNewMessageTone();
    }

    isFirstUpdate = false;
    lastInfoDownload = messagesAsString;
}

function makeNewMessageTone() {
    playNote(newMessageNoise1.pitch, newMessageNoise1.durationInSeconds, newMessageNoise1.waveForm);
    setTimeout(function() {
        playNote(newMessageNoise2.pitch, newMessageNoise2.durationInSeconds, newMessageNoise2.waveForm);
    }, newMessageNoise1.durationInSeconds * 1000);
}

function userClearChat() {
    if (confirm('Are you sure that you want to clear all chat history?')) {
        clearChat();
    }
}

function clearChat() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'clearTxt.php', true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('txtFile=upctxt.txt');

    sendToServer(setupMessage, 'upctxt.txt');
}

function onLoadSetup(existingData) {
    var loadMessage = new Message('UPC-SETUP', 'A new user has joined the chat');
    if (existingData.length > 0) {
        sendToServer(messageSep + loadMessage.stringify(), 'upctxt.txt');
    }
    else {
        sendToServer(messageSep + loadMessage.stringify(), 'upctxt.txt');
    }
}

inputField.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submit();
    }
});

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {// Typical action to be performed when the document is ready:
    var response = xhttp.responseText;
    onLoadSetup(response);
}
};
xhttp.open('GET', 'readTxt.php?file=' + 'upctxt.txt');
xhttp.send();

setInterval(update, 1000);