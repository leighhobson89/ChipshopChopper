import {
    chipsFrying,
    customersServed,
    getShiftCounter,
    getShiftTime,
    getSpudsToAddToShift,
    setChipsFrying,
    setCustomersServed,
    setCustomerTime,
    setFryTimer,
    setQuantityFrying,
    setShiftCounter,
    setShiftInProgress,
    setShiftTime, setSpudsToAddToShift,
    shiftTimeRemaining
} from './gameloop.js';

const MAX_VALUE_WAIT_FOR_NEW_CUSTOMER = 25;
const SHIFT_LENGTH = 60;
const FRY_TIMER = 15;
const FRYER_CAPACITY = 500;
const PORTION_SIZE = 40;
export const PRICE_OF_CHIPS = 2; //price in whole dollars
export const STARTING_SPUDS = 100;
export const SPUDS_TO_ADD_PER_SHIFT = 30;
export const STARTING_CASH = 0;
const MIN_SPUDS_DELIVERY = 20;
const MAX_SPUDS_DELIVERY = 100;

export function handleButtonClick(buttonId, counterId) {
    const button = document.getElementById(buttonId);
    const counter = document.getElementById(counterId);

    button.addEventListener('click', () => {
        switch (buttonId) {
            case 'peelPotatoButton':
                decrementCounter('subInnerDivMid1_2', 1);
                incrementCounter(counter, 1);
                break;
            case 'cutChipsButton':
                if (parseInt(document.getElementById('peeledCount').innerHTML) > 0) {
                    decrementCounter('peeledCount', 1);
                    incrementCounter(counter, 5);
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
                incrementCounter(counter, serveIncrement);
                break;
            case 'serveCustomerButton':
                decrementCounter('readyToServeCount', PORTION_SIZE);
                decrementCounter('customersWaitingCount', 1);
                let newCustomersServedValue = customersServed + 1;
                setCustomersServed(newCustomersServedValue);
                console.log("Total Customers Served: " + customersServed);
                break;
            case 'startShiftButton':
                setShiftLengthTimerVariable(SHIFT_LENGTH);
                setShiftInProgress(true);
                setShiftCounter(getShiftCounter() + 1);

                document.getElementById('subInnerDiv1_1').innerHTML = 'Shift Left (s):';
                document.getElementById('subInnerDiv1_2').innerHTML = getShiftTime();
                switch (getShiftCounter()) {
                    case 1:
                        document.getElementById('subInnerDivMid1_2').innerHTML = addShiftSpuds(STARTING_SPUDS).toString();
                        break;
                    default:
                        document.getElementById('subInnerDivMid1_2').innerHTML = addShiftSpuds(getSpudsToAddToShift()).toString();
                        break;
                }

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
    counterElement.innerHTML = count.toString();
    disableButtons(false);
}

// actions.js

export function disableButtons(init) {
    const buttons = document.querySelectorAll('.action-button');
    if (!init) {
        const spudsLeft = parseInt(document.getElementById('subInnerDivMid1_2').innerHTML);
        const peeledCount = parseInt(document.getElementById('peeledCount').innerHTML);
        const cutCount = parseInt(document.getElementById('cutCount').innerHTML);
        const chuckCount = parseInt(document.getElementById('chuckedInFryerCount').innerHTML);
        const serveCount = parseInt(document.getElementById('readyToServeCount').innerHTML);
        const customerCount = parseInt(document.getElementById('customersWaitingCount').innerHTML);

        buttons.forEach(button => {
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
                    button.disabled = chuckCount <= 0;
                    break;
                case 'serveCustomerButton':
                    button.disabled = customerCount <= 0 || serveCount < PORTION_SIZE;
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
        buttons.forEach(button => {
            if (button.id !== "startShiftButton") {
                button.disabled = true;
                button.classList.add('disabled');
            }
        });
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

