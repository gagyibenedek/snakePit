/*jslint browser: true*/
/*global Snake*/


function initInterface(){
     document.getElementById("p1Color").addEventListener('click', function(e) {
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

function newPlayer(){
     var root = document.getElementById('playerSelect');
     var count = root.childNodes.length - 7;
     var original,
          clone,
          removeDiv,
          i,
          idBuffer,
          cloneColorList,
          cloneColor;
     if(count < 7){
          document.getElementById('p' + (count - 1) + 'Remove').className = 'removePlayer hidden';

          original = document.getElementById('p' + (count-1) + 'Wrapper');
          clone = original.cloneNode(true); // "deep" clone
          clone.id = clone.id.substr(0,1) + count + clone.id.substr(2);
          removeDiv = clone.childNodes[5];
          removeDiv.id = removeDiv.id.substr(0,1) + count + removeDiv.id.substr(2);
          removeDiv.className = 'removePlayer';

          changePlayerIndexes(clone, count);

          root.insertBefore(clone, document.getElementById('addNewWrapper'));

          // unselect
          cloneColorList = document.getElementById("p" + count + "Color").childNodes;
          for(i = cloneColorList.length - 1; i >= 0; i--){
               if(cloneColorList[i].className === "selectedColor"){
                    cloneColorList[i].className = "colorBlock";
                    document.getElementById('p' + count + "c" + cloneColorList[i].id.charAt(3)).className += "hidden";
               }
          }

          // select a new color
          cloneColor = document.getElementById("p" + count + "c" + count);
          cloneColor.className = "selectedColor";
          hideSelectedColor(cloneColor.id);

          document.getElementById("p" + count + "Color").addEventListener('click', function(e) {
               selectColor(e);
          });
     }
}

function changePlayerIndexes(root, index){
    for(var i = 0; i < root.childNodes.length; i++){
          if(root.childNodes[i].id !== undefined ){
               root.childNodes[i].id = root.childNodes[i].id.substr(0,1) + index + root.childNodes[i].id.substr(2);
               if(root.childNodes[i].hasChildNodes()){
                    changePlayerIndexes(root.childNodes[i], index);
               }
          }
    }
}

function removePlayer() {
     var root = document.getElementById('playerSelect');
     var count = root.childNodes.length - 8;
     var child = document.getElementById('p' + count + 'Wrapper');
     var colors = child.childNodes[3].childNodes;

     for(var i = colors.length - 1; i >= 0 ; i--){
          if(colors[i].className === "selectedColor"){
               unhideColor(colors[i].id);
          }
     }

     root.removeChild(child);
     if(count > 2){
          document.getElementById('p' + (count - 1) + 'Remove').className = 'removePlayer';
     }
}

function selectColor(e){
     var  children,
          oldSelectedColorId;

    if(e.target.id.length === 4){
        children = e.target.parentNode.childNodes;
        for(var i=0; i<children.length; i++) {
            if(children[i].className === "selectedColor"){
                children[i].className = "colorBlock";
                oldSelectedColorId = "p" + children[i].id.charAt(1) + "c" + children[i].id.charAt(3);
            }
        }
        e.target.className = "selectedColor";
        hideSelectedColor(e.target.id);
        unhideColor(oldSelectedColorId);
    }
}

function hideSelectedColor(colorId){
    var count = document.getElementById('playerSelect').childNodes.length - 8;
    for(var i=count; i > 0; i--){
        if(i.toString() !== colorId.charAt(1)){
            document.getElementById("p" + i + "c" + colorId.charAt(3)).className += " hidden";
        }
    }
}

function unhideColor(colorId){
     var count = document.getElementById('playerSelect').childNodes.length - 8;
     for(var i=count; i > 0 ; i--){
        if(i.toString() !== colorId.charAt(1)){
            document.getElementById("p" + i + "c" + colorId.charAt(3)).className = "colorBlock";
        }
    }
}

function createSnakes(ctx){
    var result = [];
    var p1Name = document.getElementById("p1Name").value === "" ? "Player1" :  document.getElementById("p1Name").value;
    var p2Name = document.getElementById("p2Name").value === "" ? "Player2" :  document.getElementById("p2Name").value;
    var p3Name = document.getElementById("p3Name").value === "" ? "Player3" :  document.getElementById("p3Name").value;

    result.push(new Snake(p1Name, generateCoordinate(20), generateCoordinate(20), 2, getSelectedColor("p1"), 100, 97, ctx, 0));
    if(document.getElementById("p2").className === "selecterOn"){
        result.push(new Snake(p2Name,  generateCoordinate(300), generateCoordinate(300), 1, getSelectedColor("p2"),  108, 106, ctx, 1));
    }
    if(document.getElementById("p3").className === "selecterOn"){
        result.push(new Snake(p3Name, generateCoordinate(20), generateCoordinate(300), 1, getSelectedColor("p3"),  51, 49, ctx, 2));
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

function generateCoordinate(base) {
    return Math.floor(Math.random() * 101 + base);
}

function writeNextGame(context, bgColor){
    context.lineWidth = "4";
    context.fillStyle = bgColor;
    context.fillRect(40,135,320,100);
    context.stroke();
    context.font = "30px Andale Mono";
    context.fillStyle = "white";
    context.fillText("CLICK", 150, 180);
    context.fillText("to start the next round!", 60, 210);
}