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
    getQuantityOfChipsFrying,
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
    getCoolDownTimer,
    getClockSpeed,
    getZero,
    getOneForTimeDiff,
    getStandardDecrementIncrementOfOne,
    getJustDeleteTheOneElementFromArray,
    resetBatchTimers,
    setQuantityOfChipsFrying,
    getAddOneToRandomNumberToEnsureAboveOne, setCustomersWaitingBeforeEndOfShift
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
        const timeDiffSeconds = (now - lastCustomerUpdateTime) / getClockSpeed();

        if (getCustomerTime() > getZero()) {
            if (timeDiffSeconds >= getOneForTimeDiff()) {
                setCustomerTime(getCustomerTime() - getStandardDecrementIncrementOfOne());
                lastCustomerUpdateTime = now;
                //console.log(`Customer time remaining: ${getCustomerTime()} seconds`);
                if (getCustomerTime() === getZero()) {
                    incrementCustomersWaiting();
                    setCustomersWaiting(getCustomersWaiting() + getStandardDecrementIncrementOfOne());
                    createRandomCustomerTime();
                }
            }
        }
    }
}

function updateShiftCountDown() {
    if (shiftInProgress) {
        const now = new Date().getTime();
        const timeDiffSeconds = (now - lastShiftUpdateTime) / getClockSpeed();

        if (getShiftTimeRemaining() > getZero()) {
            if (timeDiffSeconds >= getOneForTimeDiff()) {
                setShiftTimeRemaining(getShiftTimeRemaining() - 1);
                lastShiftUpdateTime = now;
                document.getElementById('subInnerDiv1_2').innerHTML = getShiftTimeRemaining().toString();
                //console.log(`Shift time remaining: ${getShiftTimeRemaining()} seconds`);
                if (getShiftTimeRemaining() === getZero()) {

                    setShiftInProgress(false);
                    setOldCash(getCurrentCash());
                    setCurrentCash((getCustomersServed() * getPriceOfChips()) + getCurrentCash());
                    document.getElementById('subInnerDiv1_2').innerHTML = "Start Shift";
                    disableButtons(false);

                    wasteChipsStillInFryerOrFryingAtEndOfShift();

                    for (let i = 0; i < getChipsReadyToServeQuantity().length; i++) {
                        clearInterval(batchTimers[i]);  //kill all timers end of shift
                        // console.log("Wasted this shift before adding chipsreadytoservequantity: " + getChipsWastedThisShift());
                        // console.log("value of chipsreadytoservequantity: " + getChipsReadyToServeQuantity()[i]);
                        setChipsWastedThisShift(getChipsWastedThisShift() + getChipsReadyToServeQuantity()[i]);
                    }

                    setCustomersWaitingBeforeEndOfShift(getCustomersWaiting());
                    setCustomersWaiting(selectHowManyCustomersLeftAfterWalkOutAtShiftEnd());
                    document.getElementById('customersWaitingCount').innerHTML = getCustomersWaiting();

                    setChipsReadyToServeQuantity(null,'clear');
                    document.getElementById('readyToServeCount').innerHTML = getZero().toString();
                    resetBatchTimers();

                    writePopupText();
                    setCustomersServed(getZero());
                    toggleEndOfShiftPopup(endOfShiftPopup);
                    toggleOverlay(popupOverlay);
                    setPotatoesPeeledThisShift(getZero());
                    setChipsCutThisShift(getZero());
                    setChipsFriedThisShift(getZero());
                    setChipsWastedThisShift(getZero());
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
        const timeDiffSeconds = (now - lastFryingUpdateTime) / getClockSpeed();

        if (getFryTimeRemaining() > getZero()) {
            if (timeDiffSeconds >= getOneForTimeDiff()) {
                setFryTimer(getFryTimeRemaining() - getStandardDecrementIncrementOfOne());
                lastFryingUpdateTime = now;
                document.getElementById('fryChipsButton').innerHTML = 'Frying ' + getQuantityOfChipsFrying() +' Chips <br> (' + getFryTimeRemaining() + 's)';
                //console.log(`Fry time remaining: ${getFryTimeRemaining()} seconds`);
                if (getFryTimeRemaining() === getZero()) {
                    setChipsFrying(false);
                    setChipsFriedThisShift(getChipsFriedThisShift() + getQuantityOfChipsFrying());
                    document.getElementById('chuckedInFryerCount').innerHTML = (parseInt(document.getElementById('chuckedInFryerCount').innerHTML) + getQuantityOfChipsFrying()).toString();
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
    }, getClockSpeed());
}

function updateChipsCoolDownTimer(batchId) {
    // console.log("Cool down timer value: " + getCoolDownTimeRemaining());
    if (getCoolDownTimeRemaining() > getZero()) {
        // console.log(`Batch ${batchId} - CoolDownTime remaining: ${getCoolDownTimeRemaining()} seconds`);
        setCoolDownTimeRemaining(getCoolDownTimeRemaining() - getStandardDecrementIncrementOfOne());
    } else {
        clearInterval(batchTimers[batchId]);
        triggerWastingProcessForBatch(batchId).then(() => {});
    }
}

async function triggerWastingProcessForBatch(batchId) {
    // console.log(`Batch ${batchId} - wasting process triggered`);

    while (getChipsReadyToServeQuantity()[batchId] > getZero()) {
        // console.log(`Batch ${batchId} - wasting one chip ${getChipsReadyToServeQuantity()[batchId]} remaining in [${batchId}]th element`);

        if (getChipsReadyToServeQuantity()[batchId] === getZero()) {
            // console.log(`Batch ${batchId} - shifting array, element [${batchId}] has no chips left`);
            getChipsReadyToServeQuantity().splice(batchId, getJustDeleteTheOneElementFromArray());
            clearInterval(batchTimers[batchId]);
        } else {
            await new Promise(resolve => setTimeout(resolve, getClockSpeed()));
            // console.log(`Batch ${batchId} - going to waste a chip, ${getChipsReadyToServeQuantity()[batchId]} remaining`);
            setChipsReadyToServeQuantity(batchId, getChipsReadyToServeQuantity()[batchId] - getStandardDecrementIncrementOfOne());
            setChipsWastedThisShift(getChipsWastedThisShift() + getStandardDecrementIncrementOfOne());
            // console.log(`Batch ${batchId} - A chip is wasted, ${getChipsReadyToServeQuantity()[batchId]} remaining in this batch`);
            decrementCounter('readyToServeCount', getStandardDecrementIncrementOfOne());
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
    if (!shiftInProgress && getShiftCounter() > getZero()) {
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

function wasteChipsStillInFryerOrFryingAtEndOfShift() {
    const fryerCount = parseInt(document.getElementById('chuckedInFryerCount').innerHTML);

    setChipsFrying(false);
    setFryTimer(getZero());
    document.getElementById('fryChipsButton').innerHTML = `Fry Chips (Capacity: ${getFryerCapacity()})`;
    setChipsWastedThisShift(fryerCount + getQuantityOfChipsFrying() + getChipsWastedThisShift());
    setQuantityOfChipsFrying(getZero());
    updateButtonStyle('fryChipsButton');
    document.getElementById('chuckedInFryerCount').innerHTML = getZero().toString();
}

function selectHowManyCustomersLeftAfterWalkOutAtShiftEnd() {
    let customersWaiting = getCustomersWaiting();
    const randomWalkouts = Math.floor(Math.random() * (customersWaiting + getAddOneToRandomNumberToEnsureAboveOne())); // Random whole number between 0 and customersWaiting

    customersWaiting -= randomWalkouts;
    return customersWaiting;
}