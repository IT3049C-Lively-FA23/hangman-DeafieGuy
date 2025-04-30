// Hangman.js
class Hangman {
    Constructor(_canvas) {
let word = "";
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;
const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");
const wordHolder = document.getElementById("wordHolder");
const guesses = document.getElementById("guesses");
const resetButton = document.getElementById("resetGame");
    }
}
function startGame(difficulty) {
    fetch(`https://it3049c-hangman.fly.dev/?difficulty=${difficulty}`)
        .then(response => response.json())
        .then(data => {
            word = data.word.toUpperCase();
            guessedLetters = [];
            wrongGuesses = 0;
            updateWordDisplay();
            updateGuessedLetters();
            resetCanvas();
            toggleGameVisibility(true);
        })
        .catch(error => alert("Error fetching word: " + error));
}

function updateWordDisplay() {
    let displayWord = "";
    for (let letter of word) {
        if (guessedLetters.includes(letter)) {
            displayWord += `${letter} `;
        } else {
            displayWord += "_ ";
        }
    }
    wordHolder.textContent = displayWord.trim();
}

function updateGuessedLetters() {
    guesses.textContent = "Guessed Letters: " + guessedLetters.join(", ");
}

function resetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHangman(0);
}

function drawHangman(wrongGuesses) {
    // Simple drawing for Hangman; you can add more parts as needed
    switch (wrongGuesses) {
        case 1: drawHead(); break;
        case 2: drawBody(); break;
        case 3: drawLeftArm(); break;
        case 4: drawRightArm(); break;
        case 5: drawLeftLeg(); break;
        case 6: drawRightLeg(); break;
        default: break;
    }
}

function drawHead() {
    ctx.beginPath();
    ctx.arc(100, 40, 20, 0, Math.PI * 2, true);
    ctx.stroke();
}

function drawBody() {
    ctx.beginPath();
    ctx.moveTo(100, 60);
    ctx.lineTo(100, 120);
    ctx.stroke();
}

function drawLeftArm() {
    ctx.beginPath();
    ctx.moveTo(100, 80);
    ctx.lineTo(60, 100);
    ctx.stroke();
}

function drawRightArm() {
    ctx.beginPath();
    ctx.moveTo(100, 80);
    ctx.lineTo(140, 100);
    ctx.stroke();
}

function drawLeftLeg() {
    ctx.beginPath();
    ctx.moveTo(100, 120);
    ctx.lineTo(60, 150);
    ctx.stroke();
}

function drawRightLeg() {
    ctx.beginPath();
    ctx.moveTo(100, 120);
    ctx.lineTo(140, 150);
    ctx.stroke();
}

function submitGuess(letter) {
    letter = letter.toUpperCase().trim();

    // Validation
    if (letter.length === 0 || letter.length > 1 || !/[A-Z]/.test(letter)) {
        alert("Please enter a valid single letter.");
        return;
    }
    if (guessedLetters.includes(letter)) {
        alert("You already guessed that letter.");
        return;
    }

    // Update guessed letters
    guessedLetters.push(letter);
    updateGuessedLetters();

    if (word.includes(letter)) {
        updateWordDisplay();
        if (!wordHolder.textContent.includes("_")) {
            alert("Congratulations! You won!");
        }
    } else {
        wrongGuesses++;
        drawHangman(wrongGuesses);
        if (wrongGuesses === maxWrongGuesses) {
            alert("Game Over! The word was: " + word);
        }
    }
}

function toggleGameVisibility(isPlaying) {
    document.getElementById("startWrapper").classList.toggle("hidden", isPlaying);
    document.getElementById("gameWrapper").classList.toggle("hidden", !isPlaying);
}

// Reset game
resetButton.addEventListener("click", () => {
    startGame(document.getElementById("difficulty").value);
    resetButton.classList.add("hidden");
});

// Handle guess submission
document.getElementById("guessForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const guessInput = document.getElementById("guessInput");
    submitGuess(guessInput.value);
    guessInput.value = "";
});
