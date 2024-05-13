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
    cutChips,
    decrementCounter,
    disableButtons,
    fryChips,
    handleServingStorage,
    incrementCustomersWaiting,
    peelPotato,
    serveCustomer
} from './actions.js';

import {
    batchTimers,
    debugFlag,
    endOfShiftPopup,
    getActualPotatoesInStorage,
    getAddOneToRandomNumberToEnsureAboveOne,
    getAutoChipperBought,
    getAutoChipperCounter,
    getAutoCustomerServerBought,
    getAutoCustomerServerCounter,
    getAutoFryerBought,
    getAutoFryerCounter,
    getAutoFryerEfficiency,
    getAutoPeelerBought,
    getAutoPeelerCounter,
    getAutoStorageCollectorBought,
    getAutoStorageCollectorCounter,
    getAutoUpgradesClockSpeed,
    getChipsFriedThisShift,
    getChipsFrying,
    getChipsReadyToServeQuantity,
    getChipsWastedThisShift,
    getClockSpeed,
    getCoolDownTimer,
    getCoolDownTimeRemaining,
    getCurrentCash,
    getCurrentSpeedAutoChipper,
    getCurrentSpeedAutoCustomerServer,
    getCurrentSpeedAutoFryer,
    getCurrentSpeedAutoPeeler,
    getCurrentSpeedAutoStorageCollector,
    getCustomersServed,
    getCustomersWaiting,
    getCustomerTime,
    getElements,
    getFryerCapacity,
    getFryTimeRemaining,
    getJustDeleteTheOneElementFromArray,
    getMultipleForHeaterEffectOnCoolDown,
    getNumberOfChipsFromPotato,
    getOne,
    getOneForTimeDiff,
    getPortionSize,
    getPriceOfChips,
    getPriceToAddStorageHeater,
    getPriceToEnableDoubleChipping,
    getPriceToEnableDoublePeeling,
    getPriceToImproveAutoChipper,
    getPriceToImproveAutoCustomerServer,
    getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut,
    getPriceToImproveAutoMoverFromFryerToStorage,
    getPriceToImproveAutoPeeler,
    getPriceToImproveFryerCapacity,
    getPriceToImprovePotatoStorage,
    getQuantityOfChipsFrying,
    getShiftCounter,
    getShiftInProgress,
    getShiftTimeRemaining,
    getStandardDecrementIncrementOfOne,
    getStop,
    getZero,
    popupOverlay,
    resetBatchTimers,
    setAutoChipperCounter,
    setAutoCustomerServerCounter,
    setAutoFryerCounter,
    setAutoPeelerCounter,
    setAutoStorageCollectorCounter,
    setChipsCutThisShift,
    setChipsFriedThisShift,
    setChipsFrying,
    setChipsReadyToServeQuantity,
    setChipsWastedThisShift,
    setCoolDownTimeRemaining,
    setCurrentCash,
    setCustomersServed,
    setCustomersWaiting,
    setCustomersWaitingBeforeEndOfShift,
    setCustomerTime,
    setElements,
    setFryTimer,
    setOldCash,
    setPotatoesPeeledThisShift,
    setQuantityOfChipsFrying,
    setShiftInProgress,
    setShiftTimeRemaining,
    shiftInProgress,
    TIMER_CORRECTION_COEFFICIENT,
} from './constantsAndGlobalVars.js';

let lastShiftUpdateTime = new Date().getTime();
let lastCustomerUpdateTime = new Date().getTime();
let lastFryingUpdateTime = new Date().getTime();
let lastAutoUpgradesUpdateTime = new Date().getTime();

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
                //console.log(`Customer time remaining: ${getCustomerTime()} seconds`);
                if (getCustomerTime() === getZero()) {
                    incrementCustomersWaiting();
                    setCustomersWaiting(getCustomersWaiting() + getStandardDecrementIncrementOfOne());
                    createRandomCustomerTime();
                }
                lastCustomerUpdateTime = now;
            }
        }
    }
}

function updateShiftCountDown() {
    if (shiftInProgress) {
        const now = new Date().getTime();
        const timeDiffSecondsShift = (now - lastShiftUpdateTime) / getClockSpeed();
        const timeDiffSecondsAutoUpgrades = (now - lastAutoUpgradesUpdateTime) / getAutoUpgradesClockSpeed();

        if (getShiftTimeRemaining() > getZero()) {
            //PROCESS AUTO UPGRADES
            if (timeDiffSecondsAutoUpgrades >= getOneForTimeDiff()) {
                setAutoPeelerCounter(getAutoPeelerCounter() + (getClockSpeed() / getAutoUpgradesClockSpeed()));
                setAutoChipperCounter(getAutoChipperCounter() + (getClockSpeed() / getAutoUpgradesClockSpeed()));

                if (getAutoPeelerBought() && (getAutoPeelerCounter() * TIMER_CORRECTION_COEFFICIENT) >= (getClockSpeed() / getCurrentSpeedAutoPeeler())) {
                    if (getActualPotatoesInStorage() > getZero()) {
                        peelPotato(getElements().peeledCount, getOne());
                    }
                    setAutoPeelerCounter(getZero());
                }
                if (getAutoChipperBought() && (getAutoChipperCounter() * TIMER_CORRECTION_COEFFICIENT) >= (getClockSpeed() / getCurrentSpeedAutoChipper())) {
                    if (parseInt(getElements().peeledCount.innerHTML) > getZero()) {
                        cutChips(getNumberOfChipsFromPotato(), getOne());
                    }
                    setAutoChipperCounter(getZero());
                }
                if (
                    getAutoFryerBought() &&
                    (!getElements().fryChipsButton.classList.contains('action-button-main-flashing') &&
                    !getChipsFrying()) &&
                    getAutoFryerCounter() === getZero()
                ) {
                    if (parseInt(getElements().cutCount.innerHTML) > getZero()) {
                        updateButtonCountdownText(getElements().autoFryerUpgradeButton, 'reset', Math.floor(getCurrentSpeedAutoFryer()));
                        updateButtonClass(getElements().autoFryerUpgradeButton, getCurrentSpeedAutoFryer());
                        let transferQuantity = Math.min(parseInt(getElements().cutCount.innerHTML), (getFryerCapacity() * getAutoFryerEfficiency()));
                        setQuantityOfChipsFrying(transferQuantity);
                        fryChips();
                        decrementCounter(getElements().cutCount.id, getQuantityOfChipsFrying());
                        updateButtonStyle(getElements().fryChipsButton.id, null);
                    }
                }

                if (
                    getAutoStorageCollectorBought() &&
                    (getElements().fryChipsButton.classList.contains('action-button-main-flashing') &&
                    getAutoStorageCollectorCounter() === getZero()
                )){
                    updateButtonCountdownText(getElements().autoStorageCollectorUpgradeButton, 'reset', Math.floor(getCurrentSpeedAutoStorageCollector()));
                    updateButtonClass(getElements().autoStorageCollectorUpgradeButton, getCurrentSpeedAutoStorageCollector());
                    handleServingStorage();
                }

                if (
                    getAutoCustomerServerBought() &&
                    getAutoCustomerServerCounter() === getZero() &&
                    getCustomersWaiting() > 0 &&
                    parseInt(getElements().readyToServeCount.innerHTML) >= getPortionSize()
                ){
                    updateButtonCountdownText(getElements().autoCustomerServerUpgradeButton, 'reset', Math.floor(getCurrentSpeedAutoCustomerServer()));
                    updateButtonClass(getElements().autoCustomerServerUpgradeButton, getCurrentSpeedAutoCustomerServer());
                    serveCustomer();
                }
                lastAutoUpgradesUpdateTime = now;
            }
            //
            if (timeDiffSecondsShift >= getOneForTimeDiff()) {
                checkAutoUpgradeButtonsAndUpdateTheirCountDownTime();
                setShiftTimeRemaining(getShiftTimeRemaining() - getStandardDecrementIncrementOfOne());
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
                lastShiftUpdateTime = now;
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
                lastFryingUpdateTime = now;
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

function checkAutoUpgradeButtonsAndUpdateTheirCountDownTime() {
    if (getAutoFryerBought()) {
        let value = updateButtonCountdownText(getElements().autoFryerUpgradeButton, 'countDown', null);
        setAutoFryerCounter(value);
        updateButtonClass(getElements().autoFryerUpgradeButton, value);
    }
    if (getAutoStorageCollectorBought()) {
        let value = updateButtonCountdownText(getElements().autoStorageCollectorUpgradeButton, 'countDown', null);
        setAutoStorageCollectorCounter(value);
        if(!getElements().fryChipsButton.classList.contains('action-button-main-flashing')) {
            updateButtonClass(getElements().autoStorageCollectorUpgradeButton, value);
        }
    }
    if (getAutoCustomerServerBought()) {
        let value = updateButtonCountdownText(getElements().autoCustomerServerUpgradeButton, 'countDown', null);
        setAutoCustomerServerCounter(value);
        if (parseInt(getElements().readyToServeCount.innerHTML) < getPortionSize() || getCustomersWaiting() <= getZero()) {
            updateButtonClass(getElements().autoCustomerServerUpgradeButton, value);
        }
    }
}

function updateButtonCountdownText(buttonElement, action, resetElementSpeed) {
    const regex = /Ready in (\d+)s/;
    const match = buttonElement.innerHTML.match(regex);
    let newValue;

    if (match) {
        const currentValue = parseInt(match[1], 10);

        if (action === "countDown") {
            if (currentValue > getZero()) {
                newValue = currentValue - getOne();
                buttonElement.innerHTML = buttonElement.innerHTML.replace(regex, `Ready in ${newValue}s`);
            } else {
                return getZero();
            }
        }
        if (action === 'reset') {
            buttonElement.innerHTML = buttonElement.innerHTML.replace(regex, `Ready in ${resetElementSpeed}s`);
        }
    }
    return newValue;
}

function updateButtonClass(buttonElement, value) {
    if (value <= getZero()) {
        buttonElement.classList.add('waiting-trigger-auto-action');
    } else {
        buttonElement.classList.remove('waiting-trigger-auto-action');
    }
}