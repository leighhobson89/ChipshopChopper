import {
    getActualPotatoesInStorage,
    getChipsCutThisShift,
    getAreChipsFrying,
    getChipsReadyToServeQuantity,
    getCurrentCash,
    getCustomersServed,
    getCustomersWaiting,
    getCutChipsRate,
    getFryerCapacity,
    getFryTimer,
    getMaxSpudsDelivery,
    getCurrentMaxValueWaitForNewCustomer,
    getMinSpudsDelivery,
    getMultipleForImproveFryerCapacity,
    getMultipleForImprovePotatoStorage,
    getNumberOfChipsFromPotato,
    getOddNumberLeftOverAfterDoublePeelingChipping,
    getOnShiftOne,
    getPeelPotatoesRate,
    getPortionSize,
    getPotatoesPeeledThisShift,
    getPotatoStorageQuantity,
    getPriceToAddStorageHeater,
    getPriceToEnableDoubleChipping,
    getPriceToEnableDoublePeeling,
    getPriceToImproveFryerCapacity,
    getPriceToImprovePotatoStorage,
    getShiftCounter,
    getShiftInProgress,
    getShiftLength,
    getShiftTime,
    getSpudsToAddToShift,
    getStandardDecrementIncrementOfOne,
    getStartingSpuds,
    getUpgradeDoubleChopperMultiple,
    getUpgradeDoublePeelerMultiple,
    getUpgradeFryerCapacityAmount,
    getUpgradeHeaterMultiple,
    getUpgradePotatoStorageQuantity,
    getZero,
    setActualPotatoesInStorage,
    setChipsCutThisShift,
    setAreChipsFrying,
    setChipsReadyToServeQuantity,
    setCurrentCash,
    setCustomersServed,
    setCustomersWaiting,
    setCustomerTimerVariable,
    setCutChipsRate,
    setFryerCapacity,
    setFryTimeRemaining,
    setMultipleForHeaterEffectOnCoolDown,
    setPeelPotatoesRate,
    setPotatoesPeeledThisShift,
    setPotatoStorageQuantity,
    setPriceToImproveFryerCapacity,
    setPriceToImprovePotatoStorage,
    setQuantityOfChipsFrying,
    setShiftCounter,
    setShiftInProgress,
    setShiftLengthTimerVariable,
    setSpudsToAddToShift,
    getAddOneToRandomNumberToEnsureAboveOne,
    getStart,
    getStop,
    getElements,
    batchTimers,
    getQuantityOfChipsFrying,
    getDebugFlag,
    getImprovePotatoStorageNotClickedYet,
    getPriceToImproveAutoPeeler,
    getPriceToImproveAutoChipper,
    getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut,
    getPriceToImproveAutoMoverFromFryerToStorage,
    getPriceToImproveAutoCustomerServer,
    setPriceToImproveAutoPeeler,
    setPriceToImproveAutoChipper,
    setPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut,
    setPriceToImproveAutoMoverFromFryerToStorage,
    setPriceToImproveAutoCustomerServer,
    getMultipleForImproveAutoPeeler,
    getMultipleForImproveAutoChipper,
    getMultipleForImproveAutoFryer,
    getMultipleForImproveAutoStorageCollector,
    getMultipleForImproveAutoCustomerServer,
    setCurrentSpeedAutoPeeler,
    getNextSpeedAutoPeeler,
    getCurrentSpeedAutoPeeler,
    setNextSpeedAutoPeeler,
    getAutoPeelerBought,
    setAutoPeelerBought,
    getAutoChipperBought,
    setAutoChipperBought,
    setCurrentSpeedAutoChipper,
    getNextSpeedAutoChipper,
    getCurrentSpeedAutoChipper,
    setNextSpeedAutoChipper,
    getAutoFryerBought,
    setAutoFryerBought,
    setCurrentSpeedAutoFryer,
    getNextSpeedAutoFryer,
    setNextSpeedAutoFryer,
    getCurrentSpeedAutoFryer,
    getAutoFryerUpgradeDecrement,
    getAutoStorageCollectorBought,
    setAutoStorageCollectorBought,
    setCurrentSpeedAutoStorageCollector,
    getNextSpeedAutoStorageCollector,
    setNextSpeedAutoStorageCollector,
    getCurrentSpeedAutoStorageCollector,
    getAutoStorageCollectorUpgradeDecrement,
    getNextSpeedAutoCustomerServer,
    setCurrentSpeedAutoCustomerServer,
    setNextSpeedAutoCustomerServer,
    getCurrentSpeedAutoCustomerServer,
    setAutoCustomerServerBought,
    getAutoCustomerServerBought,
    getAutoCustomerServerUpgradeDecrement,
    getOne,
    setAutoFryerCounter,
    setAutoStorageCollectorCounter,
    getImproveFryTimerBought,
    setImproveFryTimerBought,
    getPriceToImproveFryTimer,
    setPriceToImproveFryTimer,
    getMultipleForImproveFryTimer,
    setPriceToDoubleSpudsMax,
    getPriceToDoubleSpudsMax,
    getMultipleForMaxSpudsUpgrade,
    setCurrentMaxSpudsDelivery,
    getNextMaxSpudsDelivery,
    setNextMaxSpudsDelivery,
    getCurrentMaxSpudsDelivery,
    getUpgradeMaxSpudsIncrement,
    setCurrentSpeedFryTimer,
    getCurrentSpeedFryTimer,
    setNextSpeedFryTimer,
    getUpgradeFryTimeDecrement,
    getNextSpeedFryTimer,
    getDoubleMaxSpudsDeliveryBought,
    setDoubleMaxSpudsDeliveryBought,
    setFryTimer,
    setMaxSpudsDelivery,
    setPeelerUpgradeBought,
    setChipperUpgradeBought,
    setHeaterUpgradeBought,
    setInvestmentFundUnlocked,
    getInvestmentFundUnlocked,
    getPriceToUnlockInvestmentFundOrFloatOnStockMarket,
    getPriceToFloatOnStockMarket,
    getPriceToUnlockAutoShiftStart,
    setAutoShiftStartUpgradeUnlocked,
    setAutoShiftStatus,
    getAutoShiftStatus,
    getGameInProgress,
    getPriceToIncreaseFootfall,
    setCurrentMaxValueWaitForNewCustomer,
    getNextMaxValueWaitForNewCustomer,
    setNextMaxValueWaitForNewCustomer,
    getMultipleForIncreaseFootfallUpgrade,
    setPriceToIncreaseFootfall,
    getIncreaseFootfallDecrement,
    setAmountInvestmentCash,
    getInvestmentCashIncrementDecrement,
    getAmountInvestmentCash,
    getAmountInvestmentRisk,
    getMaxRiskAmount,
    setAmountInvestmentRisk,
    getHeaterUpgradeBought,
    setCurrentValueOfInvestment,
    getCurrentValueOfInvestment,
    setPriceToUnlockInvestmentFundToNowFloatOnStockMarket,
    getFloatOnStockMarketUnlockedAndEndGameFlowStarted,
    setFloatOnStockMarketUnlockedAndEndGameFlowStarted,
    endOfShiftOrGamePopup,
    popupOverlay,
    getPriceOfChips,
    setChipsWastedThisShift,
    getChipsWastedThisShift,
    resetBatchTimers,
    setChipsFriedThisShift,
    getEndGameCash,
    getEndGamePotatoes,
    getEndGameFryTimer,
    captureGameStatusForSaving,
    restoreGameStatus,
    setElements,
    setPauseAutoSaveCountdown,
    setTotalSpentExcludingInvestments,
    getTotalSpentExcludingInvestments,
    setTotalPeeled,
    getTotalPeeled,
    setTotalCut,
    getTotalCut,
    setTotalServedCustomers,
    getTotalServedCustomers,
    setTotalWastedChips,
    getTotalWastedChips,
    wheelColors,
    Role,
    prizes,
    endOfShiftOrGamePopupObject,
    setEndOfShiftOrGamePopupObject,
    setEndOfShiftOrGamePopup,
    setPopupContinueButton, setPopupOverlay, getInvestmentFundUnlockable, setInvestmentFundUnlockable
} from './constantsAndGlobalVars.js';

import {
    calculateForthcomingTotalInvestment,
    startBatchTimer,
    wasteChipsStillInFryerOrFryingAtEndOfShift
} from './gameloop.js';

import {
    addCheckbox, createAndAttachContinueButtonEventListener,
    createOverlay,
    formatToCashNotation,
    hideButtonsReadyForEndGame,
    initialiseInvestmentScreenText,
    toggleEndOfShiftOrGamePopup,
    toggleOverlay,
    triggerEndGameScreen,
    updateButtonStyle,
    writePopupText
} from "./ui.js";

export function handleButtonClick(buttonId, value) {
    const button = getElements()[buttonId];
    const element = getElements()[value];

    button.addEventListener('click', () => {
        if (!getInvestmentFundUnlocked()) {
            switch (buttonId) {
                case getElements().menuButton.id:
                    if (getGameInProgress() && getElements().option2.classList.contains('option-disabled')) {
                        getElements().option2.classList.remove('option-disabled');
                    }
                    toggleMenu(!getElements().gameWindow.classList.contains('d-none'));
                    setPauseAutoSaveCountdown(true);
                    break;
                case getElements().peelPotatoButton.id:
                    handlePeelPotato(element);
                    break;
                case getElements().cutChipsButton.id:
                    handleCutChips(element);
                    break;
                case getElements().fryChipsButton.id:
                    handleFryChips(buttonId);
                    break;
                case getElements().servingStorageButton.id:
                    handleServingStorage();
                    break;
                case getElements().serveCustomerButton.id:
                    handleServeCustomer();
                    break;
                case getElements().improvePotatoStorageButton.id:
                    handleImprovePotatoStorage(buttonId);
                    break;
                case getElements().twoHandedPeelingButton.id:
                    handleTwoHandedPeeling(button, buttonId);
                    break;
                case getElements().twoHandedChippingButton.id:
                    handleTwoHandedChipping(button, buttonId);
                    break;
                case getElements().improveFryerCapacityButton.id:
                    handleImproveFryerCapacity(buttonId);
                    break;
                case getElements().addStorageHeaterAutoShiftStartButton.id:
                    handleAddStorageHeater(button, buttonId);
                    break;
                case getElements().startShiftButton.id:
                    handleStartShift();
                    break;
                case getElements().autoPeelerUpgradeButton.id:
                    handleAutoPeeler(buttonId);
                    break;
                case getElements().autoChipperUpgradeButton.id:
                    handleAutoChipper(buttonId);
                    break;
                case getElements().autoFryerUpgradeButton.id:
                    handleAutoFryer(buttonId);
                    break;
                case getElements().autoStorageCollectorUpgradeButton.id:
                    handleAutoStorageCollector(buttonId);
                    break;
                case getElements().autoCustomerServerUpgradeButton.id:
                    handleAutoCustomerServer(buttonId);
                    break;
                case getElements().fastFryerUpgradeButton.id:
                    handleImproveFryTimer(buttonId);
                    break;
                case getElements().potatoDeliveryDoublerButton.id:
                    handleDoubleMaxSpudsDelivery(buttonId);
                    break;
                case getElements().investmentFundUnlockOrFloatButton.id:
                    handleInvestmentFundUnlockButton(buttonId);
                    disableButtons(false);
                    return;
                case getElements().customerFrequencyIncreaser.id:
                    handleIncreaseFootfall(buttonId);
                    break;
                case getElements().investmentCashComponent_IncrementButton.id:
                    handleIncreaseCashInvested();
                    break;
                case getElements().investmentCashComponent_DecrementButton.id:
                    handleDecreaseCashInvested();
                    break;
                case getElements().investmentRiskComponent_IncrementButton.id:
                    handleIncreaseRiskAmount();
                    break;
                case getElements().investmentRiskComponent_DecrementButton.id:
                    handleDecreaseRiskAmount();
                    break;
                case getElements().withdrawInvestmentButton.id:
                    handleWithDrawNowButton();
                    break;
                default:
                    break;
            }
        }

        if (getInvestmentFundUnlocked()) {
            switch (buttonId) {
                case getElements().menuButton.id:
                    if (getGameInProgress() && getElements().option2.classList.contains('option-disabled')) {
                        getElements().option2.classList.remove('option-disabled');
                    }
                    toggleMenu(!getElements().gameWindow.classList.contains('d-none'));
                    setPauseAutoSaveCountdown(true);
                    break;
                case getElements().peelPotatoButton.id:
                    handlePeelPotato(element);
                    break;
                case getElements().cutChipsButton.id:
                    handleCutChips(element);
                    break;
                case getElements().fryChipsButton.id:
                    handleFryChips(buttonId);
                    break;
                case getElements().servingStorageButton.id:
                    handleServingStorage();
                    break;
                case getElements().serveCustomerButton.id:
                    handleServeCustomer();
                    break;
                case getElements().improvePotatoStorageButton.id:
                    handleImprovePotatoStorage(buttonId);
                    break;
                case getElements().improveFryerCapacityButton.id:
                    handleImproveFryerCapacity(buttonId);
                    break;
                case getElements().addStorageHeaterAutoShiftStartButton.id:
                    handleAddStorageHeater(button, buttonId);
                    break;
                case getElements().startShiftButton.id:
                    handleStartShift();
                    break;
                case getElements().autoPeelerUpgradeButton.id:
                    handleAutoPeeler(buttonId);
                    break;
                case getElements().autoChipperUpgradeButton.id:
                    handleAutoChipper(buttonId);
                    break;
                case getElements().autoFryerUpgradeButton.id:
                    handleAutoFryer(buttonId);
                    break;
                case getElements().autoStorageCollectorUpgradeButton.id:
                    handleAutoStorageCollector(buttonId);
                    break;
                case getElements().autoCustomerServerUpgradeButton.id:
                    handleAutoCustomerServer(buttonId);
                    break;
                case getElements().fastFryerUpgradeButton.id:
                    handleImproveFryTimer(buttonId);
                    break;
                case getElements().potatoDeliveryDoublerButton.id:
                    handleDoubleMaxSpudsDelivery(buttonId);
                    break;
                case getElements().investmentFundUnlockOrFloatButton.id:
                    handleInvestmentFundUnlockButton(buttonId);
                    break;
                case getElements().customerFrequencyIncreaser.id:
                    handleIncreaseFootfall(buttonId);
                    break;
                case getElements().investmentCashComponent_IncrementButton.id:
                    handleIncreaseCashInvested();
                    break;
                case getElements().investmentCashComponent_DecrementButton.id:
                    handleDecreaseCashInvested();
                    break;
                case getElements().investmentRiskComponent_IncrementButton.id:
                    handleIncreaseRiskAmount();
                    break;
                case getElements().investmentRiskComponent_DecrementButton.id:
                    handleDecreaseRiskAmount();
                    break;
                case getElements().withdrawInvestmentButton.id:
                    handleWithDrawNowButton();
                    break;
                default:
                    break;
            }
        }

        disableButtons(false);
    });
}

function handlePeelPotato(element) {
    const potatoesInStorageBeforeThisPeel = getActualPotatoesInStorage();
    if (potatoesInStorageBeforeThisPeel > getOddNumberLeftOverAfterDoublePeelingChipping()) {
        peelPotato(element, getPeelPotatoesRate());
    } else if (potatoesInStorageBeforeThisPeel > getZero()) {
        peelPotato(element, getOne());
    }
}

function handleCutChips() {
    const peeledCount = getElements().peeledCount;
    if (parseInt(peeledCount.innerText) > getOddNumberLeftOverAfterDoublePeelingChipping()) { //normal case
        cutChips(getNumberOfChipsFromPotato() * getCutChipsRate(), getCutChipsRate());
    } else if (parseInt(peeledCount.innerText) > getZero()) { //odd number left handles case of double cutter
        cutChips(getNumberOfChipsFromPotato(), getOddNumberLeftOverAfterDoublePeelingChipping());
    }
}

function handleFryChips(buttonId) {
    let cutChipsCounterElement = getElements().cutCount;
    if (parseInt(cutChipsCounterElement.innerText) >= getFryerCapacity()) {
        setQuantityOfChipsFrying(getFryerCapacity());
    } else {
        setQuantityOfChipsFrying(parseInt(cutChipsCounterElement.innerText));
    }
    fryChips();
    decrementCounter(cutChipsCounterElement.id, getQuantityOfChipsFrying());
    updateButtonStyle(buttonId, null);
}

export function handleServingStorage() {
    const fryerButton = getElements().fryChipsButton;
    let chuckedInFryerCount = parseInt(getElements().chuckedInFryerCount.innerText);
    let newBatchId = getChipsReadyToServeQuantity().length;

    let cleanArray = cleanUpArray(getChipsReadyToServeQuantity()); //clean any NaN or Empty elements from array added by mistake
    setChipsReadyToServeQuantity(cleanArray, 'clean');
    getChipsReadyToServeQuantity().push(chuckedInFryerCount);
    getElements().chuckedInFryerCount.innerHTML = `<h3>${getZero().toString()}</h3>`;
    if (fryerButton.classList.contains('action-button-main-flashing')) {
        updateButtonStyle(fryerButton.id, getStop());
    }
    fryerButton.innerHTML = 'Fry Chips (Capacity: ' + getFryerCapacity() + ')';
    let total = getZero();
    for (let i = 0; i < getChipsReadyToServeQuantity().length; i++) {
        total += getChipsReadyToServeQuantity()[i];
    }
    getElements().readyToServeCount.innerHTML = `<h3>${total.toString()}</h3>`;
    startBatchTimer(newBatchId);
}

function handleServeCustomer() {
    serveCustomer();
    if (getFloatOnStockMarketUnlockedAndEndGameFlowStarted()) {
        setCurrentCash(getCurrentCash() + getPriceOfChips());
        getElements().subInnerDivMid3_2.innerHTML = `<h4>${formatToCashNotation(getCurrentCash())}</h4>`;
        triggerEndGameScreen();
    }
}

function handleImprovePotatoStorage(buttonId) {
    if (getDebugFlag()) {
        setActualPotatoesInStorage(getStartingSpuds());
    }
    setCurrentCash(getCurrentCash() - getPriceToImprovePotatoStorage());
    setTotalSpentExcludingInvestments(getTotalSpentExcludingInvestments() + getPriceToImprovePotatoStorage());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    setPotatoStorageQuantity(getPotatoStorageQuantity() + getUpgradePotatoStorageQuantity());
    getElements()[buttonId].innerHTML = `Increase Potato Cap.<br>${getPotatoStorageQuantity()} → ${getPotatoStorageQuantity() + getUpgradePotatoStorageQuantity()}<br>${formatToCashNotation(newPriceOfUpgrade)}`;
    getElements().subInnerDivMid1_2.innerHTML = `<h4>${getActualPotatoesInStorage().toString()}/${getPotatoStorageQuantity().toString()}</h4>`;
}

function handleTwoHandedPeeling(button, buttonId) {
    if (!checkIfNonRepeatableUpgradePurchased(button, 'peeler')) {
        setCurrentCash(getCurrentCash() - getPriceToEnableDoublePeeling());
        setTotalSpentExcludingInvestments(getTotalSpentExcludingInvestments() + getPriceToEnableDoublePeeling());
        getElements()[buttonId].innerHTML = 'Double Peeling Tool PURCHASED';
        updateButtonStyle(buttonId, null);
        setPeelPotatoesRate(getPeelPotatoesRate() * getUpgradeDoublePeelerMultiple());
    }
}

function handleTwoHandedChipping(button, buttonId) {
    if (!checkIfNonRepeatableUpgradePurchased(button, 'chipper')) {
        setCurrentCash(getCurrentCash() - getPriceToEnableDoubleChipping());
        setTotalSpentExcludingInvestments(getTotalSpentExcludingInvestments() + getPriceToEnableDoubleChipping());
        getElements()[buttonId].innerHTML = 'Double Chipping Tool PURCHASED';
        updateButtonStyle(buttonId, null);
        setCutChipsRate(getCutChipsRate() * getUpgradeDoubleChopperMultiple());
    }
}

function handleImproveFryerCapacity(buttonId) {
    setCurrentCash(getCurrentCash() - getPriceToImproveFryerCapacity());
    setTotalSpentExcludingInvestments(getTotalSpentExcludingInvestments() + getPriceToImproveFryerCapacity());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    setFryerCapacity(getFryerCapacity() + getUpgradeFryerCapacityAmount());
    getElements()[buttonId].innerHTML = `Improve Fryer Cap.<br>${getFryerCapacity()} → ${getFryerCapacity() + getUpgradeFryerCapacityAmount()}<br>${formatToCashNotation(newPriceOfUpgrade)}`;
    getElements().fryChipsButton.innerHTML = 'Fry Chips (Capacity: ' + getFryerCapacity() + ')';
}

function handleAddStorageHeater(button, buttonId) {
    if (!getInvestmentFundUnlocked()) { //storage heater button
        if (!checkIfNonRepeatableUpgradePurchased(button, 'heater')) {
            setCurrentCash(getCurrentCash() - getPriceToAddStorageHeater());
            setTotalSpentExcludingInvestments(getTotalSpentExcludingInvestments() + getPriceToAddStorageHeater());
            getElements()[buttonId].innerHTML = 'Storage Bin Heater PURCHASED';
            updateButtonStyle(buttonId, null);
            setMultipleForHeaterEffectOnCoolDown(getUpgradeHeaterMultiple());
        }
    } else { //auto shift start button
        if (!checkIfNonRepeatableUpgradePurchased(button, 'autoShift')) { //if auto shift start not bought yet
            setCurrentCash(getCurrentCash() - getPriceToUnlockAutoShiftStart());
            setTotalSpentExcludingInvestments(getTotalSpentExcludingInvestments() + getPriceToUnlockAutoShiftStart());
            getElements()[buttonId].innerHTML = `Auto Shift Start Upgrade<br>DISABLED`;
            getElements()[buttonId].classList.add('toggleable-button-on-state'); //initialisation leave as this
            updateButtonStyle(buttonId, null);
            setAutoShiftStatus(false);
        } else { //if auto shift start already bought
            if (!getAutoShiftStatus()) {
                setAutoShiftStatus(true);
                updateButtonStyle(buttonId, null);
            } else {
                setAutoShiftStatus(false);
                updateButtonStyle(buttonId, null);
            }
        }
    }
}

export function handleStartShift() {
    if (getFloatOnStockMarketUnlockedAndEndGameFlowStarted()) {
        setShiftInProgress(true);
        console.log("Started Final Shift!");
        getElements().startShiftButton.classList.add('d-none');
    } else {
        setShiftLengthTimerVariable(getShiftLength());
        setShiftInProgress(true);
        setShiftCounter(getShiftCounter() + getStandardDecrementIncrementOfOne());

        getElements().subInnerDiv1_1.innerHTML = '<h4>Shift:</h4>';
        getElements().subInnerDiv1_2.innerHTML = `<h4>${getShiftTime()}</h4>`;

        switch (getShiftCounter()) {
            case getOnShiftOne():
                if (!getDebugFlag() || (getDebugFlag() && !getImprovePotatoStorageNotClickedYet())) {
                    getElements().subInnerDivMid1_2.innerHTML = `<h4>${addShiftSpuds(getStartingSpuds()).toString()}/${getPotatoStorageQuantity().toString()}</h4>`;
                }
                break;
            default:
                getElements().subInnerDivMid1_2.innerHTML = `<h4>${addShiftSpuds(getSpudsToAddToShift()).toString()}/${getPotatoStorageQuantity().toString()}</h4>`;
                break;
        }

        let newPotatoesToDeliverForNextShift = Math.min((getActualPotatoesInStorage() + getSpudsToAddToShift()), getPotatoStorageQuantity());
        setActualPotatoesInStorage(newPotatoesToDeliverForNextShift);
        getElements().startShiftButton.innerHTML = 'Start Shift <br> (+ ' + selectARandomNumberOfSpudsForNextShift() + ' Potatoes)';

        calculateForthcomingTotalInvestment();
    }
    disableButtons(false);
}

function handleAutoPeeler(buttonId) {
    const button = getElements()[buttonId];
    if (!getAutoPeelerBought()) {
        setAutoPeelerBought(true);
        button.classList.remove('autoUpgradeEnabled');
    }
    setCurrentCash(getCurrentCash() - getPriceToImproveAutoPeeler());
    setTotalSpentExcludingInvestments(getTotalSpentExcludingInvestments() + getPriceToImproveAutoPeeler());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    setCurrentSpeedAutoPeeler(getNextSpeedAutoPeeler());
    setNextSpeedAutoPeeler(getCurrentSpeedAutoPeeler() + getStandardDecrementIncrementOfOne());

    const upgradeEnabledState = getElements()[buttonId].classList.contains('autoUpgradeEnabled');

    button.innerHTML = `Auto Peeler (${getCurrentSpeedAutoPeeler()}/s)<br>${getCurrentSpeedAutoPeeler()} → ${getNextSpeedAutoPeeler()}/s<br> ${formatToCashNotation(newPriceOfUpgrade)}`;

    addCheckbox(button, upgradeEnabledState);
}

function handleAutoChipper(buttonId) {
    const button = getElements()[buttonId];
    if (!getAutoChipperBought()) {
        setAutoChipperBought(true);
        button.classList.remove('autoUpgradeEnabled');
    }
    setCurrentCash(getCurrentCash() - getPriceToImproveAutoChipper());
    setTotalSpentExcludingInvestments(getTotalSpentExcludingInvestments() + getPriceToImproveAutoChipper());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    setCurrentSpeedAutoChipper(getNextSpeedAutoChipper());
    setNextSpeedAutoChipper(getCurrentSpeedAutoChipper() + getStandardDecrementIncrementOfOne());

    const upgradeEnabledState = getElements()[buttonId].classList.contains('autoUpgradeEnabled');

    button.innerHTML = `Auto Chipper (${getCurrentSpeedAutoChipper()}/s)<br>${getCurrentSpeedAutoChipper()} → ${getNextSpeedAutoChipper()}/s<br> ${formatToCashNotation(newPriceOfUpgrade)}`;

    addCheckbox(button, upgradeEnabledState);
}

function handleAutoFryer(buttonId) {
    const button = getElements()[buttonId];
    if (!getAutoFryerBought()) {
        setAutoFryerBought(true);
        button.classList.remove('autoUpgradeEnabled');
    }
    setAutoFryerCounter(getZero());
    setCurrentCash(getCurrentCash() - getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut());
    setTotalSpentExcludingInvestments(getTotalSpentExcludingInvestments() + getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    setCurrentSpeedAutoFryer(getNextSpeedAutoFryer());
    setNextSpeedAutoFryer(getCurrentSpeedAutoFryer() - getAutoFryerUpgradeDecrement());

    const upgradeEnabledState = getElements()[buttonId].classList.contains('autoUpgradeEnabled');

    button.innerHTML = `Auto Fryer (${getCurrentSpeedAutoFryer()}s)<br>${getCurrentSpeedAutoFryer()} → ${getNextSpeedAutoFryer()}/s<br> ${formatToCashNotation(newPriceOfUpgrade)}<br> Ready in ${Math.floor(getCurrentSpeedAutoFryer())}s`;

    addCheckbox(button, upgradeEnabledState);
}

function handleAutoStorageCollector(buttonId) {
    const button = getElements()[buttonId];
    if (!getAutoStorageCollectorBought()) {
        setAutoStorageCollectorBought(true);
        button.classList.remove('autoUpgradeEnabled');
    }
    setAutoStorageCollectorCounter(getZero());
    setCurrentCash(getCurrentCash() - getPriceToImproveAutoMoverFromFryerToStorage());
    setTotalSpentExcludingInvestments(getTotalSpentExcludingInvestments() + getPriceToImproveAutoMoverFromFryerToStorage());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    setCurrentSpeedAutoStorageCollector(getNextSpeedAutoStorageCollector());
    setNextSpeedAutoStorageCollector(getCurrentSpeedAutoStorageCollector() - getAutoStorageCollectorUpgradeDecrement());

    const upgradeEnabledState = getElements()[buttonId].classList.contains('autoUpgradeEnabled');

    button.innerHTML = `Auto Collect (${getCurrentSpeedAutoStorageCollector()}s)<br>${getCurrentSpeedAutoStorageCollector()} → ${getNextSpeedAutoStorageCollector()}/s<br> ${formatToCashNotation(newPriceOfUpgrade)}<br> Ready in ${Math.floor(getCurrentSpeedAutoStorageCollector())}s`;

    addCheckbox(button, upgradeEnabledState);
}

function handleAutoCustomerServer(buttonId) {
    const button = getElements()[buttonId];
    if (!getAutoCustomerServerBought()) {
        setAutoCustomerServerBought(true);
        button.classList.remove('autoUpgradeEnabled');
    }
    setCurrentCash(getCurrentCash() - getPriceToImproveAutoCustomerServer());
    setTotalSpentExcludingInvestments(getTotalSpentExcludingInvestments() + getPriceToImproveAutoCustomerServer());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    setCurrentSpeedAutoCustomerServer(getNextSpeedAutoCustomerServer());
    setNextSpeedAutoCustomerServer(getCurrentSpeedAutoCustomerServer() - getAutoCustomerServerUpgradeDecrement());

    const upgradeEnabledState = getElements()[buttonId].classList.contains('autoUpgradeEnabled');

    button.innerHTML = `Auto Server (${getCurrentSpeedAutoCustomerServer()}s)<br>${getCurrentSpeedAutoCustomerServer()} → ${getNextSpeedAutoCustomerServer()}/s<br> ${formatToCashNotation(newPriceOfUpgrade)}<br> Ready in ${Math.floor(getCurrentSpeedAutoCustomerServer())}s`;

    addCheckbox(button, upgradeEnabledState);
}

function handleImproveFryTimer(buttonId) {
    if (!getImproveFryTimerBought()) {
        setImproveFryTimerBought(true);
    }
    setCurrentCash(getCurrentCash() - getPriceToImproveFryTimer());
    setTotalSpentExcludingInvestments(getTotalSpentExcludingInvestments() + getPriceToImproveFryTimer());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    setCurrentSpeedFryTimer(getNextSpeedFryTimer());
    setFryTimer(Math.floor(getCurrentSpeedFryTimer()));
    setNextSpeedFryTimer(getCurrentSpeedFryTimer() - getUpgradeFryTimeDecrement());
    getElements()[buttonId].innerHTML = `Improve Fry Speed<br>${getCurrentSpeedFryTimer()}s → ${getNextSpeedFryTimer()}s<br>${formatToCashNotation(newPriceOfUpgrade)}`
}

function handleDoubleMaxSpudsDelivery(buttonId) {
    if (!getDoubleMaxSpudsDeliveryBought()) {
        setDoubleMaxSpudsDeliveryBought(true);
    }
    setCurrentCash(getCurrentCash() - getPriceToDoubleSpudsMax());
    setTotalSpentExcludingInvestments(getTotalSpentExcludingInvestments() + getPriceToDoubleSpudsMax());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    setCurrentMaxSpudsDelivery(getNextMaxSpudsDelivery());
    setMaxSpudsDelivery(getCurrentMaxSpudsDelivery());
    setNextMaxSpudsDelivery(getCurrentMaxSpudsDelivery() * getUpgradeMaxSpudsIncrement());
    getElements()[buttonId].innerHTML = `Double Max Delivery<br>${getCurrentMaxSpudsDelivery()} → ${getNextMaxSpudsDelivery()}<br>${formatToCashNotation(newPriceOfUpgrade)}`

}

function handleInvestmentFundUnlockButton(buttonId) {
    if (!getInvestmentFundUnlocked()) {
        setInvestmentFundUnlocked(true);
    } else {
        setFloatOnStockMarketUnlockedAndEndGameFlowStarted(true);
    }
    setCurrentCash(getCurrentCash() - getPriceToUnlockInvestmentFundOrFloatOnStockMarket());
    setTotalSpentExcludingInvestments(getTotalSpentExcludingInvestments() + getPriceToUnlockInvestmentFundOrFloatOnStockMarket());
    updateButtonStyle(buttonId, null);
    if (!getFloatOnStockMarketUnlockedAndEndGameFlowStarted()) {
        updateStorageBinHeaterToAutoShiftStartButton();
        setUpFloatButton();
    }
    if (getFloatOnStockMarketUnlockedAndEndGameFlowStarted()) {
        setTotalSpentExcludingInvestments(getTotalSpentExcludingInvestments() + getPriceToFloatOnStockMarket());
        setupEndGameFlow();
    }
}

function handleIncreaseFootfall(buttonId) {
    setCurrentCash(getCurrentCash() - getPriceToIncreaseFootfall());
    setTotalSpentExcludingInvestments(getTotalSpentExcludingInvestments() + getPriceToIncreaseFootfall());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    setCurrentMaxValueWaitForNewCustomer(getNextMaxValueWaitForNewCustomer());
    setNextMaxValueWaitForNewCustomer(getCurrentMaxValueWaitForNewCustomer() - getIncreaseFootfallDecrement());
    getElements()[buttonId].innerHTML = `Max Wait Customer<br>${getCurrentMaxValueWaitForNewCustomer()}s → ${getNextMaxValueWaitForNewCustomer()}s<br>${formatToCashNotation(newPriceOfUpgrade)}`
}

function handleIncreaseCashInvested() {
    if (getCurrentCash() >= getInvestmentCashIncrementDecrement()) {
        setCurrentCash(getCurrentCash() - getInvestmentCashIncrementDecrement());
        setAmountInvestmentCash(getAmountInvestmentCash() + getInvestmentCashIncrementDecrement());
        setCurrentValueOfInvestment(getCurrentValueOfInvestment() + getInvestmentCashIncrementDecrement());
    } else {
        setAmountInvestmentCash(getAmountInvestmentCash() + getCurrentCash());
        setCurrentValueOfInvestment(getCurrentValueOfInvestment() + getCurrentCash());
        setCurrentCash(getZero());
    }
}

function handleDecreaseCashInvested() {
    if (getCurrentValueOfInvestment() >= getAmountInvestmentCash()) {
        if (getAmountInvestmentCash() >= getInvestmentCashIncrementDecrement()) {
            setCurrentCash(getCurrentCash() + getInvestmentCashIncrementDecrement());
            setAmountInvestmentCash(getAmountInvestmentCash() - getInvestmentCashIncrementDecrement());
            setCurrentValueOfInvestment(getCurrentValueOfInvestment() - getInvestmentCashIncrementDecrement());
        } else if (getAmountInvestmentCash() > getZero()) {
            setCurrentCash(getCurrentCash() + getAmountInvestmentCash());
            setCurrentValueOfInvestment(getCurrentValueOfInvestment() - getAmountInvestmentCash());
            setAmountInvestmentCash(getZero());
        }
    } else {
        if (getCurrentValueOfInvestment() >= getInvestmentCashIncrementDecrement()) {
            setCurrentCash(getCurrentCash() + getInvestmentCashIncrementDecrement());
            setAmountInvestmentCash(getAmountInvestmentCash() - getInvestmentCashIncrementDecrement());
            setCurrentValueOfInvestment(getCurrentValueOfInvestment() - getInvestmentCashIncrementDecrement());
        } else if (getCurrentValueOfInvestment() > getZero()) {
            setCurrentCash(getCurrentCash() + getCurrentValueOfInvestment());
            setCurrentValueOfInvestment(getZero());
            setAmountInvestmentCash(getZero());
        }
    }
    if (getAmountInvestmentCash() === 0) {
        setAmountInvestmentRisk(getZero());
    }
}

function handleIncreaseRiskAmount() {
    if (getAmountInvestmentRisk() < getMaxRiskAmount()) {
        setAmountInvestmentRisk(getAmountInvestmentRisk() + getOne());
    }
}

function handleDecreaseRiskAmount() {
    if (getAmountInvestmentRisk() > getZero()) {
        setAmountInvestmentRisk(getAmountInvestmentRisk() - getOne());
    }
}

function handleWithDrawNowButton() {
    setCurrentCash(getCurrentCash() + getCurrentValueOfInvestment());
    setCurrentValueOfInvestment(getZero());
    setAmountInvestmentCash(getZero());
    setAmountInvestmentRisk(getZero());
    getElements().withdrawInvestmentButton.classList.add('disabled');
    getElements().withdrawInvestmentButton.disabled = true;
}

function updateStorageBinHeaterToAutoShiftStartButton() {
    getElements().addStorageHeaterAutoShiftStartButton.innerHTML = `Auto Shift Start Upgrade<br>${formatToCashNotation(getPriceToUnlockAutoShiftStart())})`;
    getElements().addStorageHeaterAutoShiftStartButton.classList.remove('non-repeatable-upgrade-purchased');
}

export function incrementCounter(counterElement, value) {
    let count = parseInt(counterElement.innerText);
    count += value;
    counterElement.innerHTML = "<h3>" + count.toString() + "</h3>";
    disableButtons(false);
}

export function decrementCounter(counterId, value) {
    const counterElement = getElements()[counterId];
    let count = parseInt(counterElement.innerText);
    count = Math.max(getZero(), count - value);
    if (counterId === "subInnerDivMid1_2") {
        counterElement.innerHTML = "<h4>" + count.toString() + "/" + getPotatoStorageQuantity().toString() + "</h4>";
    } else {
        counterElement.innerHTML = "<h3>" + count.toString() + "</h3>";
    }
    disableButtons(false);
}

export function disableButtons(init) {
    let mainButtons;
    let investmentCashComponent_DecrementButton = getElements().investmentCashComponent_DecrementButton;
    let investmentRiskComponent_DecrementButton = getElements().investmentRiskComponent_DecrementButton;
    let withdrawInvestmentButton = getElements().withdrawInvestmentButton;

    const pricesArrayButtons = [0, 0, 0, 0, 0, getPriceToImproveAutoPeeler(), getPriceToImproveAutoChipper(), getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut(), getPriceToImproveAutoMoverFromFryerToStorage(), getPriceToImproveAutoCustomerServer(), getPriceToImprovePotatoStorage(), getPriceToImproveFryerCapacity(), getPriceToImproveFryTimer(), getPriceToDoubleSpudsMax(), getPriceToIncreaseFootfall(), 0, 0, 0, 0, 0];

    if (getGameInProgress()) {
        mainButtons = getElements().allMainButtons;
    }

    if (!init) {
        mainButtons = getElements().allMainButtons;

        const spudCount = parseInt(getElements().subInnerDivMid1_2.innerText);
        const peeledCount = parseInt(getElements().peeledCount.innerText);
        const cutCount = parseInt(getElements().cutCount.innerText);
        const inFryerCount = parseInt(getElements().chuckedInFryerCount.innerText);
        const readyToServeCount = parseInt(getElements().readyToServeCount.innerText);
        const customerCount = parseInt(getElements().customersWaitingCount.innerText);

        if (!getShiftInProgress()) {
            toggleDisable(false, getElements().menuButton);
            toggleDisable(false, investmentRiskComponent_DecrementButton);
            toggleDisable(false, investmentCashComponent_DecrementButton);

            if (getCurrentValueOfInvestment() > getZero()) {
                toggleDisable(false, getElements().withdrawInvestmentButton);
                changeWithdrawInvestmentButtonText(true);
            }
        } else {
            toggleDisable(true, getElements().menuButton);
        }

        mainButtons.forEach(button => {
            if (!button.classList.contains('capped')) {
                switch (button.id) {
                    case getElements().peelPotatoButton.id:
                        button.disabled = spudCount <= getZero() || !getShiftInProgress();
                        break;
                    case getElements().cutChipsButton.id:
                        button.disabled = peeledCount <= getZero() || !getShiftInProgress();
                        break;
                    case getElements().fryChipsButton.id:
                        checkIfChipsStillInFryer();
                        button.disabled = !getShiftInProgress() || (cutCount <= getZero() && !getAreChipsFrying());
                        break;
                    case getElements().servingStorageButton.id:
                        button.disabled = inFryerCount <= getZero() || !getShiftInProgress();
                        break;
                    case getElements().serveCustomerButton.id:
                        button.disabled = customerCount <= getZero() || readyToServeCount < getPortionSize() || !getShiftInProgress();
                        break;
                    case getElements().improvePotatoStorageButton.id:
                        button.disabled = getCurrentCash() < getPriceToImprovePotatoStorage();
                        break;
                    case getElements().autoPeelerUpgradeButton.id:
                        button.disabled = getCurrentCash() < getPriceToImproveAutoPeeler();
                        break;
                    case getElements().autoChipperUpgradeButton.id:
                        button.disabled = getCurrentCash() < getPriceToImproveAutoChipper();
                        break;
                    case getElements().autoFryerUpgradeButton.id:
                        button.disabled = getCurrentCash() < getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut();
                        break;
                    case getElements().autoStorageCollectorUpgradeButton.id:
                        button.disabled = getCurrentCash() < getPriceToImproveAutoMoverFromFryerToStorage();
                        break;
                    case getElements().autoCustomerServerUpgradeButton.id:
                        button.disabled = getCurrentCash() < getPriceToImproveAutoCustomerServer();
                        break;
                    case getElements().improveFryerCapacityButton.id:
                        button.disabled = getCurrentCash() < getPriceToImproveFryerCapacity();
                        break;
                    case getElements().fastFryerUpgradeButton.id:
                        button.disabled = getCurrentCash() < getPriceToImproveFryTimer();
                        break;
                    case getElements().potatoDeliveryDoublerButton.id:
                        button.disabled = getCurrentCash() < getPriceToDoubleSpudsMax();
                        break;
                    case getElements().customerFrequencyIncreaser.id:
                        button.disabled = getCurrentCash() < getPriceToIncreaseFootfall();
                        break;
                    default:
                        button.disabled = false;
                        break;
                }
            }

            if (!button.classList.contains('capped') && !getInvestmentFundUnlocked()) {
                switch (button.id) {
                    case getElements().twoHandedPeelingButton.id:
                        if (!checkIfNonRepeatableUpgradePurchased(button, null)) {
                            button.disabled = getCurrentCash() < getPriceToEnableDoublePeeling();
                        }
                        break;
                    case getElements().twoHandedChippingButton.id:
                        if (!checkIfNonRepeatableUpgradePurchased(button, null)) {
                            button.disabled = getCurrentCash() < getPriceToEnableDoubleChipping();
                        }
                        break;
                    case getElements().addStorageHeaterAutoShiftStartButton.id:
                        if (!getHeaterUpgradeBought()) {
                            if (!checkIfNonRepeatableUpgradePurchased(button, null)) {
                                button.disabled = getCurrentCash() < getPriceToAddStorageHeater();
                            }
                        } else {
                            if (!checkIfNonRepeatableUpgradePurchased(button, null)) {
                                button.disabled = (getCurrentCash() < getPriceToUnlockAutoShiftStart() && getInvestmentFundUnlocked());
                            }
                        }
                        break;
                    case getElements().startShiftButton.id:
                        button.disabled = getShiftTime() > getZero() && !getFloatOnStockMarketUnlockedAndEndGameFlowStarted();
                        break;
                    case getElements().investmentFundUnlockOrFloatButton.id:
                        if (getInvestmentFundUnlocked()) {
                            button.disabled = getCurrentCash() < getPriceToFloatOnStockMarket();
                        } else {
                            button.disabled = getCurrentCash() < getPriceToUnlockInvestmentFundOrFloatOnStockMarket() || !getShiftInProgress();
                        }
                        break;
                }
            }

            if (!button.classList.contains('capped') && getInvestmentFundUnlocked()) {
                switch (button.id) {
                    case getElements().addStorageHeaterAutoShiftStartButton.id:
                        if (!getHeaterUpgradeBought()) {
                            if (!checkIfNonRepeatableUpgradePurchased(button, null)) {
                                button.disabled = getCurrentCash() < getPriceToAddStorageHeater();
                            }
                        } else {
                            if (!checkIfNonRepeatableUpgradePurchased(button, null)) {
                                button.disabled = getCurrentCash() < getPriceToUnlockAutoShiftStart();
                            }
                        }
                        break;
                    case getElements().startShiftButton.id:
                        button.disabled = getShiftTime() > getZero() && !getFloatOnStockMarketUnlockedAndEndGameFlowStarted();
                        break;
                    case getElements().investmentFundUnlockOrFloatButton.id:
                        if (getInvestmentFundUnlocked()) {
                            button.disabled = getCurrentCash() < getPriceToFloatOnStockMarket();
                        } else {
                            button.disabled = getCurrentCash() < getPriceToUnlockInvestmentFundOrFloatOnStockMarket() || !getShiftInProgress();
                        }
                        break;
                }
            }

            if (button.disabled) {
                toggleDisable(true, button);
            } else {
                toggleDisable(false, button);
            }

            if (getShiftInProgress()) {
                toggleDisable(true, investmentCashComponent_DecrementButton);
                toggleDisable(true, investmentRiskComponent_DecrementButton);

                toggleDisable(true, getElements().withdrawInvestmentButton);
                changeWithdrawInvestmentButtonText(false);
            }
        });
    } else if (getGameInProgress() && getShiftCounter() > getZero()) {
        mainButtons.forEach(button => {
            if (!button.classList.contains('capped')) {
                if (!checkIfNonRepeatableUpgradePurchased(button)) {
                    if (!checkIfRepeatableUpgrade(button) || button.id === 'menuButton') {
                        toggleDisable(true, button);
                    }
                }
            }
        });
        disableButtonsHelper(mainButtons, pricesArrayButtons);
    } else {
        mainButtons = getElements().allMainButtons;
        disableButtonsHelper(mainButtons, pricesArrayButtons);
        toggleDisable(false, getElements().startShiftButton);
    }
}

function disableButtonsHelper(buttons, pricesArray) {
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (!button.classList.contains('capped')) {
            if (button.id !== getElements().startShiftButton.id && !checkIfNonRepeatableUpgradePurchased(button, null)) {
                if (getCurrentCash() < pricesArray[i] || pricesArray[i] === getZero()) {
                    toggleDisable(true, button);
                }
            }
        }
    }
}

export function createRandomCustomerTime() {
    if (getFloatOnStockMarketUnlockedAndEndGameFlowStarted()) {
        setCustomerTimerVariable(getEndGameCash()); //sets it to impossibly high number so no more customers come
    } else {
        const timeUntilNextCustomer = Math.floor(Math.random() * getCurrentMaxValueWaitForNewCustomer()) + 1;
        setCustomerTimerVariable(timeUntilNextCustomer);
    }
}

export function incrementCustomersWaiting() {
    let customerCount = parseInt(getElements().customersWaitingCount.innerText);
    customerCount += getStandardDecrementIncrementOfOne();
    if (!getFloatOnStockMarketUnlockedAndEndGameFlowStarted()) {
        getElements().customersWaitingCount.innerHTML = `<h3>${customerCount.toString()}</h3>`;
    }
    disableButtons(false);
}

function addShiftSpuds(quantity) {
    let currentSpuds = parseInt(getElements().subInnerDivMid1_2.innerText);
    if (currentSpuds + quantity > getPotatoStorageQuantity()) {
        return getPotatoStorageQuantity();
    }
    return currentSpuds + quantity;
}

export function fryChips() {
    setFryTimeRemaining(getFryTimer());
    setAreChipsFrying(true);
}

function selectARandomNumberOfSpudsForNextShift() {
    let spudsToAddToNextShift = Math.floor(Math.random() * (getMaxSpudsDelivery() - getMinSpudsDelivery() + getAddOneToRandomNumberToEnsureAboveOne())) + getMinSpudsDelivery();
    setSpudsToAddToShift(spudsToAddToNextShift);
    return spudsToAddToNextShift;
}

function calculateAndSetNewPriceOfUpgrade(buttonId) {
    if (!getInvestmentFundUnlocked()) {
        switch (buttonId) {
            //Manual Upgrades
            case getElements().improvePotatoStorageButton.id:
                setPriceToImprovePotatoStorage(getPriceToImprovePotatoStorage() * getMultipleForImprovePotatoStorage());
                return getPriceToImprovePotatoStorage();
            case getElements().twoHandedPeelingButton.id:
                return getPriceToEnableDoublePeeling();
            case getElements().twoHandedChippingButton.id:
                return getPriceToEnableDoubleChipping();
            case getElements().improveFryerCapacityButton.id:
                setPriceToImproveFryerCapacity(getPriceToImproveFryerCapacity() * getMultipleForImproveFryerCapacity());
                return getPriceToImproveFryerCapacity();
            case getElements().addStorageHeaterAutoShiftStartButton.id:
                return getPriceToAddStorageHeater();
            //Auto Upgrades
            case getElements().autoPeelerUpgradeButton.id:
                setPriceToImproveAutoPeeler(getPriceToImproveAutoPeeler() * getMultipleForImproveAutoPeeler());
                return getPriceToImproveAutoPeeler();
            case getElements().autoChipperUpgradeButton.id:
                setPriceToImproveAutoChipper(getPriceToImproveAutoChipper() * getMultipleForImproveAutoChipper());
                return getPriceToImproveAutoChipper();
            case getElements().autoFryerUpgradeButton.id:
                setPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut(getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut() * getMultipleForImproveAutoFryer());
                return getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut();
            case getElements().autoStorageCollectorUpgradeButton.id:
                setPriceToImproveAutoMoverFromFryerToStorage(getPriceToImproveAutoMoverFromFryerToStorage() * getMultipleForImproveAutoStorageCollector());
                return getPriceToImproveAutoMoverFromFryerToStorage();
            case getElements().autoCustomerServerUpgradeButton.id:
                setPriceToImproveAutoCustomerServer(getPriceToImproveAutoCustomerServer() * getMultipleForImproveAutoCustomerServer());
                return getPriceToImproveAutoCustomerServer();
            //Third Phase Upgrades
            case getElements().fastFryerUpgradeButton.id:
                setPriceToImproveFryTimer(getPriceToImproveFryTimer() * getMultipleForImproveFryTimer());
                return getPriceToImproveFryTimer();
            case getElements().potatoDeliveryDoublerButton.id:
                setPriceToDoubleSpudsMax(getPriceToDoubleSpudsMax() * getMultipleForMaxSpudsUpgrade());
                return getPriceToDoubleSpudsMax();
            case getElements().customerFrequencyIncreaser.id:
                setPriceToIncreaseFootfall(getPriceToIncreaseFootfall() * getMultipleForIncreaseFootfallUpgrade());
                return getPriceToIncreaseFootfall();
        }
    }

    if (getInvestmentFundUnlocked()) {
        switch (buttonId) {
            //Manual Upgrades
            case getElements().improvePotatoStorageButton.id:
                setPriceToImprovePotatoStorage(getPriceToImprovePotatoStorage() * getMultipleForImprovePotatoStorage());
                return getPriceToImprovePotatoStorage();
            case getElements().improveFryerCapacityButton.id:
                setPriceToImproveFryerCapacity(getPriceToImproveFryerCapacity() * getMultipleForImproveFryerCapacity());
                return getPriceToImproveFryerCapacity();
            case getElements().addStorageHeaterAutoShiftStartButton.id:
                return getPriceToAddStorageHeater();
            //Auto Upgrades
            case getElements().autoPeelerUpgradeButton.id:
                setPriceToImproveAutoPeeler(getPriceToImproveAutoPeeler() * getMultipleForImproveAutoPeeler());
                return getPriceToImproveAutoPeeler();
            case getElements().autoChipperUpgradeButton.id:
                setPriceToImproveAutoChipper(getPriceToImproveAutoChipper() * getMultipleForImproveAutoChipper());
                return getPriceToImproveAutoChipper();
            case getElements().autoFryerUpgradeButton.id:
                setPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut(getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut() * getMultipleForImproveAutoFryer());
                return getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut();
            case getElements().autoStorageCollectorUpgradeButton.id:
                setPriceToImproveAutoMoverFromFryerToStorage(getPriceToImproveAutoMoverFromFryerToStorage() * getMultipleForImproveAutoStorageCollector());
                return getPriceToImproveAutoMoverFromFryerToStorage();
            case getElements().autoCustomerServerUpgradeButton.id:
                setPriceToImproveAutoCustomerServer(getPriceToImproveAutoCustomerServer() * getMultipleForImproveAutoCustomerServer());
                return getPriceToImproveAutoCustomerServer();
            //Third Phase Upgrades
            case getElements().fastFryerUpgradeButton.id:
                setPriceToImproveFryTimer(getPriceToImproveFryTimer() * getMultipleForImproveFryTimer());
                return getPriceToImproveFryTimer();
            case getElements().potatoDeliveryDoublerButton.id:
                setPriceToDoubleSpudsMax(getPriceToDoubleSpudsMax() * getMultipleForMaxSpudsUpgrade());
                return getPriceToDoubleSpudsMax();
            case getElements().customerFrequencyIncreaser.id:
                setPriceToIncreaseFootfall(getPriceToIncreaseFootfall() * getMultipleForIncreaseFootfallUpgrade());
                return getPriceToIncreaseFootfall();
        }
    }
}

function checkIfNonRepeatableUpgradePurchased(button, upgrade) {
    switch (upgrade) {
        case 'peeler':
            setPeelerUpgradeBought(true);
            break;
        case 'chipper':
            setChipperUpgradeBought(true);
            break;
        case 'heater':
            setHeaterUpgradeBought(true);
            break;
        case 'autoShift':
            setAutoShiftStartUpgradeUnlocked(true);
            break;
    }
    return button.classList.contains('non-repeatable-upgrade-purchased');
}

function checkIfRepeatableUpgrade(button) {
    return button.upgrade === 'true' && button.repeatableUpgrade === 'true';
}

function checkIfChipsStillInFryer() {
    const fryerButton = getElements().fryChipsButton;
    const fryerElementText = getElements().chuckedInFryerCount.innerHTML;

    if (parseInt(fryerElementText) > getZero()) {
        updateButtonStyle(fryerButton.id, getStart());
        fryerButton.innerHTML = 'Empty Fryer!';
    }
}

export function peelPotato(counterElement, value) {
    setActualPotatoesInStorage(getActualPotatoesInStorage() - value);
    decrementCounter(getElements().subInnerDivMid1_2.id, value);
    incrementCounter(counterElement, value);
    setPotatoesPeeledThisShift(getPotatoesPeeledThisShift() + value);
    setTotalPeeled(getTotalPeeled() + value);
}

export function cutChips(quantity, cutChipsRate) {
    decrementCounter(getElements().peeledCount.id, cutChipsRate);
    incrementCounter(getElements().cutCount, quantity);
    setChipsCutThisShift(getChipsCutThisShift() + quantity);
    setTotalCut(getTotalCut() + quantity);
}

export function serveCustomer() {
    decrementCounter(getElements().readyToServeCount.id, getPortionSize());
    decrementCounter(getElements().customersWaitingCount.id, getOne());
    setCustomersWaiting(getCustomersWaiting() - getStandardDecrementIncrementOfOne());
    let newCustomersServedValue = getCustomersServed() + getStandardDecrementIncrementOfOne();
    setCustomersServed(newCustomersServedValue);
    setTotalServedCustomers(getTotalServedCustomers() + getStandardDecrementIncrementOfOne());

    let totalChips = getZero();
    let portionSizeFulfilled = false;

    for (let i = 0; i < getChipsReadyToServeQuantity().length; i++) {
        if (getChipsReadyToServeQuantity()[i] >= getPortionSize() && !portionSizeFulfilled && totalChips === getZero()) {
            setChipsReadyToServeQuantity(i, getChipsReadyToServeQuantity()[i] - getPortionSize());
            portionSizeFulfilled = true;
            // console.log("took full portion from batch " + i);
            if (getChipsReadyToServeQuantity()[i] === getZero()) {
                clearInterval(batchTimers[i]);
            }
        } else if (!portionSizeFulfilled && ((getPortionSize() - totalChips) > getChipsReadyToServeQuantity()[i])) {
            totalChips += getChipsReadyToServeQuantity()[i];
            // console.log("not enough chips with " + getChipsReadyToServeQuantity()[i] + " in batch " + i + " - moving on to next batch, with " + totalChips + " added so far!");
            setChipsReadyToServeQuantity(i, getZero());
            clearInterval(batchTimers[i]);
        } else {
            const chipsToAdd = Math.min(getChipsReadyToServeQuantity()[i], getPortionSize() - totalChips);
            setChipsReadyToServeQuantity(i, getChipsReadyToServeQuantity()[i] - chipsToAdd);
            // console.log("chips to add to fulfill order: " + chipsToAdd + " because batch has:" + getChipsReadyToServeQuantity()[i] + " and totalChips value is:" + totalChips);
            totalChips += chipsToAdd;
            // console.log("fulfilled portion from multiple batches, here is the state of the array:");
            // console.log(getChipsReadyToServeQuantity());
            portionSizeFulfilled = true;
        }
    }
}

function cleanUpArray(array) {
    let cleanedArray = [];

    for (let element of array) {
        if (
            Number.isInteger(element) &&
            !isNaN(element)
        ) {
            cleanedArray.push(element);
        }
    }
    return cleanedArray;
}

function changeWithdrawInvestmentButtonText(value) {
    value ? getElements().withdrawInvestmentButton.innerHTML = '<h5>Withdraw Now!</h5>' : getElements().withdrawInvestmentButton.innerHTML = '<h5>Cannot Withdraw</h5>';
}

function setUpFloatButton() {
    setPriceToUnlockInvestmentFundToNowFloatOnStockMarket(getPriceToFloatOnStockMarket());
}

function setupEndGameFlow() {
    setTotalWastedChips(getTotalWastedChips() + getQuantityOfChipsFrying() + (getChipsReadyToServeQuantity().reduce((total, num) => total + num, 0)));
    writePopupText();
    toggleEndOfShiftOrGamePopup(endOfShiftOrGamePopup);
    toggleOverlay(popupOverlay);
    setShiftInProgress(false);
    setCurrentCash(getEndGameCash());
    getElements().subInnerDiv1_2.innerHTML = "Final Shift!";
    disableButtons(false);

    wasteChipsStillInFryerOrFryingAtEndOfShift();
    setPeelPotatoesRate(getOne());
    setCutChipsRate(getOne());
    setFryTimer(getEndGameFryTimer());

    for (let i = 0; i < getChipsReadyToServeQuantity().length; i++) {
        clearInterval(batchTimers[i]);
        setChipsWastedThisShift(getChipsWastedThisShift() + getChipsReadyToServeQuantity()[i]);
    }

    getElements().customersWaitingCount.innerHTML = `<h4>${getCustomersWaiting()}</h4>`;

    setChipsReadyToServeQuantity(null, 'clear');
    getElements().readyToServeCount.innerHTML = getZero().toString();
    getElements().peeledCount.innerHTML = getZero().toString();
    getElements().cutCount.innerHTML = getZero().toString();
    resetBatchTimers();

    setCustomersServed(getZero());
    setPotatoesPeeledThisShift(getZero());
    setChipsCutThisShift(getZero());
    setChipsFriedThisShift(getZero());
    setChipsWastedThisShift(getZero());

    hideButtonsReadyForEndGame();

    getElements().startShiftButton.innerHTML = 'Start Final Shift!';
    getElements().serveCustomerButton.innerHTML = 'Serve Last Customer and Win Game!';

    setActualPotatoesInStorage(getEndGamePotatoes());
    getElements().subInnerDivMid1_2.innerHTML = `${getEndGamePotatoes().toString()}/${getPotatoStorageQuantity().toString()}`;

    setCustomersWaiting(getOne());
    getElements().customersWaitingCount.innerHTML = getOne().toString();

    setCurrentMaxValueWaitForNewCustomer(getEndGameCash()); //sets it to 999998 so player can't get any other customers arrive
    setNextMaxValueWaitForNewCustomer(getEndGameCash());
}

export function toggleMenu(inGame) {
    switch (inGame) {
        case true:
            getElements().optionsWindow.classList.remove('d-none');
            getElements().gameWindow.classList.add('d-none');
            break;
        case false:
            getElements().option1.innerHTML = '<h2>New Game</h2>';
            getElements().optionsWindow.classList.add('d-none');
            getElements().gameWindow.classList.remove('d-none');
            break;
    }
}

export function saveGame(isManualSave) {
    const gameState = captureGameStatusForSaving();
    const serializedGameState = JSON.stringify(gameState);
    let compressed = LZString.compressToEncodedURIComponent(serializedGameState);
    const blob = new Blob([compressed], {
        type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    // Generate the filename with "AUTO_" prefix for auto save
    const timestamp = getCurrentTimestamp();
    const prefix = isManualSave ? "" : "AUTO_";
    a.href = url;
    a.download = `${prefix}ChipShopSave_${timestamp}.txt`;
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();

    URL.revokeObjectURL(url);
    a.remove();

    if (isManualSave) {
        alert("Game saved successfully!");
    }
}

function getCurrentTimestamp() {
    const now = new Date();
    return `${now.getFullYear()}_${padZero(now.getMonth() + 1)}_${padZero(now.getDate())}_${padZero(now.getHours())}_${padZero(now.getMinutes())}_${padZero(now.getSeconds())}`;
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

export function loadGame() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';

    input.addEventListener('change', handleFileSelectAndInitialiseLoadedGame);
    input.click();
}

function handleFileSelectAndInitialiseLoadedGame(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const compressed = e.target.result;

            if (typeof compressed === 'string') {
                let decompressedJson = LZString.decompressFromEncodedURIComponent(compressed);
                let gameState = JSON.parse(decompressedJson);

                document.getElementById('overlay').remove();
                setPopupOverlay(createOverlay());

                initialiseLoadedGame(gameState);
                alert('Game loaded successfully!');
            }
        } catch (error) {
            console.error('Error loading game:', error);
            alert('Error loading game. Please make sure the file contains valid game data.');
        }
    };

    reader.readAsText(file);
}

function initialiseLoadedGame(gameState) {
    toggleMenu(false);
    setPauseAutoSaveCountdown(false);
    restoreGameStatus(gameState);
}

export function getPrizes() {
    const playerRoleString = getElements().playerRoleText.innerText;
    let playerRoleKey = null;

    for (const key in Role) {
        if (Role[key] === playerRoleString) {
            playerRoleKey = key;
            break;
        }
    }

    if (!playerRoleKey) {
        console.error(`No matching role found for player role string: ${playerRoleString}`);
        return '';
    }

    const rolePrizes = prizes[playerRoleKey];

    if (!rolePrizes) {
        console.error(`No prizes found for player role: ${playerRoleKey}`);
        return '';
    }

    const goodPrizes = rolePrizes.filter(prize => prize.classification === 'good');
    const badPrizes = rolePrizes.filter(prize => prize.classification === 'bad');

    function getRandomItems(array, count) {
        const result = [];
        const usedIndices = new Set();

        while (result.length < count && usedIndices.size < array.length) {
            const randomIndex = Math.floor(Math.random() * array.length);
            if (!usedIndices.has(randomIndex)) {
                result.push(array[randomIndex]);
                usedIndices.add(randomIndex);
            }
        }

        return result;
    }

    const selectedGoodPrizes = getRandomItems(goodPrizes, 2);
    const selectedBadPrizes = getRandomItems(badPrizes, 2);
    const selectedPrizes = selectedGoodPrizes.concat(selectedBadPrizes);

    // Shuffle the selected prizes to ensure random order
    for (let i = selectedPrizes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selectedPrizes[i], selectedPrizes[j]] = [selectedPrizes[j], selectedPrizes[i]];
    }

    return `
        <div class="prize-item" style="color: ${wheelColors.NORMAL[0]};">${selectedPrizes[0].name}</div>
        <div class="prize-item" style="color: ${wheelColors.NORMAL[1]};">${selectedPrizes[1].name}</div>
        <div class="prize-item" style="color: ${wheelColors.NORMAL[2]};">${selectedPrizes[2].name}</div>
        <div class="prize-item" style="color: ${wheelColors.NORMAL[3]};">${selectedPrizes[3].name}</div>
    `;
}

export function addPrizeToPlayerStats(prizeString) {
    switch (prizeString) {
        case "Potato Storage Filled":
            setActualPotatoesInStorage(getPotatoStorageQuantity());
            getElements().subInnerDivMid1_2.innerHTML = `<h4>${getActualPotatoesInStorage().toString()}/${getPotatoStorageQuantity().toString()}</h4>`;
            break;
        case "+10 Potatoes":
            if (getActualPotatoesInStorage() <= (getPotatoStorageQuantity() - 10)) {
                setActualPotatoesInStorage(getActualPotatoesInStorage() + 10);
            } else {
                setActualPotatoesInStorage(getPotatoStorageQuantity());
            }
            getElements().subInnerDivMid1_2.innerHTML = `<h4>${getActualPotatoesInStorage().toString()}/${getPotatoStorageQuantity().toString()}</h4>`
            break;
        case "+$5":
            setCurrentCash(getCurrentCash() + 5);
            getElements().subInnerDivMid3_2.innerHTML = `<h4>${formatToCashNotation(getCurrentCash())}</h4>`;
            break;
        case "Money Doubled":
            setCurrentCash(getCurrentCash() * 2);
            getElements().subInnerDivMid3_2.innerHTML = `<h4>${formatToCashNotation(getCurrentCash())}</h4>`;
            break;
        case "Customer Walkout":
            setCustomersWaiting(getZero());
            getElements().customersWaitingCount.innerHTML = `<h3>${getCustomersWaiting()}</h3>`;
            break;
        case "+5 Customers":
            setCustomersWaiting(getCustomersWaiting() + 5);
            getElements().customersWaitingCount.innerHTML = `<h3>${getCustomersWaiting()}</h3>`;
            break;
        case "+10 Customers":
            setCustomersWaiting(getCustomersWaiting() + 10);
            getElements().customersWaitingCount.innerHTML = `<h3>${getCustomersWaiting()}</h3>`;
            break;
        case "+15 Customers":
            setCustomersWaiting(getCustomersWaiting() + 15);
            getElements().customersWaitingCount.innerHTML = `<h3>${getCustomersWaiting()}</h3>`;
            break;
        case "+25 Customers":
            setCustomersWaiting(getCustomersWaiting() + 25);
            getElements().customersWaitingCount.innerHTML = `<h3>${getCustomersWaiting()}</h3>`;
            break;
        case "+50 Customers":
            setCustomersWaiting(getCustomersWaiting() + 50);
            getElements().customersWaitingCount.innerHTML = `<h3>${getCustomersWaiting()}</h3>`;
            break;
        case "+100 Customers":
            setCustomersWaiting(getCustomersWaiting() + 100);
            getElements().customersWaitingCount.innerHTML = `<h3>${getCustomersWaiting()}</h3>`;
            break;
        case "Delivery Cancelled":
            setSpudsToAddToShift(getZero());
            getElements().startShiftButton.innerHTML = 'Start Shift <br> (+ ' + getSpudsToAddToShift() + ' Potatoes)';
            break;
        case "Fine of half of money":
            if (getCurrentCash() > 0) {
                setCurrentCash(getCurrentCash() / 2);
            }
            getElements().subInnerDivMid3_2.innerHTML = `<h4>${formatToCashNotation(getCurrentCash())}</h4>`;
            break;
        case "Half Of Potatoes Rot":
            if (getActualPotatoesInStorage() > 0) {
                setActualPotatoesInStorage(Math.floor(getActualPotatoesInStorage() / 2));
            }
            getElements().subInnerDivMid1_2.innerHTML = `<h4>${getActualPotatoesInStorage().toString()}/${getPotatoStorageQuantity().toString()}</h4>`
            break;
        case "+100 Potatoes":
            if (getActualPotatoesInStorage() <= (getPotatoStorageQuantity() - 100)) {
                setActualPotatoesInStorage(getActualPotatoesInStorage() + 100);
            } else {
                setActualPotatoesInStorage(getPotatoStorageQuantity());
            }
            getElements().subInnerDivMid1_2.innerHTML = `<h4>${getActualPotatoesInStorage().toString()}/${getPotatoStorageQuantity().toString()}</h4>`
            break;
        case "+$15":
            setCurrentCash(getCurrentCash() + 15);
            getElements().subInnerDivMid3_2.innerHTML = `<h4>${formatToCashNotation(getCurrentCash())}</h4>`;
            break;
        case "+200 Potatoes":
            if (getActualPotatoesInStorage() <= (getPotatoStorageQuantity() - 200)) {
                setActualPotatoesInStorage(getActualPotatoesInStorage() + 200);
            } else {
                setActualPotatoesInStorage(getPotatoStorageQuantity());
            }
            getElements().subInnerDivMid1_2.innerHTML = `<h4>${getActualPotatoesInStorage().toString()}/${getPotatoStorageQuantity().toString()}</h4>`
            break;
        case "+$50":
            setCurrentCash(getCurrentCash() + 50);
            getElements().subInnerDivMid3_2.innerHTML = `<h4>${formatToCashNotation(getCurrentCash())}</h4>`;
            break;
        case "+300 Potatoes":
            if (getActualPotatoesInStorage() <= (getPotatoStorageQuantity() - 300)) {
                setActualPotatoesInStorage(getActualPotatoesInStorage() + 300);
            } else {
                setActualPotatoesInStorage(getPotatoStorageQuantity());
            }
            getElements().subInnerDivMid1_2.innerHTML = `<h4>${getActualPotatoesInStorage().toString()}/${getPotatoStorageQuantity().toString()}</h4>`
            break;
        case "+$100":
            setCurrentCash(getCurrentCash() + 100);
            getElements().subInnerDivMid3_2.innerHTML = `<h4>${formatToCashNotation(getCurrentCash())}</h4>`;
            break;
        case "+500 Potatoes":
            if (getActualPotatoesInStorage() <= (getPotatoStorageQuantity() - 500)) {
                setActualPotatoesInStorage(getActualPotatoesInStorage() + 500);
            } else {
                setActualPotatoesInStorage(getPotatoStorageQuantity());
            }
            getElements().subInnerDivMid1_2.innerHTML = `<h4>${getActualPotatoesInStorage().toString()}/${getPotatoStorageQuantity().toString()}</h4>`
            break;
        case "+$1000":
            setCurrentCash(getCurrentCash() + 1000);
            getElements().subInnerDivMid3_2.innerHTML = `<h4>${formatToCashNotation(getCurrentCash())}</h4>`;
            break;
        case "+$3000":
            setCurrentCash(getCurrentCash() + 3000);
            getElements().subInnerDivMid3_2.innerHTML = `<h4>${formatToCashNotation(getCurrentCash())}</h4>`;
            break;
        case "+$5000":
            setCurrentCash(getCurrentCash() + 5000);
            getElements().subInnerDivMid3_2.innerHTML = `<h4>${formatToCashNotation(getCurrentCash())}</h4>`;
            break;
        default:
            console.log("Unknown prize: " + prizeString);
            break;
    }
}

export function toggleDisable(disableItNow, element) {
    switch (disableItNow) {
        case true:
            element.disabled = true;
            element.classList.add('disabled');

            if (element === document.getElementById('spinButton') || element === document.getElementById('popupContinueButton')) {
                element.classList.remove('bg-success');
                element.classList.remove('white-important');
            } else if (element === getElements().investmentCashComponent_DecrementButton || element === getElements().investmentRiskComponent_DecrementButton) {
                element.classList.remove('bg-danger');
            } else {
                element.classList.remove('bg-warning');
            }

            element.classList.add('bg-secondary');
            break;
        case false:
            element.disabled = false;
            element.classList.remove('disabled');
            element.classList.remove('bg-secondary');

            if (element === document.getElementById('spinButton') || element === document.getElementById('popupContinueButton')) {
                element.classList.add('bg-success');
                element.classList.add('white-important');
            } else if (element === getElements().investmentCashComponent_DecrementButton || element === getElements().investmentRiskComponent_DecrementButton) {
                element.classList.add('bg-danger');
            } else {
                element.classList.add('bg-warning');
            }
            break;
    }
}