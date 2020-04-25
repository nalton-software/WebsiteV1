// requires utilScripts.js, serverCommScripts.js and globalConstants.js
const chatStatusBarId = 'chatStatusBar';
const messageInputBarId = 'messageInputField';
const displayDivId = 'chatArea';

const downloadInterval = 1000;
var cachedMessages = '';

const chatStatusBarValues = {
    sending : 'sending',
    messageSent : 'message sent'
}

const messageDrawLimit = 50; // arbitrary number to stop too many things being drawn

var cachedMessages = ''; // use for deciding whether to redraw or not

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
}

function useSendMessageResponse(serverResponse) {
    // fID 14

    // check for erorrs and warnings in the response
    var serverErrorFound = findServerError(serverResponse);
    var serverWarningFound = findServerWarning(serverResponse);

    if (! serverErrorFound && ! serverWarningFound) {
        // set little text to 'sent'
        setChatStatusBar(chatStatusBarValues.messageSent);
        // clear input bar
        getElemIdById(messageInputBarId).value = '';
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
        // if new messages, continue drawing
        if (serverResponse !== cachedMessages) {
            // parse response
            var fullMessageList = JSON.parse(serverResponse);  
            
            // if the list is too long, clip it
            if (fullMessageList.length > messageDrawLimit) {
                fullMessageList = fullMessageList.slice(messageDrawLimit);
            }

            // create empty string to put all messages into
            var stringToWrite = '';

            // format each message and put together:
            for (var msgIdx = 0; msgIdx < fullMessageList.length; msgIdx ++) {
                var currMessage = fullMessageList[msgIdx];
                var currLine = currMessage.sender + ' : ' + currMessage.content + '\n';
                stringToWrite += currLine;
            }
            // put in display div
            getElemIdById(displayDivId).innerText = stringToWrite;
            cachedMessages = serverResponse;
        }
        // else do nothing - keep already-drawn messages
    }

    // handle errors and warnings
    if (serverErrorFound) {
        handleError(serverResponse);
    }
    if (serverWarningFound) {
        handleWarning(serverResponse);
    }
}

// set up enter key to send
getElemIdById(messageInputBarId).addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendMessage();
    }
});

setInterval(downloadMessages, downloadInterval);