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
	
	// directions: front, left, back, right
    snakes.push(new Snake(50, 50, 115, "black", 119, 100, 115, 97, ctx, stop()));
	if(players > 1){
		snakes.push(new Snake(250, 250, 105, "olive", 105, 108, 107, 106, ctx, stop()));
	}
	if(players > 2){
		snakes.push(new Snake(50, 250, 51, "pink", 53, 51, 50, 49, ctx, stop()));
	}

    timer = window.setInterval(function () {
            draw()
        }, timerValue);

}

function draw(){
	for (i = 0; i < snakes.length;
        (i++)) {
        snakes[i].draw();
    }
}

function stop() {
    "use strict";

	window.clearInterval(timer);
    init();
}