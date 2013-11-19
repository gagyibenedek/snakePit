/*jslint browser: true*/
/*global Snake*/

function initInterface(){
    document.getElementById("p1Color").addEventListener('click', function(e) {
        selectColor(e);
    });   
    document.getElementById("p2Color").addEventListener('click', function(e) {
        selectColor(e);
    }); 
    document.getElementById("p3Color").addEventListener('click', function(e) {
        selectColor(e);
    }); 
}

function initPoints(snakes){
    for(var i=1; i < 4; i++){
        if(snakes[i-1] !== undefined && snakes[i-1] !== null){
            document.getElementById("p" + i + "ScoreName").innerHTML = snakes[i-1].name;
            document.getElementById("p" + i + "Score").style.backgroundColor = snakes[i-1].color;
        } else {
            document.getElementById("p" + i + "Score").style.display = "none";
        }
    }
    
    if(snakes.length == 2){
        document.getElementById("p1Score").className = "scoreBoxForTwo";
        document.getElementById("p2Score").className = "scoreBoxForTwo";
    }
}

function refreshPoints(snakes) {
    for (var i = 0; i < snakes.length; i++) {
        document.getElementById("p" + (i+1) + "ScoreValue").innerHTML = snakes[i].point;
    }
}

function toggleSelecter(playerId) {
    var playerDiv = document.getElementById(playerId);
    if(playerDiv.className === "selecterOff"){
        playerDiv.className="selecterOn";
    } else {
        playerDiv.className="selecterOff";
    }
}

function selectColor(e){
    if(e.target.id.length === 4){
        var children = e.target.parentNode.childNodes;
        for(var i=0; i<children.length; i++) {
            if(children[i].className === "selectedColor"){
                children[i].className = "colorBlock";
                for(var j=1; j < 4; j++){
                    if(j.toString() !== children[i].id.charAt(1)){
                        document.getElementById("p" + j + "c" + children[i].id.charAt(3)).className = "colorBlock";
                    }
                }
            }
        }
        e.target.className = "selectedColor";
        hideSelectedColor(e.target.id);
    }
}

function createSnakes(ctx){
    var result = [];
    var p1Name = document.getElementById("p1Name").value === "" ? "Player1" :  document.getElementById("p1Name").value;
    var p2Name = document.getElementById("p2Name").value === "" ? "Player2" :  document.getElementById("p2Name").value;
    var p3Name = document.getElementById("p3Name").value === "" ? "Player3" :  document.getElementById("p3Name").value;
      
    result.push(new Snake(p1Name, generateCoordinate(20), generateCoordinate(20), 115, getSelectedColor("p1"), 119, 100, 115, 97, ctx, 0));
    if(document.getElementById("p2").className === "selecterOn"){
        result.push(new Snake(p2Name,  generateCoordinate(300), generateCoordinate(300), 105, getSelectedColor("p2"), 105, 108, 107, 106, ctx, 1));
    }
    if(document.getElementById("p3").className === "selecterOn"){
        result.push(new Snake(p3Name, generateCoordinate(20), generateCoordinate(300), 51, getSelectedColor("p3"), 53, 51, 50, 49, ctx, 2));
    }
    
    return result;
}

function getSelectedColor(playerId){
    var result;
    var colors = document.getElementById(playerId + "Color").childNodes;
    for(var i=0; i < colors.length; i++){
        if(colors[i].className === "selectedColor"){
            switch (colors[i].id.charAt(3)){
                case '1':
                    result = "#000000";
                    break;
                case '2':
                    result = "#00A1CB";
                    break;
                case '3':
                    result = "#D0D102";
                    break;
                case '4':
                    result = "#32742C";
                    break;
                case '5':
                    result = "#D70060";
                    break;
                case '6':
                    result = "#F18D05";
                    break;
                case '7':
                    result = "#61AE24";
                    break;
                case '8':
                    result = "#E54028";
                    break;
                default:
                    result = "#FFFFFF";
                    break;
            }
                
        }
    }
    return result;
}

function hideSelectedColor(colorId){
    for(var i=1; i < 4; i++){
        if(i.toString() !== colorId.charAt(1)){
            document.getElementById("p" + i + "c" + colorId.charAt(3)).className += " hidden";
        }        
    }
}

function generateCoordinate(base) {
    return Math.floor(Math.random() * 101 + base);
}