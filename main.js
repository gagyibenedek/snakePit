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

var start = function () {
    "use strict";
    var date = new Date();
    document.getElementById("controlButton").firstChild.data = "Next round";

    snakes = [];

    var players = document.getElementById('playerNr').value;

    var scores = document.getElementById("scores");


    // directions: front, left, back, right
    snakes.push(new Snake(generateCoordinate(20), generateCoordinate(20), 115, "black", 119, 100, 115, 97, ctx, stop(), 0));
    if (players > 1) {
        snakes.push(new Snake(generateCoordinate(300), generateCoordinate(300), 105, "olive", 105, 108, 107, 106, ctx, stop(), 1));
    }
    if (players > 2) {
        snakes.push(new Snake(generateCoordinate(20), generateCoordinate(300), 51, "pink", 53, 51, 50, 49, ctx, stop(), 2));
    }

    refreshPoints();

    timer = window.setInterval(function () {
        draw()
    }, timerValue);


    start = function () {

        canvas.width = canvas.width;
        ctx.clearRect(0, 0, 400, 400);
        ctx.fillStyle = '#FFFFFF'; // set canvas background color
        ctx.fillRect(0, 0, 400, 400); // now fill the canvas

        restartSnakes();

        window.clearInterval(timer);
        timer = window.setInterval(function () {
            draw()
        }, timerValue);

    };

}

    function refreshPoints() {
        for (var i = 0; i < snakes.length; i++) {
            document.getElementById("player" + i).firstChild.data = snakes[i].point;
        }
    }

    function draw() {
        var alive = 0;
        var survivor = -1;
        for (i = 0; i < snakes.length;
            (i++)) {
            var snake = snakes[i];
            if (snake.redraw) {
                snakes[i].draw();
                alive++;
                survivor = i;
            }
        }
        var players = document.getElementById('playerNr').value;
        if (players > 1 && alive == 1) {
            snakes[survivor].win();
            refreshPoints();
        }
    }

    function generateCoordinate(base) {
        return Math.floor(Math.random() * 101 + base);
    }

    function restartSnakes() {
        if (snakes.length > 0) {
            snakes[0].restart(generateCoordinate(20), generateCoordinate(20));
        }
        if (snakes.length > 1) {
            snakes[1].restart(generateCoordinate(300), generateCoordinate(300));
        }
        if (snakes.length > 2) {
            snakes[2].restart(generateCoordinate(20), generateCoordinate(300));
        }
    }