const msgInputBar = document.getElementById('msgInput');
const usernameBar = document.getElementById('usernameInput');
const outputDiv = document.getElementById('outputDiv');

const urls = {
    sendMessage : 'php/addMessage.php',
    getMessages : 'php/getMessages.php',
    notificationSound : 'assets/notification.mp3'
}

const maxMsgDrawAmount = 50;

var cachedMsgs = '';
var isFirstUpdate = true;

function sendMsg() {
    var msgContent = msgInputBar.value;
    var username = usernameBar.value;
    if (username.length == 0) username == 'anonymous';

    var msg = new Message(username, msgContent);

    msgInputBar.value = '';

    postData(urls.sendMessage, msg)
        .then((response) => response.json())
        .then((responseData) => {   
            findAndAlertErrors(responseData);
        })
}

function getMessages() {
    postData(urls.getMessages, {amount : maxMsgDrawAmount})
        .then((response) => response.json())
        .then((responseData) => {
            displayMessages(responseData)
        })
}

function displayMessages(msgList) {
    var msgListStr = JSON.stringify(msgList);
    var prevScroll = outputDiv.scrollTop;
    var wasScrolledToBottom = isScrolledToBottom(outputDiv);

    var isNewMessage = (msgListStr !== cachedMsgs);

    if (isNewMessage) {
        // check for errors - if there aren't any then continue - else the function will have
        // brought them to the user's attention
        if (findAndAlertErrors(msgList) === false) {

            outputDiv.innerText = '';
            for (var i = 0; i < msgList.length; i ++) {
                var msg = msgList[i];
                var formattedMessage = msg.sender + ': ' + msg.content;
                outputDiv.innerText += formattedMessage + '\n\n';
            }
        }

        var lastMessage = msgList[msgList.length - 1];
        // if there's a new message, it's not the first update (because then all messages would be new)
        // and the sender isn't the person on this computer, then make a noise
        if (! isFirstUpdate && lastMessage.sender !== usernameBar.value) {
            playSound(urls.notificationSound);
        }
    }
            
    autoScroll(isNewMessage, prevScroll, wasScrolledToBottom)
    cachedMsgs = msgListStr;
    isFirstUpdate = false;
}

function playSound(url) {
    var a = new Audio(url);
    a.play();
}

function scrollToBottom(elem) {
    elem.scrollTop = elem.scrollHeight;
}

function isScrolledToBottom(elem) {
    if ((elem.scrollHeight - elem.offsetHeight) - elem.scrollTop < 5) { // if within 5px of bottom
        return true;
    }
    else {
        return false;
    }
}

function autoScroll(isNewMessage, prevScroll, wasScrolledToBottom) {
    if (isFirstUpdate) {
        scrollToBottom(outputDiv);
    }
    else if (wasScrolledToBottom && isNewMessage) {
        scrollToBottom(outputDiv);
    }
    else {
        outputDiv.scrollTop = prevScroll; // keep scroll the same as before
    }
}

function findAndAlertErrors(parsedJson) {
    var errorFound = false;
    if (parsedJson.includes('ERROR')) {
        alert('Unknown caught server error: reload page');
        errorFound = true;
    }
    return errorFound
}

class Message {
    constructor(sender, content) {
        this.sender = sender;
        this.content = content;
    }
}

setInterval(getMessages, 500);

// set up enter key to send
msgInputBar.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendMsg();
    }
});