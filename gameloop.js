import { createGameWindow, createTitleScreen, toggleSound } from './ui.js';

let gameInProgress = false;
createTitleScreen();

document.getElementById('option1').addEventListener('click', function () {
    gameInProgress = initialiseNewGame(gameInProgress);
    console.log("gameInProgress after clicking new game =" + gameInProgress);
});
document.getElementById('option2').addEventListener('click', function () {
    // Add functionality for other options as needed
});
document.getElementById('option3').addEventListener('click', function () {
    // Add functionality for other options as needed
});
document.getElementById('option4').addEventListener('click', function () {
    toggleSound();
});

//let lastIncrementTime = 0; // Keep track of the last time the value was incremented
gameLoop();

function gameLoop() {
    gameInProgress = checkGameInProgress(gameInProgress);
    updateClock();

    // // Check if one second has passed since the last increment
    // const currentTime = new Date().getTime();
    // let amountToIncrement = 0;
    // if (gameInProgress && currentTime - lastIncrementTime >= 1000) { //speed to update chip count CHANGE THIS AS PLAYER GAINS MOMENTUM
    //     amountToIncrement = 0; //change this to make the incrementing amount per update higher
    //     incrementChipsValue(amountToIncrement);
    //     lastIncrementTime = currentTime; // Update last increment time
    // }

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    const clockElement = document.querySelector('.clock');
    clockElement.textContent = timeString;
}

function checkGameInProgress(gameInProgress) {
    if (gameInProgress) {
        return true;
    }
    return false;
}

function initialiseNewGame(gameInProgress) {
    if (gameInProgress) {
        return askUserToConfirmRestart();
    } else {
        document.getElementById('option1').textContent = "New Game";
        document.getElementById('optionsWindow').style.display = 'none';
        createGameWindow();
        document.getElementById('gameWindow').style.display = "block";
        return true;
    }
}

function askUserToConfirmRestart() {
    document.getElementById('option1').textContent = "Click again to start a New Game...";
}

// function incrementChipsValue(amountToIncrement) {
//     // Get the bottom text element in the top section
//     const bottomTextElement = document.querySelector('.top-div-row-2 .top-section-text');
//
//     // Get the current value and increment by 5
//     let currentValue = parseInt(bottomTextElement.textContent);
//     currentValue += amountToIncrement;
//
//     // Update the text content with the incremented value
//     bottomTextElement.textContent = currentValue.toString();
// }
