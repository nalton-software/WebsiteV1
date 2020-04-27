// requires utilScripts.js, serverCommScripts.js and globalConstants.js
const chatStatusBarId = 'chatStatusBar';
const messageInputBarId = 'messageInputField';
const displayDivId = 'chatArea';

const downloadInterval = 1000;
var cachedMessages = '';
var isFirstUpdate = true;
var prevScroll = 0;

// for 'beep' on new message
const newMessageNoise1 = {pitch: 610, durationInSeconds: 0.17, waveForm: 'square'};
const newMessageNoise2 = {pitch: 590, durationInSeconds: 0.23, waveForm: 'square'};
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const chatStatusBarValues = {
    sending : 'sending',
    messageSent : 'message sent'
}

const messageDrawLimit = 50; // arbitrary number to stop too many things being drawn

var cachedMessages = ''; // use for deciding whether to redraw or not

function scrollToBottom(elemId) {
    // fID 30
    var elem = getElemIdById(elemId);
    elem.scrollTop = elem.scrollHeight;
}

function isScrolledToBottom(elemId) {
    // fID 31
    var elem = getElemIdById(elemId);
    if ((elem.scrollHeight - elem.offsetHeight) - elem.scrollTop < 5) { // if within 5px of bottom
        return true;
    }
    else {
        return false;
    }
}

function sendMessage() {
    // fID 12
    // read message input field
    var content = readInputBar(messageInputBarId);

    // read username and password from session storage, where it was saved by login page
    var username = sessionStorage.getItem('ACloggedInUsername');
    var password = sessionStorage.getItem('ACloggedInPassword');

    // combine message/username/password and send
    var data = `content=${content}&username=${username}&password=${password}`;
    sendDataPhpEcho(phpUrls.addMessage, data, useSendMessageResponse);

    // make little text say 'sending'
    setChatStatusBar(chatStatusBarValues.sending);
    
    // clear input bar
    getElemIdById(messageInputBarId).value = '';
}

function useSendMessageResponse(serverResponse) {
    // fID 14

    // check for erorrs and warnings in the response
    var serverErrorFound = findServerError(serverResponse);
    var serverWarningFound = findServerWarning(serverResponse);

    if (! serverErrorFound && ! serverWarningFound) {
        // set little text to 'sent'
        setChatStatusBar(chatStatusBarValues.messageSent);
    }

    // handle errors and warnings
    if (serverErrorFound) {
        handleError(serverResponse);
    }
    if (serverWarningFound) {
        handleWarning(serverResponse);
    }
}

function setChatStatusBar(text) {
    // fID 23
    //  get the status bar and set its contents
    getElemIdById(chatStatusBarId).innerText = text;
}

function sendJoinMessage() {
    // fID 24
    // read username that was saved just before, in login page
    var username = sessionStorage.getItem('ACloggedInUsername');
    // if username is saved how it should be
    if (username != null) {
        // send message
        var data = `username=${username}`;
        sendDataPhpEcho(phpUrls.addJoinMessage, data, useJoinMessageReponse);
    }
}

function useJoinMessageReponse(serverResponse) {
    // fID 25
    // this function just checks for no errors. It's not even strictly neccesary
    
    // check for erorrs and warnings in the response
    var serverErrorFound = findServerError(serverResponse);
    var serverWarningFound = findServerWarning(serverResponse);
    
    // handle errors and warnings
    if (serverErrorFound) {
        handleError(serverResponse);
    }
    if (serverWarningFound) {
        handleWarning(serverResponse);
    }
}

function downloadMessages() {
    // fID 26

    // read username and password from sessionStorage
    var username = sessionStorage.getItem('ACloggedInUsername');
    var password = sessionStorage.getItem('ACloggedInPassword');

    // send a request to server to get messages
    var data = `username=${username}&password=${password}`;
    sendDataPhpEcho(phpUrls.getMessages, data, drawMessages);
}

function drawMessages(serverResponse) {
    // fID 28

    // check for erorrs and warnings in the response
    var serverErrorFound = findServerError(serverResponse);
    var serverWarningFound = findServerWarning(serverResponse);

    // if no errors and no warnings, draw
    if (! serverErrorFound && ! serverWarningFound) {

        // take note of what the scroll was before drawing
        var prevScroll = getElemIdById(displayDivId).scrollTop;
        var wasScrolledToBottom = isScrolledToBottom(displayDivId);

        // if new message(s), continue drawing
        var isNewMessage = serverResponse !== cachedMessages
        if (isNewMessage) {
            // parse response
            var messageList = JSON.parse(serverResponse);

            // format messages and put in display div
            var stringToWrite = formatMessages(messageList);
            getElemIdById(displayDivId).innerText = stringToWrite;
            // set up cache vars for next download
            isFirstUpdate = false;
            cachedMessages = serverResponse;

            // if the last message was not sent by the logged in user, make a tone
            var lastMessage = messageList[messageList.length - 1];
            if (lastMessage.sender != sessionStorage.ACloggedInUsername) {
                makeNewMessageTone();
            }
        } // end if (new message)
        // else do nothing - keep already-drawn messages

        // scroll to the right location depending on new message and prev scroll pos
        autoScroll(isNewMessage, prevScroll, wasScrolledToBottom);

    } // end if (no errors and no warnings)

    // handle errors and warnings
    if (serverErrorFound) {
        handleError(serverResponse);
    }
    if (serverWarningFound) {
        handleWarning(serverResponse);
    }
}

function autoScroll(isNewMessage, prevScroll, wasScrolledToBottom) {
    // fID 32
    if (isFirstUpdate) {
        scrollToBottom(displayDivId);
    }
    else if (wasScrolledToBottom && isNewMessage) {
        scrollToBottom(displayDivId);
    }
    else {
        getElemIdById(displayDivId).scrollTop = prevScroll; // don't change scroll
    }
}

function formatMessages(messageList) {
    // fID 33

    // if the list is too long, clip it
    if (messageList.length > messageDrawLimit) {
        var lengthToChop = messageList.length - messageDrawLimit;
        messageList = messageList.slice(lengthToChop);
    }

    // create empty string to put all messages into
    var stringToWrite = '';

    // format each message and put together:
    for (var msgIdx = 0; msgIdx < messageList.length; msgIdx ++) {
        var currMessage = messageList[msgIdx];
        var currLine = currMessage.sender + ' : ' + currMessage.content + '\n';
        stringToWrite += currLine;
    }
    stringToWrite += '\n';

    return stringToWrite;
}

function makeNewMessageTone() {
    // fID 34
    playNote(newMessageNoise1.pitch, newMessageNoise1.durationInSeconds, newMessageNoise1.waveForm);
    setTimeout(function() {
        playNote(newMessageNoise2.pitch, newMessageNoise2.durationInSeconds, newMessageNoise2.waveForm);
    }, newMessageNoise1.durationInSeconds * 1000);
}

function playNote(pitch, durationInSeconds, waveFormOptional) {
    // fID 35
    if (waveFormOptional == undefined) {
        waveForm = 'sine'
    }
    else {
        waveForm = waveFormOptional;
    }
    // create Oscillator node
    var oscillator = audioCtx.createOscillator();

    oscillator.type = waveForm;
    oscillator.frequency.value = pitch; // value in hertz
    oscillator.connect(audioCtx.destination);
    oscillator.start(0);
    oscillator.stop(audioCtx.currentTime + durationInSeconds);
}

function logout() {
    // fID 36
    // clear sessionStorage and go to login page
    sessionStorage.ACloggedInUsername = '';  
    sessionStorage.ACloggedInPassword = '';
    goToLoginPage();
}

// set up enter key to send
getElemIdById(messageInputBarId).addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendMessage();
    }
});

setInterval(downloadMessages, downloadInterval);
sendJoinMessage();