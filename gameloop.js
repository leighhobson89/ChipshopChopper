import { createTitleScreen, toggleSound } from './ui.js';

let gameInProgress = false;
createTitleScreen();

document.getElementById('option1').addEventListener('click', function() {
    gameInProgress = initialiseNewGame(gameInProgress);
    console.log("gameInProgress after clicking new game =" + gameInProgress);
});
document.getElementById('option2').addEventListener('click', function() {
});
document.getElementById('option3').addEventListener('click', function() {
});
document.getElementById('option4').addEventListener('click', function() {
    toggleSound();
});

gameLoop();

function gameLoop() {
    gameInProgress = checkGameInProgress(gameInProgress);
    updateClock();

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
    console.log("gameInProgress after check=" + gameInProgress);
    if(gameInProgress) {
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
        return true;
    }
}

function askUserToConfirmRestart() {
    document.getElementById('option1').textContent = "Click again to start a New Game...";
}
