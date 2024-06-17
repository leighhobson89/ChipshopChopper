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
    writePopupText, createOverlay, handleButtonClickEventListenerInitialisation
} from './ui.js';

import {
    createRandomCustomerTime,
    cutChips,
    decrementCounter,
    disableButtons,
    fryChips,
    handleServingStorage,
    handleStartShift,
    incrementCustomersWaiting, loadGame,
    peelPotato,
    saveGame,
    serveCustomer,
    toggleDisable
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
    getTotalEarnedInSales,
    getTotalWastedChips,
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
    getAutoSaveOn,
    setDebugOptionFlag,
    debugOptionFlag,
    setPopupOverlayAtStartOfGame,
    getLanguage,
    setLanguageChangedFlag,
    getLanguageChangedFlag,
    getLocalization,
    getOldLanguage,
    getAutoPeelerCapped,
    getAutoChipperCapped,
    getAutoFryerCapped,
    getPotatoCapacityCapped,
    getFryerCapacityCapped,
    getFryerSpeedCapped,
    getMaxDeliveryCapped,
    getMaxWaitCustomerCapped,
    getInvestmentFundUnlockable, setStateLoading
} from './constantsAndGlobalVars.js';
import {initLocalization, localize} from "./localization.js";

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
    document.getElementById('copyButtonSavePopup').addEventListener('click', function () {
        copySaveStringToClipBoard();
    });
    document.getElementById('closeButtonSavePopup').addEventListener('click', function () {
        getElements().saveLoadPopup.classList.add('d-none');
        document.getElementById('overlay').classList.add('d-none');
    });
    document.getElementById('loadStringButton').addEventListener('click', function () {
        loadGame(true)
            .then(() => {
                setElements();
                getElements().saveLoadPopup.classList.add('d-none');
                document.getElementById('overlay').classList.add('d-none');
                handleButtonClickEventListenerInitialisation(true);
            })
            .catch((error) => {
                console.error('Error loading game:', error);
            });
    });
    document.getElementById('importFromFileLoadButton').addEventListener('click', function () {
        loadGame(false)
            .then(() => {
                setElements();
                getElements().saveLoadPopup.classList.add('d-none');
                document.getElementById('overlay').classList.add('d-none');
                handleButtonClickEventListenerInitialisation(true);
                toggleDisable(false, getElements().resumeGameButton);
                if (getInvestmentFundUnlockable() && getCurrentValueOfInvestment() === getZero()) {
                    toggleDisable(true, getElements().withdrawInvestmentButton);
                }
                if (!getInvestmentFundUnlocked()) {
                    getElements().investmentCashComponent.classList.add('d-none');
                    getElements().investmentRiskComponent.classList.add('d-none');
                }
                if (!getInvestmentFundUnlockable()) {
                    getElements().investmentDataScreen.classList.add('d-none');
                }
                setStateLoading(false);
            })
            .catch((error) => {
                console.error('Error loading game:', error);
                // Handle error if necessary
            });
    });
    document.addEventListener('visibilitychange', handleVisibilityChange, false);
    window.addEventListener('blur', handleVisibilityChange, false);
    window.addEventListener('focus', handleVisibilityChange, false);

    autoSaveInterval = getAutoSaveInterval();
    nextAutoSaveTime = Date.now() + autoSaveInterval;
    initialiseOptionsClasses();

    createGameWindow();

    setInterval(() => {
        if (!getPauseAutoSaveCountdown()) {
            if (nextAutoSaveTime <= Date.now() && getAutoSaveOn()) {
                saveGame(false);
                nextAutoSaveTime = Date.now() + autoSaveInterval;
            }
        } else {
            nextAutoSaveTime += 1000;
        }
    }, 1000);

    gameLoop();
}

document.addEventListener('DOMContentLoaded', () => {
    let defaultLocalization = navigator.language;
    defaultLocalization = simplifyOSLanguageString(defaultLocalization);
    initLocalization(defaultLocalization).then(() => {
        setPopupOverlayAtStartOfGame(createOverlay());
        setElements();
        main();
    }).catch(error => {
        console.error('Error initializing localization:', error);
    });
});

export function gameLoop() {
    checkForLanguageChange();
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
        if (getInvestmentFundUnlockable()) {
            updateInvestmentButtonText();
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
                    getElements().subInnerDiv1_2.innerHTML = `<h4>${localize('startShift', getLanguage())}</h4>`;
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
                        toggleEndOfShiftOrGamePopup(endOfShiftOrGamePopup, false);
                        toggleOverlay(popupOverlay);
                    }
                    // consoleOutTotalStats(); //debug
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
                fryerButton.innerHTML = `${localize('fryingChips', getLanguage())}`;

                if (getFryTimeRemaining() === getZero()) {
                    setAreChipsFrying(false);
                    setChipsFriedThisShift(getChipsFriedThisShift() + getQuantityOfChipsFrying());
                    getElements().chuckedInFryerCount.innerHTML = `<h3>${(parseInt(getElements().chuckedInFryerCount.innerText) + getQuantityOfChipsFrying()).toString()}</h3>`;
                    fryerButton.innerHTML = `${localize('fryChips', getLanguage())}`;
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
        while (getChipsReadyToServeQuantity()[batchId] > getZero()) {
            if (getChipsReadyToServeQuantity()[batchId] === getZero()) {
                getChipsReadyToServeQuantity().splice(batchId, getJustDeleteTheOneElementFromArray());
                clearInterval(batchTimers[batchId]);
            } else {
                await new Promise(resolve => setTimeout(resolve, getClockSpeed()));
                setChipsReadyToServeQuantity(batchId, getChipsReadyToServeQuantity()[batchId] - getStandardDecrementIncrementOfOne());
                setChipsWastedThisShift(getChipsWastedThisShift() + getStandardDecrementIncrementOfOne());
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
        getElements().option1.innerHTML = `<h2>${localize('newGame', getLanguage())}</h2>`;
        getElements().optionsWindow.classList.add('d-none');
        createRandomCustomerTime();
        getElements().gameWindow.classList.remove('d-none');
        return true;
    }
}

function askUserToConfirmRestart() {
    getElements().option1.innerHTML = `<h2>${localize('clickAgainToStartNewGame', getLanguage())}</h2>`;
}

export function wasteChipsStillInFryerOrFryingAtEndOfShift() {
    const fryerButton = getElements().fryChipsButton;
    const fryerCount = parseInt(getElements().chuckedInFryerCount.innerText);

    setAreChipsFrying(false);
    setFryTimeRemaining(getZero());
    getElements().fryChipsButton.innerHTML = `${localize('fryChips', getLanguage())}`;
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

    let regex;
    let phrase;

    switch (getLanguage()) {
        case 'en':
            phrase = 'Ready in';
            regex = /Ready in (\d+)s/;
            break;
        case 'es':
            phrase = 'Listo en';
            regex = /Listo en (\d+)s/;
            break;
        case 'it':
            phrase = 'Pronto in';
            regex = /Pronto in (\d+)s/;
            break;
        case 'fr':
            phrase = 'Prêt en';
            regex = /Prêt en (\d+)s/;
            break;
        case 'de':
            phrase = 'Bereit in';
            regex = /Bereit in (\d+)s/;
            break;
        default:
            phrase = 'Ready in';
            regex = /Ready in (\d+)s/;
            break;
    }

    const match = buttonElement.innerHTML.match(regex);
    let newValue;

    if (match) {
        const currentValue = parseInt(match[1], 10);

        if (action === "countDown") {
            if (currentValue > getZero()) {
                newValue = currentValue - getOne();
                buttonElement.innerHTML = buttonElement.innerHTML.replace(regex, `${phrase} ${newValue}s`);
            } else {
                return getZero();
            }
        }
        if (action === 'reset') {
            buttonElement.innerHTML = buttonElement.innerHTML.replace(regex, `${phrase} ${resetElementSpeed}s`);
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
    if (existingRoleText === `${localize('roleOne', getLanguage())}`) {
        if (getPeelerUpgradeBought() || getChipperUpgradeBought()) {
            changePlayerRole(getElements().playerRoleText, `${localize('roleTwo', getLanguage())}`, 'text-bounce-animation', 'fade-text-animation');
        }
    } else if (existingRoleText === `${localize('roleTwo', getLanguage())}` && getPeelerUpgradeBought() && getChipperUpgradeBought()) {
        if (getAutoPeelerBought() || getAutoChipperBought() || getAutoFryerBought() || getAutoStorageCollectorBought() || getAutoCustomerServerBought()) {
            changePlayerRole(getElements().playerRoleText, `${localize('roleThree', getLanguage())}`, 'text-bounce-animation', 'fade-text-animation');
        }
    } else if (existingRoleText === `${localize('roleThree', getLanguage())}` && getAutoPeelerBought() && getAutoChipperBought() && getAutoFryerBought() && getAutoStorageCollectorBought() && getAutoCustomerServerBought()) {
        if (getFryerCapacity() >= 200 && getHeaterUpgradeBought()) {
            changePlayerRole(getElements().playerRoleText,`${localize('roleFour', getLanguage())}`, 'text-bounce-animation', 'fade-text-animation');
        }
    } else if (existingRoleText === `${localize('roleFour', getLanguage())}`) {
        if (getCurrentCash() >= getRoleUpgrade(`${localize('roleFour', getLanguage())}`)) {
            changePlayerRole(getElements().playerRoleText, `${localize('roleFive', getLanguage())}`, 'text-bounce-animation', 'fade-text-animation');
        }
    } else if (existingRoleText === `${localize('roleFive', getLanguage())}`) {
        if (getCurrentCash() >= getRoleUpgrade(`${localize('roleFive', getLanguage())}`)) {
            changePlayerRole(getElements().playerRoleText, `${localize('roleSix', getLanguage())}`, 'text-bounce-animation', 'fade-text-animation');
            setInvestmentFundUnlockable(true);
        }
    } else if (existingRoleText === `${localize('roleSix', getLanguage())}`) {
        if (getCurrentCash() >= getRoleUpgrade(`${localize('roleSix', getLanguage())}`)) {
            changePlayerRole(getElements().playerRoleText, `${localize('roleSeven', getLanguage())}`, 'text-bounce-animation', 'fade-text-animation');
        }
    }
}

function updateInvestmentPlanData() {
    getElements().investmentDataScreenBottomRowColumn1.innerHTML = `<h3>${formatToCashNotation(getAmountInvestmentCash())}</h3>`;
    getElements().investmentDataScreenBottomRowColumn2.innerHTML = `<h3>${getAmountInvestmentRisk()}%</h3>`;
    getElements().investmentDataScreenBottomRowColumn3.innerHTML = `<h3>${formatToCashNotation(getCurrentValueOfInvestment())}</h3>`;
    getElements().investmentDataScreenBottomRowColumn4.innerHTML = `<h3>${formatToCashNotation(getCurrentValueOfInvestment() - getAmountInvestmentCash())}</h3>`;
}

function incrementRiskValue() {
    if (getAmountInvestmentRisk() > getZero() && getAmountInvestmentCash() > getZero()) {
        const baseRiskNumber = getBaseRiskNumber();
        let currentRisk = getCurrentRiskLevel();

        let riskPercentage = getAmountInvestmentRisk() * 10;
        let randomAdjusterNumber = (Math.random() * getRiskAdjustmentCoefficient());
        let riskIncrementThisShift = baseRiskNumber - randomAdjusterNumber;

        currentRisk += riskIncrementThisShift + riskPercentage;
        let doubleRisk = Math.random() * 100 + 1 > 50;
        if (doubleRisk) {
            currentRisk *= ((getAmountInvestmentRisk() / 100) + 1);
        }

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
    }
}

function devalueInvestment(doubleRisk) {
    const percentageOverThreshold = (((getCurrentRiskLevel() - getRiskThreshold()) / getRiskThreshold()) * 100) * 2;
    let amountOfInvestmentToLose = getCurrentValueOfInvestment() * (percentageOverThreshold / 100);
    if (doubleRisk) {
        amountOfInvestmentToLose *= ((getAmountInvestmentRisk() / 100) + 1);
    }
    setGrowthInvestment(getGrowthInvestment() - amountOfInvestmentToLose);
    setCurrentValueOfInvestment(getCurrentValueOfInvestment() - amountOfInvestmentToLose);

    return amountOfInvestmentToLose;
}

export function calculateForthcomingTotalInvestment() {
    if (getAmountInvestmentCash() > getZero() && getAmountInvestmentRisk() > getZero()) {
        let remaining = getShiftTimeRemaining();
        let totalPercentageGainAtEndOfShiftIfFullShift = (getInterestRateBaseValue() + (getAmountInvestmentRisk() / 10)) * getCurrentValueOfInvestment();
        let proportionOfShiftLeft = remaining / getShiftLength();
        let gainIfThingsLeftAsTheyAre = (totalPercentageGainAtEndOfShiftIfFullShift * proportionOfShiftLeft) / 10;
        let valueToIncreaseThisSecond = gainIfThingsLeftAsTheyAre / remaining;
        let newValueOfInvestment = getCurrentValueOfInvestment() + valueToIncreaseThisSecond;

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

// function consoleOutTotalStats() {
//     console.log('Total Earned in Sales: ' + getTotalEarnedInSales());
//     console.log('Total Spent: ' + getTotalSpentExcludingInvestments());
//     console.log('Total Peeled: ' + getTotalPeeled());
//     console.log('Total Cut: ' + getTotalCut());
//     console.log('Total Wasted Chips: ' + getTotalWastedChips());
//     console.log('Total Served Customers: ' + getTotalServedCustomers());
// }

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

function simplifyOSLanguageString(string) {
    if (string.includes('en')) {
        return 'en';
    }
    if (string.includes('fr')) {
        return 'fr';
    }
    if (string.includes('es')) {
        return 'es';
    }
    if (string.includes('it')) {
        return 'it';
    }
    if (string.includes('de')) {
        return 'de';
    }
    return 'es';
}

export function checkForLanguageChange() {
    if (getLanguageChangedFlag()) {
        setLanguageStrings(getLanguage());
    }
    setLanguageChangedFlag(false);
}

function setLanguageStrings() {
    setButtonTextAfterLanguageChange();
    // Get the localization data
    const localization = getLocalization();
    const newLanguage = getLanguage();
    const oldLanguage = getOldLanguage();

    // Get all elements with the class 'text-can-substitute'
    const elements = document.querySelectorAll('.text-can-substitute');


    elements.forEach(element => {
        // Recursively process the element's child nodes
        processNode(element, localization, newLanguage, oldLanguage);
    });
}

function processNode(node, localization, newLanguage, oldLanguage) {
    // Loop through the localization keys and values for the old language
    for (const [key, value] of Object.entries(localization[oldLanguage])) {
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() === value) {
            // Replace the text node value with the new language translation
            node.nodeValue = localization[newLanguage][key];
        }
    }

    // Recursively process child nodes if any
    node.childNodes.forEach(child => processNode(child, localization, newLanguage, oldLanguage));
}

function updateInvestmentButtonText() {
    getElements().investmentDataScreenTopRowColumn1.innerHTML = `<h5>${localize('cashInvested', getLanguage())}</h5>`;
    getElements().investmentDataScreenTopRowColumn2.innerHTML = `<h5>${localize('currentRisk', getLanguage())}</h5>`;
    getElements().investmentDataScreenTopRowColumn3.innerHTML = `<h5>${localize('currentValue', getLanguage())}</h5>`;
    getElements().investmentDataScreenTopRowColumn4.innerHTML = `<h5>${localize('gainLoss', getLanguage())}</h5>`;
    getElements().investmentDataScreenTopRowColumn5.innerHTML = `<h5>${localize('withdrawAll', getLanguage())}</h5>`;
    getElements().investmentCashComponent.firstElementChild.innerHTML = `${localize('changeInvestmentAmount', getLanguage())}`;
    getElements().investmentRiskComponent.firstElementChild.innerHTML = `${localize('changeRiskAmount', getLanguage())}`;
    getElements().investmentRiskComponent_IncrementButton.innerHTML = `${localize('incrementRisk', getLanguage())}`;
    getElements().investmentRiskComponent_DecrementButton.innerHTML = `${localize('decrementRisk', getLanguage())}`;
}

function setButtonTextAfterLanguageChange() {
    getElements().fryChipsButton.innerHTML = `${localize('fryChips', getLanguage())}`;

    if (getAutoPeelerCapped()) {
        getElements().autoPeelerUpgradeButton.innerHTML = `${localize('cappedAutoPeeler', getLanguage())}`
    } else {
        getElements().autoPeelerUpgradeButton.innerHTML = `${localize('autoPeelerUpgradeButton', getLanguage())}`
    }
    if (getAutoChipperCapped()) {
        getElements().autoChipperUpgradeButton.innerHTML = `${localize('cappedAutoChipper', getLanguage())}`
    } else {
        getElements().autoChipperUpgradeButton.innerHTML = `${localize('autoChipperUpgradeButton', getLanguage())}`
    }
    if (getAutoFryerCapped()) {
        getElements().autoFryerUpgradeButton.innerHTML = `${localize('cappedAutoFryer', getLanguage())}`
    } else {
        getElements().autoFryerUpgradeButton.innerHTML = `${localize('autoFryerUpgradeButton', getLanguage())}`
    }
    if (getAutoPeelerCapped()) {
        getElements().autoStorageCollectorUpgradeButton.innerHTML = `${localize('cappedAutoStorageCollector', getLanguage())}`
    } else {
        getElements().autoStorageCollectorUpgradeButton.innerHTML = `${localize('autoStorageCollectorUpgradeButton', getLanguage())}`
    }
    if (getAutoPeelerCapped()) {
        getElements().autoCustomerServerUpgradeButton.innerHTML = `${localize('cappedAutoCustomerServer', getLanguage())}`
    } else {
        getElements().autoCustomerServerUpgradeButton.innerHTML = `${localize('autoCustomerServerUpgradeButton', getLanguage())}`
    }

    if (getPotatoCapacityCapped()) {
        getElements().improvePotatoStorageButton.innerHTML = `${localize('cappedPotatoStorage', getLanguage())}`;
    } else {
        getElements().improvePotatoStorageButton.innerHTML = `${localize('improvePotatoStorageButton', getLanguage())}`;
    }

    if (getFryerCapacityCapped()) {
        getElements().improveFryerCapacityButton.innerHTML = `${localize('cappedFryerCapacity', getLanguage())}`;
    } else {
        getElements().improveFryerCapacityButton.innerHTML = `${localize('improveFryerCapacityButton', getLanguage())}`;
    }

    if (getFryerSpeedCapped()) {
        getElements().fastFryerUpgradeButton.innerHTML = `${localize('cappedFryerSpeed', getLanguage())}`;
    } else {
        getElements().fastFryerUpgradeButton.innerHTML = `${localize('fastFryerUpgradeButton', getLanguage())}`;
    }

    if (getMaxDeliveryCapped()) {
        getElements().potatoDeliveryDoublerButton.innerHTML = `${localize('cappedMaxDelivery', getLanguage())}`;
    } else {
        getElements().potatoDeliveryDoublerButton.innerHTML = `${localize('potatoDeliveryDoublerButton', getLanguage())}`;
    }

    if (getMaxWaitCustomerCapped()) {
        getElements().customerFrequencyIncreaser.innerHTML = `${localize('cappedMaxWaitCustomer', getLanguage())}`;
    } else {
        getElements().customerFrequencyIncreaser.innerHTML = `${localize('customerFrequencyIncreaser', getLanguage())}`;
    }
    if (!getElements().twoHandedPeelingButton.classList.contains('non-repeatable-upgrade-purchased')) {
        getElements().twoHandedPeelingButton.innerHTML = `${localize('doublePeelerNotYetBought', getLanguage())}`;
    }
    if (!getElements().twoHandedChippingButton.classList.contains('non-repeatable-upgrade-purchased')) {
        getElements().twoHandedChippingButton.innerHTML = `${localize('doubleChipperNotYetBought', getLanguage())}`;
    }
    if (!getElements().addStorageHeaterAutoShiftStartButton.classList.contains('non-repeatable-upgrade-purchased')) {
        getElements().addStorageHeaterAutoShiftStartButton.innerHTML = `${localize('storageHeaterNotYetBought', getLanguage())}`;
    }
    if (!getInvestmentFundUnlocked()) {
        getElements().investmentFundUnlockOrFloatButton.innerHTML = `${localize('investmentFundNotUnlockedYet', getLanguage())}`;
    }
    if (getInvestmentFundUnlocked()) {
        getElements().investmentFundUnlockOrFloatButton.innerHTML = `${localize('investmentFundUnlocked', getLanguage())}`;
    }
}

function copySaveStringToClipBoard() {
    const textArea = getElements().loadSaveGameStringTextArea;
    textArea.select();
    textArea.setSelectionRange(0, 99999);

    try {
        navigator.clipboard.writeText(textArea.value)
            .then(() => {
                alert('Text copied to clipboard!');
            })
            .catch(err => {
                alert(err);
            })
            .finally(() => {
                textArea.setSelectionRange(0, 0);
            })
    } catch (err) {
        alert(err);
    }
}
