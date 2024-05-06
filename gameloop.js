import {
    createEndOfShiftPopup,
    createGameWindow,
    createOverlay,
    createTitleScreen,
    formatToCashNotation,
    toggleEndOfShiftPopup,
    toggleOverlay,
    toggleSound,
    updateButtonStyle,
    writePopupText
} from './ui.js';

import {
    createRandomCustomerTime,
    decrementCounter,
    disableButtons,
    incrementCustomersWaiting,
    PRICE_OF_CHIPS,
} from './actions.js';

export const COOL_DOWN_TIMER = 30; //30
export const endOfShiftPopupObject = createEndOfShiftPopup();
export const endOfShiftPopup = endOfShiftPopupObject.popupContainer;
export const popupContinueButton = endOfShiftPopupObject.continueButton;
export const popupOverlay = createOverlay();
export let customerTime = 0;
export let shiftTimeRemaining = 0;
export let fryTimeRemaining = 0;

export let coolDownTimeRemaining = 0;
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
export let peelPotatoesRate = 1;
export let chipsReadyToServeQuantity = [];
export let fryerCapacity = 100;

//PRICES
export let priceToImprovePotatoStorage = 5; //50
export let priceToEnableDoubleChopping = 6; //60
export let priceToEnableDoublePeeling = 4; //40
export let priceToImproveFryerCapacity = 7; //100
export let priceToAddStorageHeater = 8; //200

//STATS
export let oldCash = 0;
export let potatoesPeeledThisShift = 0;
export let chipsCutThisShift = 0;
export let chipsFriedThisShift = 0;
export let customersWaiting = 0;
export let chipsWastedThisShift = 0;

export let batchTimers = {};

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
popupContinueButton.addEventListener('click', function() {
    toggleEndOfShiftPopup(endOfShiftPopup);
    toggleOverlay(popupOverlay);
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
                //console.log(`Customer time remaining: ${customerTime} seconds`);
                if (customerTime === 0) {
                    incrementCustomersWaiting();
                    setCustomersWaiting(getCustomersWaiting() + 1);
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
                //console.log(`Shift time remaining: ${shiftTimeRemaining} seconds`);
                if (shiftTimeRemaining === 0) {

                    setShiftInProgress(false);
                    setOldCash(getCurrentCash());
                    setCurrentCash((getCustomersServed() * PRICE_OF_CHIPS) + getCurrentCash());
                    document.getElementById('subInnerDiv1_2').innerHTML = "Start Shift";
                    disableButtons(false);

                    for (let i = 0; i < getChipsReadyToServeQuantity().length; i++) {
                        clearInterval(batchTimers[i]);  //kill all timers end of shift
                        console.log("Wasted this shift before adding chipsreadytoservequantity: " + getChipsWastedThisShift());
                        console.log("value of chipsreadytoservequantity: " + getChipsReadyToServeQuantity()[i]);
                        setChipsWastedThisShift(getChipsWastedThisShift() + getChipsReadyToServeQuantity()[i]);
                    }
                    chipsReadyToServeQuantity = [];
                    document.getElementById('readyToServeCount').innerHTML = "0";
                    batchTimers = [];

                    writePopupText(getShiftCounter());
                    setCustomersServed(0);
                    toggleEndOfShiftPopup(endOfShiftPopup);
                    toggleOverlay(popupOverlay);
                    setPotatoesPeeledThisShift(0);
                    setChipsCutThisShift(0);
                    setChipsFriedThisShift(0);
                    setChipsWastedThisShift(0);
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
                //console.log(`Fry time remaining: ${getFryTimer()} seconds`);
                if (getFryTimer() === 0) {
                    setChipsFrying(false);
                    setChipsFriedThisShift(getChipsFriedThisShift() + getQuantityFrying());
                    document.getElementById('chuckedInFryerCount').innerHTML = (parseInt(document.getElementById('chuckedInFryerCount').innerHTML) + getQuantityFrying()).toString();
                    document.getElementById('fryChipsButton').innerHTML = `Fry Chips (Capacity: ${getFryerCapacity()})`;
                    updateButtonStyle('fryChipsButton');
                    disableButtons(false);
                }
            }
        }
    }
}

export function startBatchTimer(batchId) {
    coolDownTimeRemaining = COOL_DOWN_TIMER; // Set the initial cool downtime
    console.log("Going to start a batch timer with id:" + batchId);
    batchTimers[batchId] = setInterval(() => {
        updateChipsCoolDownTimer(batchId);
    }, 1000);
}

function updateChipsCoolDownTimer(batchId) {
    console.log("Cool down timer value: " + coolDownTimeRemaining);
    if (coolDownTimeRemaining > 0) {
        console.log(`Batch ${batchId} - Cool Down time remaining: ${coolDownTimeRemaining} seconds`);
        coolDownTimeRemaining--;
    } else {
        clearInterval(batchTimers[batchId]);
        triggerWastingProcessForBatch(batchId);
    }
}

async function triggerWastingProcessForBatch(batchId) {
    console.log(`Batch ${batchId} - wasting process triggered`);

    while (getChipsReadyToServeQuantity()[batchId] > 0) {
        console.log(`Batch ${batchId} - wasting one chip ${getChipsReadyToServeQuantity()[batchId]} remaining in [${batchId}]th element`);

        if (getChipsReadyToServeQuantity()[batchId] === 0) {
            console.log(`Batch ${batchId} - shifting array, element [${batchId}] has no chips left`);
            getChipsReadyToServeQuantity().splice(batchId, 1);
            clearInterval(batchTimers[batchId]);
        } else {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(`Batch ${batchId} - going to waste a chip, ${getChipsReadyToServeQuantity()[batchId]} remaining`);
            setChipsReadyToServeQuantity(batchId, getChipsReadyToServeQuantity()[batchId] - 1);
            setChipsWastedThisShift(getChipsWastedThisShift() + 1);
            console.log(`Batch ${batchId} - A chip is wasted, ${getChipsReadyToServeQuantity()[batchId]} remaining in this batch`);
            decrementCounter('readyToServeCount', 1);
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
        createRandomCustomerTime();
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
        if (getCurrentCash() >= getPriceToEnableDoublePeeling()) {
            document.getElementById('twoHandedPeelingButton').classList.remove('hidden-button');
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
        disableButtons(false);
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

export function getPeelPotatoesRate() {
    return peelPotatoesRate;
}

export function setPeelPotatoesRate(value) {
    peelPotatoesRate = value;
}

export function getPriceToEnableDoublePeeling() {
    return priceToEnableDoublePeeling;
}

export function setPriceToEnableDoublePeeling(value) {
    priceToEnableDoublePeeling = value;
}

export function getOldCash() {
    return oldCash;
}

export function setOldCash(value) {
    oldCash = value;
}

export function getPotatoesPeeledThisShift() {
    return potatoesPeeledThisShift;
}

export function setPotatoesPeeledThisShift(value) {
    potatoesPeeledThisShift = value;
}

export function getChipsCutThisShift() {
    return chipsCutThisShift;
}

export function setChipsCutThisShift(value) {
    chipsCutThisShift = value;
}

export function getChipsFriedThisShift() {
    return chipsFriedThisShift;
}

export function setChipsFriedThisShift(value) {
    chipsFriedThisShift = value;
}

export function getCustomersWaiting() {
    return customersWaiting;
}

export function setCustomersWaiting(value) {
    customersWaiting = value;
}

export function getChipsReadyToServeQuantity() {
    return chipsReadyToServeQuantity;
}

export function setChipsReadyToServeQuantity(index, value) {
    chipsReadyToServeQuantity[index] = value;
}

export function getFryerCapacity() {
    return fryerCapacity;
}

export function setFryerCapacity(value) {
    fryerCapacity = value;
}

export function getChipsWastedThisShift() {
    return chipsWastedThisShift;
}

export function setChipsWastedThisShift(value) {
    chipsWastedThisShift = value;
}

