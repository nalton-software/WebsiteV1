class ChatArea {
    constructor(displayDivId) {
        this.displayDiv = document.getElementById(displayDivId);
        this.serverComm = new ServerCommunicator();

        //consts
        this.messageFileName = '!chatmessages';
        
        this.joinRoom();
    }

    joinRoom() {
        this.username = prompt('Enter username:');
        var joinMessage = new Message(this.username, this.username + ' has joined');

        var prevMessagesStr = this.serverComm.fetchFile(this.messageFileName);
        if (prevMessagesStr !== null) {
            var prevMessages = JSON.parse(prevMessagesStr);
            prevMessages.push(joinMessage);
            var newMessageFile = JSON.stringify(prevMessages);
        }
        else {
            var newMessageFile = JSON.stringify([joinMessage]);
        }
        this.serverComm.sendDataPhp(this.messageFileName, newMessageFile);
    }

    update() {
        var messagesStr = this.serverComm.fetchFile(this.messageFileName);
        var messages = JSON.parse(messagesStr);
        console.log(messages);
    }

    sendMessage() {
        var contents = prompt('Enter message content');
        var message = new Message(this.username, contents);

        var prevMessagesStr = this.serverComm.fetchFile(this.messageFileName);
        var prevMessages = JSON.parse(prevMessagesStr);
        prevMessages.push(message);
        var newMessageFile = JSON.stringify(prevMessages);
        this.serverComm.sendDataPhp(this.messageFileName, newMessageFile);
    }
}

class Message {
    constructor(sender, content) {
        this.sender = sender;
        this.content = content;
    }
}