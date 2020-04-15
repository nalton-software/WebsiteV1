const dictionary = {
    userEndProgramName : 'p5Whiteboard',
    chatSystemName : 'p5Whiteboard-Setup',

    LSusernameKey : '!savedUsername',

    addMessageUrl : 'scripts/addMessage.php',
    createRoomUrl : 'scripts/createRoom.php',
    joinRoomUrl : 'scripts/joinRoom.php',
    getRoomNameUrl : 'scripts/getRoomName.php',
    getMessagesUrl : 'scripts/getMessages.php',

    messageContentPrompt : 'Enter message content:',
    usernamePrompt : 'Enter a username to continue:',
    notInRoomText : 'You are not currently in a room',

    serverErrorPrefix : '**',
    jsErrorPrefix : 'ERROR',
    ERRORroomFileEmpty : 'The data file seems to be empty!',
    ERRORroomNotFound : 'I can\'t find that room!',

    serverWarningPrefix : '||',
    jsWarningPrefix : 'WARN',
    WARNnonExistentRoom : 'The room id that you typed in doesn\'t lead to a valid room',
    WARNbadUsername : 'Your username is not ok',
    WARNroomName : 'That room name is not ok',
    WARNroomIdDuplicated : 'That room ID already exists',
    WARNnotInRoom : 'You are not in a room currently'
};
// get is a bit weird but it works like the below code looks like it should work (but this doesn't work)
// foo = {a : 1, b : 2, c : this.a + this.b}