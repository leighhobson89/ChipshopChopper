import {
    batchTimers,
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
    getMinSpudsDelivery, getMultipleForImproveFryerCapacity,
    getMultipleForImprovePotatoStorage, getNumberOfChipsFromPotato,
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
    getStartingSpuds,
    getUpgradeFryerCapacityAmount,
    getUpgradePotatoStorageQuantity,
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
    setQuantityFrying,
    setShiftCounter,
    setShiftInProgress,
    setShiftLengthTimerVariable,
    setSpudsToAddToShift
} from './constantsAndGlobalVars.js';

import {
    startBatchTimer
} from './gameloop.js';

import {formatToCashNotation, updateButtonStyle} from "./ui.js";

export function handleButtonClick(buttonId, value) {
    const button = document.getElementById(buttonId);
    const element = document.getElementById(value);

    button.addEventListener('click', () => {
        let newPriceOfUpgrade;
        switch (buttonId) {
            case 'peelPotatoButton':
                const potatoesInStorageBeforeThisPeel = getActualPotatoesInStorage();
                if (potatoesInStorageBeforeThisPeel > 1) {
                    setActualPotatoesInStorage(getActualPotatoesInStorage() - getPeelPotatoesRate());
                    decrementCounter('subInnerDivMid1_2', getPeelPotatoesRate());
                    incrementCounter(element, getPeelPotatoesRate());
                    setPotatoesPeeledThisShift(getPotatoesPeeledThisShift() + getPeelPotatoesRate());
                } else if (potatoesInStorageBeforeThisPeel > 0) {
                    setActualPotatoesInStorage(getActualPotatoesInStorage() - 1);
                    decrementCounter('subInnerDivMid1_2', 1);
                    incrementCounter(element, 1);
                    setPotatoesPeeledThisShift(getPotatoesPeeledThisShift() + 1);
                }
                break;
            case 'cutChipsButton':
                const peeledCount = parseInt(document.getElementById('peeledCount').innerHTML);
                if (peeledCount > 1) {
                    decrementCounter('peeledCount', getCutChipsRate());
                    incrementCounter(element, getNumberOfChipsFromPotato() * getCutChipsRate());
                    setChipsCutThisShift(getChipsCutThisShift() + (getNumberOfChipsFromPotato() * getCutChipsRate()));
                } else if (peeledCount > 0) {
                    decrementCounter('peeledCount', 1);
                    incrementCounter(element, 5);
                    setChipsCutThisShift(getChipsCutThisShift() + getNumberOfChipsFromPotato());
                }
                break;
            case 'fryChipsButton':
                let cutChipsCount = parseInt(document.getElementById('cutCount').innerHTML);
                if (cutChipsCount >= getFryerCapacity()) {
                    cutChipsCount = getFryerCapacity();
                }
                decrementCounter('cutCount', cutChipsCount);
                fryChips();
                setQuantityFrying(cutChipsCount);
                updateButtonStyle(buttonId);
                break;
            case 'servingStorageButton':
                let chuckedInFryerCount = parseInt(document.getElementById('chuckedInFryerCount').innerHTML);
                let newBatchId = getChipsReadyToServeQuantity().length;
                // console.log("newbatchid: " + newBatchId + "length of array: " + getChipsReadyToServeQuantity().length);
                getChipsReadyToServeQuantity().push(chuckedInFryerCount);
                document.getElementById('chuckedInFryerCount').innerHTML = "0";
                let total = 0;
                for (let i = 0; i < getChipsReadyToServeQuantity().length; i++) {
                    total += getChipsReadyToServeQuantity()[i];
                }
                document.getElementById('readyToServeCount').innerHTML = total.toString();
                startBatchTimer(newBatchId);
                break;
            case 'serveCustomerButton':
                decrementCounter('readyToServeCount', getPortionSize());
                decrementCounter('customersWaitingCount', 1);
                setCustomersWaiting(getCustomersWaiting() - 1);
                let newCustomersServedValue = getCustomersServed() + 1;
                setCustomersServed(newCustomersServedValue);

                let totalChips = 0;
                let portionSizeFulfilled = false;

                for (let i = 0; i < getChipsReadyToServeQuantity().length; i++) {
                    if (getChipsReadyToServeQuantity()[i] >= getPortionSize() && !portionSizeFulfilled && totalChips === 0) {
                        setChipsReadyToServeQuantity(i, getChipsReadyToServeQuantity()[i] - getPortionSize());
                        portionSizeFulfilled = true;
                        // console.log("took full portion from batch " + i);
                        if (getChipsReadyToServeQuantity()[i] === 0) {
                            clearInterval(batchTimers[i]);
                        }
                    } else if (!portionSizeFulfilled && ((getPortionSize() - totalChips) > getChipsReadyToServeQuantity()[i])) {
                        totalChips += getChipsReadyToServeQuantity()[i];
                        // console.log("not enough chips with " + getChipsReadyToServeQuantity()[i] + " in batch " + i + " - moving on to next batch, with " + totalChips + " added so far!");
                        setChipsReadyToServeQuantity(i, 0);
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

                console.log("Total Customers Served: " + getCustomersServed());
                break;
            case 'improvePotatoStorageButton':
                setCurrentCash(getCurrentCash() - getPriceToImprovePotatoStorage());
                newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
                document.getElementById(buttonId).innerHTML = 'Increase Potato Cap. ' + formatToCashNotation(newPriceOfUpgrade);
                setPotatoStorageQuantity(getPotatoStorageQuantity() + getUpgradePotatoStorageQuantity);
                document.getElementById('subInnerDivMid1_2').innerHTML = getActualPotatoesInStorage().toString() + '/' + getPotatoStorageQuantity().toString();
                break;
            case 'twoHandedPeelingButton':
                if (!checkIfNonRepeatableUpgradePurchased(button)) {
                    setCurrentCash(getCurrentCash() - getPriceToEnableDoublePeeling());
                    document.getElementById(buttonId).innerHTML = 'Double Peeling Tool PURCHASED';
                    updateButtonStyle(buttonId);
                    setPeelPotatoesRate(getPeelPotatoesRate() * 2);
                }
                break;
            case 'twoHandedChoppingButton':
                if (!checkIfNonRepeatableUpgradePurchased(button)) {
                    setCurrentCash(getCurrentCash() - getPriceToEnableDoubleChopping());
                    document.getElementById(buttonId).innerHTML = 'Double Chopping Tool PURCHASED';
                    updateButtonStyle(buttonId);
                    setCutChipsRate(getCutChipsRate() * 2);
                }
                break;
            case 'improveFryerCapacityButton':
                setCurrentCash(getCurrentCash() - getPriceToImproveFryerCapacity());
                newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
                document.getElementById(buttonId).innerHTML = 'Improve Fryer Cap. ' + formatToCashNotation(newPriceOfUpgrade);
                setFryerCapacity(getFryerCapacity() + getUpgradeFryerCapacityAmount());
                break;
            case 'addStorageHeaterButton':
                if (!checkIfNonRepeatableUpgradePurchased(button)) {
                    setCurrentCash(getCurrentCash() - getPriceToAddStorageHeater());
                    document.getElementById(buttonId).innerHTML = 'Storage Bin Heater PURCHASED';
                    updateButtonStyle(buttonId);
                    setMultipleForHeaterEffectOnCoolDown(2);
                }
                break;
            case 'startShiftButton':
                setShiftLengthTimerVariable(getShiftLength());
                setShiftInProgress(true);
                setShiftCounter(getShiftCounter() + 1);

                document.getElementById('subInnerDiv1_1').innerHTML = 'Shift Left (s):';
                document.getElementById('subInnerDiv1_2').innerHTML = getShiftTime();
                switch (getShiftCounter()) {
                    case 1:
                        document.getElementById('subInnerDivMid1_2').innerHTML = addShiftSpuds(getStartingSpuds()).toString() + "/" + getPotatoStorageQuantity().toString();
                        break;
                    default:
                        document.getElementById('subInnerDivMid1_2').innerHTML = addShiftSpuds(getSpudsToAddToShift()).toString() + "/" + getPotatoStorageQuantity().toString();
                        break;
                }

                let newPotatoesToDeliverForNextShift = Math.min((getActualPotatoesInStorage() + getSpudsToAddToShift()), getPotatoStorageQuantity());
                setActualPotatoesInStorage(newPotatoesToDeliverForNextShift);
                document.getElementById('startShiftButton').innerHTML = 'Start Shift <br> (+ ' + selectARandomNumberOfSpudsForNextShift() + ' Potatoes)';
                disableButtons(false);
                break;
            default:
                break;
        }
        disableButtons(false);
    });
}

function incrementCounter(counterElement, value) {
    let count = parseInt(counterElement.innerHTML);
    count += value;
    counterElement.innerHTML = count.toString();
    disableButtons(false);
}

export function decrementCounter(counterId, value) {
    const counterElement = document.getElementById(counterId);
    let count = parseInt(counterElement.innerHTML);
    count = Math.max(0, count - value);
    if (counterId === "subInnerDivMid1_2") {
        counterElement.innerHTML = count.toString() + "/" + getPotatoStorageQuantity().toString();
    } else {
        counterElement.innerHTML = count.toString();
    }
    disableButtons(false);
}

export function disableButtons(init) {
    const mainButtons = document.querySelectorAll('.action-button-main');
    const bottomRowButtons = document.querySelectorAll('.action-button-bottom-row');

    if (!init) {
        const spudsLeft = parseInt(document.getElementById('subInnerDivMid1_2').innerHTML);
        const peeledCount = parseInt(document.getElementById('peeledCount').innerHTML);
        const cutCount = parseInt(document.getElementById('cutCount').innerHTML);
        const inFryerCount = parseInt(document.getElementById('chuckedInFryerCount').innerHTML);
        const readyToServeCount = parseInt(document.getElementById('readyToServeCount').innerHTML);
        const customerCount = parseInt(document.getElementById('customersWaitingCount').innerHTML);

        mainButtons.forEach(button => {
            switch (button.id) {
                case 'peelPotatoButton':
                    button.disabled = spudsLeft <= 0 || !getShiftInProgress();
                    break;
                case 'cutChipsButton':
                    button.disabled = peeledCount <= 0 || !getShiftInProgress();
                    break;
                case 'fryChipsButton':
                    button.disabled = !getShiftInProgress() || cutCount <= 0 && !getChipsFrying();
                    break;
                case 'servingStorageButton':
                    button.disabled = inFryerCount <= 0 || !getShiftInProgress();
                    break;
                case 'serveCustomerButton':
                    button.disabled = customerCount <= 0 || readyToServeCount < getPortionSize() || !getShiftInProgress();
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
                    button.disabled = getShiftTime() > 0;
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
    } else {
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
                if (getCurrentCash() < pricesArrayMainButtons[i] || pricesArrayMainButtons[i] === 0) {
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
    let customerCount = parseInt(document.getElementById('customersWaitingCount').innerHTML);
    customerCount++;
    document.getElementById('customersWaitingCount').innerHTML = customerCount.toString();
    disableButtons(false);
}

function addShiftSpuds(quantity) {
    let currentSpuds = parseInt(document.getElementById('subInnerDivMid1_2').innerHTML);
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
    let spudsToAddToNextShift = Math.floor(Math.random() * (getMaxSpudsDelivery() - getMinSpudsDelivery() + 1)) + getMinSpudsDelivery();
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
