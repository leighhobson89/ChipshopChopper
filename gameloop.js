import {
    createGameWindow,
    createTitleScreen,
    toggleEndOfShiftPopup,
    toggleOverlay,
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
    getPriceToAddStorageHeater,
    getPriceToImproveFryerCapacity,
    getCurrentCash,
    getPriceToEnableDoubleChipping,
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
    getAddOneToRandomNumberToEnsureAboveOne,
    setCustomersWaitingBeforeEndOfShift,
    getStop,
    getElements,
    setElements,
    debugFlag,
    getPriceToImproveAutoMoverFromFryerToStorage,
    getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut,
    getPriceToImproveAutoChipper, getPriceToImproveAutoPeeler, getPriceToImproveAutoCustomerServer
} from './constantsAndGlobalVars.js';

let lastShiftUpdateTime = new Date().getTime();
let lastCustomerUpdateTime = new Date().getTime();
let lastFryingUpdateTime = new Date().getTime();
export let gameInProgress = false;

function main() {

    document.addEventListener('titleScreenCreated', setElements);
    const titleScreenCreatedEvent = new Event('titleScreenCreated');
    createTitleScreen();
    createGameWindow(titleScreenCreatedEvent);

    gameLoop();
}

document.addEventListener('DOMContentLoaded', () => {
    main();
});

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
    const clockElement = getElements().clock;
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
                getElements().subInnerDiv1_2.innerHTML = getShiftTimeRemaining().toString();
                //console.log(`Shift time remaining: ${getShiftTimeRemaining()} seconds`);
                if (getShiftTimeRemaining() === getZero()) {

                    setShiftInProgress(false);
                    setOldCash(getCurrentCash());
                    setCurrentCash((getCustomersServed() * getPriceOfChips()) + getCurrentCash());
                    getElements().subInnerDiv1_2.innerHTML = "Start Shift";
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
                    getElements().customersWaitingCount.innerHTML = getCustomersWaiting();

                    setChipsReadyToServeQuantity(null,'clear');
                    getElements().readyToServeCount.innerHTML = getZero().toString();
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
        const fryerButton = getElements().fryChipsButton;

        if (getFryTimeRemaining() > getZero()) {
            if (timeDiffSeconds >= getOneForTimeDiff()) {
                setFryTimer(getFryTimeRemaining() - getStandardDecrementIncrementOfOne());
                lastFryingUpdateTime = now;
                fryerButton.innerHTML = 'Frying ' + getQuantityOfChipsFrying() +' Chips <br> (' + getFryTimeRemaining() + 's)';
                //console.log(`Fry time remaining: ${getFryTimeRemaining()} seconds`);
                if (getFryTimeRemaining() === getZero()) {
                    setChipsFrying(false);
                    setChipsFriedThisShift(getChipsFriedThisShift() + getQuantityOfChipsFrying());
                    getElements().chuckedInFryerCount.innerHTML = (parseInt(getElements().chuckedInFryerCount.innerHTML) + getQuantityOfChipsFrying()).toString();
                    fryerButton.innerHTML = `Fry Chips (Capacity: ${getFryerCapacity()})`;
                    updateButtonStyle(fryerButton.id, null);
                    setQuantityOfChipsFrying(getZero());
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

export function initialiseNewGame(gameInProgress) {
    if (gameInProgress) {
        return askUserToConfirmRestart();
    } else {
        getElements().option1.innerHTML = "New Game";
        getElements().optionsWindow.style.display = 'none';
        //debug
        getElements().debugsWindow.style.display = 'none';
        //
        createRandomCustomerTime();
        getElements().gameWindow.style.display = "block";
        return true;
    }
}

function askUserToConfirmRestart() {
    getElements().option1.innerHTML = "Click again to start a New Game...";
}

export function updateVisibleButtons() {
    if (!shiftInProgress && (getShiftCounter() > getZero() || debugFlag)) {
        //manual phase upgrades
        if (getCurrentCash() >= getPriceToImprovePotatoStorage()) {
            getElements().improvePotatoStorageButton.classList.remove('hidden-button');
        }
        if (getCurrentCash() >= getPriceToEnableDoublePeeling()) {
            getElements().twoHandedPeelingButton.classList.remove('hidden-button');
        }
        if (getCurrentCash() >= getPriceToEnableDoubleChipping()) {
            getElements().twoHandedChippingButton.classList.remove('hidden-button');
        }
        if (getCurrentCash() >= getPriceToImproveFryerCapacity()) {
            getElements().improveFryerCapacityButton.classList.remove('hidden-button');
        }
        if (getCurrentCash() >= getPriceToAddStorageHeater()) {
            getElements().addStorageHeaterButton.classList.remove('hidden-button');
        }
        //auto phase upgrades
        if (getCurrentCash() >= getPriceToImproveAutoPeeler()) {
            getElements().autoPeelerUpgradeButton.classList.remove('hidden-button');
        }
        if (getCurrentCash() >= getPriceToImproveAutoChipper()) {
            getElements().autoChipperUpgradeButton.classList.remove('hidden-button');
        }
        if (getCurrentCash() >= getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut()) {
            getElements().autoFryerUpgradeButton.classList.remove('hidden-button');
        }
        if (getCurrentCash() >= getPriceToImproveAutoMoverFromFryerToStorage()) {
            getElements().autoStorageCollectorUpgradeButton.classList.remove('hidden-button');
        }
        if (getCurrentCash() >= getPriceToImproveAutoCustomerServer()) {
            getElements().autoCustomerServerUpgradeButton.classList.remove('hidden-button');
        }
        disableButtons(false);
    }
}

function wasteChipsStillInFryerOrFryingAtEndOfShift() {
    const fryerButton = getElements().fryChipsButton;
    const fryerCount = parseInt(getElements().chuckedInFryerCount.innerHTML);

    setChipsFrying(false);
    setFryTimer(getZero());
    getElements().fryChipsButton.innerHTML = `Fry Chips (Capacity: ${getFryerCapacity()})`;
    setChipsWastedThisShift(fryerCount + getQuantityOfChipsFrying() + getChipsWastedThisShift());
    setQuantityOfChipsFrying(getZero());
    if (fryerButton.classList.contains('action-button-main-flashing')) {
        updateButtonStyle(fryerButton.id, getStop());
    }
    updateButtonStyle(fryerButton.id, null);
    getElements().chuckedInFryerCount.innerHTML = getZero().toString();
}

function selectHowManyCustomersLeftAfterWalkOutAtShiftEnd() {
    let customersWaiting = getCustomersWaiting();
    const randomWalkouts = Math.floor(Math.random() * (customersWaiting + getAddOneToRandomNumberToEnsureAboveOne())); // Random whole number between 0 and customersWaiting

    customersWaiting -= randomWalkouts;
    return customersWaiting;
}

export function setGameInProgress(value) {
    gameInProgress = value;
}