class Shape {
    constructor(firstPointX, firstPointY, penSize, colorArray) {
        this.points = [];
        this.points.push(new SVector(firstPointX, firstPointY));
        this.penSize = penSize;
        this.color = colorArray;
    }
}

class SVector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(otherVector) {
        this.x += otherVector.x;
        this.y += otherVector.y;
    }

    sub(otherVector) {
        this.x -= otherVector.x;
        this.y -= otherVector.y;
    }

    mult(amount) {
        this.x *= amount;
        this.y *= amount;
    }

    div(amount) {
        if (amount !== 0) {
            this.x /= amount;
            this.y /= amount;
        }
    }

    dist(otherVector) {
        var x = this.x - otherVector.x;
        var y = this.y - otherVector.y;

        var dist = Math.sqrt(x * x + y * y);
        return dist;
    }

    distSq(otherVector) {
        var x = this.x - otherVector.x;
        var y = this.y - otherVector.y;

        var dist = x * x + y * y;
        return dist;
    }
}

function addVectors(v1, v2) {
    var newVector = new SVector(v1.x + v2.x, v1.y + v2.y);
    return newVector;
}

function subVectors(v1, v2) {
    var newVector = new SVector(v1.x - v2.x, v1.y - v2.y);
    return newVector;
}

function multVector(v1, amount) {
    var newVector = new SVector(v1.x * amount, v1.y * amount);
    return newVector;
}

function divVector(v1, amount) {
    if (amount !== 0) {
        var newVector = new SVector(v1.x / amount, v1.y / amount);
    }
    else {
        var newVector = new SVector(0, 0);
    }
    return newVector;
}

function distBetweenVectors(v1, v2) {
    var x = v1.x - v2.x;
    var y = v1.y - v2.y;
    
    var dist = Math.sqrt(x * x + y * y);
    return dist;
}

function distBetweenVectorsSq(v1, v2) {
    var x = v1.x - v2.x;
    var y = v1.y - v2.y;
    
    var distSq = x * x + y * y;
    return dist;
}