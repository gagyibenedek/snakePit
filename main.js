/*jslint browser: true*/
/*global draw, Snake, console*/
var xPos,
    yPos,
    xTar,
    yTar,
    canvas,
    timer,
    bonusTimer,
    timerValue,
    snakes,
    direction;


function doKeyDown(e) {
    "use strict";

    var i;

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

    var ctx;

    canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        ctx.fillStyle = '#FFFFFF'; // set canvas background color
        ctx.fillRect(0, 0, 400, 400); // now fill the canvas
    }

    window.addEventListener("keypress", doKeyDown, false);

    snakes = [];

    snakes.push(new Snake(150, 150, 97, "black", 119, 100, 115, 97, ctx));
}

function start() {
    "use strict";

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
    canvas.width = canvas.width;
    init();
}