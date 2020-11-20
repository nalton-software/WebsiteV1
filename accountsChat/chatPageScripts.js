// requires utilScripts.js, serverCommScripts.js and globalConstants.js
const chatStatusBarId       = 'chatStatusBar';
const messageInputBarId     = 'messageInputField';
const innermostChatDivId    = 'content';
const chatAreaId            = 'chatArea';
const chatAreaHolderId      = 'chatAreaHolder';
const toggleAllMsgBtnId     = 'toggleAllMsgBtn';

const downloadInterval  = 1000;
var cachedMessages      = '';
var isFirstUpdate       = true;
var showingAllMessages  = false;
var prevScroll          = 0;

const chatStatusBarValues = {
    sending : 'sending',
    messageSent : 'message sent'
}

const msgDrawLimit = 50; // arbitrary number to stop too many things being drawn

var cachedMessages = ''; // use for deciding whether to redraw or not

function scrollToBottom(elemId) {
    // fID 30
    var elem = getElemById(elemId);
    elem.scrollTop = elem.scrollHeight;
}

function isScrolledToBottom(elemId) {
    // fID 31
    var elem = getElemById(elemId);
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
    getElemById(messageInputBarId).value = '';
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

    getElemById(chatStatusBarId).innerText = text;
    getElemById(chatStatusBarId).style.visibility = 'visible'; // make it visible as it starts hidden
}

function sendJoinMessage() {
    // fID 24
    // read username and password that were saved just before, in login page
    var username = sessionStorage.getItem('ACloggedInUsername');
    var password = sessionStorage.getItem('ACloggedInPassword');

    // if username is saved how it should be
    if (username != null) {
        // send message
        var data = `username=${username}&password=${password}`;
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

    if (showingAllMessages) {
        // send a request to server to get messages
        var data = `username=${username}&password=${password}`;
        sendDataPhpEcho(phpUrls.getAllMessages, data, drawMessages);
    }
    else {
        // send a request to server to get messages
        var data = `username=${username}&password=${password}&msgAmount=${msgDrawLimit}`;
        sendDataPhpEcho(phpUrls.getMessages, data, drawMessages);
    }
}

function drawMessages(serverResponse) {
    // fID 28

    // check for erorrs and warnings in the response
    var serverErrorFound = findServerError(serverResponse);
    var serverWarningFound = findServerWarning(serverResponse);

    // if no errors and no warnings, draw
    if (! serverErrorFound && ! serverWarningFound) {

        // take note of what the scroll was before drawing
        var prevScroll = getElemById(chatAreaId).scrollTop;
        var wasScrolledToBottom = isScrolledToBottom(chatAreaId);

        // if new message(s), continue drawing
        var isNewMessage = serverResponse !== cachedMessages;
        if (isNewMessage) {
            // parse response
            var messageList = JSON.parse(serverResponse);

            // format messages and put in display div
            var stringToWrite = formatMessages(messageList);
            getElemById(innermostChatDivId).innerHTML = stringToWrite;
            
            // set up cache vars for next download
            isFirstUpdate = false;
            cachedMessages = serverResponse;

            // if the last message was not sent by the logged in user, make a tone
            // (don't make it on the first update as autoplay is blocked without a user gesture first,
            // and the first update will be the join message)
            if (messageList.length >= 2) {
                var lastMessage = messageList[messageList.length - 1];
                if (lastMessage.sender != sessionStorage.ACloggedInUsername &&
                    ! isFirstUpdate) {
                    makeNewMessageTone();
                }
            }
            else makeNewMessageTone();
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
        scrollToBottom(chatAreaId);
    }
    else if (wasScrolledToBottom && isNewMessage) {
        scrollToBottom(chatAreaId);
    }
    else {
        getElemById(chatAreaId).scrollTop = prevScroll; // don't change scroll
    }
}

function safenHtmlTags(str) {
    // fID 40

    // make it so that the HTML tags in a string won't be elements
    // if they are inserted into an element by innerHTML
    // this works by inserting an invisible character between the < at the start of the tag
    // this won't affect a < that is just in text normally
    str = replaceAll(str, '<', '<\u200C');
    return str
}

function formatMessages(messageList) {
    // fID 33

    // create empty string to put all messages into
    var stringToWrite = '';

    // format each message and put together:
    for (var msgIdx = 0; msgIdx < messageList.length; msgIdx ++) {
        var currMessage = messageList[msgIdx];
        var safeSender = safenHtmlTags(currMessage.sender);
        var safeContent = safenHtmlTags(currMessage.content);
        var currLine = `<span class="messageSender">${safeSender}</span><br>` + 
            `<span class="messageContent">${safeContent}</span><br><br>`;
        console.log(currLine);
        stringToWrite += currLine;
    }

    return stringToWrite;
}

function makeNewMessageTone() {
    // fID 34
    var a = new Audio(notificationToneUrl);
    a.play();
}

function logout() {
    // fID 36
    // clear sessionStorage and go to login page
    sessionStorage.ACloggedInUsername = '';
    sessionStorage.ACloggedInPassword = '';
    goToLoginPage();
}

function resizeMessageInputBar() {
    // fID 39
    var displayDivWidth = getElemById(chatAreaId).clientWidth;
    getElemById(messageInputBarId).style.width = displayDivWidth * 0.8 + 'px';
}

function toggleShowAllMessages() {
    // fID 40
    showingAllMessages = ! showingAllMessages;
    var button = getElemById(toggleAllMsgBtnId);
    if (! showingAllMessages) {
        button.innerText = 'Show full chat history'
    }
}

// set up enter key to send
getElemById(messageInputBarId).addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendMessage();
    }
});

setInterval(downloadMessages, downloadInterval);

// add a tag thing to session storage so if the person presses back (as in the browser back button),
// then the auto-login won't try to log in
sessionStorage.setItem('ACchatPageFlag', true);