class ChatArea {
    constructor(displayDivId) {
        this.displayDiv = document.getElementById(displayDivId);
        this.serverComm = new ServerCommunicator();
        this.roomHandler = new RoomHandler();

        this.roomId = null;

        //consts
        this.messageFileName = '!roomdata.txt';
        this.txtEditor = 'editTxt.php';
        this.txtClearer = 'clearTxt.php';
        this.txtReader = null;
    }

    joinRoomStart() {
        this.username = prompt('Enter username:');
        this.roomId = prompt('Enter room id:');

        this.serverComm.fetchFile(this.messageFileName, this.joinRoom);
    }

    joinRoom(roomDataStr) {
        var joinMessage = new Message(this.username, this.username + ' has joined');

        var roomData = this.roomHandler.parseRoomData(roomDataStr);
        this.roomHandler.addMessageToRoom(roomData, this.roomId, joinMessage);
        var newRoomDataStr = this.roomHandler.stringifyRoomData(roomData);

        var dataToSend = 'txtFile=' + this.messageFileName + '&data=' + newRoomDataStr;
        this.serverComm.sendDataPhp(this.txtEditor, dataToSend);
    }

    update() {
        this.serverComm.fetchFile(this.messageFileName, console.log);
    }

    sendMessage() {
        if (this.roomId !== null) {
            var contents = prompt('Enter message content');
            var message = new Message(this.username, contents);

            this.serverComm.fetchFile(this.messageFileName, function(roomDataStr) {
                var roomData = this.roomHandler.parseRoomData(roomDataStr);
                this.roomHandler.addMessageToRoom(roomData, this.roomId, message);
                var newRoomDataStr = this.roomHandler.stringifyRoomData(roomData);
        
                var dataToSend = 'txtFile=' + this.messageFileName + '&data=' + newRoomDataStr;
                this.serverComm.sendDataPhp(this.txtEditor, dataToSend);
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
    constructor() {}

    parseRoomData(roomDataStr) {
        if (roomData !== null) {
            if (roomDataStr.length > 0) {
                return JSON.parse(roomDataStr);
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }

    stringifyRoomData(roomData) {
        if (roomData !== null) {
            roomDataStr = JSON.stringify(roomData);
        }
        else {
            roomDataStr = '';
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
}