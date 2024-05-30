// noinspection JSCheckFunctionSignatures

import {
    createEndOfShiftOrGamePopup,
    createOverlay,
    formatToCashNotation,
    hideDoublePeelerChipperAndShowInvestmentComponents
} from './ui.js';
import {
    disableButtons
} from "./actions.js";

//DEBUG
export let debugFlag = false;
export let stateLoading = false;

//ELEMENTS
let elements;

//CONSTANTS
const AUTO_SAVE_INTERVAL = 5 * 60 * 1000; //change first integer for mins e.g. 5 for 5 mins
const END_GAME_FRY_TIMER = 15;
const END_GAME_CASH = 999998;
const END_GAME_POTATOES = 8;
const CLOCK_SPEED = 1000;
const AUTO_UPGRADES_CLOCK_SPEED = 50; //MAX ACCURATE CLOCK SPEED
export const TIMER_CORRECTION_COEFFICIENT = 2.63; //Multiplier to make timers align due performance
const SHIFT_LENGTH = 45; //120
const PORTION_SIZE = 40;
const PRICE_OF_CHIPS = 2;
const STARTING_SPUDS = 100;
const STARTING_CASH = 0;
const MIN_SPUDS_DELIVERY = 20;
const UPGRADE_MAX_SPUDS_DELIVERY_INCREMENT = 2;
const UPGRADE_POTATO_STORAGE_QUANTITY = 50;
const UPGRADE_FRYER_CAPACITY_AMOUNT = 100;
const NUMBER_OF_CHIPS_FROM_POTATO = 5;
const COOL_DOWN_TIMER = 20;
const STANDARD_DECREMENT_INCREMENT = 1;
const AUTO_FRYER_DECREMENT = 2.5;
const AUTO_STORAGE_COLLECTOR_DECREMENT = 2.5;
const AUTO_CUSTOMER_SERVER_DECREMENT = 2.5;
const UPGRADE_FRY_TIME_DECREMENT = 2.5;
const UPGRADE_HEATER_MULTIPLE = 2;
const INCREASE_FOOTFALL_DECREMENT = 2;
const ZERO = 0;
const ONE = 1;
const PRICE_TO_FLOAT = 200000;
const PRICE_TO_UNLOCK_AUTO_SHIFT_START = 2000;
const MAX_RISK_INVESTMENT_MECHANIC = 21;
const RISK_THRESHOLD = 2500;
const RISK_ADJUSTMENT_COEFFICIENT = 98;
const BASE_RISK_NUMBER = 200;
const INTEREST_RATE_BASE_VALUE = 1.2; //

//UPGRADE PRICE MULTIPLIER CONSTANTS
const MULTIPLE_FOR_UPGRADE_DOUBLE_PEELER = 2;
const MULTIPLE_FOR_UPGRADE_DOUBLE_CHOPPER = 2;
const MULTIPLE_FOR_IMPROVE_POTATO_STORAGE = 1.2;
const MULTIPLE_FOR_IMPROVE_FRYER_CAPACITY = 1.6;
const MULTIPLE_FOR_IMPROVE_AUTO_PEELER = 1.2;
const MULTIPLE_FOR_IMPROVE_AUTO_CHIPPER = 1.2;
const MULTIPLE_FOR_IMPROVE_AUTO_FRYER = 1.2;
const MULTIPLE_FOR_IMPROVE_AUTO_STORAGE_COLLECTOR = 1.2;
const MULTIPLE_FOR_IMPROVE_AUTO_CUSTOMER_SERVER = 1.2;
const MULTIPLE_FOR_IMPROVE_FRY_TIMER = 2;
const MULTIPLE_FOR_MAX_SPUDS_UPGRADE = 2;
const MULTIPLE_FOR_INCREASE_FOOTFALL_UPGRADE = 2;

//ROLE UPGRADE AMOUNTS
const ROLE_FIVE_UPGRADE = 1000;
const ROLE_SIX_UPGRADE = 10000;
const ROLE_SEVEN_UPGRADE = 100000;
const ROLE_GAME_WINNER = 1000000;

//UPGRADE CAPS
const CAP_AUTO_PEELER = 10;
const CAP_AUTO_CHIPPER = 10;
const CAP_AUTO_FRYER = 0;
const CAP_AUTO_STORAGE_COLLECTOR = 0;
const CAP_AUTO_CUSTOMER_SERVER = 0;
const CAP_POTATO_CAPACITY = 750;
const CAP_FRYER_CAPACITY = 1500;
const CAP_FRYER_SPEED = 2.5;
const CAP_MAX_DELIVERY = 1280;
const CAP_MAX_WAIT_CUSTOMER = 0;

export const endOfShiftOrGamePopupObject = createEndOfShiftOrGamePopup();
export const endOfShiftOrGamePopup = endOfShiftOrGamePopupObject.popupContainer;
export const popupContinueButton = endOfShiftOrGamePopupObject.continueButton;
export const popupOverlay = createOverlay();

//GLOBAL VARIABLES
let initialStateMainButtons;
let initialStateBottomRowButtons;
let currentMaxValueWaitForNewCustomer = 10;
let nextMaxValueWaitForNewCustomer = 8;
let multipleForHeaterEffectOnCoolDown = 1;
let customerTime = 0;
let shiftTimeRemaining = 0;
let fryTimer = 15;
let fryTimeRemaining = 0;
let coolDownTimeRemaining = 0;
let shiftCounter = 0;
let customersServed = 0;
let currentCash = 0;
let quantityFrying = 0;
let spudsToAddToShift = 0;
let maxSpudsDelivery = 80;
let actualPotatoesInStorage = 100;
let potatoStorage = 200;
let cutChipsRate = 1;
let peelPotatoesRate = 1;
let chipsReadyToServeQuantity = [];
let fryerCapacity = 100;
let autoFryerEfficiency = 1; //not a game option but can tweak between 0 and 1 for % of fryer capacity used by autoFryer
let amountInvestmentCash = 0;
let amountInvestmentRisk = 0;
let investmentCashIncrementDecrement = 1000;
let investmentRiskIncrementDecrement = 1;
let currentValueOfInvestment = 0;
let currentRiskLevel = 0;
let growthInvestment = 0;

//FLAGS
export let pauseAutoSaveCountdown = true;
export let gameInProgress = false;
export let shiftInProgress = false;
let chipsFrying = false;
let peelerUpgradeBought = false;
let chipperUpgradeBought = false;
let heaterUpgradeBought = false;
let autoPeelerBought = false;
let autoChipperBought = false;
let autoFryerBought = false;
let autoStorageCollectorBought = false;
let autoCustomerServerBought = false;
let improveFryTimerBought = false;
let doubleMaxSpudsDeliveryBought = false;
let investmentFundUnlocked = false;
let investmentFundUnlockable = false;
let autoShiftStartUpgradeUnlocked = false;
let autoShiftStatus = false;
let promotionFlag = false;
let floatOnStockMarketUnlocked = false;
let autoPeelerCapped = false;
let autoChipperCapped = false;
let autoFryerCapped = false;
let autoStorageCollectorCapped = false;
let autoCustomerServerCapped = false;
let potatoCapacityCapped = false;
let fryerCapacityCapped = false;
let fryerSpeedCapped = false;
let maxDeliveryCapped = false;
let maxWaitCustomerCapped = false;

//PRICES
let priceToImprovePotatoStorage = 20;
let priceToEnableDoubleChipping = 40;
let priceToEnableDoublePeeling = 40;
let priceToImproveFryerCapacity = 50;
let priceToAddStorageHeater = 60;
let priceToImproveAutoPeeler = 50;
let priceToImproveAutoChipper = 50;
let priceToImproveAutoFryer = 60;
let priceToImproveAutoStorageCollector = 60;
let priceToImproveAutoCustomerServer = 140;
let priceToImproveFryTimer = 100;
let priceToDoubleSpudsMax = 100;
let priceToIncreaseFootfall = 300;
let priceToUnlockInvestmentFundOrFloatOnStockMarket = 20000;

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
let currentSpeedFryTimer = "N/A";
let nextSpeedFryTimer = 12.5;
let currentMaxSpudsDelivery = maxSpudsDelivery;
let nextMaxSpudsDelivery = 160;

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

let totalEarnedInSales = 0;
let totalSpentExcludingInvestments = 0;
let totalPeeled = 0;
let totalCut = 0;
let totalWastedChips = 0;
let totalServedCustomers = 0;


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
        option5: document.getElementById('option4'),
        bottomRowContainer: document.getElementById('bottomRowContainer'),
        mainButtonContainer: document.getElementById('mainButtonContainer'),
        optionsWindow: document.getElementById('optionsWindow'),
        gameWindow: document.getElementById('gameWindow'),

        subInnerDiv1_1: document.getElementById('subInnerDiv1_1'),
        subInnerDiv1_2: document.getElementById('subInnerDiv1_2'),
        subInnerDiv3_1: document.getElementById('subInnerDiv3_1'),
        subInnerDiv3_2: document.getElementById('subInnerDiv3_2'),
        subInnerDivMid1_1: document.getElementById('subInnerDivMid1_1'),
        subInnerDivMid1_2: document.getElementById('subInnerDivMid1_2'),
        subInnerDivMid3_1: document.getElementById('subInnerDivMid3_1'),
        subInnerDivMid3_2: document.getElementById('subInnerDivMid3_2'),
        playerRoleText: document.getElementById('playerRoleText'),

        peeledCount: document.getElementById('peeledCount'),
        cutCount: document.getElementById('cutCount'),
        chuckedInFryerCount: document.getElementById('chuckedInFryerCount'),
        customersWaitingCount: document.getElementById('customersWaitingCount'),
        readyToServeCount: document.getElementById('readyToServeCount'),
        customersServedCount: document.getElementById('customersServedCount'),

        improvePotatoStorageButton: document.getElementById('improvePotatoStorageButton'),
        twoHandedPeelingButton: document.getElementById('twoHandedPeelingButton'),
        twoHandedChippingButton: document.getElementById('twoHandedChippingButton'),
        improveFryerCapacityButton: document.getElementById('improveFryerCapacityButton'),
        addStorageHeaterAutoShiftStartButton: document.getElementById('addStorageHeaterAutoShiftStartButton'),
        startShiftButton: document.getElementById('startShiftButton'),
        peelPotatoButton: document.getElementById('peelPotatoButton'),
        cutChipsButton: document.getElementById('cutChipsButton'),
        fryChipsButton: document.getElementById('fryChipsButton'),
        servingStorageButton: document.getElementById('servingStorageButton'),
        serveCustomerButton: document.getElementById('serveCustomerButton'),
        endOfShiftOrGamePopupTitle: document.getElementById('endOfShiftOrGamePopupTitle'),
        endOfShiftOrGamePopupContent: document.getElementById('endOfShiftOrGamePopupContent'),
        clock: document.getElementById('clock'),
        customerFrequencyIncreaser: document.getElementById('customerFrequencyIncreaser'),
        allBottomButtons: document.querySelectorAll('.action-button-bottom-row'),
        allMainButtons: document.querySelectorAll('.action-button-main'),
        debug1: document.getElementById('debug1'),
        resumeGameWindow: document.getElementById('resumeGameWindow'),
        resumeGameButton: document.getElementById('resumeGameButton'),
        autoPeelerUpgradeButton: document.getElementById('autoPeelerUpgradeButton'),
        autoChipperUpgradeButton: document.getElementById('autoChipperUpgradeButton'),
        autoFryerUpgradeButton: document.getElementById('autoFryerUpgradeButton'),
        autoStorageCollectorUpgradeButton: document.getElementById('autoStorageCollectorUpgradeButton'),
        autoCustomerServerUpgradeButton: document.getElementById('autoCustomerServerUpgradeButton'),
        fastFryerUpgradeButton: document.getElementById('fastFryerUpgradeButton'),
        potatoDeliveryDoublerButton: document.getElementById('potatoDeliveryDoublerButton'),
        investmentFundUnlockOrFloatButton: document.getElementById('investmentFundUnlockOrFloatButton'),
        investmentCashComponent: document.getElementById('investmentCashComponent'),
        investmentRiskComponent: document.getElementById('investmentRiskComponent'),
        investmentCashComponent_IncrementButton: document.getElementById('investmentCashComponent_IncrementButton'),
        investmentCashComponent_DecrementButton: document.getElementById('investmentCashComponent_DecrementButton'),
        investmentRiskComponent_IncrementButton: document.getElementById('investmentRiskComponent_IncrementButton'),
        investmentRiskComponent_DecrementButton: document.getElementById('investmentRiskComponent_DecrementButton'),
        investmentDataScreenButton: document.getElementById('investmentDataScreenButton'),
        investmentDataScreen: document.getElementById('investmentDataScreen'),
        investmentDataScreenTopRowColumn1: document.getElementById('investmentDataScreenTopRowColumn1'),
        investmentDataScreenTopRowColumn2: document.getElementById('investmentDataScreenTopRowColumn2'),
        investmentDataScreenTopRowColumn3: document.getElementById('investmentDataScreenTopRowColumn3'),
        investmentDataScreenTopRowColumn4: document.getElementById('investmentDataScreenTopRowColumn4'),
        investmentDataScreenBottomRowColumn1: document.getElementById('investmentDataScreenBottomRowColumn1'),
        investmentDataScreenBottomRowColumn2: document.getElementById('investmentDataScreenBottomRowColumn2'),
        investmentDataScreenBottomRowColumn3: document.getElementById('investmentDataScreenBottomRowColumn3'),
        investmentDataScreenBottomRowColumn4: document.getElementById('investmentDataScreenBottomRowColumn4'),
        withdrawInvestmentButton: document.getElementById('withdrawInvestmentButton'),
        menuButtonDiv: document.getElementById('menuButtonDiv'),
        menuButton: document.getElementById('menuButton'),
        titleScreen: document.getElementById('titleScreen'),
        bottomSectionContainer: document.getElementById('bottomSectionContainer'),
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

export function setGameInProgress(value) {
    gameInProgress = value;
}

export function getGameInProgress() {
    return gameInProgress;
}

export function setShiftInProgress(value) {
    shiftInProgress = value;
}

export function getShiftInProgress() {
    return shiftInProgress;
}

export function setCustomersServed(value) {
    customersServed = value;
    document.getElementById('customersServedCount').innerHTML = value;
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

export function setAreChipsFrying(value) {
    chipsFrying = value;
}

export function getAreChipsFrying() {
    return chipsFrying;
}

export function setQuantityOfChipsFrying(value) {
    quantityFrying = value;
}

export function getQuantityOfChipsFrying() {
    return quantityFrying;
}

export function setFryTimeRemaining(value) {
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

export function getPeelerUpgradeBought() {
    return peelerUpgradeBought;
}

export function setPeelerUpgradeBought(value) {
    peelerUpgradeBought = value;
}

export function getChipperUpgradeBought() {
    return chipperUpgradeBought;
}

export function setChipperUpgradeBought(value) {
    chipperUpgradeBought = value;
}

export function getHeaterUpgradeBought() {
    return heaterUpgradeBought;
}

export function setHeaterUpgradeBought(value) {
    heaterUpgradeBought = value;
}

export function getPriceToEnableDoubleChipping() {
    return priceToEnableDoubleChipping;
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
    if (value === 'clean') {
        chipsReadyToServeQuantity = index; //clean array passed in
    } else if (value === 'clear') {
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

export function getCurrentMaxValueWaitForNewCustomer() {
    return currentMaxValueWaitForNewCustomer;
}

export function setCurrentMaxValueWaitForNewCustomer(value) {
    currentMaxValueWaitForNewCustomer = value;
}

export function getNextMaxValueWaitForNewCustomer() {
    return nextMaxValueWaitForNewCustomer;
}

export function setNextMaxValueWaitForNewCustomer(value) {
    nextMaxValueWaitForNewCustomer = value;
}

export function getPriceToIncreaseFootfall() {
    return priceToIncreaseFootfall;
}

export function setPriceToIncreaseFootfall(value) {
    priceToIncreaseFootfall = value;
}

export function getFryTimer() {
    return fryTimer;
}

export function setFryTimer(value) {
    fryTimer = value;
}
export function getMaxSpudsDelivery() {
    return maxSpudsDelivery;
}

export function setMaxSpudsDelivery(value) {
    maxSpudsDelivery = value;
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

// export function setAutoFryerEfficiency(value) {
//     autoFryerEfficiency = value;
// }

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

export function getRoleUpgrade(currentRole) {
    switch (currentRole) {
        case Role.FOUR:
            return ROLE_FIVE_UPGRADE;
        case Role.FIVE:
            return ROLE_SIX_UPGRADE;
        case Role.SIX:
            return ROLE_SEVEN_UPGRADE;
        case Role.SEVEN:
            return ROLE_GAME_WINNER;
    }
}

export function getPriceToUnlockInvestmentFundOrFloatOnStockMarket() {
    return priceToUnlockInvestmentFundOrFloatOnStockMarket;
}

export function setPriceToUnlockInvestmentFundToNowFloatOnStockMarket(value) {
    priceToUnlockInvestmentFundOrFloatOnStockMarket = value;
}

export function getPriceToFloatOnStockMarket() {
    return PRICE_TO_FLOAT;
}

export function getPriceToImproveFryTimer() {
    return priceToImproveFryTimer;
}

export function setPriceToImproveFryTimer(value) {
    priceToImproveFryTimer = value;
}

export function getNextSpeedFryTimer() {
    return nextSpeedFryTimer;
}

export function setNextSpeedFryTimer(value) {
    nextSpeedFryTimer = value;
}

export function getCurrentSpeedFryTimer() {
    return currentSpeedFryTimer;
}

export function setCurrentSpeedFryTimer(value) {
    currentSpeedFryTimer = value;
}

export function getMultipleForImproveFryTimer() {
    return MULTIPLE_FOR_IMPROVE_FRY_TIMER;
}

export function getPriceToDoubleSpudsMax() {
    return priceToDoubleSpudsMax;
}

export function setPriceToDoubleSpudsMax(value) {
    priceToDoubleSpudsMax = value;
}

export function getNextMaxSpudsDelivery() {
    return nextMaxSpudsDelivery;
}

export function setNextMaxSpudsDelivery(value) {
    nextMaxSpudsDelivery = value;
}

export function getCurrentMaxSpudsDelivery() {
    return currentMaxSpudsDelivery;
}

export function setCurrentMaxSpudsDelivery(value) {
    currentMaxSpudsDelivery = value;
}

export function getMultipleForMaxSpudsUpgrade() {
    return MULTIPLE_FOR_MAX_SPUDS_UPGRADE;
}

export function getMultipleForIncreaseFootfallUpgrade() {
    return MULTIPLE_FOR_INCREASE_FOOTFALL_UPGRADE;
}

export function getImproveFryTimerBought() {
    return improveFryTimerBought;
}

export function setImproveFryTimerBought(value) {
    improveFryTimerBought = value;
}

export function getDoubleMaxSpudsDeliveryBought() {
    return doubleMaxSpudsDeliveryBought;
}

export function setDoubleMaxSpudsDeliveryBought(value) {
    doubleMaxSpudsDeliveryBought = value;
}

export function getUpgradeFryTimeDecrement() {
    return UPGRADE_FRY_TIME_DECREMENT;
}

export function getUpgradeMaxSpudsIncrement() {
    return UPGRADE_MAX_SPUDS_DELIVERY_INCREMENT;
}

export function getInvestmentFundUnlocked() {
    return investmentFundUnlocked;
}

export function setInvestmentFundUnlocked(value) {
    investmentFundUnlocked = value;
}

export function setAutoShiftStartUpgradeUnlocked(value) {
    autoShiftStartUpgradeUnlocked = value;
}

export function getPriceToUnlockAutoShiftStart() {
    return PRICE_TO_UNLOCK_AUTO_SHIFT_START;
}

export function getAutoShiftStatus() {
    return autoShiftStatus;
}

export function setAutoShiftStatus(value) {
    autoShiftStatus = value;
}

export function getIncreaseFootfallDecrement() {
    return INCREASE_FOOTFALL_DECREMENT;
}

export function getAmountInvestmentCash() {
    return amountInvestmentCash;
}

export function setAmountInvestmentCash(value) {
    amountInvestmentCash = value;
}

export function getAmountInvestmentRisk() {
    return amountInvestmentRisk;
}

export function setAmountInvestmentRisk(value) {
    amountInvestmentRisk = value;
}

export function getInvestmentCashIncrementDecrement() {
    return investmentCashIncrementDecrement;
}

export function getInvestmentRiskIncrementDecrement() {
    return investmentRiskIncrementDecrement;
}

export function getMaxRiskAmount() {
    return MAX_RISK_INVESTMENT_MECHANIC;
}

export function getCurrentValueOfInvestment() {
    return currentValueOfInvestment;
}

export function setCurrentValueOfInvestment(value) {
    currentValueOfInvestment = value;
}

export function getRiskThreshold() {
    return RISK_THRESHOLD;
}

export function getCurrentRiskLevel() {
    return currentRiskLevel;
}

export function setCurrentRiskLevel(value) {
    currentRiskLevel = value;
}

export function getRiskAdjustmentCoefficient() {
    return RISK_ADJUSTMENT_COEFFICIENT;
}

export function getBaseRiskNumber() {
    return BASE_RISK_NUMBER;
}

export function getInvestmentFundUnlockable() {
    return investmentFundUnlockable;
}

export function setInvestmentFundUnlockable(value) {
    investmentFundUnlockable = value;
}

export function getInterestRateBaseValue() {
    return INTEREST_RATE_BASE_VALUE;
}

export function getPromotionFlag() {
    return promotionFlag;
}

export function setPromotionFlag(value) {
    promotionFlag = value;
}

export function getGrowthInvestment() {
    return growthInvestment;
}

export function setGrowthInvestment(value) {
    growthInvestment = value;
}

export function getFloatOnStockMarketUnlockedAndEndGameFlowStarted() {
    return floatOnStockMarketUnlocked;
}

export function setFloatOnStockMarketUnlockedAndEndGameFlowStarted(value) {
    floatOnStockMarketUnlocked = value;
}

export function getEndGameCash() {
    return END_GAME_CASH;
}

export function getEndGamePotatoes() {
    return END_GAME_POTATOES;
}

export function getEndGameFryTimer() {
    return END_GAME_FRY_TIMER;
}

export function getCapAutoPeeler() {
    return CAP_AUTO_PEELER;
}

export function getCapAutoChipper() {
    return CAP_AUTO_CHIPPER;
}

export function getCapAutoFryer() {
    return CAP_AUTO_FRYER;
}

export function getCapAutoStorageCollector() {
    return CAP_AUTO_STORAGE_COLLECTOR;
}

export function getCapAutoCustomerServer() {
    return CAP_AUTO_CUSTOMER_SERVER;
}

export function getCapPotatoCapacity() {
    return CAP_POTATO_CAPACITY;
}

export function getCapFryerCapacity() {
    return CAP_FRYER_CAPACITY;
}

export function getCapFryerSpeed() {
    return CAP_FRYER_SPEED;
}

export function getCapMaxDelivery() {
    return CAP_MAX_DELIVERY;
}

export function getCapMaxWaitCustomer() {
    return CAP_MAX_WAIT_CUSTOMER;
}

export function setAutoPeelerCapped(value) {
    autoPeelerCapped = value;
}
export function setAutoChipperCapped(value) {
    autoChipperCapped = value;
}
export function setAutoFryerCapped(value) {
    autoFryerCapped = value;
}
export function setAutoStorageCollectorCapped(value) {
    autoStorageCollectorCapped = value;
}
export function setAutoCustomerServerCapped(value) {
    autoCustomerServerCapped = value;
}
export function setPotatoCapacityCapped(value) {
    potatoCapacityCapped = value;
}
export function setFryerCapacityCapped(value) {
    fryerCapacityCapped = value;
}
export function setFryerSpeedCapped(value) {
    fryerSpeedCapped = value;
}
export function setMaxDeliveryCapped(value) {
    maxDeliveryCapped = value;
}
export function setMaxWaitCustomerCapped(value) {
    maxWaitCustomerCapped = value;
}

export function getAutoPeelerCapped() {
    return autoPeelerCapped;
}

export function getAutoChipperCapped() {
    return autoChipperCapped;
}

export function getAutoFryerCapped() {
    return autoFryerCapped;
}

export function getAutoStorageCollectorCapped() {
    return autoStorageCollectorCapped;
}

export function getAutoCustomerServerCapped() {
    return autoCustomerServerCapped;
}

export function getPotatoCapacityCapped() {
    return potatoCapacityCapped;
}

export function getFryerCapacityCapped() {
    return fryerCapacityCapped;
}

export function getFryerSpeedCapped() {
    return fryerSpeedCapped;
}

export function getMaxDeliveryCapped() {
    return maxDeliveryCapped;
}

export function getMaxWaitCustomerCapped() {
    return maxWaitCustomerCapped;
}

export function resetAllVariables() {
    // GLOBAL VARIABLES
    currentMaxValueWaitForNewCustomer = 10;
    nextMaxValueWaitForNewCustomer = 8;
    multipleForHeaterEffectOnCoolDown = 1;
    customerTime = 0;
    shiftTimeRemaining = 0;
    fryTimer = 15;
    fryTimeRemaining = 0;
    coolDownTimeRemaining = 0;
    shiftCounter = 0;
    customersServed = 0;
    currentCash = 0;
    quantityFrying = 0;
    spudsToAddToShift = 0;
    maxSpudsDelivery = 80;
    actualPotatoesInStorage = 100;
    potatoStorage = 200;
    cutChipsRate = 1;
    peelPotatoesRate = 1;
    chipsReadyToServeQuantity = [];
    fryerCapacity = 100;
    autoFryerEfficiency = 0.5;
    amountInvestmentCash = 0;
    amountInvestmentRisk = 0;
    investmentCashIncrementDecrement = 1000;
    investmentRiskIncrementDecrement = 1;
    currentValueOfInvestment = 0;
    currentRiskLevel = 0;
    growthInvestment = 0;

    // FLAGS
    gameInProgress = false;
    shiftInProgress = false;
    chipsFrying = false;
    peelerUpgradeBought = false;
    chipperUpgradeBought = false;
    heaterUpgradeBought = false;
    autoPeelerBought = false;
    autoChipperBought = false;
    autoFryerBought = false;
    autoStorageCollectorBought = false;
    autoCustomerServerBought = false;
    improveFryTimerBought = false;
    doubleMaxSpudsDeliveryBought = false;
    investmentFundUnlocked = false;
    investmentFundUnlockable = false;
    autoShiftStartUpgradeUnlocked = false;
    autoShiftStatus = false;
    promotionFlag = false;
    floatOnStockMarketUnlocked = false;
    autoPeelerCapped = false;
    autoChipperCapped = false;
    autoFryerCapped = false;
    autoStorageCollectorCapped = false;
    autoCustomerServerCapped = false;
    potatoCapacityCapped = false;
    fryerCapacityCapped = false;
    fryerSpeedCapped = false;
    maxDeliveryCapped = false;
    maxWaitCustomerCapped = false;

    // PRICES
    priceToImprovePotatoStorage = 5;
    priceToEnableDoubleChipping = 6;
    priceToEnableDoublePeeling = 4;
    priceToImproveFryerCapacity = 7;
    priceToAddStorageHeater = 8;
    priceToImproveAutoPeeler = 100;
    priceToImproveAutoChipper = 100;
    priceToImproveAutoFryer = 150;
    priceToImproveAutoStorageCollector = 200;
    priceToImproveAutoCustomerServer = 300;
    priceToImproveFryTimer = 500;
    priceToDoubleSpudsMax = 500;
    priceToIncreaseFootfall = 200;
    priceToUnlockInvestmentFundOrFloatOnStockMarket = 20000;

    // AUTO SPEEDS
    currentSpeedAutoPeeler = "N/A";
    nextSpeedAutoPeeler = 1;
    currentSpeedAutoChipper = "N/A";
    nextSpeedAutoChipper = 1;
    currentSpeedAutoFryer = "N/A";
    nextSpeedAutoFryer = 30;
    currentSpeedAutoStorageCollector = "N/A";
    nextSpeedAutoStorageCollector = 30;
    currentSpeedAutoCustomerServer = "N/A";
    nextSpeedAutoCustomerServer = 30;
    currentSpeedFryTimer = "N/A";
    nextSpeedFryTimer = 12.5;
    currentMaxSpudsDelivery = maxSpudsDelivery;
    nextMaxSpudsDelivery = 160;

    autoPeelerCounter = 0;
    autoChipperCounter = 0;
    autoFryerCounter = 30;
    autoStorageCollectorCounter = 30;
    autoCustomerServerCounter = 30;

    // STATS
    oldCash = 0;
    potatoesPeeledThisShift = 0;
    chipsCutThisShift = 0;
    chipsFriedThisShift = 0;
    customersWaitingAtEndOfShift = 0;
    customersWaiting = 0;
    chipsWastedThisShift = 0;

    batchTimers = {};
}

export function resetUiButtonElements(buttonDetails) {
    buttonDetails.forEach(button => {
        let element = document.getElementById(button.id);
        if (element) {
            element.innerHTML = button.name;
        }
    });
}

export function resetCounterUiElements() {
    getElements().peeledCount.innerHTML = '0';
    getElements().cutCount.innerHTML = '0';
    getElements().chuckedInFryerCount.innerHTML = '0';
    getElements().readyToServeCount.innerHTML = '0';
    getElements().customersWaitingCount.innerHTML = '0';
    getElements().customersServedCount.innerHTML = '0';
    getElements().playerRoleText.innerHTML = Role.ONE;

    getElements().subInnerDiv1_2.innerHTML = "Start Shift";

    getElements().subInnerDivMid1_2.innerHTML = ('0/' + getPotatoStorageQuantity().toString());
    getElements().subInnerDivMid3_2.innerHTML = formatToCashNotation(getStartingCash());

    getElements().investmentDataScreenBottomRowColumn1.innerHTML = formatToCashNotation(getAmountInvestmentCash());
    getElements().investmentDataScreenBottomRowColumn2.innerHTML = getAmountInvestmentRisk() + "%";
    getElements().investmentDataScreenBottomRowColumn3.innerHTML = formatToCashNotation(getCurrentValueOfInvestment());
}

export function getInitialStateMainButtons() {
    return initialStateMainButtons;
}

export function setInitialStateMainButtons(value) {
    initialStateMainButtons = value;
}

export function getInitialStateBottomRowButtons() {
    return initialStateBottomRowButtons;
}

export function setInitialStateBottomRowButtons(value) {
    initialStateBottomRowButtons = value;
}

export function getStateLoading() {
    return stateLoading;
}

export function setStateLoading(value) {
    stateLoading = value;
}

export function getAutoSaveInterval() {
    return AUTO_SAVE_INTERVAL;
}

export function getPauseAutoSaveCountdown() {
    return pauseAutoSaveCountdown;
}

export function setPauseAutoSaveCountdown(value) {
    pauseAutoSaveCountdown = value;
}


export function getTotalEarnedInSales() {
    return totalEarnedInSales;
}

export function setTotalEarnedInSales(value) {
    totalEarnedInSales = value;
}

export function getTotalSpentExcludingInvestments() {
    return totalSpentExcludingInvestments;
}

export function setTotalSpentExcludingInvestments(value) {
    totalSpentExcludingInvestments = value;
}

export function getTotalPeeled() {
    return totalPeeled;
}

export function setTotalPeeled(value) {
    totalPeeled = value;
}

export function getTotalCut() {
    return totalCut;
}

export function setTotalCut(value) {
    totalCut = value;
}

export function getTotalWastedChips() {
    return totalWastedChips;
}

export function setTotalWastedChips(value) {
    totalWastedChips = value;
}

export function getTotalServedCustomers() {
    return totalServedCustomers;
}

export function setTotalServedCustomers(value) {
    totalServedCustomers = value;
}

export function captureGameStatusForSaving() {
    let gameState = {};

    // Game variables
    gameState.autoPeelerEnabledState = getElements().autoPeelerUpgradeButton.classList.contains('autoUpgradeEnabled');
    gameState.autoChipperEnabledState = getElements().autoChipperUpgradeButton.classList.contains('autoUpgradeEnabled');
    gameState.autoFryerEnabledState = getElements().autoFryerUpgradeButton.classList.contains('autoUpgradeEnabled');
    gameState.autoStorageCollectorEnabledState = getElements().autoStorageCollectorUpgradeButton.classList.contains('autoUpgradeEnabled');
    gameState.autoCustomerServerEnabledState = getElements().autoCustomerServerUpgradeButton.classList.contains('autoUpgradeEnabled');

    gameState.currentMaxValueWaitForNewCustomer = currentMaxValueWaitForNewCustomer;
    gameState.nextMaxValueWaitForNewCustomer = nextMaxValueWaitForNewCustomer;
    gameState.multipleForHeaterEffectOnCoolDown = multipleForHeaterEffectOnCoolDown;
    gameState.customerTime = customerTime;
    gameState.shiftTimeRemaining = shiftTimeRemaining;
    gameState.fryTimer = fryTimer;
    gameState.fryTimeRemaining = fryTimeRemaining;
    gameState.coolDownTimeRemaining = coolDownTimeRemaining;
    gameState.shiftCounter = shiftCounter;
    gameState.customersServed = customersServed;
    gameState.currentCash = currentCash;
    gameState.quantityFrying = quantityFrying;
    gameState.spudsToAddToShift = spudsToAddToShift;
    gameState.maxSpudsDelivery = maxSpudsDelivery;
    gameState.actualPotatoesInStorage = actualPotatoesInStorage;
    gameState.potatoStorage = potatoStorage;
    gameState.cutChipsRate = cutChipsRate;
    gameState.peelPotatoesRate = peelPotatoesRate;
    gameState.chipsReadyToServeQuantity = chipsReadyToServeQuantity.slice();
    gameState.fryerCapacity = fryerCapacity;
    gameState.autoFryerEfficiency = autoFryerEfficiency;
    gameState.amountInvestmentCash = amountInvestmentCash;
    gameState.amountInvestmentRisk = amountInvestmentRisk;
    gameState.investmentCashIncrementDecrement = investmentCashIncrementDecrement;
    gameState.investmentRiskIncrementDecrement = investmentRiskIncrementDecrement;
    gameState.currentValueOfInvestment = currentValueOfInvestment;
    gameState.currentRiskLevel = currentRiskLevel;
    gameState.growthInvestment = growthInvestment;

    // Flags
    gameState.gameInProgress = gameInProgress;
    gameState.shiftInProgress = shiftInProgress;
    gameState.chipsFrying = chipsFrying;
    gameState.peelerUpgradeBought = peelerUpgradeBought;
    gameState.chipperUpgradeBought = chipperUpgradeBought;
    gameState.heaterUpgradeBought = heaterUpgradeBought;
    gameState.autoPeelerBought = autoPeelerBought;
    gameState.autoChipperBought = autoChipperBought;
    gameState.autoFryerBought = autoFryerBought;
    gameState.autoStorageCollectorBought = autoStorageCollectorBought;
    gameState.autoCustomerServerBought = autoCustomerServerBought;
    gameState.improveFryTimerBought = improveFryTimerBought;
    gameState.doubleMaxSpudsDeliveryBought = doubleMaxSpudsDeliveryBought;
    gameState.investmentFundUnlocked = investmentFundUnlocked;
    gameState.investmentFundUnlockable = investmentFundUnlockable;
    gameState.autoShiftStartUpgradeUnlocked = autoShiftStartUpgradeUnlocked;
    gameState.autoShiftStatus = autoShiftStatus;
    gameState.promotionFlag = promotionFlag;
    gameState.floatOnStockMarketUnlocked = floatOnStockMarketUnlocked;
    gameState.autoPeelerCapped = autoPeelerCapped;
    gameState.autoChipperCapped = autoChipperCapped;
    gameState.autoFryerCapped = autoFryerCapped;
    gameState.autoStorageCollectorCapped = autoStorageCollectorCapped;
    gameState.autoCustomerServerCapped = autoCustomerServerCapped;
    gameState.potatoCapacityCapped = potatoCapacityCapped;
    gameState.fryerCapacityCapped = fryerCapacityCapped;
    gameState.fryerSpeedCapped = fryerSpeedCapped;
    gameState.maxDeliveryCapped = maxDeliveryCapped;
    gameState.maxWaitCustomerCapped = maxWaitCustomerCapped;

    // Prices
    gameState.priceToImprovePotatoStorage = priceToImprovePotatoStorage;
    gameState.priceToEnableDoubleChipping = priceToEnableDoubleChipping;
    gameState.priceToEnableDoublePeeling = priceToEnableDoublePeeling;
    gameState.priceToImproveFryerCapacity = priceToImproveFryerCapacity;
    gameState.priceToAddStorageHeater = priceToAddStorageHeater;
    gameState.priceToImproveAutoPeeler = priceToImproveAutoPeeler;
    gameState.priceToImproveAutoChipper = priceToImproveAutoChipper;
    gameState.priceToImproveAutoFryer = priceToImproveAutoFryer;
    gameState.priceToImproveAutoStorageCollector = priceToImproveAutoStorageCollector;
    gameState.priceToImproveAutoCustomerServer = priceToImproveAutoCustomerServer;
    gameState.priceToImproveFryTimer = priceToImproveFryTimer;
    gameState.priceToDoubleSpudsMax = priceToDoubleSpudsMax;
    gameState.priceToIncreaseFootfall = priceToIncreaseFootfall;
    gameState.priceToUnlockInvestmentFundOrFloatOnStockMarket = priceToUnlockInvestmentFundOrFloatOnStockMarket;

    // Auto speeds
    gameState.currentSpeedAutoPeeler = currentSpeedAutoPeeler;
    gameState.nextSpeedAutoPeeler = nextSpeedAutoPeeler;
    gameState.currentSpeedAutoChipper = currentSpeedAutoChipper;
    gameState.nextSpeedAutoChipper = nextSpeedAutoChipper;
    gameState.currentSpeedAutoFryer = currentSpeedAutoFryer;
    gameState.nextSpeedAutoFryer = nextSpeedAutoFryer;
    gameState.currentSpeedAutoStorageCollector = currentSpeedAutoStorageCollector;
    gameState.nextSpeedAutoStorageCollector = nextSpeedAutoStorageCollector;
    gameState.currentSpeedAutoCustomerServer = currentSpeedAutoCustomerServer;
    gameState.nextSpeedAutoCustomerServer = nextSpeedAutoCustomerServer;
    gameState.currentSpeedFryTimer = currentSpeedFryTimer;
    gameState.nextSpeedFryTimer = nextSpeedFryTimer;
    gameState.currentMaxSpudsDelivery = currentMaxSpudsDelivery;
    gameState.nextMaxSpudsDelivery = nextMaxSpudsDelivery;

    gameState.autoPeelerCounter = autoPeelerCounter;
    gameState.autoPeelerCounter = autoChipperCounter;
    gameState.autoFryerCounter = autoFryerCounter;
    gameState.autoStorageCollectorCounter = autoStorageCollectorCounter;
    gameState.autoCustomerServerCounter = autoCustomerServerCounter;

    //STATS
    gameState.oldCash = oldCash;
    gameState.potatoesPeeledThisShift = potatoesPeeledThisShift;
    gameState.chipsCutThisShift = chipsCutThisShift;
    gameState.chipsFriedThisShift = chipsFriedThisShift;
    gameState.customersWaitingAtEndOfShift = customersWaitingAtEndOfShift;
    gameState.customersWaiting = customersWaiting;
    gameState.chipsWastedThisShift = chipsWastedThisShift;

    gameState.totalEarned = getTotalEarnedInSales();
    gameState.totalSpent = getTotalSpentExcludingInvestments();
    gameState.totalPeeled = getTotalPeeled();
    gameState.totalCut = getTotalCut();
    gameState.totalWastedChips = getTotalWastedChips();
    gameState.totalServedCustomers = getTotalServedCustomers();

    // UI elements
    gameState.uiElements = {
        peeledCount: getElements().peeledCount.innerHTML,
        cutCount: getElements().cutCount.innerHTML,
        chuckedInFryerCount: getElements().chuckedInFryerCount.innerHTML,
        readyToServeCount: getElements().readyToServeCount.innerHTML,
        customersWaitingCount: getElements().customersWaitingCount.innerHTML,
        customersServedCount: getElements().customersServedCount.innerHTML,
        playerRoleText: getElements().playerRoleText.innerHTML,
        subInnerDiv1_2: getElements().subInnerDiv1_2.innerHTML,
        subInnerDivMid1_2: getElements().subInnerDivMid1_2.innerHTML,
        subInnerDivMid3_2: getElements().subInnerDivMid3_2.innerHTML,
        investmentDataScreenBottomRowColumn1: getElements().investmentDataScreenBottomRowColumn1.innerHTML,
        investmentDataScreenBottomRowColumn2: getElements().investmentDataScreenBottomRowColumn2.innerHTML,
        investmentDataScreenBottomRowColumn3: getElements().investmentDataScreenBottomRowColumn3.innerHTML
    };

    gameState.batchTimers = batchTimers;

    captureButtonStates(gameState);

    console.log(gameState);

    return gameState;
}

export function restoreGameStatus(gameState) {
    // Game variables
    currentMaxValueWaitForNewCustomer = gameState.currentMaxValueWaitForNewCustomer;
    nextMaxValueWaitForNewCustomer = gameState.nextMaxValueWaitForNewCustomer;
    multipleForHeaterEffectOnCoolDown = gameState.multipleForHeaterEffectOnCoolDown;
    customerTime = gameState.customerTime;
    shiftTimeRemaining = gameState.shiftTimeRemaining;
    fryTimer = gameState.fryTimer;
    fryTimeRemaining = gameState.fryTimeRemaining;
    coolDownTimeRemaining = gameState.coolDownTimeRemaining;
    shiftCounter = gameState.shiftCounter;
    customersServed = gameState.customersServed;
    currentCash = gameState.currentCash;
    quantityFrying = gameState.quantityFrying;
    spudsToAddToShift = gameState.spudsToAddToShift;
    maxSpudsDelivery = gameState.maxSpudsDelivery;
    actualPotatoesInStorage = gameState.actualPotatoesInStorage;
    potatoStorage = gameState.potatoStorage;
    cutChipsRate = gameState.cutChipsRate;
    peelPotatoesRate = gameState.peelPotatoesRate;
    chipsReadyToServeQuantity = gameState.chipsReadyToServeQuantity.slice();
    fryerCapacity = gameState.fryerCapacity;
    autoFryerEfficiency = gameState.autoFryerEfficiency;
    amountInvestmentCash = gameState.amountInvestmentCash;
    amountInvestmentRisk = gameState.amountInvestmentRisk;
    investmentCashIncrementDecrement = gameState.investmentCashIncrementDecrement;
    investmentRiskIncrementDecrement = gameState.investmentRiskIncrementDecrement;
    currentValueOfInvestment = gameState.currentValueOfInvestment;
    currentRiskLevel = gameState.currentRiskLevel;
    growthInvestment = gameState.growthInvestment;
    //matches capture

    // Flags
    gameInProgress = true;
    shiftInProgress = gameState.shiftInProgress;
    chipsFrying = gameState.chipsFrying;
    peelerUpgradeBought = gameState.peelerUpgradeBought;
    chipperUpgradeBought = gameState.chipperUpgradeBought;
    heaterUpgradeBought = gameState.heaterUpgradeBought;
    autoPeelerBought = gameState.autoPeelerBought;
    autoChipperBought = gameState.autoChipperBought;
    autoFryerBought = gameState.autoFryerBought;
    autoStorageCollectorBought = gameState.autoStorageCollectorBought;
    autoCustomerServerBought = gameState.autoCustomerServerBought;
    improveFryTimerBought = gameState.improveFryTimerBought;
    doubleMaxSpudsDeliveryBought = gameState.doubleMaxSpudsDeliveryBought;
    investmentFundUnlocked = gameState.investmentFundUnlocked;
    investmentFundUnlockable = gameState.investmentFundUnlockable;
    autoShiftStartUpgradeUnlocked = gameState.autoShiftStartUpgradeUnlocked;
    autoShiftStatus = gameState.autoShiftStatus;
    promotionFlag = gameState.promotionFlag;
    floatOnStockMarketUnlocked = gameState.floatOnStockMarketUnlocked;
    autoPeelerCapped = gameState.autoPeelerCapped;
    autoChipperCapped = gameState.autoChipperCapped;
    autoFryerCapped = gameState.autoFryerCapped;
    autoStorageCollectorCapped = gameState.autoStorageCollectorCapped;
    autoCustomerServerCapped = gameState.autoCustomerServerCapped;
    potatoCapacityCapped = gameState.potatoCapacityCapped;
    fryerCapacityCapped = gameState.fryerCapacityCapped;
    fryerSpeedCapped = gameState.fryerSpeedCapped;
    maxDeliveryCapped = gameState.maxDeliveryCapped;
    maxWaitCustomerCapped = gameState.maxWaitCustomerCapped;
    //matches capture

    // Prices
    priceToImprovePotatoStorage = gameState.priceToImprovePotatoStorage;
    priceToEnableDoubleChipping = gameState.priceToEnableDoubleChipping;
    priceToEnableDoublePeeling = gameState.priceToEnableDoublePeeling;
    priceToImproveFryerCapacity = gameState.priceToImproveFryerCapacity;
    priceToAddStorageHeater = gameState.priceToAddStorageHeater;
    priceToImproveAutoPeeler = gameState.priceToImproveAutoPeeler;
    priceToImproveAutoChipper = gameState.priceToImproveAutoChipper;
    priceToImproveAutoFryer = gameState.priceToImproveAutoFryer;
    priceToImproveAutoStorageCollector = gameState.priceToImproveAutoStorageCollector;
    priceToImproveAutoCustomerServer = gameState.priceToImproveAutoCustomerServer;
    priceToImproveFryTimer = gameState.priceToImproveFryTimer;
    priceToDoubleSpudsMax = gameState.priceToDoubleSpudsMax;
    priceToIncreaseFootfall = gameState.priceToIncreaseFootfall;
    priceToUnlockInvestmentFundOrFloatOnStockMarket = gameState.priceToUnlockInvestmentFundOrFloatOnStockMarket;
    //matches capture

    // Auto speeds
    currentSpeedAutoPeeler = gameState.currentSpeedAutoPeeler;
    nextSpeedAutoPeeler = gameState.nextSpeedAutoPeeler;
    currentSpeedAutoChipper = gameState.currentSpeedAutoChipper;
    nextSpeedAutoChipper = gameState.nextSpeedAutoChipper;
    currentSpeedAutoFryer = gameState.currentSpeedAutoFryer;
    nextSpeedAutoFryer = gameState.nextSpeedAutoFryer;
    currentSpeedAutoStorageCollector = gameState.currentSpeedAutoStorageCollector;
    nextSpeedAutoStorageCollector = gameState.nextSpeedAutoStorageCollector;
    currentSpeedAutoCustomerServer = gameState.currentSpeedAutoCustomerServer;
    nextSpeedAutoCustomerServer = gameState.nextSpeedAutoCustomerServer;
    currentSpeedFryTimer = gameState.currentSpeedFryTimer;
    nextSpeedFryTimer = gameState.nextSpeedFryTimer;
    currentMaxSpudsDelivery = gameState.currentMaxSpudsDelivery;
    nextMaxSpudsDelivery = gameState.nextMaxSpudsDelivery;

    autoPeelerCounter = gameState.autoPeelerCounter;
    autoChipperCounter = gameState.autoPeelerCounter;
    autoFryerCounter = gameState.autoFryerCounter;
    autoStorageCollectorCounter = gameState.autoStorageCollectorCounter;
    autoCustomerServerCounter = gameState.autoCustomerServerCounter;

    //STATS
    oldCash = gameState.oldCash;
    potatoesPeeledThisShift = gameState.potatoesPeeledThisShift;
    chipsCutThisShift = gameState.chipsCutThisShift;
    chipsFriedThisShift = gameState.chipsFriedThisShift;
    customersWaitingAtEndOfShift = gameState.customersWaitingAtEndOfShift;
    customersWaiting = gameState.customersWaiting;
    chipsWastedThisShift = gameState.chipsWastedThisShift;

    setTotalEarnedInSales(gameState.totalEarned);
    setTotalSpentExcludingInvestments(gameState.totalSpent);
    setTotalPeeled(gameState.totalPeeled);
    setTotalCut(gameState.totalCut);
    setTotalWastedChips(gameState.totalWastedChips);
    setTotalServedCustomers(gameState.totalServedCustomers);

    // UI elements
    getElements().peeledCount.innerHTML = gameState.uiElements.peeledCount;
    getElements().cutCount.innerHTML = gameState.uiElements.cutCount;
    getElements().chuckedInFryerCount.innerHTML = gameState.uiElements.chuckedInFryerCount;
    getElements().readyToServeCount.innerHTML = gameState.uiElements.readyToServeCount;
    getElements().customersWaitingCount.innerHTML = gameState.uiElements.customersWaitingCount;
    getElements().customersServedCount.innerHTML = gameState.uiElements.customersServedCount;
    getElements().playerRoleText.innerHTML = gameState.uiElements.playerRoleText;
    getElements().subInnerDiv1_2.innerHTML = gameState.uiElements.subInnerDiv1_2;
    getElements().subInnerDivMid1_2.innerHTML = gameState.uiElements.subInnerDivMid1_2;
    getElements().subInnerDivMid3_2.innerHTML = gameState.uiElements.subInnerDivMid3_2;
    getElements().investmentDataScreenBottomRowColumn1.innerHTML = gameState.uiElements.investmentDataScreenBottomRowColumn1;
    getElements().investmentDataScreenBottomRowColumn2.innerHTML = gameState.uiElements.investmentDataScreenBottomRowColumn2;
    getElements().investmentDataScreenBottomRowColumn3.innerHTML = gameState.uiElements.investmentDataScreenBottomRowColumn3;

    batchTimers = gameState.batchTimers;

    restoreButtonStates(gameState);
    addAutoUpgradeEnabledStates(gameState);
}

function addAutoUpgradeEnabledStates(gameState) {
    getElements().autoPeelerUpgradeButton.querySelector('input').checked = gameState.autoPeelerEnabledState;
    if (gameState.autoPeelerEnabledState) {
        getElements().autoPeelerUpgradeButton.classList.add('autoUpgradeEnabled');
    } else {
        getElements().autoPeelerUpgradeButton.classList.remove('autoUpgradeEnabled');
    }

    getElements().autoChipperUpgradeButton.querySelector('input').checked = gameState.autoChipperEnabledState;
    if (gameState.autoChipperEnabledState) {
        getElements().autoChipperUpgradeButton.classList.add('autoUpgradeEnabled');
    } else {
        getElements().autoChipperUpgradeButton.classList.remove('autoUpgradeEnabled');
    }

    getElements().autoFryerUpgradeButton.querySelector('input').checked = gameState.autoFryerEnabledState;
    if (gameState.autoFryerEnabledState) {
        getElements().autoFryerUpgradeButton.classList.add('autoUpgradeEnabled');
    } else {
        getElements().autoFryerUpgradeButton.classList.remove('autoUpgradeEnabled');
    }

    getElements().autoStorageCollectorUpgradeButton.querySelector('input').checked = gameState.autoStorageCollectorEnabledState;
    if (gameState.autoStorageCollectorEnabledState) {
        getElements().autoStorageCollectorUpgradeButton.classList.add('autoUpgradeEnabled');
    } else {
        getElements().autoStorageCollectorUpgradeButton.classList.remove('autoUpgradeEnabled');
    }

    getElements().autoCustomerServerUpgradeButton.querySelector('input').checked = gameState.autoCustomerServerEnabledState;
    if (gameState.autoCustomerServerEnabledState) {
        getElements().autoCustomerServerUpgradeButton.classList.add('autoUpgradeEnabled');
    } else {
        getElements().autoCustomerServerUpgradeButton.classList.remove('autoUpgradeEnabled');
    }
}

export function captureButtonStates(gameState) {
    const captureButtons = (containerId) => {
        const container = document.getElementById(containerId);
        const buttons = Array.from(container.children);

        const visibleButtons = buttons.filter(button => !button.classList.contains('hidden-button')).map(button => ({
            id: button.id,
            text: button.innerHTML,
            classes: Array.from(button.classList)
        }));

        const disabledButtons = buttons.filter(button => button.disabled).map(button => ({
            id: button.id,
            classes: Array.from(button.classList)
        }));

        return {
            visibleButtons,
            disabledButtons
        };
    };

    gameState.mainButtonContainer = captureButtons(getElements().mainButtonContainer.id);
    gameState.bottomButtonContainer = captureButtons(getElements().bottomRowContainer.id);
}

export function restoreButtonStates(gameState) {

    const restoreButtons = (containerId, buttonState) => {

        buttonState.visibleButtons.forEach(button => {
            const element = document.getElementById(button.id);
            if (element) {
                element.innerHTML = button.text;
                element.className = '';
                button.classes.forEach(cls => element.classList.add(cls));
                element.classList.remove('hidden-button');
            }
        });

        buttonState.disabledButtons.forEach(button => {
            const element = document.getElementById(button.id);
            if (element) {
                element.disabled = true;
                element.className = '';
                button.classes.forEach(cls => element.classList.add(cls));
            }
        });

        disableButtons(false);
    };

    if (gameState.mainButtonContainer) {
        restoreButtons('mainButtonContainer', gameState.mainButtonContainer);
    }

    if (gameState.bottomButtonContainer) {
        restoreButtons('bottomButtonContainer', gameState.bottomButtonContainer);
    }

    if (getInvestmentFundUnlockable()) {
        getElements().investmentDataScreen.style.display = 'flex';
        getElements().mainButtonContainer.replaceChild(getElements().investmentDataScreen, getElements().investmentDataScreenButton);
    }
    if (getInvestmentFundUnlocked()) {
        hideDoublePeelerChipperAndShowInvestmentComponents();
    }
}