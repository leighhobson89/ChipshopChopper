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
    getOddNumberLeftOverAfterDoublePeelingChopping,
    getOnShiftOne,
    getPeelPotatoesRate,
    getPortionSize,
    getPotatoesPeeledThisShift,
    getPotatoStorageQuantity,
    getPriceToAddStorageHeater,
    getPriceToEnableDoubleChopping,
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
    setFryTimer,
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
    getMultipleForImproveAutoCustomerServer
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
            case getElements().twoHandedChoppingButton.id:
                handleTwoHandedChopping(button, buttonId);
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
                handleAutoPeeler();
                break;
            case getElements().autoChipperUpgradeButton.id:
                handleAutoChipper();
                break;
            case getElements().autoFryerUpgradeButton.id:
                handleAutoFryer();
                break;
            case getElements().autoStorageCollectorUpgradeButton.id:
                handleAutoStorageCollector();
                break;
            case getElements().autoCustomerServerUpgradeButton.id:
                handleAutoCustomerServer();
                break;
            default:
                break;
        }
        disableButtons(false);
    });
}

function handlePeelPotato(element) {
    const potatoesInStorageBeforeThisPeel = getActualPotatoesInStorage();
    if (potatoesInStorageBeforeThisPeel > getOddNumberLeftOverAfterDoublePeelingChopping()) {
        setActualPotatoesInStorage(getActualPotatoesInStorage() - getPeelPotatoesRate());
        decrementCounter(getElements().subInnerDivMid1_2.id, getPeelPotatoesRate());
        incrementCounter(element, getPeelPotatoesRate());
        setPotatoesPeeledThisShift(getPotatoesPeeledThisShift() + getPeelPotatoesRate());
    } else if (potatoesInStorageBeforeThisPeel > getZero()) {
        setActualPotatoesInStorage(getActualPotatoesInStorage() - getStandardDecrementIncrementOfOne());
        decrementCounter(getElements().subInnerDivMid1_2.id, getStandardDecrementIncrementOfOne());
        incrementCounter(element, getStandardDecrementIncrementOfOne());
        setPotatoesPeeledThisShift(getPotatoesPeeledThisShift() + getStandardDecrementIncrementOfOne());
    }
}

function handleCutChips(element) {
    const peeledCount = getElements().peeledCount;
    if (parseInt(peeledCount.innerHTML) > getOddNumberLeftOverAfterDoublePeelingChopping()) { //normal case
        decrementCounter(peeledCount.id, getCutChipsRate());
        incrementCounter(element, getNumberOfChipsFromPotato() * getCutChipsRate());
        setChipsCutThisShift(getChipsCutThisShift() + (getNumberOfChipsFromPotato() * getCutChipsRate()));
    } else if (parseInt(peeledCount.innerHTML) > getZero()) { //odd number left handles case of double cutter
        decrementCounter(peeledCount.id, getStandardDecrementIncrementOfOne());
        incrementCounter(element, getNumberOfChipsFromPotato());
        setChipsCutThisShift(getChipsCutThisShift() + getNumberOfChipsFromPotato());
    }
}

function handleFryChips(buttonId) {
    let cutChipsCounterElement = getElements().cutCount;
    console.log(cutChipsCounterElement.innerHTML);
    console.log(parseInt(cutChipsCounterElement.innerHTML) >= getFryerCapacity());
    if (parseInt(cutChipsCounterElement.innerHTML) >= getFryerCapacity()) {
        setQuantityOfChipsFrying(getFryerCapacity());
    } else {
        setQuantityOfChipsFrying(parseInt(cutChipsCounterElement.innerHTML));
    }
    fryChips();
    decrementCounter(cutChipsCounterElement.id, getQuantityOfChipsFrying());
    updateButtonStyle(buttonId, null);
}

function handleServingStorage() {
    const fryerButton = getElements().fryChipsButton;
    let chuckedInFryerCount = parseInt(getElements().chuckedInFryerCount.innerHTML);
    let newBatchId = getChipsReadyToServeQuantity().length;
    // console.log("newbatchid: " + newBatchId + "length of array: " + getChipsReadyToServeQuantity().length);
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
    decrementCounter(getElements().readyToServeCount.id, getPortionSize());
    decrementCounter(getElements().customersWaitingCount.id, getStandardDecrementIncrementOfOne());
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
    // console.log("Total Customers Served: " + getCustomersServed());
}

function handleImprovePotatoStorage(buttonId) {
    if (getDebugFlag) {
        setActualPotatoesInStorage(getStartingSpuds());
    }
    setCurrentCash(getCurrentCash() - getPriceToImprovePotatoStorage());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    getElements()[buttonId].innerHTML = 'Increase Potato Cap. ' + formatToCashNotation(newPriceOfUpgrade);
    console.log(getPotatoStorageQuantity());
    console.log(getUpgradePotatoStorageQuantity)
    setPotatoStorageQuantity(getPotatoStorageQuantity() + getUpgradePotatoStorageQuantity());
    console.log(getPotatoStorageQuantity());
    getElements().subInnerDivMid1_2.innerHTML = getActualPotatoesInStorage().toString() + '/' + getPotatoStorageQuantity().toString();
}

function handleTwoHandedPeeling(button, buttonId) {
    if (!checkIfNonRepeatableUpgradePurchased(button)) {
        setCurrentCash(getCurrentCash() - getPriceToEnableDoublePeeling());
        getElements()[buttonId].innerHTML = 'Double Peeling Tool PURCHASED';
        updateButtonStyle(buttonId, null);
        setPeelPotatoesRate(getPeelPotatoesRate() * getUpgradeDoublePeelerMultiple());
    }
}

function handleTwoHandedChopping(button, buttonId) {
    if (!checkIfNonRepeatableUpgradePurchased(button)) {
        setCurrentCash(getCurrentCash() - getPriceToEnableDoubleChopping());
        getElements()[buttonId].innerHTML = 'Double Chopping Tool PURCHASED';
        updateButtonStyle(buttonId, null);
        setCutChipsRate(getCutChipsRate() * getUpgradeDoubleChopperMultiple());
    }
}

function handleImproveFryerCapacity(buttonId) {
    setCurrentCash(getCurrentCash() - getPriceToImproveFryerCapacity());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    getElements()[buttonId].innerHTML = 'Improve Fryer Cap. ' + formatToCashNotation(newPriceOfUpgrade);
    setFryerCapacity(getFryerCapacity() + getUpgradeFryerCapacityAmount());
    getElements().fryChipsButton.innerHTML = 'Fry Chips (Capacity: ' + getFryerCapacity() + ')';
}

function handleAddStorageHeater(button, buttonId) {
    if (!checkIfNonRepeatableUpgradePurchased(button)) {
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

function handleAutoPeeler() {
    console.log("autoPeeler");
}

function handleAutoChipper() {
    console.log("autoChipper");
}

function handleAutoFryer() {
    console.log("autoFryer");
}

function handleAutoStorageCollector() {
    console.log("autoStorageCollector");
}

function handleAutoCustomerServer() {
    console.log("autoCustomerServer");
}

function incrementCounter(counterElement, value) {
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

    if (gameInProgress) {
        mainButtons = getElements().allBottomButtons;
        bottomRowButtons = getElements().allMainButtons;
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
                case 'twoHandedPeelingButton':
                    if (!checkIfNonRepeatableUpgradePurchased(button)) {
                        button.disabled = getCurrentCash() < getPriceToEnableDoublePeeling();
                    }
                    break;
                case 'twoHandedChoppingButton':
                    if (!checkIfNonRepeatableUpgradePurchased(button)) {
                        button.disabled = getCurrentCash() < getPriceToEnableDoubleChopping();
                    }
                    break;
                case 'improveFryerCapacityButton':
                    button.disabled = getCurrentCash() < getPriceToImproveFryerCapacity();
                    break;
                case 'addStorageHeaterButton':
                    if (!checkIfNonRepeatableUpgradePurchased(button)) {
                        button.disabled = getCurrentCash() < getPriceToAddStorageHeater();
                    }
                    break;
                case 'startShiftButton':
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

        const pricesArrayMainButtons = [0, 0, 0, 0, 0, getPriceToImproveAutoPeeler(), getPriceToImproveAutoChipper(), getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut(), getPriceToImproveAutoMoverFromFryerToStorage(), getPriceToImproveAutoCustomerServer(), 0, 0, 0, 0, 0, getPriceToImprovePotatoStorage(), 0, 0, 0, 0];

        for (let i = 0; i < mainButtons.length; i++) {
            const button = mainButtons[i];
            if (button.id !== getElements().startShiftButton.id && !checkIfNonRepeatableUpgradePurchased(button)) {
                if (getCurrentCash() < pricesArrayMainButtons[i] || pricesArrayMainButtons[i] === getZero()) {
                    button.disabled = true;
                    button.classList.add('disabled');
                }
            }
        }

        const pricesArrayBottomRow = [getPriceToEnableDoublePeeling(), getPriceToEnableDoubleChopping(), getPriceToImproveFryerCapacity(), getPriceToAddStorageHeater(), 0];

        for (let i = 0; i < bottomRowButtons.length; i++) {
            const button = bottomRowButtons[i];
            if (button.id !== getElements().startShiftButton.id && !checkIfNonRepeatableUpgradePurchased(button)) {
                if (getCurrentCash() < pricesArrayBottomRow[i]) {
                    button.disabled = true;
                    button.classList.add('disabled');
                }
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

function fryChips() {
    setFryTimer(getFryTimer());
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
        case getElements().twoHandedChoppingButton.id:
            return getPriceToEnableDoubleChopping();
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
    }
}

function checkIfNonRepeatableUpgradePurchased(button) {
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
