const msgInputBar = document.getElementById('msgInput');
const usernameBar = document.getElementById('usernameInput');
const outputDiv = document.getElementById('outputDiv');

const urls = {
    sendMessage : 'php/addMessage.php',
    getMessages : 'php/getMessages.php'
}

const maxMsgDrawAmount = 50;

var cachedMsgs = '';

function sendMsg() {
    var msgContent = msgInputBar.value;
    var username = usernameBar.value;
    if (username.length == 0) username == 'anonymous';

    var msg = new Message(username, msgContent);

    postData(urls.sendMessage, msg);
}

function getMessages() {
    postData(urls.getMessages, {'amount' : maxMsgDrawAmount})
        .then(response => displayMessages(response));
}

function displayMessages(rawData) {
    console.log(rawData)
    if (rawData !== cachedMsgs) {
        var msgList = JSON.parse(rawData);
        outputDiv.innerText = '';
        for (var i = 0; i < msgList.length; i ++) {
            var msg = msgList[i];
            var formattedMessage = msg.sender + ': ' + msg.content;
            outputDiv.innerText += '\n' + formattedMessage;
        }
    }
}

class Message {
    constructor(sender, content) {
        this.sender = sender;
        this.content = content;
    }
}