import {
    createGameWindow,
    createTitleScreen,
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
    incrementCustomersWaiting
} from './actions.js';
import {
    batchTimers,
    endOfShiftPopup,
    popupOverlay,
    shiftInProgress,
    popupContinueButton,
    getPriceToAddStorageHeater,
    getPriceToImproveFryerCapacity,
    getCurrentCash,
    getPriceToEnableDoubleChopping,
    getPriceToEnableDoublePeeling,
    getPriceToImprovePotatoStorage,
    getChipsReadyToServeQuantity,
    getChipsWastedThisShift,
    setChipsWastedThisShift,
    setChipsReadyToServeQuantity,
    getCoolDownTimeRemaining,
    setCoolDownTimeRemaining,
    getMultipleForHeaterEffectOnCoolDown,
    getFryerCapacity,
    getQuantityFrying,
    getChipsFriedThisShift,
    setChipsFriedThisShift,
    setChipsFrying,
    getFryTimeRemaining,
    setFryTimer,
    getChipsFrying,
    setChipsCutThisShift,
    setPotatoesPeeledThisShift,
    setCustomersServed,
    getShiftCounter,
    getCustomersServed,
    setCurrentCash,
    setOldCash,
    setShiftInProgress,
    getCustomersWaiting,
    setCustomersWaiting,
    getShiftInProgress,
    getPriceOfChips,
    getShiftTimeRemaining,
    setShiftTimeRemaining,
    getCustomerTime,
    setCustomerTime,
    getCoolDownTimer
} from './constantsAndGlobalVars.js';

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

        if (getCustomerTime() > 0) {
            if (timeDiffSeconds >= 1) {
                setCustomerTime(getCustomerTime() - 1);
                lastCustomerUpdateTime = now;
                //console.log(`Customer time remaining: ${getCustomerTime()} seconds`);
                if (getCustomerTime() === 0) {
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

        if (getShiftTimeRemaining() > 0) {
            if (timeDiffSeconds >= 1) {
                setShiftTimeRemaining(getShiftTimeRemaining() - 1);
                lastShiftUpdateTime = now;
                document.getElementById('subInnerDiv1_2').innerHTML = getShiftTimeRemaining().toString();
                //console.log(`Shift time remaining: ${getShiftTimeRemaining()} seconds`);
                if (getShiftTimeRemaining() === 0) {

                    setShiftInProgress(false);
                    setOldCash(getCurrentCash());
                    setCurrentCash((getCustomersServed() * getPriceOfChips()) + getCurrentCash());
                    document.getElementById('subInnerDiv1_2').innerHTML = "Start Shift";
                    disableButtons(false);

                    for (let i = 0; i < getChipsReadyToServeQuantity().length; i++) {
                        clearInterval(batchTimers[i]);  //kill all timers end of shift
                        // console.log("Wasted this shift before adding chipsreadytoservequantity: " + getChipsWastedThisShift());
                        // console.log("value of chipsreadytoservequantity: " + getChipsReadyToServeQuantity()[i]);
                        setChipsWastedThisShift(getChipsWastedThisShift() + getChipsReadyToServeQuantity()[i]);
                    }
                    setChipsReadyToServeQuantity(null,'clear');
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

        if (getFryTimeRemaining() > 0) {
            if (timeDiffSeconds >= 1) {
                setFryTimer(getFryTimeRemaining() - 1);
                lastFryingUpdateTime = now;
                document.getElementById('fryChipsButton').innerHTML = 'Frying ' + getQuantityFrying() +' Chips <br> (' + getFryTimeRemaining() + 's)';
                //console.log(`Fry time remaining: ${getFryTimeRemaining()} seconds`);
                if (getFryTimeRemaining() === 0) {
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
    setCoolDownTimeRemaining(getCoolDownTimer() * getMultipleForHeaterEffectOnCoolDown());
    // console.log("Going to start a batch timer with id:" + batchId);
    batchTimers[batchId] = setInterval(() => {
        updateChipsCoolDownTimer(batchId);
    }, 1000);
}

function updateChipsCoolDownTimer(batchId) {
    // console.log("Cool down timer value: " + getCoolDownTimeRemaining());
    if (getCoolDownTimeRemaining() > 0) {
        // console.log(`Batch ${batchId} - CoolDownTime remaining: ${getCoolDownTimeRemaining()} seconds`);
        setCoolDownTimeRemaining(getCoolDownTimeRemaining() - 1);
    } else {
        clearInterval(batchTimers[batchId]);
        triggerWastingProcessForBatch(batchId).then(() => {});
    }
}

async function triggerWastingProcessForBatch(batchId) {
    // console.log(`Batch ${batchId} - wasting process triggered`);

    while (getChipsReadyToServeQuantity()[batchId] > 0) {
        // console.log(`Batch ${batchId} - wasting one chip ${getChipsReadyToServeQuantity()[batchId]} remaining in [${batchId}]th element`);

        if (getChipsReadyToServeQuantity()[batchId] === 0) {
            // console.log(`Batch ${batchId} - shifting array, element [${batchId}] has no chips left`);
            getChipsReadyToServeQuantity().splice(batchId, 1);
            clearInterval(batchTimers[batchId]);
        } else {
            await new Promise(resolve => setTimeout(resolve, 1000));
            // console.log(`Batch ${batchId} - going to waste a chip, ${getChipsReadyToServeQuantity()[batchId]} remaining`);
            setChipsReadyToServeQuantity(batchId, getChipsReadyToServeQuantity()[batchId] - 1);
            setChipsWastedThisShift(getChipsWastedThisShift() + 1);
            // console.log(`Batch ${batchId} - A chip is wasted, ${getChipsReadyToServeQuantity()[batchId]} remaining in this batch`);
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
    if (!shiftInProgress && getShiftCounter() > 0) {
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