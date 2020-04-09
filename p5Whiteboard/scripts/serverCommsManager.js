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
            var joinMessage = new Message(this.username, this.username + ' has joined');
            this.downloadRoomData(this.sendChatMessage2.bind(this), joinMessage);
            this.sendChatMessage2(joinMessage);
        }
        else {
            alert(dictionary.nonExistentRoomWarning);
        }
    }

    sendChatMessage() {
        if (this.roomId !== null && this.checkUsername()) {
            var contents = prompt(dictionary.messageContentPrompt);
            var message = new Message(this.username, contents);

            this.downloadRoomData(this.sendChatMessage2.bind(this), message);
        }
        else if (this.roomId === null) {
            alert(dictionary.notInRoomWarning);
        }
        else if (this.checkUsername() == false) {
            alert(dictionary.badUsernameWarning);
        }
    }

    sendChatMessage2(roomDataStr, message) {
        var roomData = this.parseRoomData(roomDataStr);
        this.addMessageToRoom(roomData, this.roomId, message);
        var newRoomDataStr = this.stringifyRoomData(roomData);

        var dataToSend = 'txtFile=' + roomDataUrlForPhp + '&data=' + newRoomDataStr;
        this.serverComm.sendDataPhp(txtEditorUrl, dataToSend);
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
        this.serverComm.callPhpEcho(txtReaderUrlQuery, callbackFunction, callbackFunctionArgs);
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

    addMessageToRoom(rooms, roomId, message) {
        var room = this.getRoom(rooms, roomId);
        if (room !== null) {
            room.chatMessages.push(message);
        }
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