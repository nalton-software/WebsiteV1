class ServerCommsManager {
    constructor(roomDataShowerId) {
        this.serverComm = new ServerCommunicator();

        this.roomDataShower = document.getElementById(roomDataShowerId);

        this.roomId = null;
        this.roomname = null;
        this.username = null;
    }

    handleServerError(echoFromServer) {
        var errorOccured = false;

        var startOfEcho = echoFromServer.substring(0, dictionary.serverErrorPrefix.length);
        if (startOfEcho === dictionary.serverErrorPrefix) {
            errorOccured = true;
            var echoMinusPrefix = echoFromServer.substring(dictionary.serverErrorPrefix.length);
            var dictionaryKey = dictionary.jsErrorPrefix + echoMinusPrefix;
            var message = 'ERROR! errorCode: ' + echoMinusPrefix + '; meaning: ' + dictionary[dictionaryKey]
            console.error(message);
            alert(message);
        }
        return errorOccured;
    }

    handleServerWarning(echoFromServer) { 
        var warningSent = false;

        var startOfEcho = echoFromServer.substring(0, dictionary.serverErrorPrefix.length);
        if (startOfEcho === dictionary.serverWarningPrefix) {
            warningSent = true;
        }
        return warningSent;
    }

    getWarningBody(warning) {
        return warning.substring(dictionary.serverWarningPrefix.length);
    }

    createEmptyRoom() {
        var roomname = prompt(dictionary.roomNamePrompt);
        this.creatingRoomId = prompt(dictionary.roomIdPrompt); // having to invent your own room Id is only temporary
        var data = `roomname=${roomname}&roomId=${this.creatingRoomId}`;
        this.serverComm.sendDataPhpEcho(dictionary.createRoomUrl, data, this.createEmptyRoomEnd.bind(this));
    }

    createEmptyRoomEnd(echoFromServer) {
        var errorOccured = this.handleServerError(echoFromServer);
        var warningSent = this.handleServerWarning(echoFromServer);
        if (! errorOccured && ! warningSent) {
            this.joinRoom(this.creatingRoomId);
        } 
        else if (warningSent) {
            var warningBody = this.getWarningBody(echoFromServer);
            var dictionaryKey = dictionary.jsWarningPrefix + warningBody;
            alert(dictionary[dictionaryKey]);
        }
    }

    joinRoom(roomId) { // an arg is used here to make it easier to be called from other methods of this

        // {check room id for null etc}

        this.joiningRoomId = roomId;

        var data = `roomId=${roomId}`;
        this.serverComm.sendDataPhpEcho(dictionary.joinRoomUrl, data, this.joinRoomEnd.bind(this));
    }

    joinRoomEnd(echoFromServer) {
        var errorOccured = this.handleServerError(echoFromServer);
        var warningSent = this.handleServerWarning(echoFromServer);
        if (! errorOccured && ! warningSent && echoFromServer === 'success') {
            if (this.username === null) {
                var username = prompt(dictionary.usernamePrompt);
                this.setUsername(username);
            }

            this.successJoinProtocol();
        }
        else if (warningSent) {
            var warningBody = this.getWarningBody(echoFromServer);
            var dictionaryKey = dictionary.jsWarningPrefix + warningBody;
            console.warn('warning:' + dictionaryKey);
            alert(dictionary[dictionaryKey]);
        }
    }

    successJoinProtocol() {
        this.roomId = this.joiningRoomId;

        // find name of room that has been joined
        var data = `roomId=${this.roomId}`;
        this.serverComm.sendDataPhpEcho(dictionary.getRoomNameUrl, data, this.successJoinProtocolEnd.bind(this));

        // send join message
        var content = this.username + ' has joined the room';
        var data = `username=${dictionary.userEndProgramName}&content=${content}&roomId=${this.roomId}`;
        this.serverComm.sendDataPhp(dictionary.addMessageUrl, data);
    }

    successJoinProtocolEnd(response) {
        if (this.handleServerError(response) === false) {
            this.roomname = response;

            // make the room-name-shower update really quickly and smoothly
            this.updateTopBar();
        }
    }

    setUsername(username) {
        //if (checkUsername(username)) {
            this.username = username;

            // save username
            localStorage.setItem(dictionary.LSusernameKey, username);
        //}
    }

    setSavedUsername() {
        var savedUsername = localStorage.getItem(dictionary.LSusernameKey);
        if (savedUsername !== null) {
            this.setUsername(savedUsername);
        }
    }

    sendChatMessage() {
        if (this.roomId !== null) {
            var content = messageInputBox.value;

            // ** check content - add in future **

            // send message to server
            var data = `username=${this.username}&content=${content}&roomId=${this.roomId}`;
            this.serverComm.sendDataPhp(dictionary.addMessageUrl, data);

            // clear input box
            messageInputBox.value = '';
        }
    }

    downloadWhiteboardData(callbackFunction, callbackFunctionArg) {
        var data = `roomId=${this.roomId}`;
        this.serverComm.sendDataPhpEcho(dictionary.readWhiteboardDataUrl, data,
        callbackFunction, callbackFunctionArg);
    }

    sendWhiteboardData(whiteboardDataStr, callbackFunction, callbackFunctionArg) {
        var data = `roomId=${this.roomId}&whiteboardData=${whiteboardDataStr}&editMadeBy=${this.username}`;
        this.serverComm.sendDataPhpEcho(dictionary.sendWhiteboardDataUrl, data, callbackFunction, callbackFunctionArg);
    }

    updateTopBar() {
        if (this.isInRoom()) {
            var roomDataText = `You are in ${this.roomname} (room id: ${this.roomId})`;
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

    downloadMessagesStr(callbackFunction, callbackFunctionArg) {
        var data = `roomId=${this.roomId}`;
        this.serverComm.sendDataPhpEcho(dictionary.getMessagesUrl, data, callbackFunction, callbackFunctionArg);
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