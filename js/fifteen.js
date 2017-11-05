
var sessionStart = false;
var shuffleBtn, puzzlePiece, puzzleArea, timer;
var pTop = 0, pLeft = 0, counter = 0, min = 0, sec = 0, move = 0;
"use strict"

window.onload = function(){
    window.onclick = function(event) {
        var modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    var timeKeeper = document.createElement("P");
    var moves = document.createElement("P");
    var gameSession = document.createElement("P");
    
    puzzleArea = document.getElementById("puzzlearea");
    
    timeKeeper.id = "timeKeeper";
    timeKeeper.appendChild(document.createTextNode("Timer: 00:00"));
    document.getElementById("overall").insertBefore(timeKeeper,puzzleArea);
    timeKeeper.style.position = "fixed";
    timeKeeper.style.top = "15%";
    timeKeeper.style.left = "1%";
    
    moves.id = "moves";
    moves.appendChild(document.createTextNode("Moves: "));
    document.getElementById("overall").insertBefore(moves,puzzleArea);
    moves.style.position = "fixed";
    moves.style.top = "17%";
    moves.style.left = "1%";
    
    gameSession.id = "gameSession";
    document.getElementById("overall").insertBefore(gameSession,puzzleArea);
    gameSession.style.position = "fixed";
    gameSession.style.top = "20%";
    gameSession.style.left = "1%";
    
	puzzlePiece = puzzleArea.getElementsByTagName("div");
	shuffleBtn = document.getElementById("shufflebutton");
	shuffleBtn.onclick = reArrange;
    var imgs =["background.jpg","mickey.jpg","princess.jpg","mario.jpg"];
    gridAlign(imgs[counter]);
    moves.style.padding = "10px";
    button();
}
function button() {
    var controls = document.getElementById("controls");
    var nxtBtn = document.createElement("BUTTON");
    var resetBtn = document.createElement("BUTTON");
    var gameInfo = document.createElement("BUTTON");
    nxtBtn.id = "next";
    resetBtn.id = "reset";
    gameInfo.id = "gameinfo";
    nxtBtn.appendChild(document.createTextNode("Next Image"));
    gameInfo.appendChild(document.createTextNode("Game Info"));
    resetBtn.appendChild(document.createTextNode("Reset Game"));
    var buttonList = [nxtBtn, resetBtn, gameInfo, shuffleBtn];
    for(var i = 0; i < buttonList.length; i++){
        buttonList[i].style.fontFamily = "Arial";
        buttonList[i].style.color = "white";
        buttonList[i].style.fontSize = "16px";
        buttonList[i].style.background = "green";
        buttonList[i].style.padding = "5px 10px 5px 10px";
 
        if(i < 4 ){
            controls.appendChild(buttonList[i]);
        }
    }
    nxtBtn.addEventListener("click", nextImage);
    gameInfo.addEventListener("click", modalClick);
    resetBtn.addEventListener("click", resetGame);
    shuffleBtn.addEventListener("click", reArrange);
}

function reArrange(){
    if(!sessionStart){
        timer = setInterval(timerKeeper,1000);
        //move = setInterval(movesCounter, 1000);
        var i, j;
        var lst2 = [];
        for(i = 0; i < 100; i++){
            for(j = 0; j < puzzlePiece.length; j++){
                if(validMove(puzzlePiece[j].style.left, puzzlePiece[j].style.top)){
                    lst2.push([puzzlePiece[j],j]);
                }
            }
            if(lst2.length != 0){
                var rndNum = Math.floor(Math.random() * lst2.length);
                var lst = swap(lst2[rndNum][0].style.left, lst2[rndNum][0].style.top);
                lst2[rndNum][0].style.left = lst[0];
                lst2[rndNum][0].style.top = lst[1];
            }
            else{
                i--;
            }
            lst2 = [];
        }
        sessionStart = true;
    }
    
}
function gridAlign(imgFile){
    
    for (var i = 0; i < puzzlePiece.length; i++){
        puzzlePiece[i].className = "puzzlepiece";
        puzzlePiece[i].style.top = pTop + "px";
        puzzlePiece[i].style.left = pLeft + "px";
        puzzlePiece[i].webkitTransition = "all 1000ms ease";
        puzzlePiece[i].mozTransition = "all 1000ms ease";
        puzzlePiece[i].msTransition = "all 1000ms ease";
        puzzlePiece[i].oTransition = "all 1000ms ease";
        puzzlePiece[i].style.transition = "all 1000ms ease";
        puzzlePiece[i].style.backgroundImage =  "url('./img/"+imgFile+"')";
        pLeft = pLeft + 100;
        if(pLeft > 300){
            pTop = pTop + 100;
            pLeft = 0;
        }
        puzzlePiece[i].style.backgroundPosition = "-" + puzzlePiece[i].style.left + " " + "-" + puzzlePiece[i].style.top;
        puzzlePiece[i].onmouseover = function(){
            if(validMove(this.style.left, this.style.top)){
                this.classList.add("movablepiece");
                this.style.cursor = "pointer";
            }
        }
        puzzlePiece[i].onmouseout = function(){
            this.classList.remove("movablepiece");
            this.style.cursor = "context-menu";
        }
        puzzlePiece[i].onmousedown = function(){
            if(validMove(this.style.left, this.style.top)){
                movesCounter();
                var lst = swap(this.style.left, this.style.top);
                this.style.left = lst[0];
                this.style.top = lst[1];
            }
        }
    }
    pTop = 300;
    pLeft = 300;
}
function validMove(leftPx,topPx){
    var valid = false;
    var x = parseInt(leftPx);
    var y = parseInt(topPx);
    if(x + 100 === pLeft  && y === pTop){
        valid = true;   
    }
    else if(x - 100 === pLeft && y === pTop){
        valid = true;
    }
    else if(y + 100 === pTop && x === pLeft){
        valid = true;
    }
    else if (y - 100 === pTop && x === pLeft){
        valid = true;
    }
    else {
        valid = false;
    }
    return valid;
}
function swap(leftPx, topPx){
    var temp = leftPx;
    leftPx = pLeft + "px";
    pLeft = parseInt(temp);
    temp = topPx;
    topPx = pTop +"px";
    pTop = parseInt(temp);
    return [leftPx, topPx];
}




function resetGame(){
    var session = document.getElementById("gameSession");
    pTop = 0;
    pLeft = 0;
	var imgs =["background.jpg","mickey.jpg","princess.jpg"];
    gridAlign(imgs[counter]);
    sessionStart = false;
    clearInterval(timer);
    clearInterval(move);
    document.getElementById("timeKeeper").innerHTML = "Timer: 00:00";
    document.getElementById("moves").innerHTML = "Moves:";
    min = 0;
    sec = 0;
	move = 0;
}
function nextImage(){
    if(!sessionStart){
        pTop = 0;
        pLeft = 0;
        var imgs =["background.jpg","mickey.jpg","princess.jpg"];
        if(counter == 3){
            counter = 0;
        }
        else{
			counter++;
            
        }
		gridAlign(imgs[counter]);
    }
}

function modalClick(){
    var modal = document.createElement("DIV");
    var modalContent = document.createElement("DIV");
    var gameBar = document.createElement("DIV");
    var close = document.createElement("SPAN");
    gameBar.id = "gameBar";
    modal.id = "myModal";
    close.id = "close";
    modalContent.id = "modalContent";
    
    modal.style.display = "block";
    modal.style.position = "fixed"; 
    modal.style.zIndex = "1"; 
    modal.style.paddingTop = "100px";
    modal.style.left = "0px";
    modal.style.top = "0px";
    modal.style.width = "100%"; 
    modal.style.height = "100%";
    modal.style.overflow = "auto"; 
    modal.style.backgroundColor = "rgb(0,0,0)"; 
    modal.style.backgroundColor = "rgba(0,0,0,0.4)";

    modalContent.style.backgroundColor = "#fefefe";
    modalContent.style.margin = "auto";
    modalContent.style.padding = "20px";
    modalContent.style.border = "1px solid #888";
    modalContent.style.width = "80%";
    
    close.style.color = "#aaaaaa";
    close.style.float = "right";
    close.style.fontSize = "28px";
    close.style.fonteWight = "bold";
    close.style.cursor = "pointer";
    close.style.position = "fixed";
    close.style.top = "100px";
    close.style.right = "130px";
    close.appendChild(document.createTextNode("x"));
    close.addEventListener("click",closeModal);
    
    var paragraph = document.createElement("P");
    var header = document.createElement("H1");
    header.appendChild(document.createTextNode("Game Instructions"));
    header.style.margin = "0px";
    
    var text = document.createTextNode("The 'Fifteen puzzle' (more generally called the Sliding Puzzle) is a simple classic game consisting of a 4x4 grid of numbered squares with one square missing. The goal of the fifteen puzzle is to un-jumble its fifteen squares by repeatedly making moves that slide squares into the empty space. You begin playing by hitting the 'Shuffle' button. When the Shuffle button is clicked, the tiles of the puzzle are randomized and a timer will begin. To move a piece, first you will have to hover over that piece and it will be highlighted if it can be moved. Once highlighted you may click on the piece and it will go to the empty spot. Once solved, you will be notified. Are you up for the challenge? How quickly can you solve it? Close this info dialoge and LETS FIND OUT!");
    paragraph.style.fontFamily = "Arial";
    paragraph.style.fontSize = "2em";
    paragraph.appendChild(text);
    
    modalContent.appendChild(header);
    modalContent.appendChild(close);
    modalContent.appendChild(paragraph);
    modal.appendChild(modalContent);
    
    document.getElementById("overall").insertBefore(modal, puzzleArea);
}

function closeModal(){
    document.getElementById("myModal").style.display = "none";
}

function movesCounter(){
    move++;
    document.getElementById("moves").innerHTML = "Moves: " + move;
}

function timerKeeper(){
    var time;
    if(sec < 60){
        sec++;
    }
    else{
        sec = 0;
        min++;
    }
    if(min < 10){
       time = "Timer: 0"+min+":"; 
    }
    else{
        time = "Timer: "+min+":"; 
    }
    if(sec < 10){
        time += "0"+sec;
    }
    else{
        time += sec;
    }
    document.getElementById("timeKeeper").innerHTML = time;
}

function isWinner(){
    var winner;
    var val = 1;
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if(puzzlepiece[i][j] != val++){
                winner = false;
            }
            else{
                winner = true;
            }
        }
    }
    if(winner===true){
        alert("won");
        return true;
    }
}