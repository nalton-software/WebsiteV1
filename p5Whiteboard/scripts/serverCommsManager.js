class ServerCommsManager {
    constructor(roomDataShowerId) {
        this.serverComm = new ServerCommunicator();

        this.roomDataShower = document.getElementById(roomDataShowerId);

        this.roomId = null;
        this.roomName = null;
        this.username = null;
    }

    handleServerError(echoFromServer) {
        var errorOccured = false;

        var startOfEcho = echoFromServer.substring(0, dictionary.serverErrorPrefix.length);
        if (startOfEcho === dictionary.serverErrorPrefix) {
            errorOccured = true;
            var echoMinusPrefix = echoFromServer.substring(dictionary.serverErrorPrefix.length);
            var dictionaryKey = 'ERROR' + echoMinusPrefix;
            console.error('code: ' + echoMinusPrefix + 'meaning: ' + dictionary[dictionaryKey]);
        }
        return errorOccured;
    }

    createEmptyRoom() {
        var roomName = prompt('Enter room name:');
        this.creatingRoomId = prompt('Enter room id:'); // only temporary
        var data = `roomname=${roomName}&roomId=${this.creatingRoomId}`;
        this.serverComm.sendDataPhpEcho(dictionary.createRoomUrl, data, this.createEmptyRoomEnd.bind(this));
    }

    createEmptyRoomEnd(echoFromServer) {
        var errorOccured = this.handleServerError(echoFromServer);
        if (! errorOccured) {
            if (this.username === null) {
                this.username = prompt(dictionary.usernamePrompt);
            }
            this.roomId = this.creatingRoomId;
        }
    }

    joinRoom() {
        this.joiningRoomId = prompt('Enter room id:');
        // {check room id for null etc}
        var data = `roomId=${this.joiningRoomId}`;
        this.serverComm.sendDataPhpEcho(dictionary.joinRoomUrl, data, this.joinRoomEnd.bind(this));
    }

    joinRoomEnd(echoFromServer) {
        var errorOccured = this.handleServerError(echoFromServer);
        if (! errorOccured && echoFromServer === 'success') {
            if (this.username === null) {
                this.username = prompt(dictionary.usernamePrompt);
            }

            this.roomId = this.joiningRoomId;

            var content = this.username + ' has joined the room';
            var data = `username=${dictionary.userEndProgramName}&content=${content}&roomId=${this.roomId}`;
            this.serverComm.sendDataPhp(dictionary.addMessageUrl, data);
        }
    }

    sendChatMessage() {
        if (this.roomId !== null) {
            var content = prompt(dictionary.messageContentPrompt);
            var data = `username=${this.username}&content=${content}&roomId=${this.roomId}`;
            this.serverComm.sendDataPhp(dictionary.addMessageUrl, data);
        }
    }

    updateTopBar() {
        if (this.isInRoom()) {
            var roomDataText = `You are in ${this.roomName} (room id: ${this.roomId})`;
        }
        else {
            var roomDataText = dictionary.notInRoomText;
        }
        this.roomDataShower.innerText = roomDataText; // don't use innerHTML for security
    }

    isInRoom() {
        if (this.roomId === null) {
            return false;
        }
        else {
            return true;
        }
    }

    // these last four are just used for updating the other classes, not for calling php or editing data
    downloadRoomData(callbackFunction, callbackFunctionArgs) {
        this.serverComm.callPhpEcho(txtReaderUrlQuery, callbackFunction, callbackFunctionArgs);
    }

    parseRoomData(roomDataStr) {
        var roomData = null;
        if (roomDataStr !== undefined) {
            if (roomDataStr !== null) {
                if (roomDataStr.length > 0) {
                    return JSON.parse(roomDataStr);
                }
            }
        }
        return roomData;
    }

    getRoom(rooms, roomId) {
        var room = null;
        if (rooms !== null) {
            for (var i = 0; i < rooms.length; i ++) {
                if (rooms[i].id == roomId) {
                    room = rooms[i];
                    break;
                }
            }
        }
        return room;
    }

    getMessages(roomData) {
        var messages = null;
        if (roomData !== null) {
            messages = [];
            var room = this.getRoom(roomData, this.roomId);
            var roomMessages = room.chatMessages;
            for (var i = 0; i < roomMessages.length; i ++) {
                messages.push(roomMessages[i]);
            }
        }
        return messages;
    }
}

class Message {
    constructor(sender, content) {
        this.sender = sender;
        this.content = content;
    }
}

class Room {
    constructor(name, id) { // id is only temp
        this.name = name;
        this.id = id;
        this.whiteboardData = [];
        this.chatMessages = [];
    }
}