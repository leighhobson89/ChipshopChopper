import { createGameWindow, createTitleScreen, toggleSound } from './ui.js';
import { createRandomCustomerTime, incrementCustomersWaiting } from './actions.js';

export let customerTime = 0;
let lastCustomerUpdateTime = new Date().getTime();

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

gameLoop();

function gameLoop() {
    gameInProgress = checkGameInProgress(gameInProgress);
    updateClock();
    updateCustomerCountdown();

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

function updateCustomerCountdown() {
    const now = new Date().getTime();
    const timeDiffSeconds = (now - lastCustomerUpdateTime) / 1000;

    if (customerTime > 0) {
        if (timeDiffSeconds >= 1) {
            customerTime--;
            lastCustomerUpdateTime = now;
            console.log(`Customer time remaining: ${customerTime} seconds`);
            if (customerTime === 0) {
                incrementCustomersWaiting();
                createRandomCustomerTime();
            }
        }
    }
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
        createRandomCustomerTime(); //create timer for first new customer
        document.getElementById('gameWindow').style.display = "block";
        return true;
    }
}

function askUserToConfirmRestart() {
    document.getElementById('option1').textContent = "Click again to start a New Game...";
}

export function setCustomerTime(value) {
    customerTime = value;
}

export function getCustomerTime() {
    return customerTime;
}
