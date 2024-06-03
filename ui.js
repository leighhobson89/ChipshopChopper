import {disableButtons, handleButtonClick, loadGame, saveGame, toggleMenu} from './actions.js';
import {
    debugFlag,
    endOfShiftOrGamePopup,
    getActualPotatoesInStorage,
    getAmountInvestmentCash,
    getAmountInvestmentRisk,
    getAreChipsFrying,
    getAutoChipperCapped,
    getAutoCustomerServerCapped,
    getAutoFryerCapped,
    getAutoPeelerCapped,
    getAutoStorageCollectorCapped,
    getCapAutoChipper,
    getCapAutoCustomerServer,
    getCapAutoFryer,
    getCapAutoPeeler,
    getCapAutoStorageCollector,
    getCapFryerCapacity,
    getCapFryerSpeed,
    getCapMaxDelivery,
    getCapMaxWaitCustomer,
    getCapPotatoCapacity,
    getChipsCutThisShift,
    getChipsFriedThisShift,
    getChipsWastedThisShift,
    getCurrentCash,
    getCurrentMaxValueWaitForNewCustomer,
    getCurrentRotation,
    getCurrentSpeedAutoChipper,
    getCurrentSpeedAutoCustomerServer,
    getCurrentSpeedAutoFryer,
    getCurrentSpeedAutoPeeler,
    getCurrentSpeedAutoStorageCollector,
    getCurrentValueOfInvestment,
    getCustomersServed,
    getCustomersWaiting,
    getCustomersWaitingBeforeEndOfShift,
    getElements,
    getFloatOnStockMarketUnlockedAndEndGameFlowStarted,
    getFryerCapacity,
    getFryerCapacityCapped,
    getFryerSpeedCapped,
    getFryTimer,
    getGrowthInvestment,
    getInitialStateBottomRowButtons,
    getInitialStateMainButtons,
    getInvestmentCashIncrementDecrement,
    getInvestmentFundUnlockable,
    getInvestmentFundUnlocked,
    getInvestmentRiskIncrementDecrement,
    getMaxDeliveryCapped,
    getMaxSpudsDelivery,
    getMaxWaitCustomerCapped,
    getNextMaxSpudsDelivery,
    getNextMaxValueWaitForNewCustomer,
    getNextSpeedAutoChipper,
    getNextSpeedAutoCustomerServer,
    getNextSpeedAutoFryer,
    getNextSpeedAutoPeeler,
    getNextSpeedAutoStorageCollector,
    getNextSpeedFryTimer,
    getOldCash,
    getOne,
    getPotatoCapacityCapped,
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
    getPriceToIncreaseFootfall,
    getPriceToUnlockInvestmentFundOrFloatOnStockMarket,
    getPromotionFlag,
    getRoleUpgrade,
    getShiftCounter,
    getShiftInProgress,
    getShiftPoints,
    getSpudsToAddToShift,
    getStartingCash,
    getStateLoading,
    getTotalCut,
    getTotalEarnedInSales,
    getTotalPeeled,
    getTotalServedCustomers,
    getTotalSpentExcludingInvestments,
    getTotalWastedChips,
    getUpgradeFryerCapacityAmount,
    getUpgradePotatoStorageQuantity,
    getWheelSpinning, getWinResult,
    getZero,
    popupContinueButton,
    popupOverlay,
    resetAllVariables,
    resetCounterUiElements,
    resetUiButtonElements,
    Role,
    setAutoChipperCapped,
    setAutoCustomerServerCapped,
    setAutoFryerCapped,
    setAutoPeelerCapped,
    setAutoStorageCollectorCapped,
    setCurrentCash,
    setCurrentRotation,
    setDebugFlag,
    setFryerCapacityCapped,
    setFryerSpeedCapped,
    setGameInProgress,
    setInitialStateBottomRowButtons,
    setInitialStateMainButtons,
    setMaxDeliveryCapped,
    setMaxWaitCustomerCapped,
    setPauseAutoSaveCountdown,
    setPotatoCapacityCapped,
    setPromotionFlag,
    setShiftPoints,
    setStateLoading,
    setTextAnimationDone,
    setWheelSpinning, setWinResult
} from './constantsAndGlobalVars.js';
import {initialiseNewGame} from "./gameloop.js";

export function createTitleScreen() {
    const titleScreen = document.createElement('div');
    titleScreen.classList.add('title-screen');
    titleScreen.id = 'titleScreen';

    const header = document.createElement('div');
    header.classList.add('header');

    const left = document.createElement('div');
    left.classList.add('header-left');

    const title = document.createElement('div');
    title.classList.add('header-title');

    const titleText = document.createElement('div');
    titleText.innerHTML = 'Chip Shop Imperium';
    titleText.classList.add('title');
    title.appendChild(titleText);

    const clock = document.createElement('div');
    clock.classList.add('header-clock');
    clock.id = 'clock';

    header.appendChild(left);
    header.appendChild(title);
    header.appendChild(clock);

    const options = document.createElement('div');
    options.classList.add('options');
    options.id = 'optionsWindow';

    const resumeGameWindow = document.createElement('div');
    resumeGameWindow.classList.add('debugs');
    resumeGameWindow.id = 'resumeGameWindow';

    const optionInfo = [{
        name: 'New Game'
    },
        {
            name: 'Save Game'
        },
        {
            name: 'Load Game'
        },
        {
            name: 'Help'
        },
        {
            name: 'Toggle Sound',
            color: '#00cc00'
        }
    ];

    const debugInfo = [{
        name: 'Give $10000',
        color: 'Black'
    }, ];

    for (let i = 0; i < optionInfo.length; i++) {
        const option = document.createElement('div');
        option.innerHTML = optionInfo[i].name;
        option.classList.add('option');
        option.style.backgroundColor = optionInfo[i].color;
        option.id = `option${i + 1}`;
        options.appendChild(option);
    }

    const resumeGameButton = document.createElement('div');
    resumeGameButton.innerHTML = 'Resume Game';
    resumeGameButton.classList.add('option');
    resumeGameButton.classList.add('option-resume-game');
    resumeGameButton.classList.add('option-disabled');
    resumeGameButton.id = `resumeGameButton`;
    resumeGameWindow.appendChild(resumeGameButton);

    for (let i = 0; i < debugInfo.length; i++) {
        const debug = document.createElement('div');
        debug.innerHTML = debugInfo[i].name;
        debug.classList.add('debug');
        debug.id = `debug${i + 1}`;
        resumeGameWindow.appendChild(debug);
    }

    titleScreen.appendChild(header);
    titleScreen.appendChild(options);
    titleScreen.appendChild(resumeGameWindow);

    document.body.appendChild(titleScreen);

    document.getElementById('option2').classList.add('option-disabled'); //DISABLE SAVE GAME FOR FIRST OPEN OF GAME OR BROWSER REFRESH
    document.getElementById('option5').style.display = 'none'; //HIDE SOUND OPTION
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

                if (i === 3 && j === 2) {
                    subInnerDiv.classList.add('sub-inner-div-topDivRow1-side-by-side');

                    const div1 = document.createElement('div');
                    div1.id = 'customersServedCount';
                    div1.classList.add('customerServedCountDiv');
                    subInnerDiv.appendChild(div1);

                    const div2 = document.createElement('div');
                    div2.id = 'menuButtonDiv';
                    div2.classList.add('menuButtonDiv');
                    subInnerDiv.appendChild(div2);

                    const menuButton = document.createElement('button');
                    menuButton.id = "menuButton";
                    menuButton.classList.add('menu-button');
                    menuButton.innerText = 'Menu';

                    div2.appendChild(menuButton);
                }

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
    bottomSectionContainer.id = 'bottomSectionContainer';

    const bottomRowContainer = document.createElement('div');
    bottomRowContainer.classList.add('bottom-row-container');
    bottomRowContainer.id = 'bottomRowContainer';

    let mainButtonDetails = [{
        id: 'peelPotatoButton',
        name: 'Peel Potato',
        upgrade: 'false',
        repeatableUpgrade: 'false'
    },
        {
            id: 'cutChipsButton',
            name: 'Cut Chips',
            upgrade: 'false',
            repeatableUpgrade: 'false'
        },
        {
            id: 'fryChipsButton',
            name: `Fry Chips<br> (Capacity: ${getFryerCapacity()})`,
            upgrade: 'false',
            repeatableUpgrade: 'false'
        },
        {
            id: 'servingStorageButton',
            name: 'Serving Storage',
            upgrade: 'false',
            repeatableUpgrade: 'false'
        },
        {
            id: 'serveCustomerButton',
            name: 'Serve Customer',
            upgrade: 'false',
            repeatableUpgrade: 'false'
        },
        {
            id: 'autoPeelerUpgradeButton',
            name: `Auto Peeler (${getCurrentSpeedAutoPeeler()})<br>${getCurrentSpeedAutoPeeler()} → ${getNextSpeedAutoPeeler()}/s<br> ${formatToCashNotation(getPriceToImproveAutoPeeler())}`,
            upgrade: 'true',
            repeatableUpgrade: 'true'
        },
        {
            id: 'autoChipperUpgradeButton',
            name: `Auto Chipper (${getCurrentSpeedAutoChipper()})<br> ${getCurrentSpeedAutoChipper()} → ${getNextSpeedAutoChipper()}/s<br> ${formatToCashNotation(getPriceToImproveAutoChipper())}`,
            upgrade: 'true',
            repeatableUpgrade: 'true'
        },
        {
            id: 'autoFryerUpgradeButton',
            name: `Auto Fryer (${getCurrentSpeedAutoFryer()})<br>${getCurrentSpeedAutoFryer()} → ${getNextSpeedAutoFryer()}s<br> ${formatToCashNotation(getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut())}`,
            upgrade: 'true',
            repeatableUpgrade: 'true'
        },
        {
            id: 'autoStorageCollectorUpgradeButton',
            name: `Auto Collect (${getCurrentSpeedAutoStorageCollector()})<br>${getCurrentSpeedAutoStorageCollector()} → ${getNextSpeedAutoStorageCollector()}s<br> ${formatToCashNotation(getPriceToImproveAutoMoverFromFryerToStorage())}`,
            upgrade: 'true',
            repeatableUpgrade: 'true'
        },
        {
            id: 'autoCustomerServerUpgradeButton',
            name: `Auto Server (${getCurrentSpeedAutoCustomerServer()})<br>${getCurrentSpeedAutoCustomerServer()} → ${getNextSpeedAutoCustomerServer()}s<br> ${formatToCashNotation(getPriceToImproveAutoCustomerServer())}`,
            upgrade: 'true',
            repeatableUpgrade: 'true'
        },
        {
            id: 'improvePotatoStorageButton',
            name: `Increase Potato Cap.<br>${getPotatoStorageQuantity()} → ${getPotatoStorageQuantity() + getUpgradePotatoStorageQuantity()}<br>${formatToCashNotation(getPriceToImprovePotatoStorage())}`,
            upgrade: 'true',
            repeatableUpgrade: 'true'
        },
        {
            id: 'improveFryerCapacityButton',
            name: `Improve Fryer Cap.<br>${getFryerCapacity()} → ${getFryerCapacity() + getUpgradeFryerCapacityAmount()}<br>${formatToCashNotation(getPriceToImproveFryerCapacity())}`,
            upgrade: 'true',
            repeatableUpgrade: 'true'
        },
        {
            id: 'fastFryerUpgradeButton',
            name: `Improve Fry Speed<br>${getFryTimer()}s → ${getNextSpeedFryTimer()}s<br>${formatToCashNotation(getPriceToImproveFryTimer())}`,
            upgrade: 'true',
            repeatableUpgrade: 'true'
        },
        {
            id: 'potatoDeliveryDoublerButton',
            name: `Double Max Delivery<br>${getMaxSpudsDelivery()} → ${getNextMaxSpudsDelivery()}<br>${formatToCashNotation(getPriceToDoubleSpudsMax())}`,
            upgrade: 'true',
            repeatableUpgrade: 'true'
        },
        {
            id: 'customerFrequencyIncreaser',
            name: `Max Wait Customer<br>${getCurrentMaxValueWaitForNewCustomer()}s → ${getNextMaxValueWaitForNewCustomer()}s<br>${formatToCashNotation(getPriceToIncreaseFootfall())}`,
            upgrade: 'true',
            repeatableUpgrade: 'true'
        },
        {
            id: 'investmentDataScreenButton',
            name: `Investment Data Screen Placeholder`,
            upgrade: 'false',
            repeatableUpgrade: 'false'
        },
    ];

    let bottomButtonDetails = [{
        id: 'twoHandedPeelingButton',
        name: `Double Peeling Tool <br> ${formatToCashNotation(getPriceToEnableDoublePeeling())}`,
        upgrade: 'true',
        repeatableUpgrade: 'false'
    },
        {
            id: 'twoHandedChippingButton',
            name: `Double Chipping Tool <br> ${formatToCashNotation(getPriceToEnableDoubleChipping())}`,
            upgrade: 'true',
            repeatableUpgrade: 'false'
        },
        {
            id: 'investmentFundUnlockOrFloatButton',
            name: `Buy Investment Fund <br> ${formatToCashNotation(getPriceToUnlockInvestmentFundOrFloatOnStockMarket())}`,
            upgrade: 'true',
            repeatableUpgrade: 'false'
        },
        {
            id: 'addStorageHeaterAutoShiftStartButton',
            name: `Buy Storage Heater <br> ${formatToCashNotation(getPriceToAddStorageHeater())}`,
            upgrade: 'true',
            repeatableUpgrade: 'false'
        },
        {
            id: 'startShiftButton',
            name: 'Start Shift',
            upgrade: 'false',
            repeatableUpgrade: 'false'
        }
    ];

    setInitialStateMainButtons(mainButtonDetails);
    setInitialStateBottomRowButtons(bottomButtonDetails);

    createInvestmentComponents(bottomRowContainer);
    createInvestmentDataScreen(mainButtonContainer);

    for (let i = 0; i < mainButtonDetails.length; i++) {
        const button = document.createElement('button');
        button.id = mainButtonDetails[i].id;
        button.innerHTML = mainButtonDetails[i].name;
        button.classList.add('action-button-main');

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

    hideUpgradeButtonsGameStart(bottomSectionContainer);

    document.getElementById('titleScreen').appendChild(gameWindow);

    document.dispatchEvent(titleScreenCreatedEvent);
    disableButtons(true);

    createOptionScreenEventListeners();

    writeTextInSections(mainButtonDetails);

    handleButtonClick(getElements().menuButton.id, null);
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
    handleButtonClick(getElements().investmentFundUnlockOrFloatButton.id, getPriceToUnlockInvestmentFundOrFloatOnStockMarket());
    handleButtonClick(getElements().customerFrequencyIncreaser.id, getPriceToIncreaseFootfall());
    handleButtonClick(getElements().investmentCashComponent_IncrementButton.id, getInvestmentCashIncrementDecrement());
    handleButtonClick(getElements().investmentCashComponent_DecrementButton.id, getInvestmentCashIncrementDecrement());
    handleButtonClick(getElements().investmentRiskComponent_IncrementButton.id, getInvestmentRiskIncrementDecrement());
    handleButtonClick(getElements().investmentRiskComponent_DecrementButton.id, getInvestmentRiskIncrementDecrement());
    handleButtonClick(getElements().withdrawInvestmentButton.id, null);
}

export function writeTextInSections(buttonDetails) {
    getElements().playerRoleText.innerHTML = Role.ONE;

    getElements().subInnerDiv1_1.innerHTML = 'Shift rem. (s):';
    getElements().subInnerDiv1_2.innerHTML = "Start Shift";

    getElements().subInnerDiv3_1.innerHTML = 'Served:';
    getElements().customersServedCount.innerHTML = "0";

    getElements().subInnerDivMid1_1.innerHTML = 'Potatoes:';
    getElements().subInnerDivMid1_2.innerHTML = "0/" + getPotatoStorageQuantity().toString();

    getElements().subInnerDivMid3_1.innerHTML = 'Money:';
    getElements().subInnerDivMid3_2.innerHTML = formatToCashNotation(getStartingCash());

    buttonDetails.forEach(buttonInfo => {
        const button = getElements()[buttonInfo.id];
        button.innerHTML = buttonInfo.name;

        if (button.classList.contains('second-row-main-buttons')) {
            // Create and append checkbox
            addCheckbox(button);
        }
    });
}

export function hideUpgradeButtonsGameStart(bottomButtonsContainer) {
    bottomButtonsContainer.querySelectorAll('.action-button-main:nth-child(n+7)').forEach(button => {
        button.classList.add('hidden-button');
    });
    bottomButtonsContainer.querySelectorAll('.action-button-bottom-row:not(:last-child)').forEach(button => {
        button.classList.add('hidden-button');
    });

    if (document.getElementById('option1').innerHTML === 'Click again to start a New Game...') {
        getElements().autoPeelerUpgradeButton.classList.add('hidden-button');
        getElements().investmentDataScreen.classList.add('hidden-button');
        getElements().investmentDataScreenButton.classList.add('hidden-button');
        getElements().investmentCashComponent.classList.add('hidden-button');
        getElements().investmentRiskComponent.classList.add('hidden-button');

        getElements().withdrawInvestmentButton.classList.add('hidden-button');
    }
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
                if (getAreChipsFrying()) {
                    element.classList.add('cooking');
                    element.classList.remove('disabled');
                } else {
                    element.classList.remove('cooking');
                    element.classList.add('disabled');
                }
                break;
            case getElements().investmentFundUnlockOrFloatButton.id:
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

export function createEndOfShiftOrGamePopup() {
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');

    const popupTitle = document.createElement('div');
    popupTitle.id = 'endOfShiftOrGamePopupTitle';
    popupTitle.classList.add('popup-row');
    popupTitle.classList.add('popup-row-1');

    const popupContent = document.createElement('div');
    popupContent.id = 'endOfShiftOrGamePopupContent';
    popupContent.classList.add('popup-row');
    popupContent.classList.add('popup-row-2');

    const popupContentInnerLeft = document.createElement('div');
    popupContentInnerLeft.id = 'popupContentInnerLeft';
    popupContentInnerLeft.classList.add('popup-content-inner-left');

    const popupContentInnerRight = document.createElement('div');
    popupContentInnerRight.id = 'popupContentInnerRight';
    popupContentInnerRight.classList.add('popup-content-inner-right');

    const innerRightDiv1 = document.createElement('div');
    innerRightDiv1.classList.add('inner-right-div-1');
    innerRightDiv1.id = 'popupContentInnerRight1';

    const innerRightDiv2 = document.createElement('div');
    innerRightDiv2.classList.add('inner-right-div-2');
    innerRightDiv2.id = 'popupContentInnerRight2';

    const innerRightDiv3 = document.createElement('div');
    innerRightDiv3.classList.add('inner-right-div-3');
    innerRightDiv3.id = 'popupContentInnerRight3';

    // Append the three div elements directly to the right container
    popupContentInnerRight.appendChild(innerRightDiv1);
    popupContentInnerRight.appendChild(innerRightDiv2);
    popupContentInnerRight.appendChild(innerRightDiv3);

    popupContent.appendChild(popupContentInnerLeft);
    popupContent.appendChild(popupContentInnerRight);

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

    const observer = new MutationObserver(() => {
        popupContentInnerRight.style.height = `${popupContentInnerLeft.offsetHeight}px`;
        const popupContentInnerRight2 = document.getElementById('popupContentInnerRight2');
        if (popupContentInnerRight2) {
            popupContentInnerRight2.style.width = `${popupContentInnerRight2.offsetHeight}px`;
        }
    });

    observer.observe(popupContentInnerLeft, { childList: true, subtree: true, characterData: true });

    setTimeout(() => {
        popupContentInnerRight.style.height = `${popupContentInnerLeft.offsetHeight}px`;
    }, 0);

    return {
        popupContainer,
        continueButton
    };
}

export function createOverlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.id = 'overlay';
    overlay.style.display = "none";

    const overlayText = document.createElement('div');
    overlayText.id = 'overlayText';
    overlayText.className = 'overlay-text';
    overlayText.innerHTML = 'Congratulations, You Won!';
    overlayText.style.display = 'none';

    overlay.appendChild(overlayText);
    document.body.appendChild(overlay);

    return overlay;
}

export function toggleEndOfShiftOrGamePopup(popupContainer) {
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
    setTextAnimationDone(false);
    createSpinButton();
    createWheelOfFortune();

    const spinButton = document.getElementById('spinButton');

    let walkOuts = getCustomersWaitingBeforeEndOfShift() - getCustomersWaiting();
    let shiftCounter = getShiftCounter();
    let currentPotatoes = getActualPotatoesInStorage();
    let spudsToAdd = getSpudsToAddToShift();
    let storageQuantity = getPotatoStorageQuantity();

    let totalPotatoes = currentPotatoes + spudsToAdd;
    let nextShiftPotatoes = Math.min(totalPotatoes, storageQuantity);
    const popupTitle = getElements().endOfShiftOrGamePopupTitle;
    const popupContentInnerLeft = getElements().endOfShiftOrGamePopupContentInnerLeft;
    const popupContentInnerRight1 = getElements().endOfShiftOrGamePopupContentInnerRight1;

    if (getFloatOnStockMarketUnlockedAndEndGameFlowStarted()) {
        popupTitle.innerHTML = `<div class="popup-title" style="opacity: 0;">Congratulations!!</div>`;
        popupContentInnerLeft.innerHTML = `
            <div class="popup-content">
                <span style="color: yellow;">You have beat the game, well done!</span><br><br>
                You earned a total of ${formatToCashNotation(getTotalEarnedInSales())} in chip sales!<br>
                You spent a total of ${formatToCashNotation(getTotalSpentExcludingInvestments())} excluding investments!<br>
                You peeled a total of ${getTotalPeeled()} potatoes.<br>
                You cut a total of ${getTotalCut()} chips.<br>
                You wasted a total of ${getTotalWastedChips()} chips.<br>
                You served a total of ${getTotalServedCustomers()} customers!<br>
                Now please do the honours and fry up and serve the last customer their chips before you retire as a millionaire!
            </div>`;
    } else {
        popupTitle.innerHTML = `<div class="popup-title">End Of Shift ${shiftCounter}</div>`;
        let potatoesMessage = `Potatoes for next shift: ${currentPotatoes} + ${nextShiftPotatoes - currentPotatoes} to be delivered = ${nextShiftPotatoes}`;
        if (nextShiftPotatoes === storageQuantity) {
            potatoesMessage += " (due to max storage reached)";
        }

        let promotionMessage = "";
        if (getPromotionFlag()) {
            promotionMessage = `You were Promoted to ${getElements().playerRoleText.innerHTML}!<br><br>`;
            setPromotionFlag(false);
        }

        let investmentMessage = "";
        let growthLossMessage = "";
        let totalGrowthMessage = "";

        if (getCurrentValueOfInvestment() > getZero()) {
            investmentMessage = `Your investments of ${formatToCashNotation(getAmountInvestmentCash())} returned ${formatToCashNotation(getCurrentValueOfInvestment())} at a risk level of ${getAmountInvestmentRisk()}%`;
            if (getGrowthInvestment() >= getZero()) {
                growthLossMessage = `A growth of ${formatToCashNotation(getGrowthInvestment())} this period`;
            } else {
                growthLossMessage = `A loss of ${formatToCashNotation(Math.abs(getGrowthInvestment()))} this period`;
            }
        }

        if (getCurrentValueOfInvestment() > getZero()) {
            if (getCurrentValueOfInvestment() - getAmountInvestmentCash() >= getZero()) {
                totalGrowthMessage = `A total growth of ${formatToCashNotation(getCurrentValueOfInvestment() - getAmountInvestmentCash())}`;
            } else {
                totalGrowthMessage = `A total loss of ${formatToCashNotation(Math.abs(getCurrentValueOfInvestment() - getAmountInvestmentCash()))}`;
            }
        }

        popupContentInnerLeft.innerHTML = `
            <div>
                Your shift has ended!<br>
                Earnings: ${formatToCashNotation(getCurrentCash() - getOldCash())} this shift + ${formatToCashNotation(getOldCash())} in bank = ${formatToCashNotation(getCurrentCash())}<br>
                Customers Served: ${getCustomersServed()}<br>
                Potatoes Peeled: ${getPotatoesPeeledThisShift()}<br>
                Chips Cut: ${getChipsCutThisShift()}<br>
                Chips Fried: ${getChipsFriedThisShift()}<br>
                Chips Wasted This Shift: ${getChipsWastedThisShift()}<br>
                Customer Walkouts: ${walkOuts}<br>
                Customers Still Waiting: ${getCustomersWaiting()}<br>
                ${potatoesMessage}<br><br>
                <span style="color: yellow;">${promotionMessage}</span>
                ${investmentMessage}<br>
                ${growthLossMessage}<br>
                ${totalGrowthMessage}
            </div>`;
    }

    const titleElement = document.querySelector('.popup-title');
    titleElement.style.animation = 'slideInRight 0.5s forwards';

    setTimeout(() => {
        spinButton.classList.add('disabled');
        spinButton.disabled = true;
        const popupContentElement = popupContentInnerLeft;
        const lines = popupContentElement.innerHTML.split('<br>');
        popupContentElement.innerHTML = '';

        lines.forEach((line, index) => {
            const lineElement = document.createElement('div');
            lineElement.classList.add('popup-content');
            lineElement.innerHTML = line;
            lineElement.style.transform = 'translateX(-100%)';
            lineElement.style.opacity = '0';
            lineElement.style.animation = `slideInLeftWithOpacity 0.2s forwards`;
            lineElement.style.animationDelay = `${index * 0.2}s`;
            popupContentElement.appendChild(lineElement);
        });

        const totalLines = lines.length;
        const totalAnimationTime = totalLines * 0.2;

        setTimeout(() => {
            popupContentInnerRight1.innerHTML = `
                <div>
                    You gained a shift point!<br>
                    Your total shift points are ${getShiftPoints()}
                </div>`;

            const rightLines = popupContentInnerRight1.innerHTML.split('<br>');
            popupContentInnerRight1.innerHTML = '';

            rightLines.forEach((line, index) => {
                const lineElement = document.createElement('div');
                lineElement.classList.add('popup-content');
                lineElement.innerHTML = line;
                lineElement.style.transform = 'translateX(-100%)';
                lineElement.style.opacity = '0';
                lineElement.style.animation = `slideInRight 0.2s forwards`;
                lineElement.style.animationDelay = `${index * 0.2}s`;
                popupContentInnerRight1.appendChild(lineElement);
            });

            const rightTotalLines = rightLines.length;
            const rightTotalAnimationTime = rightTotalLines * 0.2;

            setTimeout(() => {
                const buttonElement = document.querySelector('.popup-continue-button');
                buttonElement.style.opacity = '0';
                buttonElement.style.animation = '';
                buttonElement.style.animation = 'fadeIn 1.5s forwards';

                setTextAnimationDone(true);
                spinButton.classList.remove('disabled');
                spinButton.disabled = false;
            }, rightTotalAnimationTime * 1000);

        }, totalAnimationTime * 1000);

    }, 0);
}




export function updateVisibleButtons() {
    if (!getShiftInProgress() && (getShiftCounter() > getZero() || debugFlag || getStateLoading())) {
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
        if (getCurrentCash() >= getRoleUpgrade(Role.FOUR) && (getElements().playerRoleText.innerHTML === Role.FIVE || getElements().playerRoleText.innerHTML === Role.SIX || getElements().playerRoleText.innerHTML === Role.SEVEN)) {
            getElements().fastFryerUpgradeButton.classList.remove('hidden-button');
            getElements().potatoDeliveryDoublerButton.classList.remove('hidden-button');
            getElements().customerFrequencyIncreaser.classList.remove('hidden-button');
        }
        if (getCurrentCash() >= getRoleUpgrade(Role.FIVE) && (getElements().playerRoleText.innerHTML === Role.SIX || getElements().playerRoleText.innerHTML === Role.SEVEN)) {
            getElements().investmentFundUnlockOrFloatButton.classList.remove('hidden-button');
        }

        if (!getFloatOnStockMarketUnlockedAndEndGameFlowStarted() && (getElements().playerRoleText.innerHTML === Role.SIX || getElements().playerRoleText.innerHTML === Role.SEVEN) && getInvestmentFundUnlockable() && getElements().investmentDataScreen.style.display === 'none') {
            getElements().investmentDataScreen.style.display = 'flex';
            getElements().mainButtonContainer.replaceChild(getElements().investmentDataScreen, getElements().investmentDataScreenButton);
            initialiseInvestmentScreenText();
        }
        disableButtons(false);
    }
}

function createOptionScreenEventListeners() {
    getElements().option1.addEventListener('click', function() {
        if (getElements().option1.innerHTML === 'Click again to start a New Game...') {
            resetAllVariables();
            resetCounterUiElements();
            resetUiButtonElements(getInitialStateMainButtons());
            resetUiButtonElements(getInitialStateBottomRowButtons());
            hideUpgradeButtonsGameStart(getElements().bottomSectionContainer);
            toggleMenu(false);
            disableButtons(true);
        }
        setGameInProgress(initialiseNewGame());
        updateVisibleButtons(); //for debug if money given
        setPauseAutoSaveCountdown(false);
    });
    getElements().option2.addEventListener('click', function() {
        saveGame(true);
    });
    getElements().option3.addEventListener('click', function() {
        setStateLoading(true);
        loadGame();
        setStateLoading(false);
    });
    getElements().option4.addEventListener('click', function() {
        // Add functionality for help
    });
    getElements().option5.addEventListener('click', function() {
        toggleSound();
    });
    getElements().resumeGameButton.addEventListener('click', function() {
        toggleMenu(getElements().gameWindow.style.display === 'block');
        setPauseAutoSaveCountdown(false);
    });
    popupContinueButton.addEventListener('click', function() {
        clearPopupTexts();
        toggleEndOfShiftOrGamePopup(endOfShiftOrGamePopup);
        toggleOverlay(popupOverlay);
        setCurrentRotation(getZero());
    });

    //DEBUG
    getElements().debug1.addEventListener('click', function() {
        setDebugFlag(true);
        getElements().debug1.classList.add('debug-toggledOn');
        let donation = 7200000;
        setCurrentCash(donation);
        getElements().subInnerDivMid3_2.innerHTML = formatToCashNotation(getCurrentCash());
        console.log("$" + donation + " given (debug)");
    });
}

export function changePlayerRole(element, newText, animation1, animation2) {
    setPromotionFlag(true);
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

export function createInvestmentComponents(bottomRowContainer) {
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

    investmentCashComponent_IncrementButton.innerHTML = `+1000$`;
    investmentCashComponent_DecrementButton.innerHTML = `-1000$`;

    investmentRiskComponent_IncrementButton.innerHTML = `+1% Risk`;
    investmentRiskComponent_DecrementButton.innerHTML = `-1% Risk`;
}

export function createInvestmentDataScreen(mainButtonContainer) {

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
            divElement.id = `investmentDataScreenTopRowColumn${i+1}`;
        } else {
            divElement.classList.add('bottom-row');
            divElement.id = `investmentDataScreenBottomRowColumn${i-3}`;

            if (i === 7) {
                const withdrawButton = document.createElement('button');
                withdrawButton.id = 'withdrawInvestmentButton';
                withdrawButton.innerHTML = 'Cannot Withdraw';
                withdrawButton.classList.add('investment-withdraw-button');
                withdrawButton.disabled = true;
                withdrawButton.classList.add('disabled');
                divElement.appendChild(withdrawButton);
            }
        }

        divGrid.appendChild(divElement);
    }

    investmentDataScreen.appendChild(divGrid);
    mainButtonContainer.appendChild(investmentDataScreen);
}

export function initialiseInvestmentScreenText() {
    const elements = getElements();

    const strings = [
        'Cash Invested:',
        'Current Risk:',
        'Current Value:',
        'Withdraw All:',
        `${formatToCashNotation(getAmountInvestmentCash())}`,
        `${getAmountInvestmentRisk()}%`,
        `${formatToCashNotation(getCurrentValueOfInvestment())}`,
    ];

    const keys = [
        'investmentDataScreenTopRowColumn1',
        'investmentDataScreenTopRowColumn2',
        'investmentDataScreenTopRowColumn3',
        'investmentDataScreenTopRowColumn4',
        'investmentDataScreenBottomRowColumn1',
        'investmentDataScreenBottomRowColumn2',
        'investmentDataScreenBottomRowColumn3',
    ];

    keys.forEach((key, index) => {
        const element = elements[key];
        if (element) {
            element.innerHTML = strings[index];
        }
    });
}

export function triggerEndGameScreen() {
    popupOverlay.style.opacity = '0';
    popupOverlay.style.backgroundColor = 'black';
    popupOverlay.style.transition = 'opacity 9s linear';
    toggleOverlay(popupOverlay);
    setTimeout(function() {
        popupOverlay.style.opacity = '1';
    }, 0);

    setTimeout(function() {
        document.getElementById('overlayText').style.display = 'block';
        document.getElementById('overlayText').style.animation = 'bounce 10s infinite linear, fade 2s infinite, rainbow 4s infinite';
    }, 9000);

    console.log("You won the game!");
}

export function hideButtonsReadyForEndGame() {
    const mainButtonContainer = getElements().mainButtonContainer;
    const mainButtons = mainButtonContainer.getElementsByClassName('action-button-main');
    for (let i = 5; i < mainButtons.length; i++) {
        mainButtons[i].classList.add('hidden-button');
        mainButtons[i].style.display = 'none';
    }

    const bottomRowContainer = getElements().bottomRowContainer;
    const bottomButtons = bottomRowContainer.getElementsByClassName('action-button-bottom-row');
    for (let i = 0; i < bottomButtons.length - 1; i++) {
        bottomButtons[i].classList.add('hidden-button');
        bottomButtons[i].style.display = 'none';
    }

    getElements().investmentDataScreen.classList.add('hidden-button');
    getElements().investmentDataScreen.style.display = 'none';

    getElements().investmentCashComponent.classList.add('hidden-button');
    getElements().investmentCashComponent.style.display = 'none';

    getElements().investmentRiskComponent.classList.add('hidden-button');
    getElements().investmentRiskComponent.style.display = 'none';

    getElements().withdrawInvestmentButton.classList.add('hidden-button');
    getElements().withdrawInvestmentButton.style.display = 'none';

    getElements().bottomRowContainer.classList.add('end-game-position-start-shift-button');

}

export function checkAndSetFlagCapOnUpgrades() {
    if (getCurrentSpeedAutoPeeler() >= getCapAutoPeeler() && !getAutoPeelerCapped()) {
        setAutoPeelerCapped(true);
        getElements().autoPeelerUpgradeButton.innerHTML = `Capped: ${getCapAutoPeeler()}/s`;
    }
    if (getCurrentSpeedAutoChipper() >= getCapAutoChipper() && !getAutoChipperCapped()) {
        setAutoChipperCapped(true);
        getElements().autoChipperUpgradeButton.innerHTML = `Capped: ${getCapAutoChipper()}/s`;
    }
    if (getCurrentSpeedAutoFryer() === getCapAutoFryer() && !getAutoFryerCapped()) {
        setAutoFryerCapped(true);
        getElements().autoFryerUpgradeButton.innerHTML = `Capped: ${getCapAutoFryer()}s<br> Ready in ${Math.floor(getCurrentSpeedAutoFryer())}s`;
    }
    if (getCurrentSpeedAutoStorageCollector() === getCapAutoStorageCollector() && !getAutoStorageCollectorCapped()) {
        setAutoStorageCollectorCapped(true);
        getElements().autoStorageCollectorUpgradeButton.innerHTML = `Capped: ${getCapAutoStorageCollector()}s<br> Ready in ${Math.floor(getCurrentSpeedAutoStorageCollector())}s`;
    }
    if (getCurrentSpeedAutoCustomerServer() === getCapAutoCustomerServer() && !getAutoCustomerServerCapped()) {
        setAutoCustomerServerCapped(true);
        getElements().autoCustomerServerUpgradeButton.innerHTML = `Capped: ${getCapAutoCustomerServer()}s<br> Ready in ${Math.floor(getCurrentSpeedAutoCustomerServer())}s`;
    }
    if (getPotatoStorageQuantity() >= getCapPotatoCapacity() && !getPotatoCapacityCapped()) {
        setPotatoCapacityCapped(true);
        getElements().improvePotatoStorageButton.innerHTML = `Capped: ${getCapPotatoCapacity()}`;
    }
    if (getFryerCapacity() >= getCapFryerCapacity() && !getFryerCapacityCapped()) {
        setFryerCapacityCapped(true);
        getElements().improveFryerCapacityButton.innerHTML = `Capped: ${getCapFryerCapacity()}`;
    }
    if (getFryTimer() <= getCapFryerSpeed() && !getFryerSpeedCapped()) {
        setFryerSpeedCapped(true);
        getElements().fastFryerUpgradeButton.innerHTML = `Capped: ${getCapFryerSpeed()}s`;
    }
    if (getMaxSpudsDelivery() >= getCapMaxDelivery() && !getMaxDeliveryCapped()) {
        setMaxDeliveryCapped(true);
        getElements().potatoDeliveryDoublerButton.innerHTML = `Capped: ${getCapMaxDelivery()}`;
    }
    if (getCurrentMaxValueWaitForNewCustomer() <= getCapMaxWaitCustomer() && !getMaxWaitCustomerCapped()) {
        setMaxWaitCustomerCapped(true);
        getElements().customerFrequencyIncreaser.innerHTML = `Capped: ${getCapMaxWaitCustomer()}s`;
    }
}


export function updateTextAndDisableButtonsForCappedUpgrades() {
    if (getAutoPeelerCapped()) {
        getElements().autoPeelerUpgradeButton.classList.add('capped');
        if (getElements().autoPeelerUpgradeButton.querySelector('input') === null) {
            addCheckbox(getElements().autoPeelerUpgradeButton, getElements().autoPeelerUpgradeButton.classList.contains('autoUpgradeEnabled'));
        }
    }
    if (getAutoChipperCapped()) {
        getElements().autoChipperUpgradeButton.classList.add('capped');
        if (getElements().autoChipperUpgradeButton.querySelector('input') === null) {
            addCheckbox(getElements().autoChipperUpgradeButton, getElements().autoChipperUpgradeButton.classList.contains('autoUpgradeEnabled'));
        }
    }
    if (getAutoFryerCapped()) {
        getElements().autoFryerUpgradeButton.classList.add('capped');
        if (getElements().autoFryerUpgradeButton.querySelector('input') === null) {
            addCheckbox(getElements().autoFryerUpgradeButton, getElements().autoFryerUpgradeButton.classList.contains('autoUpgradeEnabled'));
        }
    }
    if (getAutoStorageCollectorCapped()) {
        getElements().autoStorageCollectorUpgradeButton.classList.add('capped');
        if (getElements().autoStorageCollectorUpgradeButton.querySelector('input') === null) {
            addCheckbox(getElements().autoStorageCollectorUpgradeButton, getElements().autoStorageCollectorUpgradeButton.classList.contains('autoUpgradeEnabled'));
        }
    }
    if (getAutoCustomerServerCapped()) {
        getElements().autoCustomerServerUpgradeButton.classList.add('capped');
        if (getElements().autoCustomerServerUpgradeButton.querySelector('input') === null) {
            addCheckbox(getElements().autoCustomerServerUpgradeButton, getElements().autoCustomerServerUpgradeButton.classList.contains('autoUpgradeEnabled'));
        }
    }
    if (getPotatoCapacityCapped()) {
        getElements().improvePotatoStorageButton.classList.add('capped');
    }
    if (getFryerCapacityCapped()) {
        getElements().improveFryerCapacityButton.classList.add('capped');
    }
    if (getFryerSpeedCapped()) {
        getElements().fastFryerUpgradeButton.classList.add('capped');
    }
    if (getMaxDeliveryCapped()) {
        getElements().potatoDeliveryDoublerButton.classList.add('capped');
    }
    if (getMaxWaitCustomerCapped()) {
        getElements().customerFrequencyIncreaser.classList.add('capped');
    }
}

export function addCheckbox(button, state) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('button-checkbox');

    checkbox.checked = state;

    checkbox.addEventListener('click', function(event) {
        event.stopPropagation();
        if (!checkbox.checked) {
            button.classList.remove('autoUpgradeEnabled');
        } else {
            button.classList.add('autoUpgradeEnabled');
        }
    });

    button.appendChild(checkbox);
}

function clearPopupTexts() {
    const titleElement = document.querySelector('.popup-title');
    titleElement.innerHTML = '';

    const popupContentElementLeft = getElements().endOfShiftOrGamePopupContentInnerLeft;
    const popupContentElementRight1 = getElements().endOfShiftOrGamePopupContentInnerRight1;
    const popupContentElementRight2 = getElements().endOfShiftOrGamePopupContentInnerRight2;
    const popupContentElementRight3 = getElements().endOfShiftOrGamePopupContentInnerRight3;

    popupContentElementLeft.innerHTML = '';
    popupContentElementRight1.innerHTML = '';
    popupContentElementRight2.innerHTML = '';
    popupContentElementRight3.innerHTML = '';

    const buttonElement = document.querySelector('.popup-continue-button');
    buttonElement.style.opacity = '0';
    buttonElement.style.animation = '';
}

function createWheelOfFortune() {
    const wheelContainer = getElements().endOfShiftOrGamePopupContentInnerRight2;

    const numberOfSections = 4;
    const colors = getColorsForWheel(true);

    const sectionAngle = 360 / numberOfSections;

    const wheel = document.createElement('div');
    wheel.classList.add('wheel');
    wheel.id = 'wheel';
    wheelContainer.appendChild(wheel);

    for (let i = 0; i < numberOfSections; i++) {
        const section = document.createElement('div');
        section.classList.add('wheel-section');
        section.style.transform = `rotate(${i * sectionAngle}deg)`;
        section.style.backgroundColor = colors[i % colors.length];
        wheel.appendChild(section);
    }

    const centerLine = document.createElement('div');
    centerLine.classList.add('center-line');
    centerLine.id = 'wheelCenterLine';
    centerLine.style.opacity = '1';
    wheelContainer.appendChild(centerLine);

    const spinButton = document.getElementById('spinButton');
    setWheelSpinning(false);

    spinButton.addEventListener('click', function() {
        if (!getWheelSpinning()) {
            const minRotation = 875;
            const maxRotation = 3570;
            const rotation = Math.floor(Math.random() * (maxRotation - minRotation + 1)) + minRotation;
            setWheelSpinning(true);
            spinButton.disabled = true;
            spinButton.classList.add('disabled');
            setCurrentRotation(getCurrentRotation() + rotation);
            wheel.style.transform = `rotate(${getCurrentRotation()}deg)`;

            setShiftPoints(getShiftPoints() - getOne());
            const messageDiv = document.querySelector('#popupContentInnerRight1 div:nth-child(2)');

            const message = "Your total shift points are ";

            if (messageDiv.innerHTML.includes(message)) {
                const numberString = messageDiv.innerHTML.match(/\d+/)[0];
                const currentNumber = parseInt(numberString);
                const newNumber = currentNumber - getOne();
                messageDiv.innerHTML = message + newNumber.toString();
            }
        }
    });

    wheel.addEventListener('transitionend', function() {
        setWheelSpinning(false);
        setWinResult(findEndOfLineAndCheckWinningColor());
        if (getWinResult().colorsMatch) {
            console.log('The winner is ' + getWinResult().leftColor);
        } else {
            const winner = determineWinner(getWinResult().leftColor, getWinResult().rightColor);
            console.log('The winner by determination is ' + winner);
        }

        if (getShiftPoints() > getZero()) {
            spinButton.disabled = false;
            spinButton.classList.remove('disabled');
        } else {
            spinButton.innerHTML = 'No Shift Points!';
        }
        setTimeout(() => {
            wheel.style.transition = 'transform 5s cubic-bezier(0.2, 0.75, 0.5, 1)';
        }, 0);
    });
}

function createSpinButton() {
    const spinButton = document.createElement('button');
    spinButton.id = 'spinButton';
    if (getShiftPoints() > getZero()) {
        spinButton.innerHTML = 'Spin the Wheel';
    } else {
        spinButton.innerHTML = 'No Shift Points!';
    }

    getElements().endOfShiftOrGamePopupContentInnerRight3.appendChild(spinButton);

    return spinButton;
}

export function getColorsForWheel(active) {
    if (active) {
        return ['#FF0000', '#0000FF', '#FFFF00', '#00FF00'];
    } else {
        return ['#FF000030', '#0000FF30', '#FFFF0030', '#00FF0030'];
    }
}

function findEndOfLineAndCheckWinningColor() {
    const centerLine = document.getElementById('wheelCenterLine');
    const centerLineRect = centerLine.getBoundingClientRect();

    const endOfLineLeftX = centerLineRect.left - 2;
    const endOfLineLeftY = centerLineRect.top + 3;

    const endOfLineRightX = centerLineRect.right + 2;
    const endOfLineRightY = centerLineRect.top + 3;

    const leftPixelColor = getColorAtPoint(endOfLineLeftX, endOfLineLeftY);
    const rightPixelColor = getColorAtPoint(endOfLineRightX, endOfLineRightY);

    const leftHexColor = rgbToHex(leftPixelColor);
    const rightHexColor = rgbToHex(rightPixelColor);

    console.log("Color Just Before End of Line on the Left:", leftHexColor);
    console.log("Color Just After End of Line on the Right:", rightHexColor);

    const colorsMatch = leftHexColor === rightHexColor;

    return {
        leftColor: leftHexColor,
        rightColor: rightHexColor,
        colorsMatch: colorsMatch
    };
}

function getColorAtPoint(x, y) {
    const elementAtPoint = document.elementFromPoint(x, y);

    const computedStyle = window.getComputedStyle(elementAtPoint);
    return computedStyle.getPropertyValue('background-color');
}

function rgbToHex(color) {
    const rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
    const matches = color.match(rgbRegex);

    if (!matches) {
        return color;
    }

    const r = parseInt(matches[1]);
    const g = parseInt(matches[2]);
    const b = parseInt(matches[3]);

    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function determineWinner(color1, color2) {
    if (color1 === '#000000' && color2 !== '#000000') {
        return color2;
    } else if (color2 === '#000000' && color1 !== '#000000') {
        return color1;
    } else if (color1 !== color2 || (color1 === '#000000' && color2 === '#000000')) {
        const randomIndex = Math.floor(Math.random() * 2);
        if (randomIndex === 1) {
            return color1;
        } else {
            return color2;
        }
    }
}

