function Snake(currentX, currentY, direction, color, front, left, back, right, ctx,stop) {
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
	
    if (this.direction === this.right) {
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
    } else if (this.direction === this.left) {
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
	
	whatColor = this.ctx.getImageData(cropX, cropY, cropSizeX, cropSizeY);

    for (i = 0; i < 4 * 4 * 4; i += 4) {

        if (whatColor.data[i] !== 255 || whatColor.data[i + 1] !== 255 || whatColor.data[i + 2] !== 255) {
            //alert("collision!" + this.color +" died :P");
			this.redraw = false;
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

Snake.prototype.setDirection = function (keyCode) {
    "use strict";

    if (this.front === keyCode && this.direction !== this.back){
		this.direction = keyCode;
	} else if(this.left === keyCode && this.direction !== this.right){
		this.direction = keyCode;
	}else if(this.back === keyCode && this.direction !== this.front){
		this.direction = keyCode;
	} else if(this.right === keyCode && this.direction !== this.left) {
        this.direction = keyCode;
    }
};