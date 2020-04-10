class Spam {
    constructor(name, char, speedMs) {
        this.name = name;
        this.char = char;
        this.speed = speedMs;
        this.count = 0;
        this.continue();
    }
    makeStr() {
        var str = '';
        for (var i = 0; i < this.count; i++) {
            str += this.char;
        }
        return str;
    }
    continue() {
        if (this.count >= 0) {
            this.count++;
            var str = this.makeStr();
            sendMessage(this.name, str);
            setTimeout(this.continue.bind(this), this.speed);
        }
    }
    stop() {
        this.count = -1;
    }
}



