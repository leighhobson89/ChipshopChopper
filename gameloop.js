import {
    addCheckbox,
    animatedTextString,
    changePlayerRole,
    checkAndSetFlagCapOnUpgrades,
    createGameWindow,
    initialiseOptionsClasses,
    formatToCashNotation,
    getColorsForWheel,
    getElementMidpoint,
    toggleEndOfShiftOrGamePopup,
    toggleOverlay,
    updateButtonStyle,
    updateTextAndDisableButtonsForCappedUpgrades,
    updateVisibleButtons,
    writePopupText, handleButtonClickEventListenerInitialisation
} from './ui.js';

import {
    createRandomCustomerTime,
    cutChips,
    decrementCounter,
    disableButtons,
    fryChips,
    handleServingStorage,
    handleStartShift,
    incrementCustomersWaiting,
    peelPotato,
    saveGame,
    serveCustomer, toggleDisable
} from './actions.js';

import {
    batchTimers,
    endOfShiftOrGamePopup,
    getActualPotatoesInStorage,
    getAddOneToRandomNumberToEnsureAboveOne,
    getAmountInvestmentCash,
    getAmountInvestmentRisk,
    getAutoChipperBought,
    getAutoChipperCounter,
    getAutoCustomerServerBought,
    getAutoCustomerServerCounter,
    getAutoFryerBought,
    getAutoFryerCounter,
    getAutoFryerEfficiency,
    getAutoPeelerBought,
    getAutoPeelerCounter,
    getAutoSaveInterval,
    getAutoShiftStatus,
    getAutoStorageCollectorBought,
    getAutoStorageCollectorCounter,
    getAutoUpgradesClockSpeed,
    getBaseRiskNumber,
    getChipperUpgradeBought,
    getChipsFriedThisShift,
    getAreChipsFrying,
    getChipsReadyToServeQuantity,
    getChipsWastedThisShift,
    getClockSpeed,
    getCoolDownTimer,
    getCoolDownTimeRemaining,
    getCurrentCash,
    getCurrentRiskLevel,
    getCurrentSpeedAutoChipper,
    getCurrentSpeedAutoCustomerServer,
    getCurrentSpeedAutoFryer,
    getCurrentSpeedAutoPeeler,
    getCurrentSpeedAutoStorageCollector,
    getCurrentValueOfInvestment,
    getCustomersServed,
    getCustomersWaiting,
    getCustomerTime,
    getElements,
    getFloatOnStockMarketUnlockedAndEndGameFlowStarted,
    getFryerCapacity,
    getFryTimeRemaining,
    getGameInProgress,
    getGrowthInvestment,
    getHeaterUpgradeBought,
    getInterestRateBaseValue,
    getInvestmentFundUnlocked,
    getJustDeleteTheOneElementFromArray,
    getMultipleForHeaterEffectOnCoolDown,
    getNumberOfChipsFromPotato,
    getOne,
    getOneForTimeDiff,
    getPauseAutoSaveCountdown,
    getPeelerUpgradeBought,
    getPortionSize,
    getPriceOfChips,
    getQuantityOfChipsFrying,
    getRiskAdjustmentCoefficient,
    getRiskThreshold,
    getRoleUpgrade,
    getShiftInProgress,
    getShiftLength,
    getShiftTimeRemaining,
    getStandardDecrementIncrementOfOne,
    getStop,
    getTotalCut,
    getTotalEarnedInSales,
    getTotalPeeled,
    getTotalServedCustomers,
    getTotalSpentExcludingInvestments,
    getTotalWastedChips,
    getZero,
    popupOverlay,
    resetBatchTimers,
    Role,
    setAutoChipperCounter,
    setAutoCustomerServerCounter,
    setAutoFryerCounter,
    setAutoPeelerCounter,
    setAutoStorageCollectorCounter,
    setChipsCutThisShift,
    setChipsFriedThisShift,
    setAreChipsFrying,
    setChipsReadyToServeQuantity,
    setChipsWastedThisShift,
    setCoolDownTimeRemaining,
    setCurrentCash,
    setCurrentRiskLevel,
    setCurrentValueOfInvestment,
    setCustomersServed,
    setCustomersWaiting,
    setCustomersWaitingBeforeEndOfShift,
    setCustomerTime,
    setElements,
    setFryTimeRemaining,
    setGameInProgress,
    setGrowthInvestment,
    setInvestmentFundUnlockable,
    setOldCash,
    setPauseAutoSaveCountdown,
    setPotatoesPeeledThisShift,
    setQuantityOfChipsFrying,
    setShiftInProgress,
    setShiftTimeRemaining,
    setTotalEarnedInSales,
    setTotalWastedChips,
    TIMER_CORRECTION_COEFFICIENT,
    setShiftPoints,
    getShiftPoints,
    getWheelSpinning,
    getTextAnimationDone,
    popupContinueButton,
    getAutoSaveOn,
    setDebugOptionFlag,
    debugOptionFlag,
} from './constantsAndGlobalVars.js';

let autoSaveInterval;
let nextAutoSaveTime;

let lastShiftUpdateTime = new Date().getTime();
let lastCustomerUpdateTime = new Date().getTime();
let lastFryingUpdateTime = new Date().getTime();
let lastAutoUpgradesUpdateTime = new Date().getTime();

export function main() {
    document.addEventListener('keydown', function(event) {
        if (event.key === '-') {
            setDebugOptionFlag(true);
        }
    });
    document.addEventListener('visibilitychange', handleVisibilityChange, false);
    window.addEventListener('blur', handleVisibilityChange, false);
    window.addEventListener('focus', handleVisibilityChange, false);

    autoSaveInterval = getAutoSaveInterval();
    nextAutoSaveTime = Date.now() + autoSaveInterval;
    initialiseOptionsClasses();

    createGameWindow();

    setInterval(() => {
        //console.log("Pause auto save timer state (true = paused):" + getPauseAutoSaveCountdown());
        if (!getPauseAutoSaveCountdown()) {
            //console.log(`Time left until next auto-save: ${nextAutoSaveTime - Date.now()} ms`);
            if (nextAutoSaveTime <= Date.now() && getAutoSaveOn()) {
                saveGame(false);
                nextAutoSaveTime = Date.now() + autoSaveInterval;
            }
        } else {
            //console.log(`Time left until next auto-save: ${nextAutoSaveTime - Date.now()} ms`);
            nextAutoSaveTime += 1000;
        }
    }, 1000);

    gameLoop();
}

document.addEventListener('DOMContentLoaded', () => {
    setElements();
    main();
});

function gameLoop() {
    if (debugOptionFlag && getElements().debugCash.classList.contains('d-none')) {
        getElements().debugCash.classList.remove('d-none');
    }
    setGameInProgress(!!getGameInProgress());
    updateClock();

    if (getGameInProgress()) {
        updateCustomerCountdown();
        updateShiftCountDown();
        updateChipsFryingTimer();
        updateVisibleButtons();
        checkPlayerRole();
        if (!endOfShiftOrGamePopup.classList.contains('d-none')) {
            checkSpinButtonStatusAndSetColors();
            disableEnableContinueButtonIfWheelSpinningNotSpinning();
        }
        if (getInvestmentFundUnlocked()) {
            updateInvestmentPlanData();
        }
        checkAndSetFlagCapOnUpgrades();
        updateTextAndDisableButtonsForCappedUpgrades();
    }

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    getElements().clock.innerHTML = `<h2>${hours}:${minutes}:${seconds}</h2>`;
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
    if (getShiftInProgress() && !getFloatOnStockMarketUnlockedAndEndGameFlowStarted()) {
        const now = new Date().getTime();
        const timeDiffSecondsShift = (now - lastShiftUpdateTime) / getClockSpeed();
        const timeDiffSecondsAutoUpgrades = (now - lastAutoUpgradesUpdateTime) / getAutoUpgradesClockSpeed();

        if (getShiftTimeRemaining() > getZero()) {
            //PROCESS AUTO UPGRADES
            if (timeDiffSecondsAutoUpgrades >= getOneForTimeDiff()) {
                setAutoPeelerCounter(getAutoPeelerCounter() + (getClockSpeed() / getAutoUpgradesClockSpeed()));
                setAutoChipperCounter(getAutoChipperCounter() + (getClockSpeed() / getAutoUpgradesClockSpeed()));

                if (getAutoPeelerBought() && (getAutoPeelerCounter() * TIMER_CORRECTION_COEFFICIENT) >= (getClockSpeed() / getCurrentSpeedAutoPeeler()) && getElements().autoPeelerUpgradeButton.classList.contains('autoUpgradeEnabled')) {
                    if (getActualPotatoesInStorage() > getZero()) {
                        peelPotato(getElements().peeledCount, getOne());
                    }
                    setAutoPeelerCounter(getZero());
                }
                if (getAutoChipperBought() && (getAutoChipperCounter() * TIMER_CORRECTION_COEFFICIENT) >= (getClockSpeed() / getCurrentSpeedAutoChipper()) && getElements().autoChipperUpgradeButton.classList.contains('autoUpgradeEnabled')) {
                    if (parseInt(getElements().peeledCount.innerText) > getZero()) {
                        cutChips(getNumberOfChipsFromPotato(), getOne());
                    }
                    setAutoChipperCounter(getZero());
                }
                if (
                    getAutoFryerBought() &&
                    (!getElements().fryChipsButton.classList.contains('action-button-main-flashing') &&
                        !getAreChipsFrying()) &&
                    getAutoFryerCounter() === getZero() &&
                    getElements().autoFryerUpgradeButton.classList.contains('autoUpgradeEnabled')
                ) {
                    if (parseInt(getElements().cutCount.innerText) > getZero()) {
                        updateButtonCountdownText(getElements().autoFryerUpgradeButton, 'reset', Math.floor(getCurrentSpeedAutoFryer()), getElements().autoFryerUpgradeButton.classList.contains('autoUpgradeEnabled'));
                        updateButtonClass(getElements().autoFryerUpgradeButton, getCurrentSpeedAutoFryer());
                        let transferQuantity = Math.min(parseInt(getElements().cutCount.innerText), (getFryerCapacity() * getAutoFryerEfficiency()));
                        setQuantityOfChipsFrying(transferQuantity);
                        fryChips();
                        decrementCounter(getElements().cutCount.id, getQuantityOfChipsFrying());
                        updateButtonStyle(getElements().fryChipsButton.id, null);
                    }
                }

                if (
                    getAutoStorageCollectorBought() &&
                    (getElements().fryChipsButton.classList.contains('action-button-main-flashing') &&
                        getAutoStorageCollectorCounter() === getZero() &&
                        getElements().autoStorageCollectorUpgradeButton.classList.contains('autoUpgradeEnabled')
                    )) {
                    updateButtonCountdownText(getElements().autoStorageCollectorUpgradeButton, 'reset', Math.floor(getCurrentSpeedAutoStorageCollector()), getElements().autoStorageCollectorUpgradeButton.classList.contains('autoUpgradeEnabled'));
                    updateButtonClass(getElements().autoStorageCollectorUpgradeButton, getCurrentSpeedAutoStorageCollector());
                    handleServingStorage();
                    disableButtons(false);
                }

                if (
                    getAutoCustomerServerBought() &&
                    getAutoCustomerServerCounter() === getZero() &&
                    getCustomersWaiting() > 0 &&
                    parseInt(getElements().readyToServeCount.innerText) >= getPortionSize() &&
                    getElements().autoCustomerServerUpgradeButton.classList.contains('autoUpgradeEnabled')
                ) {
                    updateButtonCountdownText(getElements().autoCustomerServerUpgradeButton, 'reset', Math.floor(getCurrentSpeedAutoCustomerServer()), getElements().autoCustomerServerUpgradeButton.classList.contains('autoUpgradeEnabled'));
                    updateButtonClass(getElements().autoCustomerServerUpgradeButton, getCurrentSpeedAutoCustomerServer());
                    setAutoCustomerServerCounter(1);
                    serveCustomer();
                }
                lastAutoUpgradesUpdateTime = now;
            }
            //
            if (timeDiffSecondsShift >= getOneForTimeDiff()) {
                checkAutoUpgradeButtonsAndUpdateTheirCountDownTime();
                setShiftTimeRemaining(getShiftTimeRemaining() - getStandardDecrementIncrementOfOne());
                getElements().subInnerDiv1_2.innerHTML = `<h4>${getShiftTimeRemaining().toString()}</h4>`;
                //console.log(`Shift time remaining: ${getShiftTimeRemaining()} seconds`);
                calculateForthcomingTotalInvestment();
                if (getShiftTimeRemaining() === getZero()) {

                    setShiftInProgress(false);
                    setOldCash(getCurrentCash());
                    setCurrentCash((getCustomersServed() * getPriceOfChips()) + getCurrentCash());
                    setTotalEarnedInSales(getTotalEarnedInSales() + (getCustomersServed() * getPriceOfChips()));
                    getElements().subInnerDiv1_2.innerHTML = '<h4>Start Shift</h4>';
                    disableButtons(false);

                    wasteChipsStillInFryerOrFryingAtEndOfShift();

                    for (let i = 0; i < getChipsReadyToServeQuantity().length; i++) {
                        clearInterval(batchTimers[i]); //kill all timers end of shift
                        setChipsWastedThisShift(getChipsWastedThisShift() + getChipsReadyToServeQuantity()[i]);
                    }

                    setCustomersWaitingBeforeEndOfShift(getCustomersWaiting());
                    setCustomersWaiting(selectHowManyCustomersLeftAfterWalkOutAtShiftEnd());
                    getElements().customersWaitingCount.innerHTML = `<h4>${getCustomersWaiting()}</h4>`;

                    setChipsReadyToServeQuantity(null, 'clear');
                    getElements().readyToServeCount.innerHTML = `<h3>${getZero().toString()}</h3>`;
                    resetBatchTimers();

                    setTotalWastedChips(getTotalWastedChips() + getChipsWastedThisShift());
                    setShiftPoints(getShiftPoints() + getOne());

                    if (!getAutoShiftStatus()) { //no popup if autoShiftStartIsEnabled
                        writePopupText();
                        toggleEndOfShiftOrGamePopup(endOfShiftOrGamePopup);
                        toggleOverlay(popupOverlay);
                    }
                    consoleOutTotalStats(); //debug
                    setGrowthInvestment(getZero());
                    setCustomersServed(getZero());
                    setPotatoesPeeledThisShift(getZero());
                    setChipsCutThisShift(getZero());
                    setChipsFriedThisShift(getZero());
                    setChipsWastedThisShift(getZero());
                    if (getInvestmentFundUnlocked()) {
                        let doubleRisk = incrementRiskValue();
                        checkRiskAgainstThreshold(doubleRisk);
                    }
                }
                lastShiftUpdateTime = now;
            }
        }
    } else if (getFloatOnStockMarketUnlockedAndEndGameFlowStarted()) {
        disableButtons(false);
    } else {
        disableButtons(true);
        if (getAutoShiftStatus()) {
            handleStartShift();
        }
    }
}

function updateChipsFryingTimer() {
    if (getAreChipsFrying()) {
        const now = new Date().getTime();
        const timeDiffSeconds = (now - lastFryingUpdateTime) / getClockSpeed();
        const fryerButton = getElements().fryChipsButton;

        if (getFryTimeRemaining() > getZero()) {
            if (timeDiffSeconds >= getOneForTimeDiff()) {
                setFryTimeRemaining(getFryTimeRemaining() - getStandardDecrementIncrementOfOne());
                fryerButton.innerHTML = 'Frying ' + getQuantityOfChipsFrying() + ' Chips <br> (' + getFryTimeRemaining() + 's)';

                //console.log(`Fry time remaining: ${getFryTimeRemaining()} seconds`);
                if (getFryTimeRemaining() === getZero()) {
                    setAreChipsFrying(false);
                    setChipsFriedThisShift(getChipsFriedThisShift() + getQuantityOfChipsFrying());
                    getElements().chuckedInFryerCount.innerHTML = `<h3>${(parseInt(getElements().chuckedInFryerCount.innerText) + getQuantityOfChipsFrying()).toString()}</h3>`;
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
    if (!getFloatOnStockMarketUnlockedAndEndGameFlowStarted()) {
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
}

export function initialiseNewGame() {
    if (getGameInProgress()) {
        return askUserToConfirmRestart();
    } else {
        getElements().resumeGameButton.classList.remove('option-disabled');
        getElements().option1.innerHTML = '<h2>New Game</h2>';
        getElements().optionsWindow.classList.add('d-none');
        createRandomCustomerTime();
        getElements().gameWindow.classList.remove('d-none');
        return true;
    }
}

function askUserToConfirmRestart() {
    getElements().option1.innerHTML = '<h2>Click again to start a New Game...</h2>';
}

export function wasteChipsStillInFryerOrFryingAtEndOfShift() {
    const fryerButton = getElements().fryChipsButton;
    const fryerCount = parseInt(getElements().chuckedInFryerCount.innerText);

    setAreChipsFrying(false);
    setFryTimeRemaining(getZero());
    getElements().fryChipsButton.innerHTML = `Fry Chips (Capacity: ${getFryerCapacity()})`;
    setChipsWastedThisShift(fryerCount + getQuantityOfChipsFrying() + getChipsWastedThisShift());
    setQuantityOfChipsFrying(getZero());
    if (fryerButton.classList.contains('action-button-main-flashing')) {
        updateButtonStyle(fryerButton.id, getStop());
    }
    updateButtonStyle(fryerButton.id, null);
    getElements().chuckedInFryerCount.innerHTML = `<h3>${getZero().toString()}</h3>`;
}

function selectHowManyCustomersLeftAfterWalkOutAtShiftEnd() {
    let customersWaiting = getCustomersWaiting();
    const randomWalkouts = Math.floor(Math.random() * (customersWaiting + getAddOneToRandomNumberToEnsureAboveOne())); // Random whole number between 0 and customersWaiting

    customersWaiting -= randomWalkouts;
    return customersWaiting;
}

function checkAutoUpgradeButtonsAndUpdateTheirCountDownTime() {
    if (getAutoFryerBought()) {
        let value = updateButtonCountdownText(getElements().autoFryerUpgradeButton, 'countDown', null, getElements().autoFryerUpgradeButton.classList.contains('autoUpgradeEnabled'));
        setAutoFryerCounter(value);
        updateButtonClass(getElements().autoFryerUpgradeButton, value);
    }
    if (getAutoStorageCollectorBought()) {
        let value = updateButtonCountdownText(getElements().autoStorageCollectorUpgradeButton, 'countDown', null, getElements().autoStorageCollectorUpgradeButton.classList.contains('autoUpgradeEnabled'));
        setAutoStorageCollectorCounter(value);
        if (!getElements().fryChipsButton.classList.contains('action-button-main-flashing')) {
            updateButtonClass(getElements().autoStorageCollectorUpgradeButton, value);
        }
    }
    if (getAutoCustomerServerBought()) {
        let value = updateButtonCountdownText(getElements().autoCustomerServerUpgradeButton, 'countDown', null, getElements().autoCustomerServerUpgradeButton.classList.contains('autoUpgradeEnabled'));
        setAutoCustomerServerCounter(value);
        if (parseInt(getElements().readyToServeCount.innerHTML) < getPortionSize() || getCustomersWaiting() <= getZero()) {
            updateButtonClass(getElements().autoCustomerServerUpgradeButton, value);
        }
    }
}

function updateButtonCountdownText(buttonElement, action, resetElementSpeed, state) {
    if (!state) {
        return;
    }
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
    buttonElement.querySelector('input').remove();
    addCheckbox(buttonElement, state);
    return newValue;
}

function updateButtonClass(buttonElement, value) {
    if (value <= getZero()) {
        buttonElement.classList.add('waiting-trigger-auto-action');
    } else {
        buttonElement.classList.remove('waiting-trigger-auto-action');
    }
}

function checkPlayerRole() {
    let existingRoleText = getElements().playerRoleText.innerText;
    if (existingRoleText === Role.ONE) {
        if (getPeelerUpgradeBought() || getChipperUpgradeBought()) {
            changePlayerRole(getElements().playerRoleText, Role.TWO, 'text-bounce-animation', 'fade-text-animation');
        }
    } else if (existingRoleText === Role.TWO && getPeelerUpgradeBought() && getChipperUpgradeBought()) {
        if (getAutoPeelerBought() || getAutoChipperBought() || getAutoFryerBought() || getAutoStorageCollectorBought() || getAutoCustomerServerBought()) {
            changePlayerRole(getElements().playerRoleText, Role.THREE, 'text-bounce-animation', 'fade-text-animation');
        }
    } else if (existingRoleText === Role.THREE && getAutoPeelerBought() && getAutoChipperBought() && getAutoFryerBought() && getAutoStorageCollectorBought() && getAutoCustomerServerBought()) {
        if (getFryerCapacity() >= 200 && getHeaterUpgradeBought()) {
            changePlayerRole(getElements().playerRoleText, Role.FOUR, 'text-bounce-animation', 'fade-text-animation');
        }
    } else if (existingRoleText === Role.FOUR) {
        if (getCurrentCash() >= getRoleUpgrade(Role.FOUR)) {
            changePlayerRole(getElements().playerRoleText, Role.FIVE, 'text-bounce-animation', 'fade-text-animation');
        }
    } else if (existingRoleText === Role.FIVE) {
        if (getCurrentCash() >= getRoleUpgrade(Role.FIVE)) {
            changePlayerRole(getElements().playerRoleText, Role.SIX, 'text-bounce-animation', 'fade-text-animation');
            setInvestmentFundUnlockable(true);
        }
    } else if (existingRoleText === Role.SIX) {
        if (getCurrentCash() >= getRoleUpgrade(Role.SIX)) {
            changePlayerRole(getElements().playerRoleText, Role.SEVEN, 'text-bounce-animation', 'fade-text-animation');
        }
    }
}

function updateInvestmentPlanData() {
    getElements().investmentDataScreenBottomRowColumn1.innerHTML = `<h3>${formatToCashNotation(getAmountInvestmentCash())}</h3>`;
    getElements().investmentDataScreenBottomRowColumn2.innerHTML = `<h3>${getAmountInvestmentRisk()}%</h3>`;
    getElements().investmentDataScreenBottomRowColumn3.innerHTML = `<h3>${formatToCashNotation(getCurrentValueOfInvestment())}</h3>`;
    getElements().investmentDataScreenBottomRowColumn4.innerHTML = `<h3>${formatToCashNotation(getCurrentValueOfInvestment() - getAmountInvestmentCash())}</h3>`;
    // console.log(getElements().investmentDataScreenBottomRowColumn3);
    // console.log(getCurrentValueOfInvestment());
    // console.log('Cash Invested:' + getAmountInvestmentCash());
    // console.log('Risk:' + getAmountInvestmentRisk());
}

function incrementRiskValue() {
    if (getAmountInvestmentRisk() > getZero() && getAmountInvestmentCash() > getZero()) {
        const baseRiskNumber = getBaseRiskNumber();
        let currentRisk = getCurrentRiskLevel();

        let riskPercentage = getAmountInvestmentRisk() * 10;
        // console.log("risk level %: " + getAmountInvestmentRisk());
        let randomAdjusterNumber = (Math.random() * getRiskAdjustmentCoefficient());
        // console.log("randomAdjusterNumber: " + randomAdjusterNumber);
        let riskIncrementThisShift = baseRiskNumber - randomAdjusterNumber;
        // console.log("riskIncrementThisShift: " + riskIncrementThisShift);

        currentRisk += riskIncrementThisShift + riskPercentage;
        let doubleRisk = Math.random() * 100 + 1 > 50;
        if (doubleRisk) {
            currentRisk *= ((getAmountInvestmentRisk() / 100) + 1);
        }

        // console.log("currentRisk: " + currentRisk + "/" + getRiskThreshold());
        setCurrentRiskLevel(currentRisk);
        return doubleRisk;
    }
}

function checkRiskAgainstThreshold(doubleRisk) {
    const threshold = getRiskThreshold();
    if (getCurrentRiskLevel() >= threshold && getAmountInvestmentCash() > getZero()) {
        console.log("DEVALUE investment");
        const amountToLose = formatToCashNotation(devalueInvestment(doubleRisk));
        setCurrentRiskLevel(Math.floor(Math.random() * (getRiskThreshold() / 2))); //start from a non-zero random risk level
        const midpointCoords = getElementMidpoint(getElements().investmentDataScreenBottomRowColumn3.id);
        const x = midpointCoords.x;
        const y = midpointCoords.y;
        animatedTextString(x, y, `-${amountToLose.toString()}`);
    } else {
        //console.log("no devalue of investment");
    }
}

function devalueInvestment(doubleRisk) {
    const percentageOverThreshold = (((getCurrentRiskLevel() - getRiskThreshold()) / getRiskThreshold()) * 100) * 2;
    // console.log("percentage over threshold:" + percentageOverThreshold);
    let amountOfInvestmentToLose = getCurrentValueOfInvestment() * (percentageOverThreshold / 100);
    // console.log("percentage of investment (amount to lose):" + amountOfInvestmentToLose);
    if (doubleRisk) {
        //console.log("double risk means losing " + getAmountInvestmentRisk() + " extra.");
        amountOfInvestmentToLose *= ((getAmountInvestmentRisk() / 100) + 1);
    }
    setGrowthInvestment(getGrowthInvestment() - amountOfInvestmentToLose);
    setCurrentValueOfInvestment(getCurrentValueOfInvestment() - amountOfInvestmentToLose);

    return amountOfInvestmentToLose;
}

export function calculateForthcomingTotalInvestment() {
    if (getAmountInvestmentCash() > getZero() && getAmountInvestmentRisk() > getZero()) {
        let remaining = getShiftTimeRemaining();
        //console.log("Remaining time: " + remaining);

        let totalPercentageGainAtEndOfShiftIfFullShift = (getInterestRateBaseValue() + (getAmountInvestmentRisk() / 10)) * getCurrentValueOfInvestment();
        //console.log("Total percentage gain at end of shift: " + totalPercentageGainAtEndOfShiftIfFullShift);

        let proportionOfShiftLeft = remaining / getShiftLength();
        //console.log("Proportion of shift left: " + (proportionOfShiftLeft * 100) + "%");

        let gainIfThingsLeftAsTheyAre = (totalPercentageGainAtEndOfShiftIfFullShift * proportionOfShiftLeft) / 10;
        //console.log("Cash gain this shift if nothing touched: " + gainIfThingsLeftAsTheyAre);

        let valueToIncreaseThisSecond = gainIfThingsLeftAsTheyAre / remaining;
        //console.log("Cash gain this second: " + valueToIncreaseThisSecond);

        let newValueOfInvestment = getCurrentValueOfInvestment() + valueToIncreaseThisSecond;
        //console.log("New value of investment: " + newValueOfInvestment);

        if (!isNaN(valueToIncreaseThisSecond)) {
            setGrowthInvestment(getGrowthInvestment() + valueToIncreaseThisSecond);
            setCurrentValueOfInvestment(newValueOfInvestment);
        }
    }
}

function handleVisibilityChange() {
    if (document.hidden || document.hasFocus() === false) {
        setPauseAutoSaveCountdown(true);
    } else {
        setPauseAutoSaveCountdown(false);
    }
}

function consoleOutTotalStats() {
    console.log('Total Earned in Sales: ' + getTotalEarnedInSales());
    console.log('Total Spent: ' + getTotalSpentExcludingInvestments());
    console.log('Total Peeled: ' + getTotalPeeled());
    console.log('Total Cut: ' + getTotalCut());
    console.log('Total Wasted Chips: ' + getTotalWastedChips());
    console.log('Total Served Customers: ' + getTotalServedCustomers());
}

function checkSpinButtonStatusAndSetColors() {
    const spinButton = document.getElementById('spinButton');
    if (spinButton.classList.contains('disabled') && !getWheelSpinning() && getTextAnimationDone()) {
        setWheelOpacity(true);
    } else if (!getTextAnimationDone()) {
        setWheelOpacity(true);
    } else {
        setWheelOpacity(false);
    }
}

function setWheelOpacity(state) {
    const centerLine = document.getElementById('wheelCenterLine');

    if (state) {
        const colors = getColorsForWheel(false);
        centerLine.style.opacity = '0.5';
        const wheel = document.querySelector('.wheel');
        const sections = wheel.querySelectorAll('.wheel-section');
        sections.forEach((section, index) => {
            section.style.backgroundColor = colors[index];
        });
    } else {
        const colors = getColorsForWheel(true);
        centerLine.style.opacity = '1';
        const wheel = document.querySelector('.wheel');
        const sections = wheel.querySelectorAll('.wheel-section');
        sections.forEach((section, index) => {
            section.style.backgroundColor = colors[index];
        });
    }
}

function disableEnableContinueButtonIfWheelSpinningNotSpinning() {
    if (getWheelSpinning()) {
        toggleDisable(true, document.getElementById('popupContinueButton'));
    } else {
        toggleDisable(false, document.getElementById('popupContinueButton'));
    }
}