import {createEndOfShiftPopup, createOverlay, formatToCashNotation} from './ui.js';

//ELEMENTS

const elementOption1 = document.getElementById('option1');
const elementOption2 = document.getElementById('option2');
const elementOption3 = document.getElementById('option3');
const elementOption4 = document.getElementById('option4');
const elementSubInnerDiv1_2 = document.getElementById('subInnerDiv1_2');
const elementFryChipsButton = document.getElementById('fryChipsButton');
const elementCustomersWaitingCount = document.getElementById('customersWaitingCount');
const elementReadyToServeCount = document.getElementById('readyToServeCount');
const elementOptionsWindow = document.getElementById('optionsWindow');
const elementGameWindow = document.getElementById('gameWindow');
const elementImprovePotatoStorageButton = document.getElementById('improvePotatoStorageButton');
const elementTwoHandedPeelingButton = document.getElementById('twoHandedPeelingButton');
const elementTwoHandedChoppingButton = document.getElementById('twoHandedChoppingButton');
const elementImproveFryerCapacityButton = document.getElementById('improveFryerCapacityButton');
const elementAddStorageHeaterButton = document.getElementById('addStorageHeaterButton');
const elementChuckedInFryerCount = document.getElementById('chuckedInFryerCount');
const elementStartShiftButton = document.getElementById('startShiftButton');
const elementPeelPotatoButton = document.getElementById('peelPotatoButton');
const elementCutChipsButton = document.getElementById('cutChipsButton');
const elementServingStorageButton = document.getElementById('servingStorageButton');
const elementServeCustomerButton = document.getElementById('serveCustomerButton');
const elementFryCount = document.getElementById("fryCount");

//CONSTANTS

const CLOCK_SPEED = 1000;
const MAX_VALUE_WAIT_FOR_NEW_CUSTOMER = 10;
const SHIFT_LENGTH = 30;
const FRY_TIMER = 15;
const PORTION_SIZE = 40;
const PRICE_OF_CHIPS = 2;
const STARTING_SPUDS = 100;
const STARTING_CASH = 0;
const MIN_SPUDS_DELIVERY = 20;
const MAX_SPUDS_DELIVERY = 80;
const UPGRADE_POTATO_STORAGE_QUANTITY = 50;
const UPGRADE_FRYER_CAPACITY_AMOUNT = 200;
const MULTIPLE_FOR_IMPROVE_POTATO_STORAGE = 2;
const MULTIPLE_FOR_IMPROVE_FRYER_CAPACITY = 4;
const NUMBER_OF_CHIPS_FROM_POTATO = 5;
const COOL_DOWN_TIMER = 20;
const STANDARD_DECREMENT_INCREMENT = 1;
const UPGRADE_HEATER_MULTIPLE = 2;
const UPGRADE_DOUBLE_PEELER_MULTIPLE = 2;
const UPGRADE_DOUBLE_CHOPPER_MULTIPLE = 2;
const ZERO = 0;
const ONE = 1;
export const endOfShiftPopupObject = createEndOfShiftPopup();
export const endOfShiftPopup = endOfShiftPopupObject.popupContainer;
export const popupContinueButton = endOfShiftPopupObject.continueButton;
export const popupOverlay = createOverlay();
//-----------------------------------------------------------

 let multipleForHeaterEffectOnCoolDown = 1;
 let customerTime = 0;
 let shiftTimeRemaining = 0;
 let fryTimeRemaining = 0;

 let coolDownTimeRemaining = 0;
 let shiftCounter = 0;
 export let shiftInProgress = false;
 let customersServed = 0;
 let currentCash = 0;
 let chipsFrying = false;
 let quantityFrying = 0;
 let spudsToAddToShift = 0;
 let actualPotatoesInStorage = 100;
 let potatoStorage = 200;
 let cutChipsRate = 1;
 let peelPotatoesRate = 1;
 let chipsReadyToServeQuantity = [];
 let fryerCapacity = 100;

//PRICES
 let priceToImprovePotatoStorage = 5; //50
 let priceToEnableDoubleChopping = 6; //60
 let priceToEnableDoublePeeling = 4; //40
 let priceToImproveFryerCapacity = 7; //100
 let priceToAddStorageHeater = 8; //200

//STATS
 let oldCash = 0;
 let potatoesPeeledThisShift = 0;
 let chipsCutThisShift = 0;
 let chipsFriedThisShift = 0;
 let customersWaitingAtEndOfShift = 0;
 let customersWaiting = 0;
 let chipsWastedThisShift = 0;

 export let batchTimers = {};

 //GETTER SETTER METHODS

// Setter function for all elements
export function getElements() {
    return {
        option1: document.getElementById('option1'),
        option2: document.getElementById('option2'),
        option3: document.getElementById('option3'),
        option4: document.getElementById('option4'),
        subInnerDiv1_2: document.getElementById('subInnerDiv1_2'),
        fryChipsButton: document.getElementById('fryChipsButton'),
        customersWaitingCount: document.getElementById('customersWaitingCount'),
        readyToServeCount: document.getElementById('readyToServeCount'),
        optionsWindow: document.getElementById('optionsWindow'),
        gameWindow: document.getElementById('gameWindow'),
        improvePotatoStorageButton: document.getElementById('improvePotatoStorageButton'),
        twoHandedPeelingButton: document.getElementById('twoHandedPeelingButton'),
        twoHandedChoppingButton: document.getElementById('twoHandedChoppingButton'),
        improveFryerCapacityButton: document.getElementById('improveFryerCapacityButton'),
        addStorageHeaterButton: document.getElementById('addStorageHeaterButton'),
        chuckedInFryerCount: document.getElementById('chuckedInFryerCount'),
        startShiftButton: document.getElementById('startShiftButton'),
        peelPotatoButton: document.getElementById('peelPotatoButton'),
        cutChipsButton: document.getElementById('cutChipsButton'),
        servingStorageButton: document.getElementById('servingStorageButton'),
        serveCustomerButton: document.getElementById('serveCustomerButton'),
        fryCount: document.getElementById('fryCount')
    };
}

export function setActualPotatoesInStorage(value) {
    actualPotatoesInStorage = value;
}

export function getActualPotatoesInStorage() {
    return actualPotatoesInStorage;
}

export function setCustomerTime(value) {
    customerTime = value;
}

export function getCustomerTime() {
    return customerTime;
}

export function setShiftCounter(value) {
    shiftCounter = value;
}

export function getShiftCounter() {
    return shiftCounter;
}

export function setShiftTime(value) {
    shiftTimeRemaining = value;
}

export function getShiftTime() {
    return shiftTimeRemaining;
}

export function setShiftInProgress(value) {
    shiftInProgress = value;
}

export function getShiftInProgress() {
    return shiftInProgress;
}

export function setCustomersServed(value) {
    customersServed = value;
    document.getElementById('subInnerDiv3_2').innerHTML = value;
}

export function getCustomersServed() {
    return customersServed;
}

export function setCurrentCash(value) {
    currentCash = value;
    document.getElementById('subInnerDivMid3_2').innerHTML = formatToCashNotation(getCurrentCash());
}

export function getCurrentCash() {
    return currentCash;
}

export function setChipsFrying(value) {
    chipsFrying = value;
}

export function getChipsFrying() {
    return chipsFrying;
}

export function setQuantityOfChipsFrying(value) {
    quantityFrying = value;
}

export function getQuantityOfChipsFrying() {
    return quantityFrying;
}

export function setFryTimer(value) {
    fryTimeRemaining = value;
}

export function getFryTimeRemaining() {
    return fryTimeRemaining;
}

export function getSpudsToAddToShift() {
    return spudsToAddToShift;
}

export function setSpudsToAddToShift(value) {
    spudsToAddToShift = value;
}

export function getPriceToImprovePotatoStorage() {
    return priceToImprovePotatoStorage;
}

export function setPriceToImprovePotatoStorage(value) {
    priceToImprovePotatoStorage = value;
}

export function getPotatoStorageQuantity() {
    return potatoStorage;
}

export function setPotatoStorageQuantity(value) {
    potatoStorage = value;
}

export function getPriceToEnableDoubleChopping() {
    return priceToEnableDoubleChopping;
}

export function setPriceToEnableDoubleChopping(value) {
    priceToEnableDoubleChopping = value;
}

export function getPriceToImproveFryerCapacity() {
    return priceToImproveFryerCapacity;
}

export function setPriceToImproveFryerCapacity(value) {
    priceToImproveFryerCapacity = value;
}

export function getPriceToAddStorageHeater() {
    return priceToAddStorageHeater;
}

export function setPriceToAddStorageHeater(value) {
    priceToAddStorageHeater = value;
}

export function getCutChipsRate() {
    return cutChipsRate;
}

export function setCutChipsRate(value) {
    cutChipsRate = value;
}

export function getPeelPotatoesRate() {
    return peelPotatoesRate;
}

export function setPeelPotatoesRate(value) {
    peelPotatoesRate = value;
}

export function getPriceToEnableDoublePeeling() {
    return priceToEnableDoublePeeling;
}

export function setPriceToEnableDoublePeeling(value) {
    priceToEnableDoublePeeling = value;
}

export function getOldCash() {
    return oldCash;
}

export function setOldCash(value) {
    oldCash = value;
}

export function getPotatoesPeeledThisShift() {
    return potatoesPeeledThisShift;
}

export function setPotatoesPeeledThisShift(value) {
    potatoesPeeledThisShift = value;
}

export function getChipsCutThisShift() {
    return chipsCutThisShift;
}

export function setChipsCutThisShift(value) {
    chipsCutThisShift = value;
}

export function getChipsFriedThisShift() {
    return chipsFriedThisShift;
}

export function setChipsFriedThisShift(value) {
    chipsFriedThisShift = value;
}

export function getCustomersWaiting() {
    return customersWaiting;
}

export function setCustomersWaiting(value) {
    customersWaiting = value;
}

export function getChipsReadyToServeQuantity() {
    return chipsReadyToServeQuantity;
}

export function setChipsReadyToServeQuantity(index, value) {
    if (value === 'clear') {
        chipsReadyToServeQuantity = []; // Set array to empty
    } else {
        chipsReadyToServeQuantity[index] = value; // Update array normally
    }
}

export function getFryerCapacity() {
    return fryerCapacity;
}

export function setFryerCapacity(value) {
    fryerCapacity = value;
}

export function getChipsWastedThisShift() {
    return chipsWastedThisShift;
}

export function setChipsWastedThisShift(value) {
    chipsWastedThisShift = value;
}

export function getMultipleForHeaterEffectOnCoolDown() {
    return multipleForHeaterEffectOnCoolDown;
}

export function setMultipleForHeaterEffectOnCoolDown(value) {
    multipleForHeaterEffectOnCoolDown = value;
}

export function getCoolDownTimeRemaining() {
    return coolDownTimeRemaining;
}

export function setCoolDownTimeRemaining(value) {
    coolDownTimeRemaining = value;
}

export function getShiftTimeRemaining() {
    return shiftTimeRemaining;
}

export function setShiftTimeRemaining(value) {
    shiftTimeRemaining = value;
}

export function setCustomerTimerVariable(value) {
    setCustomerTime(value);
}

export function setShiftLengthTimerVariable(value) {
    setShiftTime(value);
}

export function getPortionSize() {
    return PORTION_SIZE;
}

export function getUpgradePotatoStorageQuantity() {
    return UPGRADE_POTATO_STORAGE_QUANTITY;
}

export function getUpgradeFryerCapacityAmount() {
    return UPGRADE_FRYER_CAPACITY_AMOUNT;
}

export function getShiftLength() {
    return SHIFT_LENGTH;
}

export function getStartingSpuds() {
    return STARTING_SPUDS;
}

export function getMaxValueWaitForNewCustomer() {
    return MAX_VALUE_WAIT_FOR_NEW_CUSTOMER;
}

export function getFryTimer() {
    return FRY_TIMER;
}
export function getMaxSpudsDelivery() {
    return MAX_SPUDS_DELIVERY;
}
export function getMinSpudsDelivery() {
    return MIN_SPUDS_DELIVERY;
}
export function getMultipleForImprovePotatoStorage() {
    return MULTIPLE_FOR_IMPROVE_POTATO_STORAGE;
}
export function getMultipleForImproveFryerCapacity() {
    return MULTIPLE_FOR_IMPROVE_FRYER_CAPACITY;
}

export function getNumberOfChipsFromPotato() {
    return NUMBER_OF_CHIPS_FROM_POTATO;
}

export function getPriceOfChips() {
    return PRICE_OF_CHIPS;
}

export function getCoolDownTimer() {
    return COOL_DOWN_TIMER;
}

export function getStartingCash() {
    return STARTING_CASH;
}

export function getStandardDecrementIncrementOfOne() {
    return STANDARD_DECREMENT_INCREMENT;
}

export function getUpgradeHeaterMultiple() {
    return UPGRADE_HEATER_MULTIPLE;
}

export function getUpgradeDoublePeelerMultiple() {
    return UPGRADE_DOUBLE_PEELER_MULTIPLE;
}

export function getUpgradeDoubleChopperMultiple() {
    return UPGRADE_DOUBLE_CHOPPER_MULTIPLE;
}

export function getZero() {
    return ZERO;
}

export function getOne() {
    return ONE;
}

export function getOddNumberLeftOverAfterDoublePeelingChopping() {
    return ONE;
}

export function getOnShiftOne() {
    return ONE;
}

export function getAddOneToRandomNumberToEnsureAboveOne() {
    return ONE;
}

export function getOneForTimeDiff() {
    return ONE;
}

export function getClockSpeed() {
    return CLOCK_SPEED;
}

export function getJustDeleteTheOneElementFromArray() {
    return ONE;
}

export function resetBatchTimers() {
    batchTimers = {};
}

export function getCustomersWaitingBeforeEndOfShift() {
    return customersWaitingAtEndOfShift;
}

export function getStart() {
    return ZERO;
}

export function getStop() {
    return ONE;
}

export function setCustomersWaitingBeforeEndOfShift(value) {
    customersWaitingAtEndOfShift = value;
}



