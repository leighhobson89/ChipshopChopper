import {handleButtonClick, disableButtons, STARTING_CASH} from './actions.js';
import {
    getActualPotatoesInStorage, getChipsCutThisShift, getChipsFriedThisShift,
    getChipsFrying, getChipsReadyToServeNextShift,
    getCurrentCash, getCustomersWaiting, getFryerCapacity, getOldCash, getPotatoesPeeledThisShift,
    getPotatoStorageQuantity,
    getPriceToAddStorageHeater,
    getPriceToEnableDoubleChopping,
    getPriceToEnableDoublePeeling,
    getPriceToImproveFryerCapacity,
    getPriceToImprovePotatoStorage,
    getSpudsToAddToShift
} from './gameloop.js';

export function createTitleScreen() {
    const titleScreen = document.createElement('div');
    titleScreen.classList.add('title-screen');

    const title = document.createElement('h1');
    title.innerHTML = 'Counter Game';
    title.classList.add('title');

    const options = document.createElement('div');
    options.classList.add('options');
    options.id = 'optionsWindow';

    // Define the option names and their initial colors
    const optionInfo = [
        { name: 'New Game', color: '#007bff' },    // Blue
        { name: 'Load Game', color: '#007bff' },   // Blue
        { name: 'Help', color: '#007bff' },        // Blue
        { name: 'Toggle Sound', color: '#00cc00' } // Green
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

    titleScreen.appendChild(title);
    titleScreen.appendChild(options);

    document.body.appendChild(titleScreen);
}

export function createGameWindow() {
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
        innerDiv.id = `innerDiv${i}`;

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

    const bottomButtonsContainer = document.createElement('div');
    bottomButtonsContainer.classList.add('bottom-buttons-container');

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

    const mainButtonDetails = [
        { id: 'peelPotatoButton', name: 'Peel Potato', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'cutChipsButton', name: 'Cut Chips', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'fryChipsButton', name: `Fry Chips (Capacity: ${getFryerCapacity()})`, upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'servingStorageButton', name: 'Serving Storage', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'serveCustomerButton', name: 'Serve Customer', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'action6Button', name: 'Action 6', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'action7Button', name: 'Action 7', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'action8Button', name: 'Action 8', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'action9Button', name: 'Action 9', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'action10Button', name: 'Action 10', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'action11Button', name: 'Action 11', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'action12Button', name: 'Action 12', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'action13Button', name: 'Action 13', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'action14Button', name: 'Action 14', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'action15Button', name: 'Action 15', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'improvePotatoStorageButton', name: 'Increase Potato Cap. ' + formatToCashNotation(getPriceToImprovePotatoStorage()), upgrade: 'true', repeatableUpgrade: 'true' },
        { id: 'action17Button', name: 'Action 17', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'action18Button', name: 'Action 18', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'action19Button', name: 'Action 19', upgrade: 'false', repeatableUpgrade: 'false' },
        { id: 'action20Button', name: 'Action 20', upgrade: 'false', repeatableUpgrade: 'false' }
    ];

    const bottomButtonDetails = [
        { id: 'twoHandedPeelingButton', name: 'Double Peeling Tool ' + formatToCashNotation(getPriceToEnableDoublePeeling()), upgrade: 'true', repeatableUpgrade: 'false' },
        { id: 'twoHandedChoppingButton', name: 'Double Chopping Tool ' + formatToCashNotation(getPriceToEnableDoubleChopping()), upgrade: 'true', repeatableUpgrade: 'false' },
        { id: 'improveFryerCapacityButton', name: 'Improve Fryer Cap. ' + formatToCashNotation(getPriceToImproveFryerCapacity()), upgrade: 'true', repeatableUpgrade: 'false' },
        { id: 'addStorageHeaterButton', name: 'Buy Storage Heater ' + formatToCashNotation(getPriceToAddStorageHeater()), upgrade: 'true', repeatableUpgrade: 'false' },
        { id: 'startShiftButton', name: 'Start Shift', upgrade: 'false', repeatableUpgrade: 'false' }
    ];

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const bottomRowContainer = document.createElement('div');
    bottomRowContainer.classList.add('bottom-row-container');

    for (let i = 0; i < mainButtonDetails.length; i++) {
        const button = document.createElement('button');
        button.id = mainButtonDetails[i].id;
        button.textContent = mainButtonDetails[i].name;
        button.classList.add('action-button-main');
        buttonContainer.appendChild(button);
    }

    for (let i = 0; i < bottomButtonDetails.length; i++) {
        const button = document.createElement('button');
        button.id = bottomButtonDetails[i].id;
        button.textContent = bottomButtonDetails[i].name;
        button.classList.add('action-button-bottom-row');
        bottomRowContainer.appendChild(button);
    }

    bottomButtonsContainer.appendChild(buttonContainer);
    bottomButtonsContainer.appendChild(bottomRowContainer);

    gameWindow.appendChild(bottomButtonsContainer);

    document.body.appendChild(gameWindow);

    hideUpgradeButtonsGameStart(bottomButtonsContainer);
    disableButtons(true);
    writeTextInSections(mainButtonDetails);

    handleButtonClick('startShiftButton', 'startShift');
    handleButtonClick('peelPotatoButton', 'peeledCount');
    handleButtonClick('cutChipsButton', 'cutCount');
    handleButtonClick('fryChipsButton', 'chuckedInFryerCount');
    handleButtonClick('servingStorageButton', 'readyToServeCount');
    handleButtonClick('serveCustomerButton', 'customersWaitingCount');
    handleButtonClick('improvePotatoStorageButton', getPriceToImprovePotatoStorage());
    handleButtonClick('twoHandedPeelingButton', getPriceToEnableDoublePeeling());
    handleButtonClick('twoHandedChoppingButton', getPriceToEnableDoubleChopping());
    handleButtonClick('improveFryerCapacityButton', getPriceToImproveFryerCapacity());
    handleButtonClick('addStorageHeaterButton', getPriceToAddStorageHeater());
}

export function writeTextInSections(buttonDetails) {
    document.getElementById('innerDiv2').innerHTML = 'Chip Shop Prepper';

    document.getElementById('subInnerDiv1_1').innerHTML = 'Shift rem. (s):';
    document.getElementById('subInnerDiv1_2').innerHTML = "Start Shift";

    document.getElementById('subInnerDiv3_1').innerHTML = 'Served:';
    document.getElementById('subInnerDiv3_2').innerHTML = "0";

    document.getElementById('subInnerDivMid1_1').innerHTML = 'Potatoes:';
    document.getElementById('subInnerDivMid1_2').innerHTML = "0/" + getPotatoStorageQuantity().toString();

    document.getElementById('subInnerDivMid3_1').innerHTML = 'Money:';
    document.getElementById('subInnerDivMid3_2').innerHTML = formatToCashNotation(STARTING_CASH);

    buttonDetails.forEach(buttonInfo => {
        const button = document.getElementById(buttonInfo.id);
        button.innerHTML = buttonInfo.name;
    });
}

export function hideUpgradeButtonsGameStart(bottomButtonsContainer) {
    bottomButtonsContainer.querySelectorAll('.action-button-main:nth-child(n+6)').forEach(button => {
        button.classList.add('hidden-button');
    });
    bottomButtonsContainer.querySelectorAll('.action-button-bottom-row:not(:last-child)').forEach(button => {
        button.classList.add('hidden-button');
    });
}

export function toggleSound() {
    const soundOption = document.getElementById('option4');
    const isSoundOn = soundOption.style.backgroundColor === 'rgb(255, 0, 0)'; // Red color

    if (isSoundOn) {
        soundOption.style.backgroundColor = '#00cc00'; // Green
        console.log('Sound turned on');
        // Call your "toggleSound(on)" function here
    } else {
        soundOption.style.backgroundColor = 'rgb(255, 0, 0)'; // Red
        console.log('Sound turned off');
        // Call your "toggleSound(off)" function here
    }
}

export function formatToCashNotation(value) {
    return `$${value.toFixed(2)}`;
}

export function updateButtonStyle(buttonId) {
    const element = document.getElementById(buttonId)
    switch (buttonId) {
        case "fryChipsButton":
            if (getChipsFrying()) {
                element.classList.add('cooking');
                element.classList.remove('disabled');
            } else {
                element.classList.remove('cooking');
                element.classList.add('disabled');
            }
            break;
        default: //non repeatable upgrades
            element.classList.add('non-repeatable-upgrade-purchased');
            break;
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
    continueButton.textContent = 'Continue';
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

export function writePopupText(shiftCounter) {
    let currentPotatoes = getActualPotatoesInStorage();
    let spudsToAdd = getSpudsToAddToShift();
    let storageQuantity = getPotatoStorageQuantity();

    let totalPotatoes = currentPotatoes + spudsToAdd;
    let nextShiftPotatoes = Math.min(totalPotatoes, storageQuantity);
    const popupTitle = document.getElementById('endOfShiftPopupTitle');
    const popupContent = document.getElementById('endOfShiftPopupContent');

    popupTitle.innerHTML = `<div class="popup-title">End Of Shift ${shiftCounter}</div>`;
    let potatoesMessage = `Potatoes for next shift: ${currentPotatoes} + ${nextShiftPotatoes - currentPotatoes} to be delivered = ${nextShiftPotatoes}`;
    if (nextShiftPotatoes === storageQuantity) {
        potatoesMessage += " (due to max storage reached)";
    }

    popupContent.innerHTML = `
    <div class="popup-content">
        Your shift has ended!<br><br>
        Earnings: ${formatToCashNotation(getCurrentCash() - getOldCash())} this shift + ${formatToCashNotation(getOldCash())} in bank = ${formatToCashNotation(getCurrentCash())}<br><br>
        
        Potatoes Peeled: ${getPotatoesPeeledThisShift()}<br>
        Chips Cut: ${getChipsCutThisShift()}<br>
        Chips Fried: ${getChipsFriedThisShift()}<br>
        Chips Ready To Be Served: ${getChipsReadyToServeNextShift()}<br>
        Customers Still Waiting: ${getCustomersWaiting()}<br><br>

        ${potatoesMessage}
    </div>`;

}