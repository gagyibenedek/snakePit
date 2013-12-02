function Snake(name, currentX, currentY, direction, color, right, left, ctx, id) {
    "use strict";

    this.name = name;
    this.currentX = currentX;
    this.currentY = currentY;
    this.direction = direction;
    this.color = color;
    this.left = left;
    this.right = right;
    this.ctx = ctx;
    this.id = id;

    this.point = 100;
    this.redraw = true;
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
        whatColor,
        i,
        yTar = this.currentY;

    if (this.direction === 3) { // right
        xTar -= 5;

        cropX = xTar + 2;
        cropY = yTar - 2;
        cropSizeX = -4;
        cropSizeY = 4;
    } else if (this.direction === 0) { // up
        yTar -= 5;

        cropX = xTar + 2;
        cropY = yTar - 2;
        cropSizeX = -4;
        cropSizeY = 4;
    } else if (this.direction === 1) { //left
        xTar += 5;

        cropX = xTar + 2;
        cropY = yTar - 2;
        cropSizeX = -4;
        cropSizeY = 4;
    } else if (this.direction === 2) { // down
        yTar += 5;

        cropX = xTar + 2;
        cropY = yTar - 2;
        cropSizeX = -4;
        cropSizeY = 4;
    }

    whatColor = this.ctx.getImageData(cropX, cropY, cropSizeX, cropSizeY);

    for (i = 0; i < 4 * 4 * 4; i += 4) {

        if (whatColor.data[i] !== 17 || whatColor.data[i + 1] !== 63 || whatColor.data[i + 2] !== 140) {
            //alert("collision!" + this.color +" died :P");
            this.redraw = false;
            this.point -= 10;
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

Snake.prototype.win = function () {
    this.point += 5;
    this.redraw = false;
};

Snake.prototype.setDirection = function (keyCode) {
    "use strict";

    if(this.right === keyCode){
         this.direction++;
    } else if(this.left === keyCode){
          if(this.direction > 0){
               this.direction--;
          } else {
               this.direction = 3;
          }
    }
    this.direction = Math.abs(this.direction) % 4;
    console.log("DIRECTION " + this.name + ": " + this.direction);
};

Snake.prototype.restart = function (currentX, currentY) {
    "use strict";

    this.currentX = currentX;
    this.currentY = currentY;
    this.redraw = true;
};