import {
    getActualPotatoesInStorage,
    getChipsCutThisShift,
    getChipsFrying,
    getChipsReadyToServeQuantity,
    getCurrentCash,
    getCustomersServed,
    getCustomersWaiting,
    getCutChipsRate,
    getFryerCapacity,
    getFryTimer,
    getMaxSpudsDelivery,
    getMaxValueWaitForNewCustomer,
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
    setChipsFrying,
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
    setHeaterUpgradeBought
} from './constantsAndGlobalVars.js';

import {
    gameInProgress,
    startBatchTimer
} from './gameloop.js';

import {
    formatToCashNotation,
    updateButtonStyle
} from "./ui.js";

export function handleButtonClick(buttonId, value) {
    const button = getElements()[buttonId];
    const element = getElements()[value];

    button.addEventListener('click', () => {
        switch (buttonId) {
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
            case getElements().addStorageHeaterButton.id:
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
            default:
                break;
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
    if (parseInt(peeledCount.innerHTML) > getOddNumberLeftOverAfterDoublePeelingChipping()) { //normal case
        cutChips(getNumberOfChipsFromPotato() * getCutChipsRate(), getCutChipsRate());
    } else if (parseInt(peeledCount.innerHTML) > getZero()) { //odd number left handles case of double cutter
        cutChips(getNumberOfChipsFromPotato(), getOddNumberLeftOverAfterDoublePeelingChipping());
    }
}

function handleFryChips(buttonId) {
    let cutChipsCounterElement = getElements().cutCount;
    if (parseInt(cutChipsCounterElement.innerHTML) >= getFryerCapacity()) {
        setQuantityOfChipsFrying(getFryerCapacity());
    } else {
        setQuantityOfChipsFrying(parseInt(cutChipsCounterElement.innerHTML));
    }
    fryChips();
    decrementCounter(cutChipsCounterElement.id, getQuantityOfChipsFrying());
    updateButtonStyle(buttonId, null);
}

export function handleServingStorage() {
    const fryerButton = getElements().fryChipsButton;
    let chuckedInFryerCount = parseInt(getElements().chuckedInFryerCount.innerHTML);
    let newBatchId = getChipsReadyToServeQuantity().length;

    let cleanArray = cleanUpArray(getChipsReadyToServeQuantity()); //clean any NaN or Empty elements from array added by mistake
    setChipsReadyToServeQuantity(cleanArray, 'clean');
    getChipsReadyToServeQuantity().push(chuckedInFryerCount);
    getElements().chuckedInFryerCount.innerHTML = getZero().toString();
    if (fryerButton.classList.contains('action-button-main-flashing')) {
        updateButtonStyle(fryerButton.id, getStop());
    }
    fryerButton.innerHTML = 'Fry Chips (Capacity: ' + getFryerCapacity() + ')';
    let total = getZero();
    for (let i = 0; i < getChipsReadyToServeQuantity().length; i++) {
        total += getChipsReadyToServeQuantity()[i];
    }
    getElements().readyToServeCount.innerHTML = total.toString();
    startBatchTimer(newBatchId);
}

function handleServeCustomer() {
    serveCustomer();
    // console.log("Total Customers Served: " + getCustomersServed());
}

function handleImprovePotatoStorage(buttonId) {
    if (getDebugFlag()) {
        setActualPotatoesInStorage(getStartingSpuds());
    }
    setCurrentCash(getCurrentCash() - getPriceToImprovePotatoStorage());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    setPotatoStorageQuantity(getPotatoStorageQuantity() + getUpgradePotatoStorageQuantity());
    getElements()[buttonId].innerHTML = `Increase Potato Cap.<br>${getPotatoStorageQuantity()} → ${getPotatoStorageQuantity() + getUpgradePotatoStorageQuantity()}<br>${formatToCashNotation(newPriceOfUpgrade)}`;
    getElements().subInnerDivMid1_2.innerHTML = getActualPotatoesInStorage().toString() + '/' + getPotatoStorageQuantity().toString();
}

function handleTwoHandedPeeling(button, buttonId) {
    if (!checkIfNonRepeatableUpgradePurchased(button, 'peeler')) {
        setCurrentCash(getCurrentCash() - getPriceToEnableDoublePeeling());
        getElements()[buttonId].innerHTML = 'Double Peeling Tool PURCHASED';
        updateButtonStyle(buttonId, null);
        setPeelPotatoesRate(getPeelPotatoesRate() * getUpgradeDoublePeelerMultiple());
    }
}

function handleTwoHandedChipping(button, buttonId) {
    if (!checkIfNonRepeatableUpgradePurchased(button, 'chipper')) {
        setCurrentCash(getCurrentCash() - getPriceToEnableDoubleChipping());
        getElements()[buttonId].innerHTML = 'Double Chipping Tool PURCHASED';
        updateButtonStyle(buttonId, null);
        setCutChipsRate(getCutChipsRate() * getUpgradeDoubleChopperMultiple());
    }
}

function handleImproveFryerCapacity(buttonId) {
    setCurrentCash(getCurrentCash() - getPriceToImproveFryerCapacity());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    setFryerCapacity(getFryerCapacity() + getUpgradeFryerCapacityAmount());
    getElements()[buttonId].innerHTML = `Improve Fryer Cap.<br>${getFryerCapacity()} → ${getFryerCapacity() + getUpgradeFryerCapacityAmount()}<br>${formatToCashNotation(newPriceOfUpgrade)}`;
    getElements().fryChipsButton.innerHTML = 'Fry Chips (Capacity: ' + getFryerCapacity() + ')';
}

function handleAddStorageHeater(button, buttonId) {
    if (!checkIfNonRepeatableUpgradePurchased(button, 'heater')) {
        setCurrentCash(getCurrentCash() - getPriceToAddStorageHeater());
        getElements()[buttonId].innerHTML = 'Storage Bin Heater PURCHASED';
        updateButtonStyle(buttonId, null);
        setMultipleForHeaterEffectOnCoolDown(getUpgradeHeaterMultiple());
    }
}

function handleStartShift() {
    setShiftLengthTimerVariable(getShiftLength());
    setShiftInProgress(true);
    setShiftCounter(getShiftCounter() + getStandardDecrementIncrementOfOne());

    getElements().subInnerDiv1_1.innerHTML = 'Shift Left (s):';
    getElements().subInnerDiv1_2.innerHTML = getShiftTime();

    switch (getShiftCounter()) {
        case getOnShiftOne():
            if (!getDebugFlag() || (getDebugFlag() && getImprovePotatoStorageNotClickedYet())) { //debug fix init of potatoes
                getElements().subInnerDivMid1_2.innerHTML = addShiftSpuds(getStartingSpuds()).toString() + "/" + getPotatoStorageQuantity().toString();
            }
            break;
        default:
            getElements().subInnerDivMid1_2.innerHTML = addShiftSpuds(getSpudsToAddToShift()).toString() + "/" + getPotatoStorageQuantity().toString();
            break;
    }

    let newPotatoesToDeliverForNextShift = Math.min((getActualPotatoesInStorage() + getSpudsToAddToShift()), getPotatoStorageQuantity());
    setActualPotatoesInStorage(newPotatoesToDeliverForNextShift);
    getElements().startShiftButton.innerHTML = 'Start Shift <br> (+ ' + selectARandomNumberOfSpudsForNextShift() + ' Potatoes)';
    disableButtons(false);
}

function handleAutoPeeler(buttonId) {
    if (!getAutoPeelerBought()) {
        setAutoPeelerBought(true);
    }
    setCurrentCash(getCurrentCash() - getPriceToImproveAutoPeeler());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    setCurrentSpeedAutoPeeler(getNextSpeedAutoPeeler());
    setNextSpeedAutoPeeler(getCurrentSpeedAutoPeeler() + getStandardDecrementIncrementOfOne());
    getElements()[buttonId].innerHTML = `Auto Peeler (${getCurrentSpeedAutoPeeler()}/s)<br>${getCurrentSpeedAutoPeeler()} → ${getNextSpeedAutoPeeler()}/s<br> ${formatToCashNotation(newPriceOfUpgrade)}`;
}

function handleAutoChipper(buttonId) {
    if (!getAutoChipperBought()) {
        setAutoChipperBought(true);
    }
    setCurrentCash(getCurrentCash() - getPriceToImproveAutoChipper());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    setCurrentSpeedAutoChipper(getNextSpeedAutoChipper());
    setNextSpeedAutoChipper(getCurrentSpeedAutoChipper() + getStandardDecrementIncrementOfOne());
    getElements()[buttonId].innerHTML = `Auto Chipper (${getCurrentSpeedAutoChipper()}/s)<br>${getCurrentSpeedAutoChipper()} → ${getNextSpeedAutoChipper()}/s<br> ${formatToCashNotation(newPriceOfUpgrade)}`;
}

function handleAutoFryer(buttonId) {
    if (!getAutoFryerBought()) {
        setAutoFryerBought(true);
    }
    setAutoFryerCounter(getZero());
    setCurrentCash(getCurrentCash() - getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    setCurrentSpeedAutoFryer(getNextSpeedAutoFryer());
    setNextSpeedAutoFryer(getCurrentSpeedAutoFryer() - getAutoFryerUpgradeDecrement());
    getElements()[buttonId].innerHTML = `Auto Fryer (${getCurrentSpeedAutoFryer()}s)<br>${getCurrentSpeedAutoFryer()} → ${getNextSpeedAutoFryer()}/s<br> ${formatToCashNotation(newPriceOfUpgrade)}<br> Ready in ${Math.floor(getCurrentSpeedAutoFryer())}s`;
}

function handleAutoStorageCollector(buttonId) {
    if (!getAutoStorageCollectorBought()) {
        setAutoStorageCollectorBought(true);
    }
    setAutoStorageCollectorCounter(getZero());
    setCurrentCash(getCurrentCash() - getPriceToImproveAutoMoverFromFryerToStorage());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    setCurrentSpeedAutoStorageCollector(getNextSpeedAutoStorageCollector());
    setNextSpeedAutoStorageCollector(getCurrentSpeedAutoStorageCollector() - getAutoStorageCollectorUpgradeDecrement());
    getElements()[buttonId].innerHTML = `Auto Collector (${getCurrentSpeedAutoStorageCollector()}s)<br>${getCurrentSpeedAutoStorageCollector()} → ${getNextSpeedAutoStorageCollector()}/s<br> ${formatToCashNotation(newPriceOfUpgrade)}<br> Ready in ${Math.floor(getCurrentSpeedAutoStorageCollector())}s`;
}

function handleAutoCustomerServer(buttonId) {
    if (!getAutoCustomerServerBought()) {
        setAutoCustomerServerBought(true);
    }
    setCurrentCash(getCurrentCash() - getPriceToImproveAutoCustomerServer());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    setCurrentSpeedAutoCustomerServer(getNextSpeedAutoCustomerServer());
    setNextSpeedAutoCustomerServer(getCurrentSpeedAutoCustomerServer() - getAutoCustomerServerUpgradeDecrement());
    getElements()[buttonId].innerHTML = `Auto Collector (${getCurrentSpeedAutoCustomerServer()}s)<br>${getCurrentSpeedAutoCustomerServer()} → ${getNextSpeedAutoCustomerServer()}/s<br> ${formatToCashNotation(newPriceOfUpgrade)}<br> Ready in ${Math.floor(getCurrentSpeedAutoCustomerServer())}s`;
}

function handleImproveFryTimer(buttonId) {
    if (!getImproveFryTimerBought()) {
        setImproveFryTimerBought(true);
    }
    setCurrentCash(getCurrentCash() - getPriceToImproveFryTimer());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    setCurrentSpeedFryTimer(getNextSpeedFryTimer());
    setFryTimer(Math.floor(getCurrentSpeedFryTimer()));
    setNextSpeedFryTimer(getCurrentSpeedFryTimer() - getUpgradeFryTimeDecrement());
    getElements()[buttonId].innerHTML = `Improve Fry Speed<br>${getCurrentSpeedFryTimer()} → ${getNextSpeedFryTimer()}<br>${formatToCashNotation(newPriceOfUpgrade)}`
}

function handleDoubleMaxSpudsDelivery(buttonId) {
    if (!getDoubleMaxSpudsDeliveryBought()) {
        setDoubleMaxSpudsDeliveryBought(true);
    }
    setCurrentCash(getCurrentCash() - getPriceToDoubleSpudsMax());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    setCurrentMaxSpudsDelivery(getNextMaxSpudsDelivery());
    setMaxSpudsDelivery(getCurrentMaxSpudsDelivery());
    setNextMaxSpudsDelivery(getCurrentMaxSpudsDelivery() * getUpgradeMaxSpudsIncrement());
    getElements()[buttonId].innerHTML = `Double Max Delivery<br>${getCurrentMaxSpudsDelivery()} → ${getNextMaxSpudsDelivery()}<br>${formatToCashNotation(newPriceOfUpgrade)}`

}

export function incrementCounter(counterElement, value) {
    let count = parseInt(counterElement.innerHTML);
    count += value;
    counterElement.innerHTML = count.toString();
    disableButtons(false);
}

export function decrementCounter(counterId, value) {
    const counterElement = getElements()[counterId];
    let count = parseInt(counterElement.innerHTML);
    count = Math.max(getZero(), count - value);
    if (counterId === "subInnerDivMid1_2") {
        counterElement.innerHTML = count.toString() + "/" + getPotatoStorageQuantity().toString();
    } else {
        counterElement.innerHTML = count.toString();
    }
    disableButtons(false);
}

export function disableButtons(init) {
    let mainButtons;
    let bottomRowButtons;
    const pricesArrayMainButtons = [0, 0, 0, 0, 0, getPriceToImproveAutoPeeler(), getPriceToImproveAutoChipper(), getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut(), getPriceToImproveAutoMoverFromFryerToStorage(), getPriceToImproveAutoCustomerServer(), getPriceToImprovePotatoStorage(), getPriceToImproveFryerCapacity(), 0, 0, 0, 0, 0, 0, 0, 0];
    //const pricesArrayBottomRow = [getPriceToEnableDoublePeeling(), getPriceToEnableDoubleChipping(), getPriceToImproveFryerCapacity(), getPriceToAddStorageHeater(), 0];

    if (gameInProgress) {
        mainButtons = getElements().allMainButtons;
        bottomRowButtons = getElements().allBottomButtons;
    }

    if (!init) {
        mainButtons = getElements().allMainButtons;
        bottomRowButtons = getElements().allBottomButtons;
        const spudCount = parseInt(getElements().subInnerDivMid1_2.innerHTML);
        const peeledCount = parseInt(getElements().peeledCount.innerHTML);
        const cutCount = parseInt(getElements().cutCount.innerHTML);
        const inFryerCount = parseInt(getElements().chuckedInFryerCount.innerHTML);
        const readyToServeCount = parseInt(getElements().readyToServeCount.innerHTML);
        const customerCount = parseInt(getElements().customersWaitingCount.innerHTML);

        mainButtons.forEach(button => {
            switch (button.id) {
                case getElements().peelPotatoButton.id:
                    button.disabled = spudCount <= getZero() || !getShiftInProgress();
                    break;
                case getElements().cutChipsButton.id:
                    button.disabled = peeledCount <= getZero() || !getShiftInProgress();
                    break;
                case getElements().fryChipsButton.id:
                    checkIfChipsStillInFryer();
                    button.disabled = !getShiftInProgress() || (cutCount <= getZero() && !getChipsFrying());
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
                default:
                    button.disabled = false;
                    break;
            }
            if (button.disabled) {
                button.classList.add('disabled');
            } else {
                button.classList.remove('disabled');
            }
        });

        bottomRowButtons.forEach(button => {
            switch (button.id) {
                case getElements().twoHandedPeelingButton.id:
                    if (!checkIfNonRepeatableUpgradePurchased(button)) {
                        button.disabled = getCurrentCash() < getPriceToEnableDoublePeeling();
                    }
                    break;
                case getElements().twoHandedChippingButton.id:
                    if (!checkIfNonRepeatableUpgradePurchased(button)) {
                        button.disabled = getCurrentCash() < getPriceToEnableDoubleChipping();
                    }
                    break;
                case getElements().improveFryerCapacityButton.id:
                    button.disabled = getCurrentCash() < getPriceToImproveFryerCapacity();
                    break;
                case getElements().addStorageHeaterButton.id:
                    if (!checkIfNonRepeatableUpgradePurchased(button)) {
                        button.disabled = getCurrentCash() < getPriceToAddStorageHeater();
                    }
                    break;
                case getElements().startShiftButton.id:
                    button.disabled = getShiftTime() > getZero();
                    break;
                default:
                    button.disabled = false;
                    break;
            }

            if (button.disabled) {
                button.classList.add('disabled');
            } else {
                button.classList.remove('disabled');
            }
        });
    } else if (gameInProgress && getShiftCounter() > getZero()) {
        mainButtons.forEach(button => {
            if (!checkIfNonRepeatableUpgradePurchased(button)) {
                if (!checkIfRepeatableUpgrade(button)) {
                    button.disabled = true;
                    button.classList.add('disabled');
                }
            }
        });
        disableButtonsHelper(mainButtons, pricesArrayMainButtons);
        disableButtonsHelper(bottomRowButtons, pricesArrayMainButtons);
    } else {
        mainButtons = getElements().allMainButtons;
        disableButtonsHelper(mainButtons, pricesArrayMainButtons);
    }
}

function disableButtonsHelper(buttons, pricesArray) {
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (button.id !== getElements().startShiftButton.id && !checkIfNonRepeatableUpgradePurchased(button)) {
            if (getCurrentCash() < pricesArray[i] || pricesArray[i] === getZero()) {
                button.disabled = true;
                button.classList.add('disabled');
            }
        }
    }
}

export function createRandomCustomerTime() {
    const timeUntilNextCustomer = Math.floor(Math.random() * getMaxValueWaitForNewCustomer()) + 1;
    setCustomerTimerVariable(timeUntilNextCustomer);
}

export function incrementCustomersWaiting() {
    let customerCount = parseInt(getElements().customersWaitingCount.innerHTML);
    customerCount += getStandardDecrementIncrementOfOne();
    getElements().customersWaitingCount.innerHTML = customerCount.toString();
    disableButtons(false);
}

function addShiftSpuds(quantity) {
    let currentSpuds = parseInt(getElements().subInnerDivMid1_2.innerHTML);
    if (currentSpuds + quantity > getPotatoStorageQuantity()) {
        return getPotatoStorageQuantity();
    }
    return currentSpuds + quantity;
}

export function fryChips() {
    setFryTimeRemaining(getFryTimer());
    setChipsFrying(true);
}

function selectARandomNumberOfSpudsForNextShift() {
    let spudsToAddToNextShift = Math.floor(Math.random() * (getMaxSpudsDelivery() - getMinSpudsDelivery() + getAddOneToRandomNumberToEnsureAboveOne())) + getMinSpudsDelivery();
    setSpudsToAddToShift(spudsToAddToNextShift);
    return spudsToAddToNextShift;
}

function calculateAndSetNewPriceOfUpgrade(buttonId) {
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
        case getElements().addStorageHeaterButton.id:
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
    }
}

function checkIfNonRepeatableUpgradePurchased(button, upgrade) {
    switch(upgrade) {
        case 'peeler':
            setPeelerUpgradeBought(true);
            break;
        case 'chipper':
            setChipperUpgradeBought(true);
            break;
        case 'heater':
            setHeaterUpgradeBought(true);
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
}

export function cutChips(quantity, cutChipsRate) {
    decrementCounter(getElements().peeledCount.id, cutChipsRate);
    incrementCounter(getElements().cutCount, quantity);
    setChipsCutThisShift(getChipsCutThisShift() + quantity);
}

export function serveCustomer() {
    decrementCounter(getElements().readyToServeCount.id, getPortionSize());
    decrementCounter(getElements().customersWaitingCount.id, getOne());
    setCustomersWaiting(getCustomersWaiting() - getStandardDecrementIncrementOfOne());
    let newCustomersServedValue = getCustomersServed() + getStandardDecrementIncrementOfOne();
    setCustomersServed(newCustomersServedValue);

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
            cleanedArray.push(element); // Add the element to the cleaned array
        }
    }
    return cleanedArray;
}