var gamePattern=[];
var userClickedPattern=[];
var level=0;

var buttonColours=["red", "blue", "green", "yellow"];

function playSound(name){
    // add audio
    var audio=new Audio(name + ".mp3");
    audio.play();
}

function nextSequence(){
    var randomNum=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColours[randomNum];
    gamePattern.push(randomChosenColor);
    $('#'+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level=level+1;
    $("#level-title").html("level "+level);

    // empty the user array for each new level
    while (userClickedPattern.length() > 0) {
        userClickedPattern.pop();
      }
}

$(document).keypress(function(){
    nextSequence();
});

function animatePress(id){
    $('#'+id).addClass('pressed');
    setTimeout(function() {
        $('#'+id).removeClass('pressed');
      }, 100);
}



$(".btn").click(function(){
   var userChosenColour=this.id;
   userClickedPattern.push(userChosenColour);
   animatePress(this.id);
   playSound(userChosenColour);
   check(userClickedPattern.length-1);
});

function check(currentLevel){
    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);

          userClickedPattern=[];
        }
  
      } else {
        // wrong
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },300);

        $("h1").html("Game Over, Press Any Key to Restart");
        userClickedPattern=[];

        startOver();
      }
}

function startOver() {
    level = 0;
    gamePattern = [];
  }