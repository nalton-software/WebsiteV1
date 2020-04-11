class ServerCommsManager {
    constructor() {
        this.serverComm = new ServerCommunicator();

        this.roomId = null;
        this.roomName = null;
        this.username = null;
    }

    createEmptyRoom() {
        var roomName = prompt('Enter room name:');
        var roomId = prompt('Enter room id:'); // only temporary
        this.emptyRoom = new Room(roomName, roomId);
        this.downloadRoomData(this.createEmptyRoom2.bind(this), [roomId, roomName]);
    }

    createEmptyRoom2(roomDataStr, argList) {
        var roomId = argList[0];
        var roomName = argList[1];

        console.log(roomDataStr.length > 0);

        var roomIdUnique = true; // set this here because if the 'else' case goes ahead below - it only is set in the 'if'
        if (roomDataStr.length > 0) {
            var roomData = this.parseRoomData(roomDataStr);
            var roomIdUnique = this.getRoom(roomData, roomId) === null;
            if (roomIdUnique) {
                roomData.push(this.emptyRoom);
            }
        }
        else {
            var roomData = [this.emptyRoom];
        }

        if (roomIdUnique) { // success case
            var roomDataStr = this.stringifyRoomData(roomData);
            var dataToSend = 'txtFile=' + roomDataUrlForPhp + '&data=' + roomDataStr;
            this.serverComm.sendDataPhp(txtEditorUrl, dataToSend);

            this.roomId = roomId;
            this.roomName = roomName;
            // set username if the user hasn't done that already
            if (this.username === null) {
                this.username = prompt(dictionary.usernamePrompt);
            }
        }
        else { // fail case 1
            alert('That room id is already in use');
        }
    }

    joinRoom() {
        var roomId = prompt('Enter room id:');
        // {check room id for null etc}
        this.downloadRoomData(this.joinRoom2.bind(this), roomId);
    }

    joinRoom2(roomDataStr, roomId) {
        console.log(roomDataStr)
        var roomData = this.parseRoomData(roomDataStr);
        var roomExists = (this.getRoom(roomData, roomId) !== null);
        if (roomExists) {
            this.roomId = roomId;
            var room = this.getRoom(roomData, this.roomId);
            this.roomName = room.name;

            if (this.username === null) {
                this.username = prompt(dictionary.usernamePrompt);
            }

            // send join message
            var content = this.username + ' has joined the chat';
            var data = `username=${dictionary.chatSystemName}&content=${content}&roomId=${this.roomId}`;
            this.serverComm.sendDataPhp(dictionary.addMessageUrl, data);
        }
        else {
            alert(dictionary.nonExistentRoomWarning);
        }
    }

    sendChatMessage() {
        if (this.roomId !== null && this.checkUsername()) {
            var content = prompt(dictionary.messageContentPrompt);
            var data = `username=${this.username}&content=${content}&roomId=${this.roomId}`;
            this.serverComm.sendDataPhp(dictionary.addMessageUrl, data);
        }
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

    stringifyRoomData(roomData) {
        if (roomData !== null) {
            var roomDataStr = JSON.stringify(roomData);
        }
        else {
            var roomDataStr = '';
        }
        return roomDataStr;
    }

    downloadRoomData(callbackFunction, callbackFunctionArgs) {
        this.serverComm.callPhpEcho(dictionary.readTxtUrlQuery, callbackFunction, callbackFunctionArgs);
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
    
    checkUsername() {
        var usernameOk = true;
        if (this.username === null || typeof this.username === 'object') {
            usernameOk = false;
        }
        return usernameOk;
    }

    isInRoom() {
        if (this.roomId !== null) {
            return true;
        }
        else {
            return false;
        }
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