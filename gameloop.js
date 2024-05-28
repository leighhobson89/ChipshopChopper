import {
    addCheckbox,
    changePlayerRole,
    checkAndSetFlagCapOnUpgrades,
    createGameWindow,
    createTitleScreen,
    formatToCashNotation,
    toggleEndOfShiftOrGamePopup,
    toggleOverlay,
    updateButtonStyle,
    updateTextAndDisableButtonsForCappedUpgrades,
    updateVisibleButtons,
    writePopupText
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
    peelPotato, saveGame,
    serveCustomer
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
    getAutoPeelerCounter, getAutoSaveInterval,
    getAutoShiftStatus,
    getAutoStorageCollectorBought,
    getAutoStorageCollectorCounter,
    getAutoUpgradesClockSpeed,
    getBaseRiskNumber,
    getChipperUpgradeBought,
    getChipsFriedThisShift,
    getChipsFrying,
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
    getOneForTimeDiff, getPauseAutoSaveCountdown,
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
    setChipsFrying,
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
    setPotatoesPeeledThisShift,
    setQuantityOfChipsFrying,
    setShiftInProgress,
    setShiftTimeRemaining,
    TIMER_CORRECTION_COEFFICIENT,
} from './constantsAndGlobalVars.js';

let autoSaveInterval;
let nextAutoSaveTime;

let lastShiftUpdateTime = new Date().getTime();
let lastCustomerUpdateTime = new Date().getTime();
let lastFryingUpdateTime = new Date().getTime();
let lastAutoUpgradesUpdateTime = new Date().getTime();

function main() {
    document.addEventListener('titleScreenCreated', setElements);
    autoSaveInterval = getAutoSaveInterval();
    nextAutoSaveTime = Date.now() + autoSaveInterval;
    const titleScreenCreatedEvent = new Event('titleScreenCreated');
    createTitleScreen();
    createGameWindow(titleScreenCreatedEvent);

    setInterval(() => {
        //console.log("Pause auto save timer state (true = paused):" + getPauseAutoSaveCountdown());
        if (!getPauseAutoSaveCountdown()) {
            //console.log(`Time left until next auto-save: ${nextAutoSaveTime - Date.now()} ms`);
            if (nextAutoSaveTime <= Date.now()) {
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
    main();
});

function gameLoop() {

    setGameInProgress(!!getGameInProgress());
    updateClock();
    updateCustomerCountdown();
    updateShiftCountDown();
    updateChipsFryingTimer();
    updateVisibleButtons();
    checkPlayerRole();
    if (getInvestmentFundUnlocked()) {
        updateInvestmentPlanData();
    }
    checkAndSetFlagCapOnUpgrades();
    updateTextAndDisableButtonsForCappedUpgrades();

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    getElements().clock.innerHTML = `${hours}:${minutes}:${seconds}`;
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
                        updateButtonCountdownText(getElements().autoFryerUpgradeButton, 'reset', Math.floor(getCurrentSpeedAutoFryer()), getElements().autoFryerUpgradeButton.classList.contains('autoUpgradeEnabled'));
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
                    updateButtonCountdownText(getElements().autoStorageCollectorUpgradeButton, 'reset', Math.floor(getCurrentSpeedAutoStorageCollector()), getElements().autoStorageCollectorUpgradeButton.classList.contains('autoUpgradeEnabled'));
                    updateButtonClass(getElements().autoStorageCollectorUpgradeButton, getCurrentSpeedAutoStorageCollector());
                    handleServingStorage();
                    disableButtons(false);
                }

                if (
                    getAutoCustomerServerBought() &&
                    getAutoCustomerServerCounter() === getZero() &&
                    getCustomersWaiting() > 0 &&
                    parseInt(getElements().readyToServeCount.innerHTML) >= getPortionSize()
                ){
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
                getElements().subInnerDiv1_2.innerHTML = getShiftTimeRemaining().toString();
                //console.log(`Shift time remaining: ${getShiftTimeRemaining()} seconds`);
                calculateForthcomingTotalInvestment();
                if (getShiftTimeRemaining() === getZero()) {

                    setShiftInProgress(false);
                    setOldCash(getCurrentCash());
                    setCurrentCash((getCustomersServed() * getPriceOfChips()) + getCurrentCash());
                    getElements().subInnerDiv1_2.innerHTML = "Start Shift";
                    disableButtons(false);

                    wasteChipsStillInFryerOrFryingAtEndOfShift();

                    for (let i = 0; i < getChipsReadyToServeQuantity().length; i++) {
                        clearInterval(batchTimers[i]);  //kill all timers end of shift
                        setChipsWastedThisShift(getChipsWastedThisShift() + getChipsReadyToServeQuantity()[i]);
                    }

                    setCustomersWaitingBeforeEndOfShift(getCustomersWaiting());
                    setCustomersWaiting(selectHowManyCustomersLeftAfterWalkOutAtShiftEnd());
                    getElements().customersWaitingCount.innerHTML = getCustomersWaiting();

                    setChipsReadyToServeQuantity(null,'clear');
                    getElements().readyToServeCount.innerHTML = getZero().toString();
                    resetBatchTimers();

                    if (!getAutoShiftStatus()) { //no popup if autoShiftStartIsEnabled
                        writePopupText();
                        toggleEndOfShiftOrGamePopup(endOfShiftOrGamePopup);
                        toggleOverlay(popupOverlay);
                    }

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
    if (getChipsFrying()) {
        const now = new Date().getTime();
        const timeDiffSeconds = (now - lastFryingUpdateTime) / getClockSpeed();
        const fryerButton = getElements().fryChipsButton;

        if (getFryTimeRemaining() > getZero()) {
            if (timeDiffSeconds >= getOneForTimeDiff()) {
                setFryTimeRemaining(getFryTimeRemaining() - getStandardDecrementIncrementOfOne());
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
        getElements().option1.innerHTML = "New Game";
        getElements().optionsWindow.style.display = 'none';
        //debug
        getElements().resumeGameWindow.style.display = 'none';
        //
        createRandomCustomerTime();
        getElements().gameWindow.style.display = "block";
        return true;
    }
}

function askUserToConfirmRestart() {
    getElements().option1.innerHTML = "Click again to start a New Game...";
}

export function wasteChipsStillInFryerOrFryingAtEndOfShift() {
    const fryerButton = getElements().fryChipsButton;
    const fryerCount = parseInt(getElements().chuckedInFryerCount.innerHTML);

    setChipsFrying(false);
    setFryTimeRemaining(getZero());
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

function checkAutoUpgradeButtonsAndUpdateTheirCountDownTime() {
    if (getAutoFryerBought()) {
        let value = updateButtonCountdownText(getElements().autoFryerUpgradeButton, 'countDown', null, getElements().autoFryerUpgradeButton.classList.contains('autoUpgradeEnabled'));
        setAutoFryerCounter(value);
        updateButtonClass(getElements().autoFryerUpgradeButton, value);
    }
    if (getAutoStorageCollectorBought()) {
        let value = updateButtonCountdownText(getElements().autoStorageCollectorUpgradeButton, 'countDown', null, getElements().autoStorageCollectorUpgradeButton.classList.contains('autoUpgradeEnabled'));
        setAutoStorageCollectorCounter(value);
        if(!getElements().fryChipsButton.classList.contains('action-button-main-flashing')) {
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
    let existingRoleText = getElements().playerRoleText.innerHTML;
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
    getElements().investmentDataScreenBottomRowColumn1.innerHTML = formatToCashNotation(getAmountInvestmentCash());
    getElements().investmentDataScreenBottomRowColumn2.innerHTML = getAmountInvestmentRisk() + "%";
    getElements().investmentDataScreenBottomRowColumn3.innerHTML = formatToCashNotation(getCurrentValueOfInvestment());
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
        devalueInvestment(doubleRisk);
        setCurrentRiskLevel(Math.floor(Math.random() * (getRiskThreshold() / 2))); //start from a non-zero random risk level
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