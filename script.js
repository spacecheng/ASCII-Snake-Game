//This is a forked version of the original snake game with modified UI elements. still has nonfunctioning parts like game over
//when printed, headY starts from 0 while headX starts from 1
//hitboxQ is colored Nums and anything saying hitbox is colored nums
var field = []
var oldDirection;
var direction;
var amount;
var headX;
var headY;
var running;
var xLimit;
var yLimit;
var appleX;
var appleY;
var appleShow;
var runType;
var active = [];
var stepNum = 0;
var selfCrash = false;
var win = false;
var appleArray;
var stopped = false
var ranBef = false;
var btnState = 0
var coloredBlocks = document.getElementById("coloredBlocks")
var coloredBlocksCheck;
var hideNums = document.getElementById("hideNums")
var hideNumsChecked;
var runSelect = document.getElementById("where");
var hitboxQ = document.getElementById("coloredNums")
var coloredNumsChecked;
runSelect.addEventListener("change", changeRunOptions)
function reset(){
  field = []
  direction = null;
  amount = null;
  headX = null;
  headY = null;
  running = null;
  xLimit = null;
  yLimit = null;
  appleX = null;
  appleY = null;
  active = [];
  stepNum = 0;
  selfCrash = false;
  win = false;
  appleArray;
  stopped = false
}
function preload(){
  let button = document.getElementById("runButton")
  button.onclick = function() {commence()}
  button.innerText = "Run"
}
function commence(){
  let button = document.getElementById("runButton")
  coloredNumsChecked = hitboxQ.checked
  coloredBlocksChecked = coloredBlocks.checked
  hideNumsChecked = hideNums.checked
  button.onclick = function() {stop()}
  button.innerText = "Stop"
  reset();
  let wideth = document.getElementById("widthInput").value
  let hight = document.getElementById("heightInput").value
  let amont = document.getElementById("amountInput").value
  let sped = 1000/(document.getElementById("speedInput").value)
  setup(wideth,hight,amont);
  run(sped);
}
function changeRunOptions(){
  runType = runSelect.options[runSelect.selectedIndex].value
  if(runType == "console"){
    document.getElementById("displayOptions").style.display = "none"
  }
  else{
    document.getElementById("displayOptions").style.display = "block"
  }
}
function changeShowOption(){}
window.addEventListener("keydown", onKeyDown, false);
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
  }
  let appleCoordsIndex = Math.floor(Math.random() * appleArray.length)
  let appleCoords = appleArray[appleCoordsIndex]
  appleX = appleCoords[0]
  appleY = appleCoords[1]
  /*appleX = Math.floor(Math.random() * xLimit)
  appleY = Math.floor(Math.random() * yLimit)*/
  for(let i = 0; i < active.length; i++){
    //debugconsole.log("active i value is " + String(active[i]))
    //debugconsole.log("apple coordinates are " + String([appleX, appleY]))
    if(String(active[i]) == String([appleX, appleY])){
      //debugconsole.log("spawn on snake")
      //debugconsole.log("was " +String(appleX) + " " + String(appleY))
      appleArray.splice(appleCoordsIndex, 1)
      shuffleApple(true)
      break
    }
  }
  //debugconsole.log("After set(appleArray(" +String(appleArray) + ") active(" + String(active) + ") appleX(" + String(appleX) + ")  appleY(" + String(appleY) + ") headX and Y(" + String(headX) + "," + String(headY) + "))")
}
function makeOpp(direct, compare){
  if(oldDirection == compare){
    return
  }
  else{
    direction = direct
  }
}
function compareStop(){
  for(let i = 0; i < active.length; i++){
    for(let j = (active.length);j > i; j--){
      if(String(active[i]) == String(active[j])){
        selfCrash = true
        //debugconsole.log("ran compareStop")
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
  //debugconsole.log("this is flip(" + String(x) + "," + String(y) + ")")
}
function setup(width, height, startAmount){
  if(width < 4 || height < 4){
    alert("The width or height must be greater than 4")
  }
  else if(width * height < startAmount){
    alert("The starting amount must be smaller than the total amount of spaces")
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
    amount = startAmount
    originalAmount = amount
    direction = "right"
    active.push([headX, headY])
  }
}
function runGame(){
  step();
  runType = runSelect.options[runSelect.selectedIndex].value
  switch (runType){
    case "page":
      pageRun()
      break;
    case "console":
      consoleRun()
      break;
  }
}
function consoleRun(){
  if(stopped == false){
    for(let i=0; i<10; i++){
      console.log();
    }
    for(let i = 0; i < field.length; i++){
      console.log(field[i])
    }
    console.log("end of consoleRun")
  }
}
function pageRun(){
  if(stopped == false){
    if(stepNum == 1 && ranBef == false){
      let board = document.createElement("div");
      board.id = "board"
      document.body.appendChild(board)
      ranBef = true;
      for(let i = 0; i < field.length; i++){
        let row = document.createElement("div");
        for(let j = 0; j < field[i].length; j++){
          //debugconsole.log("this is i for ranbeffalse " + i + " and this is j " + j)
          value = document.createElement("SPAN");
          value.innerText = field[i][j]
          value.style.marginLeft = "5px"
          value.style.marginRight = "5px"
          if(coloredNumsChecked==true){
            if(value.innerText == 1){
              value.style.color = 'blue'
            }
            if(i==headY && j==headX){
              value.style.color = "yellow"
            }
            if(i==appleY && j==appleX){
              value.style.color = "red"
            }
          }
          if(coloredBlocksChecked == true){
            value.style.backgroundColor = "black"
            if(value.innerText == 1){
              value.style.backgroundColor = 'blue'
            }
            if(i==headY && j==headX){
              value.style.backgroundColor = "yellow"
            }
            if(i==appleY && j==appleX){
              value.style.backgroundColor = "red"
            }
          }
          if(hideNumsChecked==true){
            value.innerText = " "
          }
          row.appendChild(value)
        }
        document.getElementById("board").appendChild(row);
      }
    }
    else if(stepNum == 1 && ranBef == true){
      //debugconsole.log("csdsafdadsafeswgfe")
      document.getElementById("board").remove()
      //debugconsole.log("ran remove")
      let board = document.createElement("div");
      board.id = "board"
      document.body.appendChild(board)
      for(let i = 0; i < field.length; i++){
        let row = document.createElement("div");
        for(let j = 0; j < field[i].length; j++){
          value = document.createElement("SPAN");
          value.innerText = field[i][j]
          value.style.marginLeft = "5px"
          value.style.marginRight = "5px"
          if(coloredNumsChecked==true){
            if(value.innerText == 1){
              value.style.color = 'blue'
            }
            if(i==headY && j==headX){
              value.style.color = "yellow"
            }
            if(i==appleX && j==appleX){
              value.style.color = "red"
            }
          }
          if(coloredBlocksChecked==true){
            value.style.backgroundColor = "black"
            if(value.innerText == 1){
              value.style.backgroundColor = 'blue'
            }
            if(i==headY && j==headX){
              value.style.backgroundColor = "yellow"
            }
            if(i==appleX && j==appleX){
              value.style.backgroundColor = "red"
            }
          }
          if(hideNumsChecked==true){
            value.innerText = " "
          }
          row.appendChild(value)
        }
        document.getElementById("board").appendChild(row);
      }
    }
    else{
      let board = document.getElementById("board")
      for(let o = 0; o < board.childNodes.length; o++){
        let divList = board.childNodes[o]
        for(let p = 0; p < divList.childNodes.length; p++){
          let tempSpan = document.createElement("SPAN");
          tempSpan.innerText = String(field[o][p])
          tempSpan.style.marginLeft = "5px"
          tempSpan.style.marginRight = "5px"
          if(coloredNumsChecked==true){
            if(tempSpan.innerText == 1){
              tempSpan.style.color = 'blue'
            }
            if(o==headY && p==headX){
              tempSpan.style.color = "yellow"
            }
            if(o==appleY && p==appleX){
              tempSpan.style.color = "red"
            }
          }
          if(coloredBlocksChecked==true){
            tempSpan.style.backgroundColor = "black"
            if(tempSpan.innerText == 1){
              tempSpan.style.backgroundColor = 'blue'
            }
            if(o==headY && p==headX){
              tempSpan.style.backgroundColor = "yellow"
            }
            if(o==appleY && p==appleX){
              tempSpan.style.backgroundColor = "red"
            }
          }
          if(hideNumsChecked==true){
            tempSpan.innerText = " "
          }
          divList.replaceChild(tempSpan, divList.childNodes[p])
        }
      }
    }
  }
}
function run(speed){
  shuffleApple(false)
  flip(appleX, appleY)
  running = setInterval(runGame, speed)
}
function stop(){
  let button = document.getElementById("runButton")
  button.onclick = function() {commence()}
  button.innerText = "Run"
  clearInterval(running)
  if(win == true){
    alert("you win because there are no more spaces left \n score: " + String(amount-originalAmount))
    console.log(win)
  }
  else{
    alert("you lose score: " + String(amount - originalAmount))
  }
}
function step(){
  stepNum++
  oldDirection = direction
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
  active.push([headX, headY])
  compareStop()
  //debugconsole.log("actives length is " + active.length)
  console.log()
  if(headX < 0 || headX > xLimit-1 || headY < 0 || headY > yLimit-1 || selfCrash == true){
    if(active.length <= xLimit * yLimit ){
      win = true
    }
    stop()
    stopped = true
    return
  }
  else{
    while((active.length) > amount){  
      let removed = active.shift()
      if(stepNum > amount){
        flip(removed[0], removed[1])
    }
  }
    if(headX == appleX && headY == appleY){
      //debugconsole.log("collect")
      amount++
      flip(appleX, appleY)
      shuffleApple(false)
      flip(appleX, appleY)
    }
    flip(headX, headY)
  }
}
