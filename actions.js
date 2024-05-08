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
    batchTimers
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
            case 'peelPotatoButton':
                handlePeelPotato(element);
                break;
            case 'cutChipsButton':
                handleCutChips(element);
                break;
            case 'fryChipsButton':
                handleFryChips(buttonId);
                break;
            case 'servingStorageButton':
                handleServingStorage();
                break;
            case 'serveCustomerButton':
                handleServeCustomer();
                break;
            case 'improvePotatoStorageButton':
                handleImprovePotatoStorage(buttonId);
                break;
            case 'twoHandedPeelingButton':
                handleTwoHandedPeeling(button, buttonId);
                break;
            case 'twoHandedChoppingButton':
                handleTwoHandedChopping(button, buttonId);
                break;
            case 'improveFryerCapacityButton':
                handleImproveFryerCapacity(buttonId);
                break;
            case 'addStorageHeaterButton':
                handleAddStorageHeater(button, buttonId);
                break;
            case 'startShiftButton':
                handleStartShift();
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
    if (parseInt(cutChipsCounterElement.innerHTML) >= getFryerCapacity()) {
        cutChipsCounterElement.innerHTML = getFryerCapacity().toString();
    }
    fryChips();
    setQuantityOfChipsFrying(parseInt(cutChipsCounterElement.innerHTML));
    decrementCounter(cutChipsCounterElement.id, parseInt(cutChipsCounterElement.innerHTML));
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
    setCurrentCash(getCurrentCash() - getPriceToImprovePotatoStorage());
    let newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
    getElements()[buttonId].innerHTML = 'Increase Potato Cap. ' + formatToCashNotation(newPriceOfUpgrade);
    setPotatoStorageQuantity(getPotatoStorageQuantity() + getUpgradePotatoStorageQuantity);
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
            getElements().subInnerDivMid1_2.innerHTML = addShiftSpuds(getStartingSpuds()).toString() + "/" + getPotatoStorageQuantity().toString();
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
        const spudsLeft = parseInt(getElements().subInnerDivMid1_2.innerHTML);
        const peeledCount = parseInt(getElements().peeledCount.innerHTML);
        const cutCount = parseInt(getElements().cutCount.innerHTML);
        const inFryerCount = parseInt(getElements().chuckedInFryerCount.innerHTML);
        const readyToServeCount = parseInt(getElements().readyToServeCount.innerHTML);
        const customerCount = parseInt(getElements().customersWaitingCount.innerHTML);

        mainButtons.forEach(button => {
            switch (button.id) {
                case 'peelPotatoButton':
                    button.disabled = spudsLeft <= getZero() || !getShiftInProgress();
                    break;
                case 'cutChipsButton':
                    button.disabled = peeledCount <= getZero() || !getShiftInProgress();
                    break;
                case 'fryChipsButton':
                    let chipsStillInFryer = checkIfChipsStillInFryer();
                    button.disabled = !getShiftInProgress() || (cutCount <= getZero() && !getChipsFrying());
                    break;
                case 'servingStorageButton':
                    button.disabled = inFryerCount <= getZero() || !getShiftInProgress();
                    break;
                case 'serveCustomerButton':
                    button.disabled = customerCount <= getZero() || readyToServeCount < getPortionSize() || !getShiftInProgress();
                    break;
                case 'improvePotatoStorageButton':
                    button.disabled = getCurrentCash() < getPriceToImprovePotatoStorage();
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

        const pricesArrayMainButtons = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, getPriceToImprovePotatoStorage(), 0, 0, 0, 0];

        for (let i = 0; i < mainButtons.length; i++) {
            const button = mainButtons[i];
            if (button.id !== "startShiftButton" && !checkIfNonRepeatableUpgradePurchased(button)) {
                if (getCurrentCash() < pricesArrayMainButtons[i] || pricesArrayMainButtons[i] === getZero()) {
                    button.disabled = true;
                    button.classList.add('disabled');
                }
            }
        }

        const pricesArrayBottomRow = [getPriceToEnableDoublePeeling(), getPriceToEnableDoubleChopping(), getPriceToImproveFryerCapacity(), getPriceToAddStorageHeater(), 0];

        for (let i = 0; i < bottomRowButtons.length; i++) {
            const button = bottomRowButtons[i];
            if (button.id !== "startShiftButton" && !checkIfNonRepeatableUpgradePurchased(button)) {
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
        case "improvePotatoStorageButton":
            setPriceToImprovePotatoStorage(getPriceToImprovePotatoStorage() * getMultipleForImprovePotatoStorage());
            return getPriceToImprovePotatoStorage();
        case "twoHandedPeelingButton":
            return getPriceToEnableDoublePeeling();
        case "twoHandedChoppingButton":
            return getPriceToEnableDoubleChopping();
        case "improveFryerCapacityButton":
            setPriceToImproveFryerCapacity(getPriceToImproveFryerCapacity() * getMultipleForImproveFryerCapacity());
            return getPriceToImproveFryerCapacity();
        case "addStorageHeaterButton":
            return getPriceToAddStorageHeater();
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

    let chipsStillInFryer = false;
    if (parseInt(fryerElementText) > getZero()) {
        chipsStillInFryer = true;
        updateButtonStyle(fryerButton.id, getStart());
        fryerButton.innerHTML = 'Empty Fryer!';
    }
    return chipsStillInFryer;
}
