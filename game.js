
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;



$(document).on("keypress", function () {
    if (!started) {
        $("#level-title").text("Level 0");
        gameSequence();
        started = true;
    }
});


$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}




function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");

    }, 100);

}



function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                gameSequence();
            }, 1000);
        }
    }

    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");


        setTimeout(function () {
            $("body").removeClass("game-over");

        }, 200);

        startOver();
    }
}

function gameSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}