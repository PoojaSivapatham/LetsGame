let secretNumber;
let attempts;
let gameOver;
let guesses = [];
let bestScore = localStorage.getItem("bestScore");
const maxAttempts = 10;




function startGame() {

    document.getElementById("bestScore").textContent =
    bestScore || "--";
    document.getElementById("gameCharacter").className =
    "game-character";
  document.getElementById("restartButton").hidden = true;
  
    secretNumber = Math.floor(Math.random() * 100) + 1;

    attempts = 0;

    guesses = [];

    gameOver = false;

    document.getElementById("attempts").textContent = attempts;

    document.getElementById("guess").value = "";

    document.getElementById("historyList").innerHTML = "";

    document.getElementById("guessButton").disabled = false;
    document.getElementById("guess").disabled = false;

    let result = document.getElementById("result");

    result.textContent = "Make your first guess!";

    result.className = "";
}


function checkGuess() {

    if (gameOver) {
        return;
    }

    let input = document.getElementById("guess");

    let guess = Number(input.value);

    let result = document.getElementById("result");

    let gameBox = document.getElementById("gameBox");

    let character = document.getElementById("gameCharacter");

    if (
input.value.trim() === "" ||
!Number.isInteger(guess) ||
guess < 1 ||
guess > 100
) {
result.textContent =
"⚠️ Enter a whole number between 1 and 100.";

input.value = "";
result.className = "low";

return;

    }

    if (guesses.includes(guess)) {

    result.textContent =
        "⚠️ You already guessed " + guess + "!";

    result.className = "low";
    input.value = "";
    return;
    }

    attempts++;

    guesses.push(guess);

    document.getElementById("attempts").textContent = attempts;

    addToHistory(guess);

  document.getElementById("restartButton").hidden = false;

    if (attempts === maxAttempts && guess !== secretNumber) {

    result.textContent =
        "😔 Game Over! The secret number was " +
        secretNumber + ".";
    character.className = "game-character game-over";
    result.className = "game-over";

    gameOver = true;

    document.getElementById("guessButton").disabled = true;
    document.getElementById("guess").disabled = true;

    return;
    }


    if (guess === secretNumber) {

        result.textContent =
            "🎉 Correct! You found it in " +
            attempts +
            " attempts!";

        result.className = "correct";
        character.className = "game-character happy";

        if (bestScore === null || attempts < Number(bestScore)) {

            bestScore = attempts;

            localStorage.setItem("bestScore", bestScore);

            document.getElementById("bestScore").textContent = bestScore;
        }

        gameOver = true;

        document.getElementById("guessButton").disabled = true;
        document.getElementById("guess").disabled = true;
        gameBox.classList.add("celebrate");

    }


    else if (guess < secretNumber) {

        result.textContent =
            "📈 " + guess +
            " is TOO LOW! Try a higher number.";

        result.className = "low";

        character.className = "game-character thinking";

        gameBox.classList.add("shake");

    }


    else {

        result.textContent =
            "📉 " + guess +
            " is TOO HIGH! Try a lower number.";

        result.className = "high";
        character.className = "game-character surprised";

        gameBox.classList.add("shake");

    }


    input.value = "";

    input.focus();


    setTimeout(function() {

        gameBox.classList.remove("shake");
        gameBox.classList.remove("celebrate");

    }, 500);
}


function addToHistory(guess) {

    let historyList =
        document.getElementById("historyList");

    let item =
        document.createElement("div");

    item.className = "guess-item";


    if (guess < secretNumber) {

        item.textContent =
            "🎯 " + guess + " → Too Low";

    }

    else if (guess > secretNumber) {

        item.textContent =
            "🎯 " + guess + " → Too High";

    }

    else {

        item.textContent =
            "🎯 " + guess + " → Correct!";

    }


    historyList.prepend(item);
}


function restartGame() {

    startGame();

    document.getElementById("result").textContent =
        "🔄 New game! Make your first guess.";
}


document
    .getElementById("guessButton")
    .addEventListener("click", checkGuess);


document
    .getElementById("restartButton")
    .addEventListener("click", restartGame);

document
    .getElementById("guess")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            checkGuess();
        }

    });
startGame();
