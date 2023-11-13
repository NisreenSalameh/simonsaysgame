const possibleColors = ["red", "blue", "yellow", "green"];
let computerPattern = [];
let userPattern = [];

let gameStarted = false;
let level = 0;


document.addEventListener("keypress", function() {
    if (!gameStarted) {
        document.getElementById("title").textContent = "Level " + level;
        nextSequence();
        gameStarted = true;
    }
});

document.querySelectorAll(".btn").forEach(function(button) {
    button.addEventListener("click", function() {
        if (gameStarted && level <= 10) {
            const userChoice = this.id;
            userPattern.push(userChoice);
            playAudio(userChoice);
            buttonAnimation(userChoice);
            validatePattern(userPattern.length - 1);
        }
    });
});


function validatePattern(currentLevel) {
    if (computerPattern[currentLevel] === userPattern[currentLevel]) {
        if (userPattern.length === computerPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000); 
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        document.body.classList.add("game-over");
        setTimeout(function() {
            document.body.classList.remove("game-over");
        }, 200);
        document.getElementById("title").textContent = "Game Over, Press Any Key to Restart";
        restartGame();
    }
}


function nextSequence() {
    userPattern = [];
    if (level < 10) {
        level++;
        document.getElementById("title").textContent = "Level " + level;

        const randomNum = Math.floor(Math.random() * 4);
        const randomChosenColor = possibleColors[randomNum];
        computerPattern.push(randomChosenColor);

        document.getElementById(randomChosenColor).style.opacity = 0;

        setTimeout(function() {
            document.getElementById(randomChosenColor).style.opacity = 1;
            playAudio(randomChosenColor);
        }, level > 5 ? 25 : 300);
    } else {
        document.getElementById("title").textContent = "Congrats! You finished all levels";
        gameStarted = false;

        document.querySelectorAll(".btn").forEach(function(button) {
            button.removeEventListener("click");
        });
    }
}


function playAudio(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function buttonAnimation(currentColor) {
    document.getElementById(currentColor).classList.add("pressed");
    setTimeout(function() {
        document.getElementById(currentColor).classList.remove("pressed");
    }, 100);
}


function restartGame() {
    level = 0;
    computerPattern = [];
    gameStarted = false;
}
