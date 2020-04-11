const dictionary = {
    userEndProgramName : 'p5Whiteboard',
    chatSystemName : 'p5Whiteboard-Setup',

    roomDataUrlForPhp : '../!roomdata.txt',
    txtReaderUrl : 'scripts/readTxt.php',
    addMessageUrl : 'scripts/addMessage.php',
    get readTxtUrlQuery() {return this.txtReaderUrl + '?file=' + this.roomDataUrlForPhp},

    messageContentPrompt : 'Enter message content:',
    usernamePrompt : 'Enter a username to continue:',

    nonExistentRoomWarning : 'The room id that you typed in doesn\'t lead to a valid room',
    badUsernameWarning : 'Your username is not ok',
    roomNameWarning : 'That room name is not ok',
    notInRoomWarning : 'You are not in a room currently'
};

// get is a bit weird but it works like this looks like it should work (but this doesn't work)
// foo = {a : 1, b : 2, c : this.a + this.b}