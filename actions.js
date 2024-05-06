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
    getPeelPotatoesRate,
    getPotatoesPeeledThisShift,
    getPotatoStorageQuantity,
    getPriceToAddStorageHeater,
    getPriceToEnableDoubleChopping,
    getPriceToEnableDoublePeeling,
    getPriceToImproveFryerCapacity,
    getPriceToImprovePotatoStorage,
    getShiftCounter,
    getShiftInProgress,
    getShiftTime,
    getSpudsToAddToShift,
    setActualPotatoesInStorage,
    setChipsCutThisShift,
    setChipsFrying,
    setChipsReadyToServeQuantity,
    setCurrentCash,
    setCustomersServed,
    setCustomersWaiting,
    setCustomerTime,
    setCutChipsRate,
    setFryerCapacity,
    setFryTimer,
    setPeelPotatoesRate,
    setPotatoesPeeledThisShift,
    setPotatoStorageQuantity,
    setPriceToImproveFryerCapacity,
    setPriceToImprovePotatoStorage,
    setQuantityFrying,
    setShiftCounter,
    setShiftInProgress,
    setShiftTime,
    setSpudsToAddToShift,
    startBatchTimer
} from './gameloop.js';

import {formatToCashNotation, updateButtonStyle} from "./ui.js";

const MAX_VALUE_WAIT_FOR_NEW_CUSTOMER = 10;
const SHIFT_LENGTH = 120;
const FRY_TIMER = 15;
const PORTION_SIZE = 40;
export const PRICE_OF_CHIPS = 2; //price in whole dollars
export const STARTING_SPUDS = 100;
export const STARTING_CASH = 0;
const MIN_SPUDS_DELIVERY = 20;
const MAX_SPUDS_DELIVERY = 80;
const UPGRADE_POTATO_STORAGE_QUANTITY = 50;
const UPGRADE_FRYER_CAPACITY_AMOUNT = 200;
const MULTIPLE_FOR_IMPROVE_POTATO_STORAGE = 2;
const MULTIPLE_FOR_IMPROVE_FRYER_CAPACITY = 4;

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
                    incrementCounter(element, 5 * getCutChipsRate()); //maybe add getter for getNumberOfChipsFromPotato
                    setChipsCutThisShift(getChipsCutThisShift() + (5 * getCutChipsRate()));
                } else if (peeledCount > 0) {
                    decrementCounter('peeledCount', 1);
                    incrementCounter(element, 5); //maybe add getter for getNumberOfChipsFromPotato
                    setChipsCutThisShift(getChipsCutThisShift() + 5);
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
                console.log("newbatchid: " + newBatchId + "length of array: " + getChipsReadyToServeQuantity().length);
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
                decrementCounter('readyToServeCount', PORTION_SIZE);
                decrementCounter('customersWaitingCount', 1);
                setCustomersWaiting(getCustomersWaiting() - 1);
                let newCustomersServedValue = getCustomersServed() + 1;
                setCustomersServed(newCustomersServedValue);

                let totalChips = 0;
                let portionSizeFulfilled = false;

                for (let i = 0; i < getChipsReadyToServeQuantity().length; i++) {
                    if (getChipsReadyToServeQuantity()[i] >= PORTION_SIZE && !portionSizeFulfilled && totalChips === 0) {
                        setChipsReadyToServeQuantity(i, getChipsReadyToServeQuantity()[i] - PORTION_SIZE);
                        totalChips += PORTION_SIZE;
                        portionSizeFulfilled = true;
                        console.log("took full portion from batch " + i);
                    } else if (!portionSizeFulfilled && ((PORTION_SIZE - totalChips) > getChipsReadyToServeQuantity()[i])) {
                        totalChips += getChipsReadyToServeQuantity()[i];
                        console.log("not enough chips with " + getChipsReadyToServeQuantity()[i] + " in batch " + i + " - moving on to next batch, with " + totalChips + " added so far!");
                        setChipsReadyToServeQuantity(i, 0);
                        clearInterval(batchTimers[i]);
                    } else {
                        const chipsToAdd = Math.min(getChipsReadyToServeQuantity()[i], PORTION_SIZE - totalChips);
                        setChipsReadyToServeQuantity(i, getChipsReadyToServeQuantity()[i] - chipsToAdd);
                        console.log("chips to add to fulfill order: " + chipsToAdd + " because batch has:" + getChipsReadyToServeQuantity()[i] + " and totalChips value is:" + totalChips);
                        totalChips += chipsToAdd;
                        console.log("fulfilled portion from multiple batches, here is the state of the array:");
                        console.log(getChipsReadyToServeQuantity());
                        portionSizeFulfilled = true;
                    }
                }

                console.log("Total Customers Served: " + getCustomersServed());
                break;
            case 'improvePotatoStorageButton':
                setCurrentCash(getCurrentCash() - getPriceToImprovePotatoStorage());
                newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
                document.getElementById(buttonId).innerHTML = 'Increase Potato Cap. ' + formatToCashNotation(newPriceOfUpgrade);
                setPotatoStorageQuantity(getPotatoStorageQuantity() + UPGRADE_POTATO_STORAGE_QUANTITY);
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
                document.getElementById(buttonId).innerHTML = formatToCashNotation(getCurrentCash());
                newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
                document.getElementById(buttonId).innerHTML = 'Improve Fryer Cap. ' + formatToCashNotation(newPriceOfUpgrade);
                setFryerCapacity(getFryerCapacity() + UPGRADE_FRYER_CAPACITY_AMOUNT);
                break;
            case 'addStorageHeaterButton':
                setCurrentCash(getCurrentCash() - getPriceToAddStorageHeater());
                document.getElementById(buttonId).innerHTML = formatToCashNotation(getCurrentCash());
                break;
            case 'startShiftButton':
                setShiftLengthTimerVariable(SHIFT_LENGTH);
                setShiftInProgress(true);
                setShiftCounter(getShiftCounter() + 1);

                document.getElementById('subInnerDiv1_1').innerHTML = 'Shift Left (s):';
                document.getElementById('subInnerDiv1_2').innerHTML = getShiftTime();
                switch (getShiftCounter()) {
                    case 1:
                        document.getElementById('subInnerDivMid1_2').innerHTML = addShiftSpuds(STARTING_SPUDS).toString() + "/" + getPotatoStorageQuantity().toString();
                        break;
                    default:
                        document.getElementById('subInnerDivMid1_2').innerHTML = addShiftSpuds(getSpudsToAddToShift()).toString() + "/" + getPotatoStorageQuantity().toString();
                        break;
                }

                let newPotatoesToDeliverForNextShift = Math.min((getActualPotatoesInStorage() + getSpudsToAddToShift()), getPotatoStorageQuantity());
                setActualPotatoesInStorage(newPotatoesToDeliverForNextShift);
                document.getElementById('startShiftButton').innerHTML = 'Start Shift <br> (+ ' + getRandomNumberOfSpudsForNextShift() + ' Potatoes)';
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
    count = Math.max(0, count - value); // Ensure count is not negative
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
                    button.disabled = customerCount <= 0 || readyToServeCount < PORTION_SIZE || !getShiftInProgress();
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
    const timeUntilNextCustomer = Math.floor(Math.random() * MAX_VALUE_WAIT_FOR_NEW_CUSTOMER) + 1;
    setCustomerTimerVariable(timeUntilNextCustomer);
}

export function setCustomerTimerVariable(value) {
    setCustomerTime(value);
}

export function setShiftLengthTimerVariable(value) {
    setShiftTime(value);
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
    setFryTimer(FRY_TIMER);
    setChipsFrying(true);
}

function getRandomNumberOfSpudsForNextShift() {
    let spudsToAddToNextShift = Math.floor(Math.random() * (MAX_SPUDS_DELIVERY - MIN_SPUDS_DELIVERY + 1)) + MIN_SPUDS_DELIVERY;
    setSpudsToAddToShift(spudsToAddToNextShift);
    return spudsToAddToNextShift;
}

function calculateAndSetNewPriceOfUpgrade(buttonId) {
    switch (buttonId) {
        case "improvePotatoStorageButton":
            setPriceToImprovePotatoStorage(getPriceToImprovePotatoStorage() * MULTIPLE_FOR_IMPROVE_POTATO_STORAGE);
            return getPriceToImprovePotatoStorage();
        case "twoHandedPeelingButton":
            return getPriceToEnableDoublePeeling();
        case "twoHandedChoppingButton":
            return getPriceToEnableDoubleChopping();
        case "improveFryerCapacityButton":
            setPriceToImproveFryerCapacity(getPriceToImproveFryerCapacity() * MULTIPLE_FOR_IMPROVE_FRYER_CAPACITY);
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
