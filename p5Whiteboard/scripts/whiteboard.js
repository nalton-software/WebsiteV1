class Whiteboard {
    // contains all of the access routines for shapes because they can't have prototypes/methods
    // it needs p5 settings: ellipseMode(CENTER), colorMode(RGB, 100)
    constructor() {
        this.maxPointDist = 10;
        this.eraserRadius = 20;

        this.shapeList = [];
        this.currentShape = null; // this is okay because penDownLastFrame is false, so update won't try to append
        this.penDownLastFrame = false; // used for deciding whether to start a new shape

        this.penColor = [100, 0, 0];
        this.penSize = 3;
        this.currentShape = null;
        this.eraserOn = false;
    }

    update(color, penSize, eraserOn) {
        this.penColor = color;
        this.penSize = penSize;
        this.eraserOn = eraserOn;
        
        if (mouseIsPressed && ! this.eraserOn && mouseOverCanvas()) {
            if (this.penDownLastFrame) {
                this.addPoint(mouseX, mouseY, this.currentShape);
            }
            else {
                this.currentShape = new Shape(mouseX, mouseY, this.penSize, this.penColor);
                this.shapeList.push(this.currentShape);
            }
            this.penDownLastFrame = true;
        }
        else if (mouseIsPressed && this.eraserOn && mouseOverCanvas()) {
            this.eraseClosePoints(mouseX, mouseY);
            this.penDownLastFrame = false;
        }
        else {
            this.penDownLastFrame = false;
        }

        if (mouseOverCanvas()) {
            disableScroll();
        }
        else {
            enableScroll();
        }

        this.display();
    }

    display() {
        for (var i = 0; i < this.shapeList.length; i ++) {
            this.draw(this.shapeList[i]);
        }

        if (this.eraserOn) { // draw circle around eraser
            noFill();
            stroke(0);
            strokeWeight(1);
            ellipse(mouseX, mouseY, this.eraserRadius, this.eraserRadius)
        }
        else { // draw little dot of colour for pen 
            setStroke(this.penColor);
            strokeWeight(this.penSize);
            point(mouseX, mouseY);
        }
    }

    draw(shape) {
        setStroke(shape.color);
        strokeWeight(shape.penSize);
        if (shape.points.length > 1) {
            for (var i = 0; i < shape.points.length - 1; i ++) {
                // take 1 because it draws a line, not a single point, and so uses 2 points per loop
                setStroke(shape.color);
                strokeWeight(shape.penSize);
                var currentPoint = shape.points[i];
                var nextPoint = shape.points[i + 1];
                line(currentPoint.x, currentPoint.y, nextPoint.x, nextPoint.y);
            }
        }
        else if (shape.points.length == 1) {
            point(shape.points[0].x, shape.points[0].y);
        }
    }

    addPoint(x, y, shape) {
        var currentPoint = createVector(x, y);
        var prevPoint = shape.points[shape.points.length - 1];
        var dist = prevPoint.dist(currentPoint);
        if (dist > this.maxPointDist) {
            // find points needed to fill space
            var pointsNeeded = Math.floor(prevPoint.dist(currentPoint) / this.maxPointDist) + 1;
            var distVector = p5.Vector.sub(currentPoint, prevPoint);
            var incrementAmount = p5.Vector.div(distVector, pointsNeeded);
            
            for (var i = 1; i < pointsNeeded; i ++) {
                var offset = p5.Vector.mult(incrementAmount, i);
                var pointPos = p5.Vector.add(prevPoint, offset)
                shape.points.push(pointPos);
            }
        }
        shape.points.push(currentPoint);
    }
    
    removePoint(pointIndex, shape) {
        if (pointIndex != 0) { // if the point is not the first in the shape
            var part1 = shape.points.slice(0, pointIndex);
            var newShape1 = new Shape(part1[0].x, part1[0].y, shape.penSize, shape.color);
            newShape1.points = part1;
        }
        else {
            // create useless invisible shape - avoid errors from having undefined points etc
            var newShape1 = new Shape(0, 0, 0, 0);
            newShape1.points = [];
        }

        if (pointIndex != shape.points.length - 1) { // if the point is not that last in the shape
            var part2 = shape.points.slice(pointIndex + 1);
            var newShape2 = new Shape(part2[0].x, part2[0].y, shape.penSize, shape.color);
            newShape2.points = part2;
        }
        else {
            // create useless invisible shape - avoid errors from having undefined points etc
            var newShape2 = new Shape(0, 0, 0, 0);
            newShape2.points = [];
        }

        return [newShape1, newShape2];
    }

    // go through all of the points in shapeList and erase ones within this.eraserRadius
    // this uses a copy of shapelist so that it doesn't change the real one until all of the close points have been changed
    // if it didn't, the main loop would go on forever as the shapeList would keep increasing length
    eraseClosePoints(x, y) {
        var erasePoint = createVector(x, y);
        var newShapeList = [];

        for (var shapeNum = 0; shapeNum < this.shapeList.length; shapeNum ++) {
            var currentShape = this.shapeList[shapeNum];
            var deletePointIndex = null;
            for (var pointNum = 0; pointNum < currentShape.points.length; pointNum ++) {
                var currentPoint = currentShape.points[pointNum];
                var dist = currentPoint.dist(erasePoint);
                
                if (dist < this.eraserRadius) {
                    deletePointIndex = pointNum;
                    break;
                }
            }

            if (deletePointIndex != null) {
                var newShapes = this.removePoint(deletePointIndex, currentShape);
                newShapeList.push(...newShapes); // push both of the new shapes using spread operator
            }
            else {
                newShapeList.push(currentShape);
            }
        }
        this.shapeList = newShapeList;
    }

    clear() {
        this.shapeList = [];
    }
}