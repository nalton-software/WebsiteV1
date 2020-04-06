class Shape {
    constructor(firstPointX, firstPointY, penSize, colorArray) {
        this.points = [];
        this.points.push(createVector(firstPointX, firstPointY));
        this.penSize = penSize;
        this.color = colorArray;
    }
}