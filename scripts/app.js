// Simon
var power = "off";
var strict = "off";
var running = false;
var sequenceArr = [];
var sequenceArrCounter = 0;
var userSeq = [];
var userSeqCounter = 0;
var levelCount = 1;
var tempColor;
var gameMem;
var matchingArrays = true;
var tempo;


//Visualization Note
function colorButton(id, color) {
    this.id = id;
    this.color = color;
}
var gre = new colorButton(1, "gre");
var red = new colorButton(2, "red");
var yel = new colorButton(3, "yel");
var blu = new colorButton(4, "blu");

//Visual Changes when clicking the power button
$("#power").on("click", function() {
  if (power == "off") {
    $("#count").css("opacity", "1");
    power = "on";
  }
  else if (power == "on") {
    $("#count").css("opacity", "0.3");
    power = "off";
    strict = "off";
    $(".strict").css("background", "yellow");
    $(".strict").removeClass("fa fa-check");
    running = false;
    $(".start").css("background", "red");
    sequenceArr = [];
    userSeq = [];
    levelCount = 1;
    $("#count").val("--");
    sequenceArrCounter = 0;
    userSeqCounter = 0;
    matchingArrays = true;
    clearInterval(gameMem);
    $(".divSquare").css("pointer-events", "none");
  }
});

//Visual changes when clicking the strict button
$(".strict").on("click", function() {
  if (power == "on" && running == false) {
    if (strict == "off") {
      $(".strict").css("background", "green");
      $(".strict").addClass("fa fa-check");
      strict = "on";
    }
    else if (strict == "on") {
      $(".strict").css("background", "yellow");
      $(".strict").removeClass("fa fa-check");
      strict = "off";
    }
  }
});

//Effects when clicking the start button
$("#power").on("click", function() {
  if (power == "on") {
    $(".start").css("background", "green");
    running = true;
    userSeq = [];
    sequenceArr = [];
    sequenceArrCounter = 0;
    userSeqCounter = 0;
    levelCount = 1;
    $("#count").val("--");
    matchingArrays = true;
    clearInterval(gameMem);
    $(".divSquare").css("pointer-events", "none");
    newMemory();
    console.log(sequenceArr);
    setTimeout(function() {gameMem = setInterval(playMemory, 1000);}, 1000);
  }
});

// Click button effects
$("div[id*='button']").on("click", function() {
  if (power == "on" && running) {
    //console.log(event.which);
      $("#sound" + this.id).get(0).cloneNode().play();
      userSeq.push(this.id.slice(6, 9));
      userSeqCounter++;
      console.log(userSeqCounter);
      for (i = 0; i < userSeq.length; i++) {
        if (sequenceArr[i] != userSeq[i]) {
          matchingArrays = false;
        }
      }
      if (!matchingArrays) {
        $("#count").val("!!");
        $("#soundbuttonWrong").get(0).play();
        userSeq = [];
        sequenceArrCounter = 0;
        userSeqCounter = 0;
        matchingArrays = true;
        $(".divSquare").css("pointer-events", "none");
        if (strict == "on") {
          sequenceArr = [];
          levelCount = 1;
          newMemory();
          console.log(sequenceArr);
          setTimeout(function() {gameMem = setInterval(playMemory, tempo);}, 1000);
        }
        else {
          setTimeout(function() {gameMem = setInterval(playMemory, tempo);}, 1000);
        }
      }
      else {
        if (userSeqCounter == sequenceArrCounter) {
          if (matchingArrays) {
            if (levelCount == 20) {
              win();
            }
            else {
              userSeq = [];
              sequenceArrCounter = 0;
              userSeqCounter = 0;
              newMemory();
              levelCount++;

              switch(levelCount) {
                case 1:
                case 2:
                case 3:
                case 4:
                  tempo = 1000;
                    break;
                case 5:
                  tempo = 700;
                  break;
                case 9:
                  tempo = 500;
                  break;
                case 13:
                  tempo = 300;
                  break;
              }
              setTimeout(function() {gameMem = setInterval(playMemory, tempo);}, 1000);
              $(".divSquare").css("pointer-events", "none");
            }
          }
        }
      }
    
  }
});

function newMemory() {
  var temp = Math.floor((Math.random() * 4) + 1);
  switch(temp) {
    case 1:
      sequenceArr.push("Gre");
      break;
    case 2:
      sequenceArr.push("Red");
      break;
    case 3:
      sequenceArr.push("Yel");
      break;
    case 4:
      sequenceArr.push("Blu");
      break;
  }
}

function playMemory() {
  $("#count").val(levelCount);
  tempColor = sequenceArr[sequenceArrCounter];
  $("#soundbutton" + tempColor).get(0).play();
  $("#soundbutton" + tempColor).get(0).cloneNode().play();
  $("#button" + tempColor).addClass("activated");
  setTimeout(function() {$("#button" + tempColor).removeClass("activated");}, 250);
  sequenceArrCounter++;
  if (sequenceArrCounter == sequenceArr.length) {
    clearInterval(gameMem);
    $(".divSquare").css("pointer-events", "auto");
  }
}

function win() {
  $("#count").val("WIN");
  $("#buttonGre").addClass("activated");
  setTimeout(function() {$("#buttonGre").removeClass("activated");}, 250);
  setTimeout(function() {$("#buttonRed").addClass("activated");}, 250);
  setTimeout(function() {$("#buttonRed").removeClass("activated");}, 500);
  setTimeout(function() {$("#buttonYel").addClass("activated");}, 500);
  setTimeout(function() {$("#buttonYel").removeClass("activated");}, 750);
  setTimeout(function() {$("#buttonBlu").addClass("activated");}, 750);
  setTimeout(function() {$("#buttonBlu").removeClass("activated");}, 1000);
  
  setTimeout(function() {$("#buttonGre").addClass("activated");}, 1250);
  setTimeout(function() {$("#buttonRed").addClass("activated");}, 1250);
  setTimeout(function() {$("#buttonYel").addClass("activated");}, 1250);
  setTimeout(function() {$("#buttonBlu").addClass("activated");}, 1250);
  setTimeout(function() {$("#buttonGre").removeClass("activated");}, 1500);
  setTimeout(function() {$("#buttonRed").removeClass("activated");}, 1500);
  setTimeout(function() {$("#buttonYel").removeClass("activated");}, 1500);
  setTimeout(function() {$("#buttonBlu").removeClass("activated");}, 1500);
  
  setTimeout(function() {$("#buttonGre").addClass("activated");}, 1750);
  setTimeout(function() {$("#buttonRed").addClass("activated");}, 1750);
  setTimeout(function() {$("#buttonYel").addClass("activated");}, 1750);
  setTimeout(function() {$("#buttonBlu").addClass("activated");}, 1750);
  setTimeout(function() {$("#buttonGre").removeClass("activated");}, 2000);
  setTimeout(function() {$("#buttonRed").removeClass("activated");}, 2000);
  setTimeout(function() {$("#buttonYel").removeClass("activated");}, 2000);
  setTimeout(function() {$("#buttonBlu").removeClass("activated");}, 2000);
  
  setTimeout(function() {
    userSeq = [];
    sequenceArr = [];
    sequenceArrCounter = 0;
    userSeqCounter = 0;
    levelCount = 1;
    $("#count").val("--");
    matchingArrays = true;
    clearInterval(gameMem);
    $(".divSquare").css("pointer-events", "none");
    newMemory();
    console.log(sequenceArr);
    setTimeout(function() {gameMem = setInterval(playMemory, 1000);}, 1000);
  }, 3000);
}
