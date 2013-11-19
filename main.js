/*jslint browser: true*/
var canvas,
    ctx,
    timer,
    timerValue,
    gameInProgress,
    snakes;


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
        ctx.fillStyle = '#113F8C'; // set canvas background color
        ctx.fillRect(0, 0, 400, 400); // now fill the canvas
    }

    window.addEventListener("keypress", doKeyDown, false);
    
    snakes = new Array(3);
    
    initInterface();
}

var start = function () {
    "use strict";
    document.getElementById("playerSelect").style.display="none";
    document.getElementById("gameInterface").style.display="inline";
    
    snakes = createSnakes(ctx);
    initPoints(snakes);

    refreshPoints(snakes);

    timer = window.setInterval(function () {
        draw();
    }, timerValue);


    start = function () {

        canvas.width = canvas.width;
        ctx.clearRect(0, 0, 400, 400);
        ctx.fillStyle = '#113F8C'; // set canvas background color
        ctx.fillRect(0, 0, 400, 400); // now fill the canvas

        gameInProgress = true;
        restartSnakes();

        window.clearInterval(timer);
        timer = window.setInterval(function () {
            draw();
        }, timerValue);

    };

};

    function draw() {
        var alive = 0;
        var survivor = -1;
        var i;
        for (i = 0; i < snakes.length;
            (i++)) {
            var snake = snakes[i];
            if (snake.redraw) {
                snakes[i].draw();
                alive++;
                survivor = i;
            }
        }
        if (snakes.length > 1 && alive == 1) {
            snakes[survivor].win();
            refreshPoints(snakes);
            gameInProgress = false;
        }
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
    
    function restartGameIfOver(){
        if(!gameInProgress){
            start();
        }
    }