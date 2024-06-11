import {
    addPrizeToPlayerStats,
    disableButtons,
    getPrizes,
    handleButtonClick,
    loadGame,
    saveGame,
    toggleMenu
} from './actions.js';
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
    getAutoSaveOn,
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
    getNumberOfWheelSections,
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
    getShiftPrizePot,
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
    getWheelSpinning,
    getWinResult,
    getZero,
    popupContinueButton,
    popupOverlay,
    resetAllVariables,
    resetCounterUiElements,
    Role,
    setAutoChipperCapped,
    setAutoCustomerServerCapped,
    setAutoFryerCapped,
    setAutoPeelerCapped,
    setAutoSaveOn,
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
    setShiftPrizePot,
    setStateLoading,
    setTextAnimationDone,
    setWheelSpinning,
    setWinResult,
    wheelColors
} from './constantsAndGlobalVars.js';
import {
    initialiseNewGame
} from "./gameloop.js";

export function createTitleScreen() {
    getElements().resumeGameButton.classList.add('option-resume-game');
    getElements().resumeGameButton.classList.add('option-disabled');

    getElements().option2.classList.add('option-disabled'); //DISABLE SAVE GAME FOR FIRST OPEN OF GAME OR BROWSER REFRESH
}
export function createGameWindow() {
    setInitialStateMainButtons();
    //TODO createInvestmentComponents(bottomRowContainer);
    initialiseInvestmentDataScreen();

    hideUpgradeButtonsGameStart();
    disableButtons(true);

    createOptionScreenEventListeners();

    writeTextInSections();

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
    //TODO handleButtonClick(getElements().investmentCashComponent_IncrementButton.id, getInvestmentCashIncrementDecrement());
    //TODO handleButtonClick(getElements().investmentCashComponent_DecrementButton.id, getInvestmentCashIncrementDecrement());
    //TODO handleButtonClick(getElements().investmentRiskComponent_IncrementButton.id, getInvestmentRiskIncrementDecrement());
    //TODO handleButtonClick(getElements().investmentRiskComponent_DecrementButton.id, getInvestmentRiskIncrementDecrement());
    handleButtonClick(getElements().withdrawInvestmentButton.id, null);
}

export function writeTextInSections() {
    getElements().playerRoleText.innerHTML = Role.ONE;

    getElements().subInnerDiv1_1.innerHTML = '<h4>Shift:</h4>';
    getElements().subInnerDiv1_2.innerHTML = "<h4>Start Shift</h4>";

    getElements().subInnerDiv3_1.innerHTML = '<h4>Served:</h4>';
    getElements().customersServedCount.innerHTML = "<h4>0</h4>";

    getElements().subInnerDivMid1_1.innerHTML = '<h4>Potato:</h4>';
    getElements().subInnerDivMid1_2.innerHTML = `<h4>0/${getPotatoStorageQuantity()}</h4>`;

    getElements().subInnerDivMid3_1.innerHTML = '<h4>Money:</h4>';
    getElements().subInnerDivMid3_2.innerHTML = `<h4>${formatToCashNotation(getStartingCash())}</h4>`;

    document.querySelectorAll('.gameButton').forEach(buttonInfo => {
        const button = getElements()[buttonInfo.id];

        if (button.classList.contains('second-row-main-buttons')) {
            // Create and append checkbox
            addCheckbox(button);
        }
    });
}

export function hideUpgradeButtonsGameStart() {
    getElements().mainButtonContainer.querySelectorAll('.gameButton').forEach(button => {
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

export function toggleAutoSave() {
    const autoSaveOption = getElements().option5;

    if (!getAutoSaveOn()) {
        autoSaveOption.classList.remove('bg-warning');
        autoSaveOption.classList.add('bg-success');
        setAutoSaveOn(true);
    } else {
        autoSaveOption.classList.add('bg-warning');
        autoSaveOption.classList.remove('bg-success');
        setAutoSaveOn(false);
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

    const popupTitleLeft = document.createElement('div');
    popupTitleLeft.classList.add('popup-title-left');

    const popupTitleRight = document.createElement('div');
    popupTitleRight.classList.add('popup-title-right');

    popupTitle.appendChild(popupTitleLeft);
    popupTitle.appendChild(popupTitleRight);

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

    // Append the three div elements directly to the right container
    popupContentInnerRight.appendChild(innerRightDiv1);
    popupContentInnerRight.appendChild(innerRightDiv2);

    popupContent.appendChild(popupContentInnerLeft);
    popupContent.appendChild(popupContentInnerRight);

    const popupRow3 = document.createElement('div');
    popupRow3.classList.add('popup-row');
    popupRow3.classList.add('popup-row-3');

    const popupRow3Left = document.createElement('div');
    popupRow3Left.classList.add('popup-row-3-left');

    const popupRow3Right = document.createElement('div');
    popupRow3Right.classList.add('popup-row-3-right');

    popupRow3.appendChild(popupRow3Left);
    popupRow3.appendChild(popupRow3Right);

    const continueButton = document.createElement('button');
    continueButton.innerHTML = 'Continue';
    continueButton.classList.add('popup-continue-button');
    popupRow3Left.appendChild(continueButton);
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

    observer.observe(popupContentInnerLeft, {
        childList: true,
        subtree: true,
        characterData: true
    });

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
    document.querySelector('.popup-row-3-right').innerHTML = '';
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
    const popupTitleLeft = document.querySelector('.popup-title-left');
    const popupContentInnerLeft = getElements().endOfShiftOrGamePopupContentInnerLeft;
    const popupContentInnerRight1 = getElements().endOfShiftOrGamePopupContentInnerRight1;

    if (getFloatOnStockMarketUnlockedAndEndGameFlowStarted()) {
        popupTitleLeft.innerHTML = `<div class="popup-title" style="opacity: 0;">Congratulations!!</div>`;
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
        popupTitleLeft.innerHTML = `<div class="popup-title">End Of Shift ${shiftCounter}</div>`;
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

        const prizeDiv = document.querySelector('.popup-title-right');
        prizeDiv.innerHTML = '';

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

                const prizes = getPrizes();

                const prizeStrings = extractPrizeNames(prizes);

                setShiftPrizePot(prizeStrings);

                prizeDiv.innerHTML = prizes;
                prizeDiv.style.opacity = '0';
                prizeDiv.style.animation = '';
                prizeDiv.style.animation = 'fadeIn 1.5s forwards';

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
        if (getCurrentCash() >= getPriceToIncreaseFootfall()) {
            getElements().customerFrequencyIncreaser.classList.remove('hidden-button');
        }
        //third phase upgrades
        if (getCurrentCash() >= getRoleUpgrade(Role.FOUR) && (getElements().playerRoleText.innerHTML === Role.FIVE || getElements().playerRoleText.innerHTML === Role.SIX || getElements().playerRoleText.innerHTML === Role.SEVEN)) {
            getElements().fastFryerUpgradeButton.classList.remove('hidden-button');
            getElements().potatoDeliveryDoublerButton.classList.remove('hidden-button');
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
            setInitialStateMainButtons();
            hideUpgradeButtonsGameStart();
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
        toggleAutoSave();
    });
    getElements().resumeGameButton.addEventListener('click', function() {
        toggleMenu(!getElements().gameWindow.classList.contains('d-none'));
        setPauseAutoSaveCountdown(false);
    });

    createAndAttachContinueButtonEventListener();

    //DEBUG
    getElements().debugCash.addEventListener('click', function() {
        setDebugFlag(true);
        getElements().debugCash.classList.add('debug-toggledOn');
        let donation = 25000;
        setCurrentCash(donation);
        getElements().subInnerDivMid3_2.innerHTML = formatToCashNotation(getCurrentCash());
        console.log("$" + donation + " given (debug)");
    });
}

export function changePlayerRole(element, newText, animation1, animation2) {
    setPromotionFlag(true);
    element.classList.add(animation1);
    element.classList.add(animation2);

    element.innerHTML = `<h2>${newText}</h2>`;

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

export function initialiseInvestmentDataScreen() {
    getElements().withdrawInvestmentButton.classList.add('investment-withdraw-button');
    getElements().withdrawInvestmentButton.disabled = true;
    getElements().withdrawInvestmentButton.classList.add('disabled');
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

    popupContentElementLeft.innerHTML = '';
    popupContentElementRight1.innerHTML = '';
    popupContentElementRight2.innerHTML = '';

    const buttonElement = document.querySelector('.popup-continue-button');
    buttonElement.style.opacity = '0';
    buttonElement.style.animation = '';
}

function createWheelOfFortune() {
    const wheelContainer = getElements().endOfShiftOrGamePopupContentInnerRight2;

    const numberOfSections = getNumberOfWheelSections();
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
        let winner;
        setWheelSpinning(false);
        setWinResult(findEndOfLineAndCheckWinningColor());
        if (getWinResult().colorsMatch) {
            winner = getWinResult().leftColor;
            console.log('The winner is ' + winner);
        } else {
            winner = determineWinner(getWinResult().leftColor, getWinResult().rightColor);
            console.log('The winner by determination is ' + winner);
        }
        const prizeString = showWheelPrizeString(winner);
        addPrizeToPlayerStats(prizeString);

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

    document.querySelector('.popup-row-3-right').appendChild(spinButton);
}

export function getColorsForWheel(active) {
    if (active) {
        return wheelColors.NORMAL;
    } else {
        return wheelColors.TRANSPARENT;
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
    if (color1 !== color2) {
        const randomIndex = Math.floor(Math.random() * 2);
        if (randomIndex === 1) {
            return color1;
        } else {
            return color2;
        }
    }
}

function showWheelPrizeString(winningColor) {
    const prizeString = getPrizeFromWinningColor(winningColor);
    const wheelCenterLine = document.getElementById('wheelCenterLine');

    const wheelCenterRect = wheelCenterLine.getBoundingClientRect();
    const wheelCenterX = wheelCenterRect.left + wheelCenterRect.width / 2;
    const wheelCenterY = wheelCenterRect.top + wheelCenterRect.height / 2;

    animatedTextString(wheelCenterX, wheelCenterY, prizeString);

    return prizeString;
}

function getPrizeFromWinningColor(winningColor) {
    switch (winningColor) {
        case wheelColors.NORMAL[0]:
            return getShiftPrizePot()[0];
        case wheelColors.NORMAL[1]:
            return getShiftPrizePot()[1];
        case wheelColors.NORMAL[2]:
            return getShiftPrizePot()[2];
        case wheelColors.NORMAL[3]:
            return getShiftPrizePot()[3];
    }
}

function extractPrizeNames(htmlString) {
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlString;

    const prizeDivs = tempContainer.querySelectorAll('.prize-item');
    return Array.from(prizeDivs).map(div => div.innerHTML);
}

export function animatedTextString(x, y, displayString) {
    // Create the text element
    const textString = document.createElement('div');
    textString.classList.add('stroke-text');
    textString.textContent = displayString;
    textString.classList.add('animated-text-string');

    // Calculate the initial position
    document.body.appendChild(textString);
    const textStringTop = y - textString.offsetHeight;
    const textStringLeft = x - textString.offsetWidth;

    // Set the initial position and styles
    textString.style.position = 'absolute';
    textString.style.top = textStringTop + 'px';
    textString.style.left = textStringLeft + 'px';

    // Apply the initial styles to the text element
    textString.style.opacity = '1';
    textString.style.color = 'white';

    // Start the animation after a short delay
    setTimeout(() => {
        textString.style.top = '30%';
        textString.style.opacity = '0';
        textString.style.color = 'black';
    }, 100);

    setTimeout(() => {
        document.body.removeChild(textString);
    }, 2100);

    return displayString;
}

export function getElementMidpoint(elementId) {
    const element = document.getElementById(elementId);

    if (!element) {
        throw new Error(`Element with ID ${elementId} not found`);
    }

    const rect = element.getBoundingClientRect();
    const midX = rect.left + rect.width / 2;
    const midY = rect.top + rect.height / 2;

    return {
        x: midX,
        y: midY
    };
}

export function createAndAttachContinueButtonEventListener() {
    popupContinueButton.addEventListener('click', function() {
        //TODO clearPopupTexts();
        //TODO toggleEndOfShiftOrGamePopup(endOfShiftOrGamePopup);
        //TODO toggleOverlay(popupOverlay);
        setCurrentRotation(getZero());
    });
}