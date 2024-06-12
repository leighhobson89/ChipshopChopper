import {
    addPrizeToPlayerStats,
    disableButtons,
    getPrizes,
    handleButtonClick,
    loadGame,
    saveGame, toggleDisable,
    toggleMenu
} from './actions.js';
import {
    debugFlag, endOfShiftOrGamePopup,
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
    getCustomersWaitingBeforeEndOfShift, getDebugFlag,
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
    setDebugFlag, setElements,
    setFryerCapacityCapped,
    setFryerSpeedCapped,
    setGameInProgress,
    setInitialStateMainButtons,
    setMaxDeliveryCapped,
    setMaxWaitCustomerCapped,
    setPauseAutoSaveCountdown,
    setPotatoCapacityCapped,
    setPromotionFlag, setShiftInProgress,
    setShiftPoints,
    setShiftPrizePot,
    setStateLoading,
    setTextAnimationDone,
    setWheelSpinning,
    setWinResult,
    wheelColors
} from './constantsAndGlobalVars.js';
import {
    initialiseNewGame, main
} from "./gameloop.js";

export function initialiseOptionsClasses() {
    getElements().resumeGameButton.classList.add('option-resume-game');
    getElements().resumeGameButton.classList.add('option-disabled');

    getElements().option2.classList.add('bg-secondary');
    getElements().option2.classList.add('option-disabled');

    getElements().option5.classList.add('bg-danger');

    getElements().resumeGameButton.classList.add('bg-secondary');
    getElements().resumeGameButton.style.color = 'white';

    getElements().debugCash.style.color = 'white';
    getElements().debugCash.classList.add('bg-danger');

    getElements().menuButton.classList.add('bg-warning');

    getElements().withdrawInvestmentButton.classList.add('bg-secondary');
    getElements().withdrawInvestmentButton.classList.add('white-important');

    getElements().endGameStartShiftButton.classList.add('bg-success');

    document.getElementById('popupContinueButton').classList.add('bg-secondary');
    document.getElementById('popupContinueButton').classList.add('white-important');
}
export function createGameWindow() {
    setInitialStateMainButtons();
    initialiseInvestmentDataScreen();

    hideUpgradeButtonsGameStart();
    disableButtons(true);

    createOptionScreenEventListeners();

    writeTextInSections();

    handleButtonClickEventListenerInitialisation(false);
}

export function writeTextInSections() {
    getElements().playerRoleText.innerHTML = `<h2>${Role.ONE}</h2>`;

    getElements().subInnerDiv1_1.innerHTML = '<h4>Shift:</h4>';
    getElements().subInnerDiv1_2.innerHTML = '<h4>Start Shift</h4>';

    getElements().subInnerDiv3_1.innerHTML = '<h4>Served:</h4>';
    getElements().customersServedCount.innerHTML = '<h4>0</h4>';

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

    if (document.getElementById('option1').innerText === 'Click again to start a New Game...') {
        getElements().autoPeelerUpgradeButton.classList.add('hidden-button');
        getElements().investmentDataScreen.classList.add('hidden-button');
        getElements().withdrawInvestmentButton.classList.add('hidden-button');
    }
}

export function toggleAutoSave() {
    const autoSaveOption = getElements().option5;

    if (!getAutoSaveOn()) {
        autoSaveOption.classList.remove('bg-danger');
        autoSaveOption.classList.add('bg-success');
        setAutoSaveOn(true);
    } else {
        autoSaveOption.classList.add('bg-danger');
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
                    toggleDisable(false, getElements().fryChipsButton);
                } else {
                    element.classList.remove('cooking');
                    toggleDisable(true, getElements().fryChipsButton);
                }
                break;
            case getElements().investmentFundUnlockOrFloatButton.id:
                element.innerHTML = `Float on Stock Market<br>${formatToCashNotation(getPriceToFloatOnStockMarket())}`;
                toggleDisable(true, getElements().investmentFundUnlockOrFloatButton);
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
                element.classList.add('action-button-main-flashing');
                toggleDisable(false, getElements().fryChipsButton);
                break;
            case getOne():
                element.classList.remove('action-button-main-flashing');
                toggleDisable(true, getElements().fryChipsButton);
                break;
        }
    }
}

export function createEndOfShiftOrGamePopup() {
    const observer = new MutationObserver(() => {
        document.getElementById('popupContentInnerRight').style.height = `${document.getElementById('popupContentInnerLeft').offsetHeight}px`;
        const popupContentInnerRight2 = document.getElementById('popupContentInnerRight2');
        if (popupContentInnerRight2) {
            popupContentInnerRight2.style.width = `${popupContentInnerRight2.offsetHeight}px`;
        }
    });

    observer.observe(document.getElementById('popupContentInnerLeft'), {
        childList: true,
        subtree: true,
        characterData: true
    });

    setTimeout(() => {
        document.getElementById('popupContentInnerRight').style.height = `${document.getElementById('popupContentInnerLeft').offsetHeight}px`;
    }, 0);

    const popupContainer = document.getElementById('endOfShiftOrGamePopup');
    const continueButton = document.getElementById('popupContinueButton');
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

export function toggleEndOfShiftOrGamePopup(popupContainer, endOfGame) {
    if (document.getElementById('endOfShiftOrGamePopup').classList.contains('d-none')) {
        popupContainer.classList.remove('d-none');
    } else {
        popupContainer.classList.add('d-none');
    }
    if (endOfGame) {
        document.querySelector('.popup-title-right').classList.add('d-none');
        document.getElementById('popupContentInnerRight').classList.add('d-none');
        document.querySelector('.popup-row-3-right').classList.add('d-none');
        document.querySelector('.popup-title-right').style.width = '0';
        document.querySelector('.popup-row-3-right').style.width = '0';
        document.querySelector('.popup-row-3-right').style.width = '0';

        document.querySelector('.popup-title-left').style.width = '100%';
        document.querySelector('.popup-row-3-left').style.width = '100%';
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
            promotionMessage = `You were Promoted to ${getElements().playerRoleText.innerText}!<br><br>`;
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
        toggleDisable(true, document.getElementById('spinButton'));
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
                const buttonElement = document.getElementById('popupContinueButton');
                buttonElement.classList.remove('bg-secondary');
                buttonElement.classList.add('bg-success');
                buttonElement.style.opacity = '0';
                buttonElement.style.animation = '';
                buttonElement.style.animation = 'fadeIn 1.5s forwards';

                setTextAnimationDone(true);
                toggleDisable(false, spinButton);

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
        if (getCurrentCash() >= getRoleUpgrade(Role.FOUR) && (getElements().playerRoleText.innerText === Role.FIVE || getElements().playerRoleText.innerText === Role.SIX || getElements().playerRoleText.innerText === Role.SEVEN)) {
            getElements().fastFryerUpgradeButton.classList.remove('hidden-button');
            getElements().potatoDeliveryDoublerButton.classList.remove('hidden-button');
        }
        if (getCurrentCash() >= getRoleUpgrade(Role.FIVE) && (getElements().playerRoleText.innerText === Role.SIX || getElements().playerRoleText.innerText === Role.SEVEN)) {
            getElements().investmentFundUnlockOrFloatButton.classList.remove('hidden-button');
        }

        if (!getFloatOnStockMarketUnlockedAndEndGameFlowStarted() && (getElements().playerRoleText.innerText === Role.SIX || getElements().playerRoleText.innerText === Role.SEVEN) && getInvestmentFundUnlockable() && getElements().investmentDataScreen.classList.contains('d-none')) {
            getElements().investmentDataScreen.classList.remove('d-none');
            initialiseInvestmentScreenText();
        }

        if (!getFloatOnStockMarketUnlockedAndEndGameFlowStarted() && (getElements().playerRoleText.innerText === Role.SIX || getElements().playerRoleText.innerText === Role.SEVEN) && getInvestmentFundUnlocked() && getElements().investmentCashComponent.classList.contains('d-none') && getElements().investmentRiskComponent.classList.contains('d-none')) {
            getElements().investmentCashComponent.classList.remove('d-none');
            getElements().investmentRiskComponent.classList.remove('d-none');
        }
        disableButtons(false);
    }
}

function createOptionScreenEventListeners() {
    getElements().option1.addEventListener('click', function() {
        if (getElements().option1.innerText === 'Click again to start a New Game...') {
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
        getElements().resumeGameButton.classList.remove('bg-secondary');
        getElements().resumeGameButton.classList.add('bg-warning');
        getElements().resumeGameButton.style.color = 'black';
    });
    getElements().option2.addEventListener('click', function() {
        saveGame(true);
    });
    getElements().option3.addEventListener('click', async function() {
        try {
            setStateLoading(true);

            await loadGame();

        } finally {
            setElements();
            handleButtonClickEventListenerInitialisation(true);
            toggleDisable(false, getElements().resumeGameButton);
            if (!getInvestmentFundUnlocked()) {
                getElements().investmentCashComponent.classList.add('d-none');
                getElements().investmentRiskComponent.classList.add('d-none');
            }
            if (!getInvestmentFundUnlockable()) {
                getElements().investmentDataScreen.classList.add('d-none');
            }
            setStateLoading(false);
        }
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
    createAndAttachEndGameShiftStartEventListener();

    //DEBUG
    getElements().debugCash.addEventListener('mouseenter', function() {
        if (!getDebugFlag()) {
            getElements().debugCash.classList.remove('bg-danger');
            getElements().debugCash.style.color = 'black';
        } else {
            getElements().debugCash.style.color = 'white';
        }
    });

    getElements().debugCash.addEventListener('mouseleave', function() {
        if (!getDebugFlag()) {
            getElements().debugCash.classList.add('bg-danger');
            getElements().debugCash.style.color = 'white';
        }
    });

    getElements().debugCash.addEventListener('click', function() {
        getElements().debugCash.classList.remove('bg-danger');
        getElements().debugCash.style.color = 'white';
        setDebugFlag(true);
        getElements().debugCash.classList.add('debug-toggledOn');
        let donation = 250000;
        setCurrentCash(donation);
        getElements().subInnerDivMid3_2.innerHTML = `<h4>${formatToCashNotation(getCurrentCash())}</h4>`;
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

export function initialiseInvestmentDataScreen() {
    getElements().withdrawInvestmentButton.classList.add('investment-withdraw-button');
    toggleDisable(true, getElements().withdrawInvestmentButton);
}

export function initialiseInvestmentScreenText() {
    const elements = getElements();

    const strings = [
        'Cash Invested:',
        'Current Risk:',
        'Current Value:',
        'Gain / Loss:',
        'Withdraw All:',
        `<h3>${formatToCashNotation(getAmountInvestmentCash())}</h3>`,
        `<h3>${getAmountInvestmentRisk()}%</h3>`,
        `<h3>${formatToCashNotation(getCurrentValueOfInvestment())}</h3>`,
        `<h3>${formatToCashNotation(getCurrentValueOfInvestment() - getAmountInvestmentCash())}</h3>`
    ];

    const keys = [
        'investmentDataScreenTopRowColumn1',
        'investmentDataScreenTopRowColumn2',
        'investmentDataScreenTopRowColumn3',
        'investmentDataScreenTopRowColumn4',
        'investmentDataScreenTopRowColumn5',
        'investmentDataScreenBottomRowColumn1',
        'investmentDataScreenBottomRowColumn2',
        'investmentDataScreenBottomRowColumn3',
        'investmentDataScreenBottomRowColumn4'
    ];

    keys.forEach((key, index) => {
        const element = elements[key];
        if (element) {
            element.innerHTML = `<h5>${strings[index]}</h5>`;
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

    getElements().investmentDataScreen.classList.add('hidden-button');
    getElements().investmentDataScreen.classList.add('d-none');

    getElements().investmentCashComponent.classList.add('hidden-button');
    getElements().investmentCashComponent.classList.add('d-none');

    getElements().investmentRiskComponent.classList.add('hidden-button');
    getElements().investmentRiskComponent.classList.add('d-none');

    getElements().withdrawInvestmentButton.classList.add('hidden-button');
    getElements().withdrawInvestmentButton.classList.add('d-none');

    getElements().endGameStartShiftButton.classList.remove('d-none');

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
        setCapped(getElements().autoPeelerUpgradeButton);
        if (getElements().autoPeelerUpgradeButton.querySelector('input') === null) {
            addCheckbox(getElements().autoPeelerUpgradeButton, getElements().autoPeelerUpgradeButton.classList.contains('autoUpgradeEnabled'));
        }
    }
    if (getAutoChipperCapped()) {
        setCapped(getElements().autoChipperUpgradeButton);
        if (getElements().autoChipperUpgradeButton.querySelector('input') === null) {
            addCheckbox(getElements().autoChipperUpgradeButton, getElements().autoChipperUpgradeButton.classList.contains('autoUpgradeEnabled'));
        }
    }
    if (getAutoFryerCapped()) {
        setCapped(getElements().autoFryerUpgradeButton);
        if (getElements().autoFryerUpgradeButton.querySelector('input') === null) {
            addCheckbox(getElements().autoFryerUpgradeButton, getElements().autoFryerUpgradeButton.classList.contains('autoUpgradeEnabled'));
        }
    }
    if (getAutoStorageCollectorCapped()) {
        setCapped(getElements().autoStorageCollectorUpgradeButton);
        if (getElements().autoStorageCollectorUpgradeButton.querySelector('input') === null) {
            addCheckbox(getElements().autoStorageCollectorUpgradeButton, getElements().autoStorageCollectorUpgradeButton.classList.contains('autoUpgradeEnabled'));
        }
    }
    if (getAutoCustomerServerCapped()) {
        setCapped(getElements().autoCustomerServerUpgradeButton);
        if (getElements().autoCustomerServerUpgradeButton.querySelector('input') === null) {
            addCheckbox(getElements().autoCustomerServerUpgradeButton, getElements().autoCustomerServerUpgradeButton.classList.contains('autoUpgradeEnabled'));
        }
    }
    if (getPotatoCapacityCapped()) {
        setCapped(getElements().improvePotatoStorageButton);
    }
    if (getFryerCapacityCapped()) {
        setCapped(getElements().improveFryerCapacityButton);
    }
    if (getFryerSpeedCapped()) {
        setCapped(getElements().fastFryerUpgradeButton);
    }
    if (getMaxDeliveryCapped()) {
        setCapped(getElements().potatoDeliveryDoublerButton);
    }
    if (getMaxWaitCustomerCapped()) {
        setCapped(getElements().customerFrequencyIncreaser);
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

    const buttonElement = document.getElementById('popupContinueButton');
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
            toggleDisable(true, spinButton);
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
            toggleDisable(false, spinButton);
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
    spinButton.classList.add('btn');
    spinButton.classList.add('bg-secondary');
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
    document.getElementById('popupContinueButton').addEventListener('click', function() {
        clearPopupTexts();
        toggleEndOfShiftOrGamePopup(document.getElementById('endOfShiftOrGamePopup'), false);
        toggleOverlay(popupOverlay);
        setCurrentRotation(getZero());
    });
}

export function createAndAttachEndGameShiftStartEventListener() {
    document.getElementById('endGameStartShiftButton').addEventListener('click', function() {
        if (getFloatOnStockMarketUnlockedAndEndGameFlowStarted()) {
            setShiftInProgress(true);
            console.log("Started Final Shift!");
            getElements().endGameStartShiftButton.classList.add('d-none');
        }
    });
}

function setCapped(element) {
    element.classList.remove('bg-warning');
    element.classList.add('bg-secondary');
    element.classList.add('capped');
}

export function handleButtonClickEventListenerInitialisation(loading) {
    handleButtonClick(getElements().menuButton.id, null, loading);
    handleButtonClick(getElements().startShiftButton.id, null, loading);
    handleButtonClick(getElements().peelPotatoButton.id, getElements().peeledCount.id, loading);
    handleButtonClick(getElements().cutChipsButton.id, getElements().cutCount.id, loading);
    handleButtonClick(getElements().fryChipsButton.id, getElements().chuckedInFryerCount.id, loading);
    handleButtonClick(getElements().servingStorageButton.id, getElements().readyToServeCount.id, loading);
    handleButtonClick(getElements().serveCustomerButton.id, getElements().customersWaitingCount.id, loading);
    handleButtonClick(getElements().improvePotatoStorageButton.id, getPriceToImprovePotatoStorage(), loading);
    handleButtonClick(getElements().twoHandedPeelingButton.id, getPriceToEnableDoublePeeling(), loading);
    handleButtonClick(getElements().twoHandedChippingButton.id, getPriceToEnableDoubleChipping(), loading);
    handleButtonClick(getElements().improveFryerCapacityButton.id, getPriceToImproveFryerCapacity(), loading);
    handleButtonClick(getElements().addStorageHeaterAutoShiftStartButton.id, getPriceToAddStorageHeater(), loading);
    handleButtonClick(getElements().autoPeelerUpgradeButton.id, getPriceToImproveAutoPeeler(), loading);
    handleButtonClick(getElements().autoChipperUpgradeButton.id, getPriceToImproveAutoChipper(), loading);
    handleButtonClick(getElements().autoFryerUpgradeButton.id, getPriceToImproveAutoFryerWhenFryerEmptyAndChipsCut(), loading);
    handleButtonClick(getElements().autoStorageCollectorUpgradeButton.id, getPriceToImproveAutoMoverFromFryerToStorage(), loading);
    handleButtonClick(getElements().autoCustomerServerUpgradeButton.id, getPriceToImproveAutoCustomerServer(), loading);
    handleButtonClick(getElements().fastFryerUpgradeButton.id, getPriceToImproveFryTimer(), loading);
    handleButtonClick(getElements().potatoDeliveryDoublerButton.id, getPriceToDoubleSpudsMax(), loading);
    handleButtonClick(getElements().investmentFundUnlockOrFloatButton.id, getPriceToUnlockInvestmentFundOrFloatOnStockMarket(), loading);
    handleButtonClick(getElements().customerFrequencyIncreaser.id, getPriceToIncreaseFootfall(), loading);
    handleButtonClick(getElements().investmentCashComponent_IncrementButton.id, getInvestmentCashIncrementDecrement(), loading);
    handleButtonClick(getElements().investmentCashComponent_DecrementButton.id, getInvestmentCashIncrementDecrement(), loading);
    handleButtonClick(getElements().investmentRiskComponent_IncrementButton.id, getInvestmentRiskIncrementDecrement(), loading);
    handleButtonClick(getElements().investmentRiskComponent_DecrementButton.id, getInvestmentRiskIncrementDecrement(), loading);
    handleButtonClick(getElements().withdrawInvestmentButton.id, null, loading);
}