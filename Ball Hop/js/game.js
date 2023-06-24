let Speed=2;
const game=document.querySelector("#game");
let gameWidth=parseFloat(getComputedStyle(game).getPropertyValue("width"));
let tracks=[gameWidth/10,(gameWidth*37)/100,(74*gameWidth)/100];
let moveSpeed=30;
let ball;
let jumps=0;
let jumpSuccess=[true];
let score;
let gameOver=false;
let timeOuts=[];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

requestAnimationFrame(loop);
function loop(){
    requestAnimationFrame(loop);
    gameLoop();
}

window.onload=function(){
    let newBlock=document.createElement("div");
    newBlock.classList.add("platform");
    newBlock.style.top="-80px";
    newBlock.style.left=tracks[randomNumber(0,2)]+"px";

    game.appendChild(newBlock);
    setTimeout(()=>{
        game.removeChild(newBlock);
    },12000);
}

setTimeout(()=>{
    ball=document.createElement("div");
    ball.classList.add("ball");
    ball.style.left=gameWidth/2+"px";
    game.appendChild(ball);
    ball.classList.add("jump");
    setInterval(()=>{
        jumps++;
    },2000);
},1500);

setInterval(()=>{
    let newBlock=document.createElement("div");
    newBlock.classList.add("platform");
    newBlock.style.top="-80px";
    newBlock.style.left=tracks[randomNumber(0,2)]+"px";

    game.appendChild(newBlock);
    timeOuts[timeOuts.length]=setTimeout(()=>{
        game.removeChild(newBlock);
    },12000);
},2000);

function gameLoop(){
    if(!gameOver) score=jumps-1;
    if(jumpSuccess.includes("not")){
      gameOver=true;
      Speed=0;
      moveSpeed=0;
      if(ball.classList.contains("jump")){
        ball.classList.remove("jump");
        ball.style.height="25px";
      }
      timeOuts.forEach(timeOut=>{
        clearTimeout(timeOut);
      });
      let ballSize=parseFloat(getComputedStyle(ball).getPropertyValue("height"));
      ball.style.height=(ballSize-.1)+"px";
    }
    document.querySelector(".score").innerText=score>0?score:0;
    document.querySelectorAll(".platform").forEach(block=>{
        let blockTop=parseFloat(getComputedStyle(block).getPropertyValue("top"));
        let blockLeft=parseFloat(getComputedStyle(block).getPropertyValue("left"));
        let blockSize=75;
        block.style.top=blockTop+Speed+"px";
        if(!ball)return;
        let ballTop=parseFloat(getComputedStyle(ball).getPropertyValue("top"));
        let ballLeft=parseFloat(getComputedStyle(ball).getPropertyValue("left"));
        let ballSize=parseFloat(getComputedStyle(ball).getPropertyValue("height"));
        let isColliding=detectCollision({x:blockLeft,y:blockTop,w:blockSize,h:blockSize},
        {x:ballLeft,y:ballTop,w:ballSize,h:ballSize});

         if(ballSize<=25){
            if(!jumpSuccess[jumps]){
               jumpSuccess[jumps]="not";
            }
            if(isColliding){
                jumpSuccess[jumps]=true;
            }
         }
    });
}

window.onkeydown=({key})=>{
    if(key==="d"){
        moveRight();
    }
    if(key==="a"){
        moveLeft();
    }
}


function moveRight(){
    if(!ball)return;
    let ballLeft=parseFloat(getComputedStyle(ball).getPropertyValue("left"));
    if(ballLeft>=(gameWidth-50))return;
    ball.style.left=(ballLeft+moveSpeed)+"px"
}

function moveLeft(){
    if(!ball)return;
    let ballLeft=parseFloat(getComputedStyle(ball).getPropertyValue("left"));
    if(ballLeft<=50)return;
    ball.style.left=(ballLeft-moveSpeed)+"px"
}

function detectCollision(element1,element2){
    if (
        element1.x < element2.x + element2.w &&
        element1.x + element1.w > element2.x &&
        element1.y < element2.y + element2.h &&
        element1.h + element1.y > element2.y
    ) {
        // Collision detected!
        return true;
    } else {
        // No collision
        return false;
    }
}






