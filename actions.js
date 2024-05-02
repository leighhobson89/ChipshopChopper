import {
    chipsFrying,
    currentCash,
    customersServed,
    getActualPotatoesInStorage,
    getCurrentCash,
    getPotatoStorageQuantity,
    getPriceToAddStorageHeater,
    getPriceToEnableDoubleChopping,
    getPriceToImproveFryerCapacity,
    getPriceToImprovePotatoStorage,
    getShiftCounter,
    getShiftTime,
    getSpudsToAddToShift,
    potatoStorage,
    priceToAddStorageHeater,
    priceToEnableDoubleChopping,
    priceToImproveFryerCapacity,
    priceToImprovePotatoStorage,
    setActualPotatoesInStorage,
    setChipsFrying,
    setCurrentCash,
    setCustomersServed,
    setCustomerTime,
    setFryTimer,
    setPotatoStorageQuantity, setPriceToAddStorageHeater,
    setPriceToEnableDoubleChopping,
    setPriceToImproveFryerCapacity,
    setPriceToImprovePotatoStorage,
    setQuantityFrying,
    setShiftCounter,
    setShiftInProgress,
    setShiftTime,
    setSpudsToAddToShift,
    shiftTimeRemaining
} from './gameloop.js';
import {formatToCashNotation} from "./ui.js";

const MAX_VALUE_WAIT_FOR_NEW_CUSTOMER = 25;
const SHIFT_LENGTH = 60;
const FRY_TIMER = 15;
const FRYER_CAPACITY = 500;
const PORTION_SIZE = 40;
export const PRICE_OF_CHIPS = 2; //price in whole dollars
export const STARTING_SPUDS = 100;
export const STARTING_CASH = 0;
const MIN_SPUDS_DELIVERY = 20;
const MAX_SPUDS_DELIVERY = 80;
const UPGRADE_POTATO_STORAGE_QUANTITY = 50;
const MULTIPLE_FOR_IMPROVE_POTATO_STORAGE = 2;
const MULTIPLE_FOR_IMPROVE_FRYER_CAPACITY = 4;

export function handleButtonClick(buttonId, value) {
    const button = document.getElementById(buttonId);
    const element = document.getElementById(value);

    button.addEventListener('click', () => {
        switch (buttonId) {
            case 'peelPotatoButton':
                setActualPotatoesInStorage(getActualPotatoesInStorage() - 1);
                decrementCounter('subInnerDivMid1_2', 1);
                incrementCounter(element, 1);
                break;
            case 'cutChipsButton':
                if (parseInt(document.getElementById('peeledCount').innerHTML) > 0) {
                    decrementCounter('peeledCount', 1);
                    incrementCounter(element, 5);
                }
                break;
            case 'fryChipsButton':
                let cutChipsCount = parseInt(document.getElementById('cutCount').innerHTML);
                if (cutChipsCount >= FRYER_CAPACITY) {
                    cutChipsCount = FRYER_CAPACITY
                }
                decrementCounter('cutCount', cutChipsCount);
                fryChips();
                setQuantityFrying(cutChipsCount);
                break;
            case 'servingStorageButton':
                let chuckedInFryerCount = parseInt(document.getElementById('chuckedInFryerCount').innerHTML);
                let serveIncrement = 10;
                if (chuckedInFryerCount < serveIncrement) {
                    serveIncrement = chuckedInFryerCount;
                }
                decrementCounter('chuckedInFryerCount', serveIncrement);
                incrementCounter(element, serveIncrement);
                break;
            case 'serveCustomerButton':
                decrementCounter('readyToServeCount', PORTION_SIZE);
                decrementCounter('customersWaitingCount', 1);
                let newCustomersServedValue = customersServed + 1;
                setCustomersServed(newCustomersServedValue);
                console.log("Total Customers Served: " + customersServed);
                break;
            case 'improvePotatoStorageButton':
                setCurrentCash(getCurrentCash() - getPriceToImprovePotatoStorage());
                const newPriceOfUpgrade = calculateAndSetNewPriceOfUpgrade(buttonId);
                document.getElementById(buttonId).innerHTML = 'Increase Potato Cap. ' + formatToCashNotation(newPriceOfUpgrade);
                setPotatoStorageQuantity(getPotatoStorageQuantity() + UPGRADE_POTATO_STORAGE_QUANTITY);
                document.getElementById('subInnerDivMid1_2').innerHTML = getActualPotatoesInStorage().toString() + '/' + potatoStorage.toString();
                break;
            case 'twoHandedChoppingButton':
                setCurrentCash(getCurrentCash() - getPriceToEnableDoubleChopping());
                document.getElementById(buttonId).innerHTML = formatToCashNotation(getCurrentCash());
                break;
            case 'improveFryerCapacityButton':
                setCurrentCash(getCurrentCash() - getPriceToImproveFryerCapacity());
                document.getElementById(buttonId).innerHTML = formatToCashNotation(getCurrentCash());
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
                        document.getElementById('subInnerDivMid1_2').innerHTML = addShiftSpuds(STARTING_SPUDS).toString() + "/" + potatoStorage.toString();
                        break;
                    default:
                        document.getElementById('subInnerDivMid1_2').innerHTML = addShiftSpuds(getSpudsToAddToShift()).toString() + "/" + potatoStorage.toString();
                        break;
                }
                console.log("Actual Potatoes in Storage before adding new ones is: " + getActualPotatoesInStorage());
                setActualPotatoesInStorage(getActualPotatoesInStorage() + getSpudsToAddToShift());
                console.log(getActualPotatoesInStorage());

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

function decrementCounter(counterId, value) {
    const counterElement = document.getElementById(counterId);
    let count = parseInt(counterElement.innerHTML);
    count = Math.max(0, count - value); // Ensure count is not negative
    if (counterId === "subInnerDivMid1_2") {
        counterElement.innerHTML = count.toString() + "/" + potatoStorage.toString();
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
                    button.disabled = spudsLeft <= 0;
                    break;
                case 'cutChipsButton':
                    button.disabled = peeledCount <= 0;
                    break;
                case 'fryChipsButton':
                    button.disabled = cutCount <= 0 || chipsFrying;
                    break;
                case 'servingStorageButton':
                    button.disabled = inFryerCount <= 0;
                    break;
                case 'serveCustomerButton':
                    button.disabled = customerCount <= 0 || readyToServeCount < PORTION_SIZE;
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
                case 'improvePotatoStorageButton':
                    button.disabled = getCurrentCash() < getPriceToImprovePotatoStorage();
                    break;
                case 'twoHandedChoppingButton':
                    button.disabled = getCurrentCash() < getPriceToEnableDoubleChopping();
                    break;
                case 'improveFryerCapacityButton':
                    button.disabled = getCurrentCash() < getPriceToImproveFryerCapacity();
                    break;
                case 'addStorageHeaterButton':
                    button.disabled = getCurrentCash() < getPriceToAddStorageHeater();
                    break;
                case 'startShiftButton':
                    button.disabled = shiftTimeRemaining > 0;
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
                button.disabled = true;
                button.classList.add('disabled');
        });

        const pricesArray = [priceToImprovePotatoStorage, priceToEnableDoubleChopping, priceToImproveFryerCapacity, priceToAddStorageHeater, 0];

        for (let i = 0; i < bottomRowButtons.length; i++) {
            const button = bottomRowButtons[i];
            if (button.id !== "startShiftButton") {
                if (getCurrentCash() < pricesArray[i]) {
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
    if (currentSpuds + quantity > potatoStorage) {
        return potatoStorage;
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
        case "twoHandedChoppingButton":
            return getPriceToEnableDoubleChopping();
        case "improveFryerCapacityButton":
            setPriceToImproveFryerCapacity(getPriceToImproveFryerCapacity() * MULTIPLE_FOR_IMPROVE_FRYER_CAPACITY);
            return getPriceToImproveFryerCapacity();
        case "addStorageHeaterButton":
            return getPriceToAddStorageHeater();
    }
}