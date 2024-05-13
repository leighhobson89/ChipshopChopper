import {createEndOfShiftPopup, createOverlay, formatToCashNotation} from './ui.js';

//DEBUG
export let debugFlag = false;

//ELEMENTS
let elements;

//CONSTANTS
const CLOCK_SPEED = 1000;
const AUTO_UPGRADES_CLOCK_SPEED = 50; //MAX ACCURATE CLOCK SPEED
export const TIMER_CORRECTION_COEFFICIENT = 2.63; //Multiplier to make timers align due performance
const MAX_VALUE_WAIT_FOR_NEW_CUSTOMER = 10;
const SHIFT_LENGTH = 320; //80
const FRY_TIMER = 15;
const PORTION_SIZE = 40;
const PRICE_OF_CHIPS = 2;
const STARTING_SPUDS = 100;
const STARTING_CASH = 0;
const MIN_SPUDS_DELIVERY = 20;
const MAX_SPUDS_DELIVERY = 80;
const UPGRADE_POTATO_STORAGE_QUANTITY = 50;
const UPGRADE_FRYER_CAPACITY_AMOUNT = 200;
const NUMBER_OF_CHIPS_FROM_POTATO = 5;
const COOL_DOWN_TIMER = 20;
const STANDARD_DECREMENT_INCREMENT = 1;
const AUTO_FRYER_DECREMENT = 2.5;
const AUTO_STORAGE_COLLECTOR_DECREMENT = 2.5;
const AUTO_CUSTOMER_SERVER_DECREMENT = 2.5;
const UPGRADE_HEATER_MULTIPLE = 2;
const ZERO = 0;
const ONE = 1;

//UPGRADE PRICE MULTIPLIER CONSTANTS
const MULTIPLE_FOR_UPGRADE_DOUBLE_PEELER = 2;
const MULTIPLE_FOR_UPGRADE_DOUBLE_CHOPPER = 2;
const MULTIPLE_FOR_IMPROVE_POTATO_STORAGE = 2;
const MULTIPLE_FOR_IMPROVE_FRYER_CAPACITY = 4;
const MULTIPLE_FOR_IMPROVE_AUTO_PEELER = 2;
const MULTIPLE_FOR_IMPROVE_AUTO_CHIPPER = 2;
const MULTIPLE_FOR_IMPROVE_AUTO_FRYER = 2;
const MULTIPLE_FOR_IMPROVE_AUTO_STORAGE_COLLECTOR = 2;
const MULTIPLE_FOR_IMPROVE_AUTO_CUSTOMER_SERVER = 2;

export const endOfShiftPopupObject = createEndOfShiftPopup();
export const endOfShiftPopup = endOfShiftPopupObject.popupContainer;
export const popupContinueButton = endOfShiftPopupObject.continueButton;
export const popupOverlay = createOverlay();

 //GLOBAL VARIABLES
 let multipleForHeaterEffectOnCoolDown = 1;
 let customerTime = 0;
 let shiftTimeRemaining = 0;
 let fryTimeRemaining = 0;
 let coolDownTimeRemaining = 0;
 let shiftCounter = 0;
 let customersServed = 0;
 let currentCash = 0;
 let quantityFrying = 0;
 let spudsToAddToShift = 0;
 let actualPotatoesInStorage = 100;
 let potatoStorage = 200;
 let cutChipsRate = 1;
 let peelPotatoesRate = 1;
 let chipsReadyToServeQuantity = [];
 let fryerCapacity = 100;
 let autoFryerEfficiency = 0.5;

 //FLAGS
 export let shiftInProgress = false;
 let chipsFrying = false;
 let autoPeelerBought = false;
 let autoChipperBought = false;
 let autoFryerBought = false;
 let autoStorageCollectorBought = false;
 let autoCustomerServerBought = false;

//PRICES
 let priceToImprovePotatoStorage = 5; //50
 let priceToEnableDoubleChipping = 6; //60
 let priceToEnableDoublePeeling = 4; //40
 let priceToImproveFryerCapacity = 7; //100
 let priceToAddStorageHeater = 8; //200
 let priceToImproveAutoPeeler = 100; //1000
 let priceToImproveAutoChipper = 100; //1000
 let priceToImproveAutoFryer = 150; //1500
 let priceToImproveAutoStorageCollector = 200; //2000
 let priceToImproveAutoCustomerServer = 300; //3000

//AUTO SPEEDS
let currentSpeedAutoPeeler = "N/A";
let nextSpeedAutoPeeler = 1;
let currentSpeedAutoChipper = "N/A";
let nextSpeedAutoChipper = 1;
let currentSpeedAutoFryer = "N/A";
let nextSpeedAutoFryer = 30;
let currentSpeedAutoStorageCollector = "N/A";
let nextSpeedAutoStorageCollector = 30;
let currentSpeedAutoCustomerServer = "N/A";
let nextSpeedAutoCustomerServer = 30;

export let autoPeelerCounter = 0;
export let autoChipperCounter = 0;
export let autoFryerCounter = 30;
export let autoStorageCollectorCounter = 30;
export let autoCustomerServerCounter = 30;

//STATS
 let oldCash = 0;
 let potatoesPeeledThisShift = 0;
 let chipsCutThisShift = 0;
 let chipsFriedThisShift = 0;
 let customersWaitingAtEndOfShift = 0;
 let customersWaiting = 0;
 let chipsWastedThisShift = 0;

 //STRING LITERAL ENUMS
 export const Role = {
     ONE: 'Chip Shop Prepper',
     TWO: 'Smart Prepper',
     THREE: 'Chip Shop Manager',
     FOUR: 'Chip Shop Owner',
     FIVE: 'Chip Empire Executive',
     SIX: 'Rich Lazy Director',
     SEVEN: 'President of Potatoes'
 }
 //BATCH TIMER VARIABLE
 export let batchTimers = {};

 //GETTER SETTER METHODS
export function setElements() {
      elements = {
        option1: document.getElementById('option1'),
        option2: document.getElementById('option2'),
        option3: document.getElementById('option3'),
        option4: document.getElementById('option4'),
        fryChipsButton: document.getElementById('fryChipsButton'),
        customersWaitingCount: document.getElementById('customersWaitingCount'),
        readyToServeCount: document.getElementById('readyToServeCount'),
        optionsWindow: document.getElementById('optionsWindow'),
        gameWindow: document.getElementById('gameWindow'),
        improvePotatoStorageButton: document.getElementById('improvePotatoStorageButton'),
        twoHandedPeelingButton: document.getElementById('twoHandedPeelingButton'),
        twoHandedChippingButton: document.getElementById('twoHandedChippingButton'),
        improveFryerCapacityButton: document.getElementById('improveFryerCapacityButton'),
        addStorageHeaterButton: document.getElementById('addStorageHeaterButton'),
        peeledCount: document.getElementById('peeledCount'),
        cutCount: document.getElementById('cutCount'),
        chuckedInFryerCount: document.getElementById('chuckedInFryerCount'),
        startShiftButton: document.getElementById('startShiftButton'),
        peelPotatoButton: document.getElementById('peelPotatoButton'),
        cutChipsButton: document.getElementById('cutChipsButton'),
        servingStorageButton: document.getElementById('servingStorageButton'),
        serveCustomerButton: document.getElementById('serveCustomerButton'),
        innerDiv2: document.getElementById('innerDiv2'),
        subInnerDiv1_1: document.getElementById('subInnerDiv1_1'),
        subInnerDiv1_2: document.getElementById('subInnerDiv1_2'),
        subInnerDiv3_1: document.getElementById('subInnerDiv3_1'),
        subInnerDiv3_2: document.getElementById('subInnerDiv3_2'),
        subInnerDivMid1_1: document.getElementById('subInnerDivMid1_1'),
        subInnerDivMid1_2: document.getElementById('subInnerDivMid1_2'),
        subInnerDivMid3_1: document.getElementById('subInnerDivMid3_1'),
        subInnerDivMid3_2: document.getElementById('subInnerDivMid3_2'),
        endOfShiftPopupTitle: document.getElementById('endOfShiftPopupTitle'),
        endOfShiftPopupContent: document.getElementById('endOfShiftPopupContent'),
        clock: document.querySelector('.clock'),
        action11Button: document.getElementById('action11Button'),
        action12Button: document.getElementById('action12Button'),
        action13Button: document.getElementById('action13Button'),
        action14Button: document.getElementById('action14Button'),
        action15Button: document.getElementById('action15Button'),
        action17Button: document.getElementById('action17Button'),
        action18Button: document.getElementById('action18Button'),
        action19Button: document.getElementById('action19Button'),
        action20Button: document.getElementById('action20Button'),
        allBottomButtons: document.querySelectorAll('.action-button-bottom-row'),
        allMainButtons: document.querySelectorAll('.action-button-main'),
        debug1: document.getElementById('debug1'),
        debugsWindow: document.getElementById('debugsWindow'),
        autoPeelerUpgradeButton: document.getElementById('autoPeelerUpgradeButton'),
        autoChipperUpgradeButton: document.getElementById('autoChipperUpgradeButton'),
        autoFryerUpgradeButton: document.getElementById('autoFryerUpgradeButton'),
        autoStorageCollectorUpgradeButton: document.getElementById('autoStorageCollectorUpgradeButton'),
        autoCustomerServerUpgradeButton: document.getElementById('autoCustomerServerUpgradeButton'),

      };
}

export function getElements() {
    return elements;
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

export function getPriceToEnableDoubleChipping() {
    return priceToEnableDoubleChipping;
}

export function setPriceToEnableDoubleChipping(value) {
    priceToEnableDoubleChipping = value;
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
    return MULTIPLE_FOR_UPGRADE_DOUBLE_PEELER;
}

export function getUpgradeDoubleChopperMultiple() {
    return MULTIPLE_FOR_UPGRADE_DOUBLE_CHOPPER;
}

export function getZero() {
    return ZERO;
}

export function getOne() {
    return ONE;
}

export function getOddNumberLeftOverAfterDoublePeelingChipping() {
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

//AUTO BUTTONS
export function getPriceToImproveAutoPeeler() {
    return priceToImproveAutoPeeler;
}

export function setPriceToImproveAutoPeeler(value) {
    priceToImproveAutoPeeler = value;
}

export function getPriceToImproveAutoChipper() {
    return priceToImproveAutoChipper;
}

export function setPriceToImproveAutoChipper(value) {
    priceToImproveAutoChipper = value;
}

export function getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut() {
    return priceToImproveAutoFryer;
}

export function setPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut(value) {
    priceToImproveAutoFryer = value;
}

export function getPriceToImproveAutoMoverFromFryerToStorage() {
    return priceToImproveAutoStorageCollector;
}

export function setPriceToImproveAutoMoverFromFryerToStorage(value) {
    priceToImproveAutoStorageCollector = value;
}

export function getPriceToImproveAutoCustomerServer() {
    return priceToImproveAutoCustomerServer;
}

export function setPriceToImproveAutoCustomerServer(value) {
    priceToImproveAutoCustomerServer = value;
}

export function getCurrentSpeedAutoPeeler() {
    return currentSpeedAutoPeeler;
}

export function setCurrentSpeedAutoPeeler(value) {
    currentSpeedAutoPeeler = value;
}

export function getCurrentSpeedAutoChipper() {
    return currentSpeedAutoChipper;
}

export function setCurrentSpeedAutoChipper(value) {
    currentSpeedAutoChipper = value;
}

export function getCurrentSpeedAutoFryer() {
    return currentSpeedAutoFryer;
}

export function setCurrentSpeedAutoFryer(value) {
    currentSpeedAutoFryer = value;
}

export function getCurrentSpeedAutoStorageCollector() {
    return currentSpeedAutoStorageCollector;
}

export function setCurrentSpeedAutoStorageCollector(value) {
    currentSpeedAutoStorageCollector = value;
}

export function getCurrentSpeedAutoCustomerServer() {
    return currentSpeedAutoCustomerServer;
}

export function setCurrentSpeedAutoCustomerServer(value) {
    currentSpeedAutoCustomerServer = value;
}

export function getNextSpeedAutoPeeler() {
    return nextSpeedAutoPeeler;
}

export function setNextSpeedAutoPeeler(value) {
    nextSpeedAutoPeeler = value;
}

export function getNextSpeedAutoChipper() {
    return nextSpeedAutoChipper;
}

export function setNextSpeedAutoChipper(value) {
    nextSpeedAutoChipper = value;
}

export function getNextSpeedAutoFryer() {
    return nextSpeedAutoFryer;
}

export function setNextSpeedAutoFryer(value) {
    nextSpeedAutoFryer = value;
}

export function getNextSpeedAutoStorageCollector() {
    return nextSpeedAutoStorageCollector;
}

export function setNextSpeedAutoStorageCollector(value) {
    nextSpeedAutoStorageCollector = value;
}

export function getNextSpeedAutoCustomerServer() {
    return nextSpeedAutoCustomerServer;
}

export function setNextSpeedAutoCustomerServer(value) {
    nextSpeedAutoCustomerServer = value;
}

//DEBUG
export function setDebugFlag(value) {
    debugFlag = value;
}

export function getDebugFlag() {
    return debugFlag;
}

export function getImprovePotatoStorageNotClickedYet() {
    return getPriceToImprovePotatoStorage() === 5; //needs to be updated if prices change for debug to work properly
}

export function getMultipleForImproveAutoPeeler() {
    return MULTIPLE_FOR_IMPROVE_AUTO_PEELER;
}

export function getMultipleForImproveAutoChipper() {
    return MULTIPLE_FOR_IMPROVE_AUTO_CHIPPER;
}

export function getMultipleForImproveAutoFryer() {
    return MULTIPLE_FOR_IMPROVE_AUTO_FRYER;
}

export function getMultipleForImproveAutoStorageCollector() {
    return MULTIPLE_FOR_IMPROVE_AUTO_STORAGE_COLLECTOR;
}

export function getMultipleForImproveAutoCustomerServer() {
    return MULTIPLE_FOR_IMPROVE_AUTO_CUSTOMER_SERVER
}

export function getAutoPeelerBought() {
    return autoPeelerBought;
}

export function setAutoPeelerBought(value) {
    autoPeelerBought = value;
}

export function getAutoChipperBought() {
    return autoChipperBought;
}

export function setAutoChipperBought(value) {
    autoChipperBought = value;
}

export function getAutoFryerBought() {
    return autoFryerBought;
}

export function setAutoFryerBought(value) {
    autoFryerBought = value;
}

export function getAutoStorageCollectorBought() {
    return autoStorageCollectorBought;
}

export function setAutoStorageCollectorBought(value) {
    autoStorageCollectorBought = value;
}

export function getAutoCustomerServerBought() {
    return autoCustomerServerBought;
}

export function setAutoCustomerServerBought(value) {
    autoCustomerServerBought = value;
}

export function getAutoFryerUpgradeDecrement() {
    return AUTO_FRYER_DECREMENT;
}

export function getAutoStorageCollectorUpgradeDecrement() {
    return AUTO_STORAGE_COLLECTOR_DECREMENT;
}

export function getAutoCustomerServerUpgradeDecrement() {
    return AUTO_CUSTOMER_SERVER_DECREMENT;
}

export function getAutoUpgradesClockSpeed() {
    return AUTO_UPGRADES_CLOCK_SPEED;
}

export function getAutoFryerEfficiency() {
    return autoFryerEfficiency;
}

export function setAutoFryerEfficiency(value) {
    autoFryerEfficiency = value;
}

export function getAutoPeelerCounter() {
    return autoPeelerCounter;
}

export function setAutoPeelerCounter(value) {
    autoPeelerCounter = value;
}

export function getAutoChipperCounter() {
    return autoChipperCounter;
}

export function setAutoChipperCounter(value) {
    autoChipperCounter = value;
}

export function getAutoFryerCounter() {
    return autoFryerCounter;
}

export function setAutoFryerCounter(value) {
    autoFryerCounter = value;
}

export function getAutoStorageCollectorCounter() {
    return autoStorageCollectorCounter;
}

export function setAutoStorageCollectorCounter(value) {
    autoStorageCollectorCounter = value;
}

export function getAutoCustomerServerCounter() {
    return autoCustomerServerCounter;
}

export function setAutoCustomerServerCounter(value) {
    autoCustomerServerCounter = value;
}









