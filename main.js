/*jslint browser: true*/
/*global draw, Snake, console*/
var xPos,
    yPos,
    xTar,
    yTar,
    canvas,
	ctx,
    timer,
    bonusTimer,
    timerValue,
    snakes,
    direction;


function doKeyDown(e) {
    "use strict";

    var i;
	
	console.log(e.keyCode);
	
    for (i = 0; i < snakes.length;
        (i++)) {
        snakes[i].setDirection(e.keyCode);
    }

    if (e.keyCode === 43 && timerValue > 100) { //+
        window.clearInterval(timer);
        timerValue -= 50;
        timer = window.setInterval(function () {
            draw();
        }, timerValue);
    }

    if (e.keyCode === 45 && timerValue < 1000) { //-
        window.clearInterval(timer);
        timerValue += 50;
        timer = window.setInterval(function () {
            draw();
        }, timerValue);
    }

}

function init() {
    "use strict";
	
	timerValue = 100;

    canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        ctx.fillStyle = '#FFFFFF'; // set canvas background color
        ctx.fillRect(0, 0, 400, 400); // now fill the canvas
    }

    window.addEventListener("keypress", doKeyDown, false);    
}

function start() {
    "use strict";
	
	canvas.width = canvas.width;
	ctx.clearRect(0, 0, 400, 400);
	
	snakes = [];

	var players = document.getElementById('playerNr').value;
	
	var x1rand = Math.floor(Math.random()*101+20);
	var y1rand = Math.floor(Math.random()*101+20);
	var x2rand = Math.floor(Math.random()*101+300);
	var y2rand = Math.floor(Math.random()*101+300);
	
	var scores = document.getElementById("scores");
	
	
	// directions: front, left, back, right
    snakes.push(new Snake(x1rand, y1rand, 115, "black", 119, 100, 115, 97, ctx, stop()));
	if(players > 1){
		snakes.push(new Snake(x2rand, y2rand, 105, "olive", 105, 108, 107, 106, ctx, stop()));
	}
	if(players > 2){
		snakes.push(new Snake(x1rand, y2rand, 51, "pink", 53, 51, 50, 49, ctx, stop()));
	}

    timer = window.setInterval(function () {
            draw()
        }, timerValue);

}

function draw(){
	for (i = 0; i < snakes.length;
        (i++)) {
		var snake = snakes[i];
		if(snake.redraw){
			snakes[i].draw();
		}
    }
}

function stop() {
    "use strict";

	window.clearInterval(timer);
    init();
}