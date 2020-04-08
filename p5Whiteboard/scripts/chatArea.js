class ChatArea {
    constructor(displayDivId) {
        this.displayDiv = document.getElementById(displayDivId);
        this.serverComm = new ServerCommunicator();

        this.roomId = null;
    }

    joinRoomStart() {
        this.username = prompt('Enter username:');
        this.roomId = prompt('Enter room id:');

        this.serverComm.fetchFile(roomDataUrlForHTML, this.joinRoom.bind(this));
    }

    joinRoom(roomDataStr) {
        console.log('yo')
        var joinMessage = new Message(this.username, this.username + ' has joined');

        var roomData = roomHandler.parseRoomData(roomDataStr);
        roomHandler.addMessageToRoom(roomData, this.roomId, joinMessage);
        var newRoomDataStr = roomHandler.stringifyRoomData(roomData);

        var dataToSend = 'txtFile=' + roomDataUrlForPhp + '&data=' + newRoomDataStr;
        this.serverComm.sendDataPhp(txtEditorUrl, dataToSend);
    }

    update() {
        this.serverComm.fetchFile(roomDataUrlForHTML, console.log);
    }

    sendMessage() {
        if (this.roomId !== null) {
            var contents = prompt('Enter message content');
            var message = new Message(this.username, contents);

            this.serverComm.fetchFile(roomDataUrlForHTML, function(roomDataStr) {
                var roomData = roomHandler.parseRoomData(roomDataStr);
                roomHandler.addMessageToRoom(roomData, this.roomId, message);
                var newRoomDataStr = roomHandler.stringifyRoomData(roomData);
        
                var dataToSend = 'txtFile=' + roomDataUrlForPhp + '&data=' + newRoomDataStr;
                this.serverComm.sendDataPhp(txtEditorUrl, dataToSend);
            });
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

class RoomHandler {
    constructor() {
        this.serverComm = new ServerCommunicator();
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

    getRoom(rooms, roomId) {
        var room = null;
        if (rooms !== null) {
            for (var i = 0; i ++; i < rooms.length) {
                if (rooms[i].id == roomId) {
                    room = rooms[i];
                    break;
                }
            }
            return room;
        }
    }

    addMessageToRoom(rooms, roomId, message) {
        var room = getRoom(rooms, roomId);
        if (room !== null) {
            room.chatMessages.push(message);
        }
    }

    createEmptyRoomStart() {
        var roomName = prompt('Enter room name:');
        var roomId = prompt('Enter room id:'); // only temporary
        this.emptyRoom = new Room(roomName, roomId); // I do this so I can transfer to the below function easily
        var thisPointer = this;
        this.serverComm.callPhpEcho(txtReaderUrlQuery, this.createEmptyRoom.bind(this), thisPointer);
    }

    createEmptyRoom(roomDataStr, thisPointer) {
        console.log(roomDataStr)
        if (roomDataStr.length > 0) {
            var roomData = thisPointer.parseRoomData(roomDataStr);
            roomData.push(thisPointer.emptyRoom);
        }
        else {
            var roomData = [thisPointer.emptyRoom];
        }
        var roomDataStr = thisPointer.stringifyRoomData(roomData);
        var dataToSend = 'txtFile=' + roomDataUrlForPhp + '&data=' + roomDataStr;
        thisPointer.serverComm.sendDataPhp(txtEditorUrl, dataToSend);
    }
}