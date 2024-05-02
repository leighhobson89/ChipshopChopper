import { createGameWindow, createTitleScreen, toggleSound } from './ui.js';
import {createRandomCustomerTime, disableButtons, incrementCustomersWaiting} from './actions.js';

export let customerTime = 0;
export let shiftTimeRemaining = 0;
export let shiftInProgress = false;

let lastShiftUpdateTime = new Date().getTime();
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
    updateShiftCountDown();

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
    if (getShiftInProgress()) {
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
}

function updateShiftCountDown() {
    if (shiftInProgress) {
        const now = new Date().getTime();
        const timeDiffSeconds = (now - lastShiftUpdateTime) / 1000;

        if (shiftTimeRemaining > 0) {
            if (timeDiffSeconds >= 1) {
                shiftTimeRemaining--;
                lastShiftUpdateTime = now;
                document.getElementById('subInnerDiv1_2').textContent = shiftTimeRemaining;
                console.log(`Shift time remaining: ${shiftTimeRemaining} seconds`);
                if (shiftTimeRemaining === 0) {
                    setShiftInProgress(false);
                    document.getElementById('subInnerDiv1_2').textContent = "Start Shift";
                    disableButtons(false);
                }
            }
        }
    } else {
        disableButtons(true);
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

export function setShiftTime(value) {
    shiftTimeRemaining = value;
}

export function getShiftTime() {
    return shiftTimeRemaining;
}

export function setShiftInProgress(value) {
    shiftInProgress = value;
}

export function getShiftInProgress() {
    return shiftInProgress;
}