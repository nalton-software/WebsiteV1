new p5();

const width = 600;
const height = 400;
const fr = 30;
const penSizeSlider = document.getElementById('penSize');
const eraserCheckbox = document.getElementById('eraserCheckbox');

const roomDataUrlForPhp = '../!roomdata.txt'; // these two are like this because I use fetch AND php call
const roomDataUrlForHTML = '!roomdata.txt';
const txtEditorUrl = 'scripts/editTxt.php';
const txtClearerUrl = 'scripts/clearTxt.php';
const txtReaderUrl = 'scripts/readTxt.php';
const addMessageUrl = 'scripts/addMessage.php';

const txtReaderUrlQuery = txtReaderUrl + '?file=' + roomDataUrlForPhp;

const minPenSize = 1;
const maxPenSize = 50;
const bgColor = 100;

const whiteboard = new Whiteboard();
const serverCommsManager = new ServerCommsManager('roomDataShower');
const chatDrawer = new ChatDrawer('chatArea');

const SCMUpdateFrequency = 2000;
const chatUpdateFrequency = 1000; // in ms

function setup() {
    canvas = createCanvas(width, height);
    canvas.parent('canvas');
    frameRate(fr);
    colorMode(RGB, 100);
    ellipseMode(RADIUS);
}

function setStroke(colorArray) {
    // colorArray is [r, g, b]
    stroke(colorArray[0], colorArray[1], colorArray[2]);
}

function mouseOverCanvas() {
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
        return false;
    }
    else {
        return true;
    }
}

function readSelect(selectsId) {
    var select = document.getElementById(selectsId);
    return select.options[select.selectedIndex];
}

function preventDefault(e) {
    e.preventDefault();
}

function disableScroll() {
    var supportsPassive = false;
    try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; } 
    }));
    }
    catch(e) {}

    var wheelOpt = supportsPassive ? { passive: false } : false;
    window.addEventListener('touchmove', preventDefault, wheelOpt);
} 
  
function enableScroll() {
    var supportsPassive = false;
    try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; } 
    }));
    }
    catch(e) {}
    var wheelOpt = supportsPassive ? { passive: false } : false;
    window.removeEventListener('touchmove', preventDefault, wheelOpt); 
}

function getColor() {
    var colorStr = readSelect('color').value;
    return eval(colorStr);
}

function getPenSize() {
    var origValue = penSizeSlider.value;
    var newValue = map(origValue, 0, 100, minPenSize, maxPenSize);
    return newValue;
}

function getEraserOn() {
    return eraserCheckbox.checked;
}

function clearWhiteboard() {
    if (confirm('Are you sure that you want to clear the whiteboard?')) {
        whiteboard.clear();
    }
}

function sendMessage() {
    serverCommsManager.sendChatMessage();
}

function joinRoom() {
    var joiningRoomId = prompt('Enter room id:');
    serverCommsManager.joinRoom(joiningRoomId);
}

function createRoom() {
    serverCommsManager.createEmptyRoom();
}

function updateChat() {
    if (serverCommsManager.isInRoom()) {
        serverCommsManager.downloadMessagesStr(function(messagesStr) {
            chatDrawer.displayMessages(JSON.parse(messagesStr));
        });
    }
}

function updateSCM() {
    serverCommsManager.updateTopBar();
}

function onStartFunctions() {
    setInterval(updateSCM, SCMUpdateFrequency)
    setInterval(updateChat, chatUpdateFrequency);

    updateSCM();
}

function draw() { 
    background(bgColor);
    //drawBorders();

    whiteboard.update(getColor(), getPenSize(), getEraserOn());
}

onStartFunctions();