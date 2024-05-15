import {disableButtons, handleButtonClick} from './actions.js';
import {
    debugFlag,
    endOfShiftPopup,
    getActualPotatoesInStorage,
    getChipsCutThisShift,
    getChipsFriedThisShift,
    getChipsFrying,
    getChipsWastedThisShift,
    getCurrentCash,
    getCurrentSpeedAutoChipper,
    getCurrentSpeedAutoCustomerServer,
    getCurrentSpeedAutoFryer,
    getCurrentSpeedAutoPeeler,
    getCurrentSpeedAutoStorageCollector,
    getCustomersServed,
    getCustomersWaiting,
    getCustomersWaitingBeforeEndOfShift,
    getElements,
    getFryerCapacity,
    getFryTimer,
    getInvestmentFundUnlocked,
    getMaxSpudsDelivery,
    getCurrentMaxValueWaitForNewCustomer,
    getNextMaxSpudsDelivery,
    getNextSpeedAutoChipper,
    getNextSpeedAutoCustomerServer,
    getNextSpeedAutoFryer,
    getNextSpeedAutoPeeler,
    getNextSpeedAutoStorageCollector,
    getNextSpeedFryTimer,
    getOldCash,
    getOne,
    getPotatoesPeeledThisShift,
    getPotatoStorageQuantity,
    getPriceToAddStorageHeater,
    getPriceToDoubleSpudsMax,
    getPriceToEnableDoubleChipping,
    getPriceToEnableDoublePeeling,
    getPriceToFloatOnStockMarket,
    getPriceToImproveAutoChipper,
    getPriceToImproveAutoCustomerServer,
    getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut,
    getPriceToImproveAutoMoverFromFryerToStorage,
    getPriceToImproveAutoPeeler,
    getPriceToImproveFryerCapacity,
    getPriceToImproveFryTimer,
    getPriceToImprovePotatoStorage,
    getPriceToUnlockInvestmentFund,
    getRoleUpgrade,
    getShiftCounter,
    getShiftInProgress,
    getSpudsToAddToShift,
    getStartingCash,
    getUpgradeFryerCapacityAmount,
    getUpgradePotatoStorageQuantity,
    getZero,
    popupContinueButton,
    popupOverlay,
    Role,
    setCurrentCash,
    setDebugFlag,
    setGameInProgress,
    getNextMaxValueWaitForNewCustomer,
    getPriceToIncreaseFootfall,
    getInvestmentCashIncrementDecrement, getInvestmentRiskIncrementDecrement
} from './constantsAndGlobalVars.js';
import {initialiseNewGame} from "./gameloop.js";

export function createTitleScreen() {
    const titleScreen = document.createElement('div');
    titleScreen.classList.add('title-screen');

    const title = document.createElement('h1');
    title.innerHTML = 'Counter Game';
    title.classList.add('title');

    const options = document.createElement('div');
    options.classList.add('options');
    options.id = 'optionsWindow';

    const debugs = document.createElement('div');
    debugs.classList.add('debugs');
    debugs.id = 'debugsWindow';

    // Define the option names and their initial colors
    const optionInfo = [
        { name: 'New Game', color: '#007bff' },    // Blue
        { name: 'Load Game', color: '#007bff' },   // Blue
        { name: 'Help', color: '#007bff' },        // Blue
        { name: 'Toggle Sound', color: '#00cc00' } // Green
    ];

    // Define the option names and their initial colors
    const debugInfo = [
        { name: 'Give $10000', color: 'Black' },    // Blue
    ];

    // Create and append clickable options
    for (let i = 0; i < optionInfo.length; i++) {
        const option = document.createElement('div');
        option.innerHTML = optionInfo[i].name;
        option.classList.add('option');
        option.style.backgroundColor = optionInfo[i].color;
        option.id = `option${i + 1}`;
        options.appendChild(option);
    }

    for (let i = 0; i < debugInfo.length; i++) {
        const debug = document.createElement('div');
        debug.innerHTML = debugInfo[i].name;
        debug.classList.add('debug');
        debug.id = `debug${i + 1}`;
        debugs.appendChild(debug);
    }

    titleScreen.appendChild(title);
    titleScreen.appendChild(options);
    titleScreen.appendChild(debugs);

    document.body.appendChild(titleScreen);
}

export function createGameWindow(titleScreenCreatedEvent) {
    const gameWindow = document.createElement('div');
    gameWindow.classList.add('game-window');
    gameWindow.id = "gameWindow";

    const topSection = document.createElement('div');
    topSection.classList.add('top-section');

    const topDivRow1 = document.createElement('div');
    topDivRow1.classList.add('top-div-row-1');

    for (let i = 1; i <= 3; i++) {
        const innerDiv = document.createElement('div');
        innerDiv.classList.add('inner-div-topDivRow1');
        if (i === 2) {
            innerDiv.id = 'playerRoleText';
        } else {
            innerDiv.id = `innerDiv${i}`;
        }

        topDivRow1.appendChild(innerDiv);

        if (i === 1 || i === 3) {
            for (let j = 1; j <= 2; j++) {
                const subInnerDiv = document.createElement('div');
                subInnerDiv.classList.add('sub-inner-div-topDivRow1');
                subInnerDiv.id = `subInnerDiv${i}_${j}`;

                innerDiv.appendChild(subInnerDiv);
            }
        }
    }

    topSection.appendChild(topDivRow1);

    const topDivRowMid = document.createElement('div');
    topDivRowMid.classList.add('top-div-row-mid');

    for (let i = 1; i <= 3; i++) {
        const innerDiv = document.createElement('div');
        innerDiv.classList.add('inner-div-topDivRowMid');
        innerDiv.id = `innerDivRowMid${i}`;

        topDivRowMid.appendChild(innerDiv);

        if (i === 1 || i === 3) {
            for (let j = 1; j <= 2; j++) {
                const subInnerDivMid = document.createElement('div');
                subInnerDivMid.classList.add('sub-inner-div-topDivRowMid');
                subInnerDivMid.id = `subInnerDivMid${i}_${j}`;

                innerDiv.appendChild(subInnerDivMid);
            }
        }
    }

    topSection.appendChild(topDivRowMid);

    const topDivRow2 = document.createElement('div');
    topDivRow2.classList.add('top-div-row-2');

    const counterIds = ['peeledCount', 'cutCount', 'chuckedInFryerCount', 'readyToServeCount', 'customersWaitingCount'];

    for (let i = 0; i < counterIds.length; i++) {
        let valuesCounterRow = document.createElement('div');
        valuesCounterRow.classList.add('counter-columns');
        valuesCounterRow.innerHTML = '0';

        valuesCounterRow.id = counterIds[i];

        topDivRow2.appendChild(valuesCounterRow);
    }

    topSection.appendChild(topDivRow2);
    gameWindow.appendChild(topSection);

    const mainButtonContainer = document.createElement('div');
    mainButtonContainer.classList.add('main-button-container');
    mainButtonContainer.id = 'mainButtonContainer';

    const bottomSectionContainer = document.createElement('div');
    bottomSectionContainer.classList.add('bottom-section-container');

    const bottomRowContainer = document.createElement('div');
    bottomRowContainer.classList.add('bottom-row-container');
    bottomRowContainer.id = 'bottomRowContainer';

    const mainButtonDetails = [
        { id: 'peelPotatoButton', name: 'Peel Potato', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'cutChipsButton', name: 'Cut Chips', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'fryChipsButton', name: `Fry Chips<br> (Capacity: ${getFryerCapacity()})`, upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'servingStorageButton', name: 'Serving Storage', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'serveCustomerButton', name: 'Serve Customer', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'autoPeelerUpgradeButton', name: `Auto Peeler (${getCurrentSpeedAutoPeeler()})<br>${getCurrentSpeedAutoPeeler()} → ${getNextSpeedAutoPeeler()}/s<br> ${formatToCashNotation(getPriceToImproveAutoPeeler())}`, upgrade: 'true', repeatableUpgrade: 'true' },
        { id: 'autoChipperUpgradeButton', name: `Auto Chipper (${getCurrentSpeedAutoChipper()})<br> ${getCurrentSpeedAutoChipper()} → ${getNextSpeedAutoChipper()}/s<br> ${formatToCashNotation(getPriceToImproveAutoChipper())}`, upgrade: 'true', repeatableUpgrade: 'true' },
        { id: 'autoFryerUpgradeButton', name: `Auto Fryer (${getCurrentSpeedAutoFryer()})<br>${getCurrentSpeedAutoFryer()} → ${getNextSpeedAutoFryer()}s<br> ${formatToCashNotation(getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut())}`, upgrade: 'true', repeatableUpgrade: 'true' },
        { id: 'autoStorageCollectorUpgradeButton', name: `Auto Collect (${getCurrentSpeedAutoStorageCollector()})<br>${getCurrentSpeedAutoStorageCollector()} → ${getNextSpeedAutoStorageCollector()}s<br> ${formatToCashNotation(getPriceToImproveAutoMoverFromFryerToStorage())}`, upgrade: 'true', repeatableUpgrade: 'true' },
        { id: 'autoCustomerServerUpgradeButton', name: `Auto Server (${getCurrentSpeedAutoCustomerServer()})<br>${getCurrentSpeedAutoCustomerServer()} → ${getNextSpeedAutoCustomerServer()}s<br> ${formatToCashNotation(getPriceToImproveAutoCustomerServer())}`, upgrade: 'true', repeatableUpgrade: 'true' },
        { id: 'improvePotatoStorageButton', name: `Increase Potato Cap.<br>${getPotatoStorageQuantity()} → ${getPotatoStorageQuantity() + getUpgradePotatoStorageQuantity()}<br>${formatToCashNotation(getPriceToImprovePotatoStorage())}`, upgrade: 'true', repeatableUpgrade: 'true' },
        { id: 'improveFryerCapacityButton', name: `Improve Fryer Cap.<br>${getFryerCapacity()} → ${getFryerCapacity() + getUpgradeFryerCapacityAmount()}<br>${formatToCashNotation(getPriceToImproveFryerCapacity())}`, upgrade: 'true', repeatableUpgrade: 'true' },
        { id: 'fastFryerUpgradeButton', name: `Improve Fry Speed<br>${getFryTimer()}s → ${getNextSpeedFryTimer()}s<br>${formatToCashNotation(getPriceToImproveFryTimer())}`, upgrade: 'true', repeatableUpgrade: 'true' },
        { id: 'potatoDeliveryDoublerButton', name: `Double Max Delivery<br>${getMaxSpudsDelivery()} → ${getNextMaxSpudsDelivery()}<br>${formatToCashNotation(getPriceToDoubleSpudsMax())}`, upgrade: 'true', repeatableUpgrade: 'true' },
        { id: 'customerFrequencyIncreaser', name: `Max. Wait For Customer<br>${getCurrentMaxValueWaitForNewCustomer()}s → ${getNextMaxValueWaitForNewCustomer()}s<br>${formatToCashNotation(getPriceToIncreaseFootfall())}`, upgrade: 'true', repeatableUpgrade: 'true' },
        { id: 'investmentDataScreenButton', name: `Investment Data Screen Placeholder`, upgrade: 'false', repeatableUpgrade: 'false' },
    ];

    const bottomButtonDetails = [
        { id: 'twoHandedPeelingButton', name: `Double Peeling Tool <br> ${formatToCashNotation(getPriceToEnableDoublePeeling())}`, upgrade: 'true', repeatableUpgrade: 'false' },
        { id: 'twoHandedChippingButton', name: `Double Chipping Tool <br> ${formatToCashNotation(getPriceToEnableDoubleChipping())}`, upgrade: 'true', repeatableUpgrade: 'false' },
        { id: 'investmentFundUnlockButton', name: `Buy Investment Fund <br> ${formatToCashNotation(getPriceToUnlockInvestmentFund())}`, upgrade: 'true', repeatableUpgrade: 'false' },
        { id: 'addStorageHeaterAutoShiftStartButton', name: `Buy Storage Heater <br> ${formatToCashNotation(getPriceToAddStorageHeater())}`, upgrade: 'true', repeatableUpgrade: 'false' },
        { id: 'startShiftButton', name: 'Start Shift', upgrade: 'false', repeatableUpgrade: 'false' }
    ];

    createInvestmentComponents(bottomRowContainer);
    createInvestmentDataScreen(mainButtonContainer);

    for (let i = 0; i < mainButtonDetails.length; i++) {
        const button = document.createElement('button');
        button.id = mainButtonDetails[i].id;
        button.innerHTML = mainButtonDetails[i].name;
        button.classList.add('action-button-main');

        // Determine the class and height based on button position
        if (i <= 4) {
            button.classList.add('first-row-main-buttons');
            button.style.height = '40px';
        } else if (i >= 5 && i <= 9) {
            button.classList.add('second-row-main-buttons');
            button.style.height = '60px';
        } else if (i >= 10 && i <= 14) {
            button.classList.add('third-row-main-buttons');
            button.style.height = '30px';
        } else if (i === 15) {
            button.classList.add('fourth-row-main-buttons');
            button.style.height = '50px';
        }

        mainButtonContainer.appendChild(button);
    }

    for (let i = 0; i < bottomButtonDetails.length; i++) {
        const button = document.createElement('button');
        button.id = bottomButtonDetails[i].id;
        button.innerHTML = bottomButtonDetails[i].name;
        button.classList.add('action-button-bottom-row');
        bottomRowContainer.appendChild(button);
    }

    bottomSectionContainer.appendChild(mainButtonContainer);
    bottomSectionContainer.appendChild(bottomRowContainer);

    gameWindow.appendChild(bottomSectionContainer);

    document.body.appendChild(gameWindow);

    hideUpgradeButtonsGameStart(bottomSectionContainer);

    document.dispatchEvent(titleScreenCreatedEvent);
    disableButtons(true);

    createOptionScreenEventListeners();

    writeTextInSections(mainButtonDetails);

    handleButtonClick(getElements().startShiftButton.id, null);
    handleButtonClick(getElements().peelPotatoButton.id, getElements().peeledCount.id);
    handleButtonClick(getElements().cutChipsButton.id, getElements().cutCount.id);
    handleButtonClick(getElements().fryChipsButton.id, getElements().chuckedInFryerCount.id);
    handleButtonClick(getElements().servingStorageButton.id, getElements().readyToServeCount.id);
    handleButtonClick(getElements().serveCustomerButton.id, getElements().customersWaitingCount.id);
    handleButtonClick(getElements().improvePotatoStorageButton.id, getPriceToImprovePotatoStorage());
    handleButtonClick(getElements().twoHandedPeelingButton.id, getPriceToEnableDoublePeeling());
    handleButtonClick(getElements().twoHandedChippingButton.id, getPriceToEnableDoubleChipping());
    handleButtonClick(getElements().improveFryerCapacityButton.id, getPriceToImproveFryerCapacity());
    handleButtonClick(getElements().addStorageHeaterAutoShiftStartButton.id, getPriceToAddStorageHeater());
    handleButtonClick(getElements().autoPeelerUpgradeButton.id, getPriceToImproveAutoPeeler());
    handleButtonClick(getElements().autoChipperUpgradeButton.id, getPriceToImproveAutoChipper());
    handleButtonClick(getElements().autoFryerUpgradeButton.id, getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut());
    handleButtonClick(getElements().autoStorageCollectorUpgradeButton.id, getPriceToImproveAutoMoverFromFryerToStorage());
    handleButtonClick(getElements().autoCustomerServerUpgradeButton.id, getPriceToImproveAutoCustomerServer());
    handleButtonClick(getElements().fastFryerUpgradeButton.id, getPriceToImproveFryTimer());
    handleButtonClick(getElements().potatoDeliveryDoublerButton.id, getPriceToDoubleSpudsMax());
    handleButtonClick(getElements().investmentFundUnlockButton.id, getPriceToUnlockInvestmentFund());
    handleButtonClick(getElements().customerFrequencyIncreaser.id, getPriceToIncreaseFootfall());
    handleButtonClick(getElements().investmentCashComponent_IncrementButton.id, getInvestmentCashIncrementDecrement());
    handleButtonClick(getElements().investmentCashComponent_DecrementButton.id, getInvestmentCashIncrementDecrement());
    handleButtonClick(getElements().investmentRiskComponent_IncrementButton.id, getInvestmentRiskIncrementDecrement());
    handleButtonClick(getElements().investmentRiskComponent_DecrementButton.id, getInvestmentRiskIncrementDecrement());
}

export function writeTextInSections(buttonDetails) {
    getElements().playerRoleText.innerHTML = Role.ONE;

    getElements().subInnerDiv1_1.innerHTML = 'Shift rem. (s):';
    getElements().subInnerDiv1_2.innerHTML = "Start Shift";

    getElements().subInnerDiv3_1.innerHTML = 'Served:';
    getElements().subInnerDiv3_2.innerHTML = "0";

    getElements().subInnerDivMid1_1.innerHTML = 'Potatoes:';
    getElements().subInnerDivMid1_2.innerHTML = "0/" + getPotatoStorageQuantity().toString();

    getElements().subInnerDivMid3_1.innerHTML = 'Money:';
    getElements().subInnerDivMid3_2.innerHTML = formatToCashNotation(getStartingCash());

    buttonDetails.forEach(buttonInfo => {
        const button = getElements()[buttonInfo.id];
        button.innerHTML = buttonInfo.name;
    });
}

export function hideUpgradeButtonsGameStart(bottomButtonsContainer) {
    bottomButtonsContainer.querySelectorAll('.action-button-main:nth-child(n+7)').forEach(button => {
        button.classList.add('hidden-button');
    });
    bottomButtonsContainer.querySelectorAll('.action-button-bottom-row:not(:last-child)').forEach(button => {
        button.classList.add('hidden-button');
    });
}

export function toggleSound() {
    const soundOption = getElements().option4;
    const isSoundOn = soundOption.style.backgroundColor === 'rgb(255, 0, 0)'; // Red color

    if (isSoundOn) {
        soundOption.style.backgroundColor = '#00cc00'; // Green
        // console.log('Sound turned on');
        // Call your "toggleSound(on)" function here
    } else {
        soundOption.style.backgroundColor = 'rgb(255, 0, 0)'; // Red
        // console.log('Sound turned off');
        // Call your "toggleSound(off)" function here
    }
}

export function formatToCashNotation(value) {
    return `$${value.toFixed(2)}`;
}

export function updateButtonStyle(buttonId, startStop) {
    const element = getElements()[buttonId];
    if (startStop === null) {
        switch (buttonId) {
            case getElements().fryChipsButton.id:
                if (getChipsFrying()) {
                    element.classList.add('cooking');
                    element.classList.remove('disabled');
                } else {
                    element.classList.remove('cooking');
                    element.classList.add('disabled');
                }
                break;
            case getElements().investmentFundUnlockButton.id:
                element.innerHTML = `Float on Stock Market<br>${formatToCashNotation(getPriceToFloatOnStockMarket())}`;
                element.classList.add('disabled');
                break;
            case getElements().addStorageHeaterAutoShiftStartButton.id: //used only for auto shift start
                if (getInvestmentFundUnlocked()) {
                    if (element.classList.contains('toggleable-button-on-state')) {
                        element.classList.add('toggleable-button-off-state');
                        element.classList.remove('toggleable-button-on-state');
                        element.classList.add('non-repeatable-upgrade-purchased');
                        element.innerHTML = `Auto Shift Start Upgrade<br>DISABLED`;
                        break;
                    } else {
                        element.classList.add('toggleable-button-on-state');
                        element.classList.remove('toggleable-button-off-state');
                        element.innerHTML = `Auto Shift Start Upgrade<br>ENABLED`;
                        break;
                    }
                } else {
                    element.classList.add('non-repeatable-upgrade-purchased');
                    break;
                }
            default: //non repeatable upgrades
                element.classList.add('non-repeatable-upgrade-purchased');
                break;
        }
    }

    if (startStop !== null) {
        switch (startStop) {
            case getZero():
                element.classList.remove('action-button-main-disabled');
                element.classList.add('action-button-main-flashing');
                break;
            case getOne():
                element.classList.remove('action-button-main-flashing');
                element.classList.add('action-button-main-disabled');
                break;
        }
    }
}

export function createEndOfShiftPopup() {
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');

    const popupTitle = document.createElement('div');
    popupTitle.id = 'endOfShiftPopupTitle';
    popupTitle.classList.add('popup-row');
    popupTitle.classList.add('popup-row-1');
    popupTitle.innerHTML = `<div class="popup-title">test</div>`;

    const popupContent = document.createElement('div');
    popupContent.id = 'endOfShiftPopupContent';
    popupContent.classList.add('popup-row');
    popupContent.classList.add('popup-row-2');
    popupContent.innerHTML = '<div class="popup-content">test</div>';

    const popupRow3 = document.createElement('div');
    popupRow3.classList.add('popup-row');
    popupRow3.classList.add('popup-row-3');

    const continueButton = document.createElement('button');
    continueButton.innerHTML = 'Continue';
    continueButton.classList.add('popup-continue-button');
    popupRow3.appendChild(continueButton);
    popupContainer.style.display = "none";

    popupContainer.appendChild(popupTitle);
    popupContainer.appendChild(popupContent);
    popupContainer.appendChild(popupRow3);
    document.body.appendChild(popupContainer);

    return { popupContainer, continueButton };
}

export function createOverlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.id = 'overlay';
    overlay.style.display = "none";
    document.body.appendChild(overlay);

    return overlay;
}

export function toggleEndOfShiftPopup(popupContainer) {
    if (popupContainer.style.display === 'none') {
        popupContainer.style.display = 'block';
    } else {
        popupContainer.style.display = 'none';
    }
}

export function toggleOverlay(popupOverlay) {
    if (popupOverlay.style.display === 'none') {
        popupOverlay.style.display = 'block';
    } else {
        popupOverlay.style.display = 'none';
    }
}

export function writePopupText() {
    let walkOuts = getCustomersWaitingBeforeEndOfShift() - getCustomersWaiting();
    let shiftCounter = getShiftCounter();
    let currentPotatoes = getActualPotatoesInStorage();
    let spudsToAdd = getSpudsToAddToShift();
    let storageQuantity = getPotatoStorageQuantity();

    let totalPotatoes = currentPotatoes + spudsToAdd;
    let nextShiftPotatoes = Math.min(totalPotatoes, storageQuantity);
    const popupTitle = getElements().endOfShiftPopupTitle;
    const popupContent = getElements().endOfShiftPopupContent;

    popupTitle.innerHTML = `<div class="popup-title">End Of Shift ${shiftCounter}</div>`;
    let potatoesMessage = `Potatoes for next shift: ${currentPotatoes} + ${nextShiftPotatoes - currentPotatoes} to be delivered = ${nextShiftPotatoes}`;
    if (nextShiftPotatoes === storageQuantity) {
        potatoesMessage += " (due to max storage reached)";
    }

    popupContent.innerHTML = `
    <div class="popup-content">
        Your shift has ended!<br><br>
        Earnings: ${formatToCashNotation(getCurrentCash() - getOldCash())} this shift + ${formatToCashNotation(getOldCash())} in bank = ${formatToCashNotation(getCurrentCash())}<br><br>
        Customers Served: ${getCustomersServed()}<br>
        
        Potatoes Peeled: ${getPotatoesPeeledThisShift()}<br>
        Chips Cut: ${getChipsCutThisShift()}<br>
        Chips Fried: ${getChipsFriedThisShift()}<br>
        Chips Wasted This Shift: ${getChipsWastedThisShift()}<br><br>
        
        Customer Walkouts: ${walkOuts}<br>
        Customers Still Waiting: ${getCustomersWaiting()}<br><br>

        ${potatoesMessage}
    </div>`;

}

export function updateVisibleButtons() {
    if (!getShiftInProgress() && (getShiftCounter() > getZero() || debugFlag)) {
        //manual phase upgrades
        if (getCurrentCash() >= getPriceToImprovePotatoStorage()) {
            getElements().improvePotatoStorageButton.classList.remove('hidden-button');
        }
        if (!getInvestmentFundUnlocked()) {
            if (getCurrentCash() >= getPriceToEnableDoublePeeling()) {
                getElements().twoHandedPeelingButton.classList.remove('hidden-button');
            }
            if (getCurrentCash() >= getPriceToEnableDoubleChipping()) {
                getElements().twoHandedChippingButton.classList.remove('hidden-button');
            }
        }
        if (getCurrentCash() >= getPriceToImproveFryerCapacity()) {
            getElements().improveFryerCapacityButton.classList.remove('hidden-button');
        }
        if (getCurrentCash() >= getPriceToAddStorageHeater()) {
            getElements().addStorageHeaterAutoShiftStartButton.classList.remove('hidden-button');
        }
        //auto phase upgrades
        if (getCurrentCash() >= getPriceToImproveAutoPeeler()) {
            getElements().autoPeelerUpgradeButton.classList.remove('hidden-button');
        }
        if (getCurrentCash() >= getPriceToImproveAutoChipper()) {
            getElements().autoChipperUpgradeButton.classList.remove('hidden-button');
        }
        if (getCurrentCash() >= getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut()) {
            getElements().autoFryerUpgradeButton.classList.remove('hidden-button');
        }
        if (getCurrentCash() >= getPriceToImproveAutoMoverFromFryerToStorage()) {
            getElements().autoStorageCollectorUpgradeButton.classList.remove('hidden-button');
        }
        if (getCurrentCash() >= getPriceToImproveAutoCustomerServer()) {
            getElements().autoCustomerServerUpgradeButton.classList.remove('hidden-button');
        }
        //third phase upgrades
        if (getCurrentCash() >= getRoleUpgrade(Role.FOUR) && getElements().playerRoleText.innerHTML === (Role.FIVE) || getElements().playerRoleText.innerHTML === (Role.SIX)) {
            getElements().fastFryerUpgradeButton.classList.remove('hidden-button');
            getElements().potatoDeliveryDoublerButton.classList.remove('hidden-button');
            getElements().customerFrequencyIncreaser.classList.remove('hidden-button');
        }
        if (getCurrentCash() >= getRoleUpgrade(Role.FIVE) && getElements().playerRoleText.innerHTML === (Role.SIX)) {
            getElements().investmentFundUnlockButton.classList.remove('hidden-button');
        }

        if (getElements().playerRoleText.innerHTML === (Role.SIX) && getInvestmentFundUnlocked() && getElements().investmentDataScreen.style.display === 'none') {
            getElements().investmentDataScreen.style.display = 'flex';
            getElements().mainButtonContainer.replaceChild(getElements().investmentDataScreen, getElements().investmentDataScreenButton);
            //(conditions to be met and will sell off whole shop so player has $999998, no upgrades, 1 customer, 8 potatoes to make one portion and complete the game)
            //show customer frequency doubler 15
        }

        if (getCurrentCash() >= getRoleUpgrade(Role.SEVEN)) {
            //set Start Shift Button to WIN GAME
            //Winner  code
        }
        disableButtons(false);
    }
}

function createOptionScreenEventListeners() {
    getElements().option1.addEventListener('click', function () {
        setGameInProgress(initialiseNewGame());
        //console.log("gameInProgress after clicking new game =" + getGameInProgress());
        updateVisibleButtons(); //for debug if money given
    });
    getElements().option2.addEventListener('click', function () {
        // Add functionality for other options as needed
    });
    getElements().option3.addEventListener('click', function () {
        // Add functionality for other options as needed
    });
    getElements().option4.addEventListener('click', function () {
        toggleSound();
    });
    popupContinueButton.addEventListener('click', function() {
        toggleEndOfShiftPopup(endOfShiftPopup);
        toggleOverlay(popupOverlay);
    });

    //DEBUG
    getElements().debug1.addEventListener('click', function () {
        setDebugFlag(true);
        getElements().debug1.classList.add('debug-toggledOn');
        let donation = 25000;
        setCurrentCash(donation);
        getElements().subInnerDivMid3_2.innerHTML = formatToCashNotation(getCurrentCash());
        console.log("$" + donation + " given (debug)");
    });
}

export function changePlayerRole(element, newText, animation1, animation2) {
    element.classList.add(animation1);
    element.classList.add(animation2);

    element.innerHTML = newText;

    setTimeout(() => {
        element.classList.remove(animation1);
        element.classList.remove(animation2);
    }, 500);
}

export function hideDoublePeelerChipperAndShowInvestmentComponents() {
    getElements().bottomRowContainer.replaceChild(getElements().investmentCashComponent, getElements().twoHandedPeelingButton);
    getElements().bottomRowContainer.replaceChild(getElements().investmentRiskComponent, getElements().twoHandedChippingButton);
    getElements().investmentCashComponent.style.display = 'flex';
    getElements().investmentRiskComponent.style.display = 'flex';
}

function createInvestmentComponents(bottomRowContainer) {
    const investmentCashComponent = document.createElement('div');
    investmentCashComponent.id = 'investmentCashComponent';
    investmentCashComponent.style.display = 'none';
    investmentCashComponent.classList.add('investmentComponent');

    const investmentCashComponent_title = document.createElement('div');
    investmentCashComponent_title.classList.add('investmentComponent_title');

    const investmentCashComponent_Buttons_Container = document.createElement('div');
    investmentCashComponent_Buttons_Container.classList.add('investmentComponent_Buttons_Container');

    const investmentCashComponent_IncrementButtonContainer = document.createElement('div');
    const investmentCashComponent_DecrementButtonContainer = document.createElement('div');
    investmentCashComponent_IncrementButtonContainer.classList.add('investmentComponent_Buttons_Inner_Container');
    investmentCashComponent_DecrementButtonContainer.classList.add('investmentComponent_Buttons_Inner_Container');

    const investmentCashComponent_IncrementButton = document.createElement('button');
    const investmentCashComponent_DecrementButton = document.createElement('button');

    investmentCashComponent_IncrementButton.id = 'investmentCashComponent_IncrementButton';
    investmentCashComponent_DecrementButton.id = 'investmentCashComponent_DecrementButton';

    investmentCashComponent_IncrementButton.classList.add('investmentComponent-button-top');
    investmentCashComponent_DecrementButton.classList.add('investmentComponent-button-bottom');

    investmentCashComponent_IncrementButtonContainer.appendChild(investmentCashComponent_IncrementButton);
    investmentCashComponent_DecrementButtonContainer.appendChild(investmentCashComponent_DecrementButton);

    investmentCashComponent_Buttons_Container.appendChild(investmentCashComponent_IncrementButtonContainer);
    investmentCashComponent_Buttons_Container.appendChild(investmentCashComponent_DecrementButtonContainer);

    investmentCashComponent.appendChild(investmentCashComponent_title);
    investmentCashComponent.appendChild(investmentCashComponent_Buttons_Container);

    const investmentRiskComponent = document.createElement('div');
    investmentRiskComponent.id = 'investmentRiskComponent';
    investmentRiskComponent.style.display = 'none';
    investmentRiskComponent.classList.add('investmentComponent');

    const investmentRiskComponent_title = document.createElement('div');
    investmentRiskComponent_title.classList.add('investmentComponent_title');

    const investmentRiskComponent_Buttons_Container = document.createElement('div');
    investmentRiskComponent_Buttons_Container.classList.add('investmentComponent_Buttons_Container');

    const investmentRiskComponent_IncrementButtonContainer = document.createElement('div');
    const investmentRiskComponent_DecrementButtonContainer = document.createElement('div');
    investmentRiskComponent_IncrementButtonContainer.classList.add('investmentComponent_Buttons_Inner_Container');
    investmentRiskComponent_DecrementButtonContainer.classList.add('investmentComponent_Buttons_Inner_Container');

    const investmentRiskComponent_IncrementButton = document.createElement('button');
    const investmentRiskComponent_DecrementButton = document.createElement('button');

    investmentRiskComponent_IncrementButton.id = 'investmentRiskComponent_IncrementButton';
    investmentRiskComponent_DecrementButton.id = 'investmentRiskComponent_DecrementButton';

    investmentRiskComponent_IncrementButton.classList.add('investmentComponent-button-top');
    investmentRiskComponent_DecrementButton.classList.add('investmentComponent-button-bottom');

    investmentRiskComponent_IncrementButtonContainer.appendChild(investmentRiskComponent_IncrementButton);
    investmentRiskComponent_DecrementButtonContainer.appendChild(investmentRiskComponent_DecrementButton);

    investmentRiskComponent_Buttons_Container.appendChild(investmentRiskComponent_IncrementButtonContainer);
    investmentRiskComponent_Buttons_Container.appendChild(investmentRiskComponent_DecrementButtonContainer);

    investmentRiskComponent.appendChild(investmentRiskComponent_title);
    investmentRiskComponent.appendChild(investmentRiskComponent_Buttons_Container);

    bottomRowContainer.appendChild(investmentCashComponent);
    bottomRowContainer.appendChild(investmentRiskComponent);

    investmentCashComponent_title.innerHTML = `Change<br>Investment<br>Amount`;
    investmentRiskComponent_title.innerHTML = `Change<br>Risk<br>Amount`;

    investmentCashComponent_IncrementButton.innerHTML = `Add<br>1000$`;
    investmentCashComponent_DecrementButton.innerHTML = `Remove<br>1000$`;

    investmentRiskComponent_IncrementButton.innerHTML = `Add<br>1% Risk`;
    investmentRiskComponent_DecrementButton.innerHTML = `Remove<br>1% Risk`;
}

function createInvestmentDataScreen(mainButtonContainer) {

    const investmentDataScreen = document.createElement('div');
    investmentDataScreen.id = 'investmentDataScreen';
    investmentDataScreen.style.display = 'none';
    investmentDataScreen.classList.add('investment-data-screen');
    investmentDataScreen.classList.add('fourth-row-main-buttons');

    const divGrid = document.createElement('div');
    divGrid.classList.add('investment-data-grid');

    for (let i = 0; i < 8; i++) {
        const divElement = document.createElement('div');
        divElement.classList.add('investment-data-item');

        if (i < 4) {
            divElement.classList.add('top-row');
        } else {
            divElement.classList.add('bottom-row');
        }

        divGrid.appendChild(divElement);
    }

    investmentDataScreen.appendChild(divGrid);
    mainButtonContainer.appendChild(investmentDataScreen);
}