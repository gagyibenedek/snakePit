function Snake(currentX, currentY, direction, color, front, left, back, right, ctx) {
    "use strict";

    this.currentX = currentX;
    this.currentY = currentY;
    this.direction = direction;
    this.color = color;
    this.front = front;
    this.left = left;
    this.back = back;
    this.right = right;
    this.ctx = ctx;
}

Snake.prototype.getX = function () {
    "use strict";
    return this.currentX;
};

Snake.prototype.getY = function () {
    "use strict";
    return this.currentY;
};

Snake.prototype.draw = function () {
    "use strict";

    var cropX,
        cropY,
        cropSizeX,
        cropSizeY,
        xTar = this.currentX,
        whatColor = this.ctx.getImageData(cropX, cropY, cropSizeX, cropSizeY),
        i,
        yTar = this.currentY;

    if (this.direction === this.left) {
        xTar -= 5;

        cropX = xTar + 2;
        cropY = yTar - 2;
        cropSizeX = -4;
        cropSizeY = 4;
    } else if (this.direction === this.front) {
        yTar -= 5;

        cropX = xTar + 2;
        cropY = yTar - 2;
        cropSizeX = -4;
        cropSizeY = 4;
    } else if (this.direction === this.right) {
        xTar += 5;

        cropX = xTar + 2;
        cropY = yTar - 2;
        cropSizeX = -4;
        cropSizeY = 4;
    } else if (this.direction === this.back) {
        yTar += 5;

        cropX = xTar + 2;
        cropY = yTar - 2;
        cropSizeX = -4;
        cropSizeY = 4;
    }

    for (i = 0; i < 4 * 4 * 4; i += 4) {

        if (whatColor.data[i] !== 255 || whatColor.data[i + 1] !== 255 || whatColor.data[i + 2] !== 255) {
            //alert("collision!");
            //stop();
            break;
        }

    }


    this.ctx.beginPath();
    this.ctx.moveTo(this.currentX, this.currentY);
    this.ctx.lineTo(xTar, yTar);
    this.ctx.lineWidth = 5;
    this.ctx.closePath();
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();

    this.currentX = xTar;
    this.currentY = yTar;

};