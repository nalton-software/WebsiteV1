class Timer {
    constructor(length, onEnd=()=>{}, nextTimer=null) {
        this.length = length;
        this.onEnd = onEnd;
        this.nextTimer = nextTimer;

        this.remaining = 0;
        this.startTime = 0;
    }

    start() {
        this.startTime = Date.now();
        this.timeout = setTimeout(() => {
            this.onEnd();
            if (this.nextTimer !== null) {
                this.nextTimer.start();
            }
        }, this.length);
    }

    stop() {
        window.clearTimeout(this.timeout);
    }

    pause() {
        if (this.timeout !== undefined) {
            this.remaining -= Date.now() - this.startTime;
            window.clearTimeout(this.timeout);
        }
    }

    resume() {
        this.startTime = Date.now();
        this.timeout = setTimeout(() => {
            this.onEnd();
            if (this.nextTimer !== null) {
                this.nextTimer.start();
            }
        }, this.remaining);
    }
}