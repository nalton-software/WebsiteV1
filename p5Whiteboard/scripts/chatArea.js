class ChatArea {
    constructor(displayDivId) {
        this.displayDiv = document.getElementById(displayDivId);
        this.serverComm = new ServerCommunicator();

        //consts
        this.messageFileName = '!chatmessages.txt';
        this.txtEditor = 'editTxt.php';
        this.txtClearer = 'clearTxt.php';
        this.txtReader = null;
        
        this.joinRoom();
    }

    joinRoom() {
        this.username = prompt('Enter username:');
        var joinMessage = new Message(this.username, this.username + ' has joined');

        this.serverComm.fetchFile(this.messageFileName, function(prevMessagesStr) {
        console.log(prevMessagesStr)

        if (prevMessagesStr !== null && prevMessagesStr.length > 0) {
            var prevMessages = JSON.parse(prevMessagesStr);
            prevMessages.push(joinMessage);
            var newMessageFile = JSON.stringify(prevMessages);
        }
        else {
            var newMessageFile = JSON.stringify([joinMessage]);
        }
        var data = 'txtFile=' + this.messageFileName + '&data=' + newMessageFile;
        this.serverComm.sendDataPhp(this.txtEditor, data);

        });
    }

    update() {
        var messagesStr = this.serverComm.fetchFile(this.messageFileName, console.log);
        var messages = JSON.parse(messagesStr);
        console.log(messages);
    }

    sendMessage() {
        var contents = prompt('Enter message content');
        var message = new Message(this.username, contents);

        this.serverComm.fetchFile(this.messageFileName, function(prevMessagesStr) {
            console.log(prevMessagesStr)
        if (prevMessagesStr !== null && prevMessagesStr.length > 0) {
            var prevMessages = JSON.parse(prevMessagesStr);
            prevMessages.push(message);
        }
        else {
            var prevMessages = [message];
        }
        var newMessageFile = JSON.stringify(prevMessages);

        var data = 'txtFile=' + this.messageFileName + '&data=' + newMessageFile;
        this.serverComm.sendDataPhp(this.txtEditor, data);
        });
    }
}

class Message {
    constructor(sender, content) {
        this.sender = sender;
        this.content = content;
    }
}