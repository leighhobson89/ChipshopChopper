import {createGameWindow, createTitleScreen, formatToCashNotation, toggleSound, updateButtonStyle} from './ui.js';
import {
    createRandomCustomerTime,
    disableButtons,
    incrementCustomersWaiting,
    PRICE_OF_CHIPS,
    STARTING_SPUDS
} from './actions.js';

export let customerTime = 0;
export let shiftTimeRemaining = 0;
export let fryTimeRemaining = 0;
export let shiftCounter = 0;
export let shiftInProgress = false;
export let customersServed = 0;
export let currentCash = 0;
export let chipsFrying = false;
export let quantityFrying = 0;
export let spudsToAddToShift = 0;
export let actualPotatoesInStorage = 100;
export let potatoStorage = 200;

export let cutChipsRate = 1;

//PRICES
export let priceToImprovePotatoStorage = 5; //50
export let priceToEnableDoubleChopping = 6; //60
export let priceToImproveFryerCapacity = 7; //100
export let priceToAddStorageHeater = 8; //200

let lastShiftUpdateTime = new Date().getTime();
let lastCustomerUpdateTime = new Date().getTime();
let lastFryingUpdateTime = new Date().getTime();

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
    gameInProgress = !!gameInProgress;
    updateClock();
    updateCustomerCountdown();
    updateShiftCountDown();
    updateChipsFryingTimer();
    updateVisibleButtons();

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
    clockElement.innerHTML = timeString;
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
                document.getElementById('subInnerDiv1_2').innerHTML = shiftTimeRemaining;
                console.log(`Shift time remaining: ${shiftTimeRemaining} seconds`);
                if (shiftTimeRemaining === 0) {
                    setShiftInProgress(false);
                    setCurrentCash((getCustomersServed() * PRICE_OF_CHIPS) + getCurrentCash());
                    setCustomersServed(0);
                    document.getElementById('subInnerDiv1_2').innerHTML = "Start Shift";
                    disableButtons(false);
                }
            }
        }
    } else {
        disableButtons(true);
    }
}

function updateChipsFryingTimer() {
    if (getChipsFrying()) {
        const now = new Date().getTime();
        const timeDiffSeconds = (now - lastFryingUpdateTime) / 1000;

        if (getFryTimer() > 0) {
            if (timeDiffSeconds >= 1) {
                setFryTimer(getFryTimer() - 1);
                lastFryingUpdateTime = now;
                document.getElementById('fryChipsButton').innerHTML = 'Frying ' + getQuantityFrying() +' Chips <br> (' + getFryTimer() + 's)';
                console.log(`Fry time remaining: ${getFryTimer()} seconds`);
                if (getFryTimer() === 0) {
                    setChipsFrying(false);
                    document.getElementById('chuckedInFryerCount').innerHTML = (parseInt(document.getElementById('chuckedInFryerCount').innerHTML) + getQuantityFrying()).toString();
                    document.getElementById('fryChipsButton').innerHTML = "Fry Chips";
                    updateButtonStyle('fryChipsButton');
                    disableButtons(false);
                }
            }
        }
    }
}

function initialiseNewGame(gameInProgress) {
    if (gameInProgress) {
        return askUserToConfirmRestart();
    } else {
        document.getElementById('option1').innerHTML = "New Game";
        document.getElementById('optionsWindow').style.display = 'none';
        createGameWindow();
        createRandomCustomerTime(); //create timer for first new customer
        document.getElementById('gameWindow').style.display = "block";
        return true;
    }
}

function askUserToConfirmRestart() {
    document.getElementById('option1').innerHTML = "Click again to start a New Game...";
}

function updateVisibleButtons() {
    if (!shiftInProgress && shiftCounter > 0) {
        if (getCurrentCash() >= getPriceToImprovePotatoStorage()) {
            document.getElementById('improvePotatoStorageButton').classList.remove('hidden-button');
        }
        if (getCurrentCash() >= getPriceToEnableDoubleChopping()) {
            document.getElementById('twoHandedChoppingButton').classList.remove('hidden-button');
        }
        if (getCurrentCash() >= getPriceToImproveFryerCapacity()) {
            document.getElementById('improveFryerCapacityButton').classList.remove('hidden-button');
        }
        if (getCurrentCash() >= getPriceToAddStorageHeater()) {
            document.getElementById('addStorageHeaterButton').classList.remove('hidden-button');
        }
    }
}

//GETTER SETTER METHODS

export function setActualPotatoesInStorage(value) {
    actualPotatoesInStorage = value;
}

export function getActualPotatoesInStorage() {
    return actualPotatoesInStorage;
}

export function setCustomerTime(value) {
    customerTime = value;
}

export function getCustomerTime() {
    return customerTime;
}

export function setShiftCounter(value) {
    shiftCounter = value;
}

export function getShiftCounter() {
    return shiftCounter;
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

export function setCustomersServed(value) {
    customersServed = value;
    document.getElementById('subInnerDiv3_2').innerHTML = value;
}

export function getCustomersServed() {
    return customersServed;
}

export function setCurrentCash(value) {
    currentCash = value;
    document.getElementById('subInnerDivMid3_2').innerHTML = formatToCashNotation(getCurrentCash());
}

export function getCurrentCash() {
    return currentCash;
}

export function setChipsFrying(value) {
    chipsFrying = value;
}

export function getChipsFrying() {
    return chipsFrying;
}

export function setQuantityFrying(value) {
    quantityFrying = value;
}

export function getQuantityFrying() {
    return quantityFrying;
}

export function setFryTimer(value) {
    fryTimeRemaining = value;
}

export function getFryTimer() {
    return fryTimeRemaining;
}

export function getSpudsToAddToShift() {
    return spudsToAddToShift;
}

export function setSpudsToAddToShift(value) {
    spudsToAddToShift = value;
}

export function getPriceToImprovePotatoStorage() {
    return priceToImprovePotatoStorage;
}

export function setPriceToImprovePotatoStorage(value) {
    priceToImprovePotatoStorage = value;
}

export function getPotatoStorageQuantity() {
    return potatoStorage;
}

export function setPotatoStorageQuantity(value) {
    potatoStorage = value;
}

export function getPriceToEnableDoubleChopping() {
    return priceToEnableDoubleChopping;
}

export function setPriceToEnableDoubleChopping(value) {
    priceToEnableDoubleChopping = value;
}

export function getPriceToImproveFryerCapacity() {
    return priceToImproveFryerCapacity;
}

export function setPriceToImproveFryerCapacity(value) {
    priceToImproveFryerCapacity = value;
}

export function getPriceToAddStorageHeater() {
    return priceToAddStorageHeater;
}

export function setPriceToAddStorageHeater(value) {
    priceToAddStorageHeater = value;
}

export function getCutChipsRate() {
    return cutChipsRate;
}

export function setCutChipsRate(value) {
    cutChipsRate = value;
}