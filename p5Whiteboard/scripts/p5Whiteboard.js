new p5();

const width = 600;
const height = 400;
const fr = 30;
const penSizeSlider = document.getElementById('penSize');
const eraserCheckbox = document.getElementById('eraserCheckbox');

const minPenSize = 1;
const maxPenSize = 50;

const whiteboard = new Whiteboard();
var bgColor = 100;

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
    whiteboard.clear();
}

function sendMessage() {
    chatArea.sendMessage();
}

const chatArea = new ChatArea('chatArea');

function draw() { 
    background(bgColor);
    //drawBorders();

    whiteboard.update(getColor(), getPenSize(), getEraserOn());
}