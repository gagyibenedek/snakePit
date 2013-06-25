function Snake(currentX, currentY, direction, color, front, left, back, right ctx){

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

Snake.prototype.getX = function(){
	return this.currentX;
}

Snake.prototype.getY = function(){
	return this.currentY;
}

Snake.prototype.draw = function(){

	var cropX;
	var cropY;
	var cropSizeX;
	var cropSizeY;
	var xTar = this.currentX;
	var yTar = this.currentY;

	if(direction == this.left){
		xTar -= 5;
		
		cropX = xTar + 2;
		cropY = yTar - 2;
		cropSizeX = -4;
		cropSizeY = 4;
	} else  if(direction == this.front){
		yTar -= 5;
		
		cropX = xTar + 2;
		cropY = yTar - 2;
		cropSizeX = - 4;
		cropSizeY = 4;
	} else if(direction == this.right){
		xTar += 5;
		
		cropX = xTar + 2;
		cropY = yTar - 2;
		cropSizeX = - 4;
		cropSizeY = 4;
	} else  if(direction == this.back){
		yTar += 5; 
		
		cropX = xTar + 2;
		cropY = yTar - 2;
		cropSizeX = -4;
		cropSizeY = 4;
	}
	

	var whatColor = ctx.getImageData(cropX,cropY,cropSizeX,cropSizeY);
	
		for (var i = 0; i < 4 * 4 * 4; i += 4) {
						  
			if (whatColor.data[i] != 255 || whatColor.data[i+1] != 255 
				|| whatColor.data[i+2] != 255) {
				alert("collision!");
				stop();
				break;
			}
			  
		}
	

	ctx.beginPath();
	ctx.moveTo(currentX,currentY);
	ctx.lineTo(xTar,yTar);
	ctx.lineWidth = 5;
	ctx.closePath();
	ctx.strokeStyle = this.color;
	ctx.stroke();
	
	this.currentX = xTar;
	this.currentY = yTar;

}
