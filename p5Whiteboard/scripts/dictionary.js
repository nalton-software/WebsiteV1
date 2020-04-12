const dictionary = {
    userEndProgramName : 'p5Whiteboard',
    chatSystemName : 'p5Whiteboard-Setup',

    addMessageUrl : 'scripts/addMessage.php',
    createRoomUrl : 'scripts/createRoom.php',
    joinRoomUrl : 'scripts/joinRoom.php',

    messageContentPrompt : 'Enter message content:',
    usernamePrompt : 'Enter a username to continue:',
    notInRoomText : 'You are not currently in a room',

    serverErrorPrefix : '**',
    ERRORroomFileEmpty : 'The data file seems to be empty!',

    nonExistentRoomWarning : 'The room id that you typed in doesn\'t lead to a valid room',
    badUsernameWarning : 'Your username is not ok',
    roomNameWarning : 'That room name is not ok',
    notInRoomWarning : 'You are not in a room currently'
};

// get is a bit weird but it works like the below code looks like it should work (but this doesn't work)
// foo = {a : 1, b : 2, c : this.a + this.b}