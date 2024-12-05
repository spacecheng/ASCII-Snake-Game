var field = []
var direction;
var amount;
var headX;
var headY;
var running;
var xLimit;
var yLimit;
var appleX;
var appleY;
var active = [];
var stepNum = 0;
var selfCrash = false;
var win = false;
var appleArray;
window.addEventListener("keydown", onKeyDown, false);
function update(element){
  var element= document.getElementById("board")
}
function appleSet(){
  appleArray = []
  for(let x=0; x<xLimit; x++){
    for(let y=0;y<yLimit; y++){
      appleArray.push([x, y])
    }
  }
}
function shuffleApple(reuse){
  if(reuse == false){
    appleSet()
    console.log("test")
  }
  
  console.log("Before set()" +String(appleArray) + "<-apple array " + String(active) + "<-active" + String(appleX) + "<- appleX  appleY-> " + String(appleY) + " headX and Y(" + String(headX) + "," + String(headY) + "))")
  let appleCoordsIndex = Math.floor(Math.random() * appleArray.length)
  let appleCoords = appleArray[appleCoordsIndex]
  appleX = appleCoords[0]
  appleY = appleCoords[1]
  console.log("After set(appleArray(" +String(appleArray) + ") active(" + String(active) + ") appleX(" + String(appleX) + ")  appleY(" + String(appleY) + ") headX and Y(" + String(headX) + "," + String(headY) + "))")
  /*appleX = Math.floor(Math.random() * xLimit)
  appleY = Math.floor(Math.random() * yLimit)*/
  for(let i = 0; i < active.length; i++){
    console.log("active " + String(active[i]))
    console.log("apple " + String([appleX, appleY]))
    if(String(active[i]) == String([appleX, appleY])){
      console.log("spawn on snake")
      console.log("was " +String(appleX) + " " + String(appleY))
      appleArray.splice(appleCoordsIndex, 1)
      shuffleApple(true)
      break
    }
  }
}
function makeOpp(direct, compare){
  if(direction == compare){
    return
  }
  else{
    direction = direct
  }
}
function compareStop(){
  for(let i = 0; i < active.length-1; i++){
    for(let j = (active.length-1);j > i; j--){
      if(String(active[i]) == String(active[j])){
        selfCrash = true
        break
      }
    }
  }
}
function onKeyDown(event){
  var keyCode = event.keyCode;
  switch(keyCode){
      case 68:
        makeOpp("right", "left")
        break;
      case 83:
        makeOpp("down", "up")
        break
      case 65:
        makeOpp("left", "right")
        break
      case 87:  
        makeOpp("up", "down")
        break
    }
}
function flip(x, y){
  field[y][x] = 0-((field[y][x])-1)
  console.log("this is flip(" + String(x) + String(y) + ")")
}
function start(width, height){
  if(width < 4 || height < 4){
    alert("the width or height must be greater than 4")
  }
  else{
    xLimit = width;
    yLimit = height;
    for(let y=0; y<height; y++){
      field[y] = []
      for(let x=0;x<width; x++){
        field[y][x] = 0
      }
    }
    headX = ((width - (width % 2))/2)-1
    headY = ((height - (height % 2))/2)-1
    amount = 4
    direction = "right"
    active.push([headX, headY])
  }
}
function consoleRun(){
  for(let i=0; i<10; i++){
    console.log();
  }
  step();
  for(let i = 0; i < field.length; i++){
    console.log(field[i])
  }
}
function run(speed){
  shuffleApple(false)
  flip(appleX, appleY)
  running = setInterval(consoleRun, speed)
}
function stop(){
  clearInterval(running)
  if(win == true){
    alert("you win because there are no more spaces left \n score: " + String(amount-3))
    console.log(win)
  }
  else{
    alert("you lose score: " + String(amount - 3))
  }
}
function step(){
  stepNum++
  switch(direction){
    case "right":
      headX+=1
      break;
    case "down":
      headY+=1
      break;
    case "left":
      headX+=-1
      break;
    case "up":
      headY+=-1
      break;
  }
  compareStop()
  if(headX < 0 || headX > xLimit-1 || headY < 0 || headY > yLimit-1 || selfCrash == true){
    stop()
    return
  }
  else{
    while((active.length+1) > amount){  
      let removed = active.shift()
      if(stepNum > amount){
        flip(removed[0], removed[1])
    }
  }
    if(headX == appleX && headY == appleY){
      amount++
      flip(appleX, appleY)
      shuffleApple(false)
      flip(appleX, appleY)
    }
    active.push([headX, headY])
    flip(headX, headY)
  }
}
