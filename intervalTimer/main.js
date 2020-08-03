const intervalTable = getElemById('intervalTable');

const beepingNoiseUrl = 'beepingNoise.wav';

var timers = [];

function addTimer() {
    var length = Number(prompt('Enter length of timer (in minutes)'));
    var timer = new Timer(minutesToMs(length), makeBeepingNoise, this.timers[0]);
    var previousTimer = this.timers[this.timers.length - 1];
    if (previousTimer !== undefined) {
        previousTimer.nextTimer = timer;
    }
    else {
        timer.nextTimer = timer;
    }
    timers.push(timer);
}

function clearTimers() {
    timers = [];
}

function start() {
    timers[0].start();
}

function makeBeepingNoise() {
    var a = new Audio(beepingNoiseUrl);
    a.play();
}