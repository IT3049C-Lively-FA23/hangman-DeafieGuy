// START + DIFFICULTY SELECTION
const startWrapper = document.getElementById(`startWrapper`);
const difficultySelectForm = document.getElementById(`difficultySelect`);
const difficultySelect = document.getElementById(`difficulty`);

// GAME
const gameWrapper = document.getElementById(`gameWrapper`);
const guessesText = document.getElementById(`guesses`);
const wordHolderText = document.getElementById(`wordHolder`);

// GUESSING FORM
const guessForm = document.getElementById(`guessForm`);
const guessInput = document.getElementById(`guessInput`);

// GAME RESET BUTTON
const resetGame = document.getElementById(`resetGame`);

// CANVAS
let canvas = document.getElementById(`hangmanCanvas`);

try {
  const game = new Hangman(canvas); // Instantiate game

  difficultySelectForm.addEventListener(`submit`, function (event) {
    event.preventDefault();

    const difficulty = difficultySelect.value;
    game.start(difficulty, function () {
      startWrapper.style.display = "none";
      gameWrapper.style.display = "block";

      wordHolderText.textContent = game.getWordHolderText();
      guessesText.textContent = game.getGuessesText();
    });
  });

  guessForm.addEventListener(`submit`, function (e) {
    e.preventDefault();

    const guess = guessInput.value.trim();
    if (!guess) return;

    game.guess(guess);

    wordHolderText.textContent = game.getWordHolderText();
    guessesText.textContent = game.getGuessesText();
    guessInput.value = "";

    if (game.isOver) {
      guessInput.disabled = true;
      guessForm.querySelector("button").disabled = true;
      resetGame.style.display = "block";

      if (game.didWin) {
        alert("You won!");
      } else {
        alert("Game over! The word was: " + game.word);
      }
    }
  });

  resetGame.addEventListener(`click`, function (e) {
    startWrapper.style.display = "block";
    gameWrapper.style.display = "none";

    guessInput.disabled = false;
    guessForm.querySelector("button").disabled = false;
    resetGame.style.display = "none";
  });
} catch (error) {
  console.error(error);
  alert(error);
}
