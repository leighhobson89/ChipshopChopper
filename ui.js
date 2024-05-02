import {handleButtonClick, disableButtons, STARTING_CASH, POTATO_STORAGE} from "./actions.js";

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

    const buttonDetails = [
        { id: 'peelPotatoButton', name: 'Peel Potato' },
        { id: 'cutChipsButton', name: 'Cut Chips' },
        { id: 'fryChipsButton', name: 'Fry Chips' },
        { id: 'servingStorageButton', name: 'Serving Storage' },
        { id: 'serveCustomerButton', name: 'Serve Customer' },
        { id: 'action6Button', name: 'Action 6' },
        { id: 'action7Button', name: 'Action 7' },
        { id: 'startShiftButton', name: 'Start Shift' },
        { id: 'action9Button', name: 'Action 9' },
        { id: 'action10Button', name: 'Action 10' },
        { id: 'action11Button', name: 'Action 11' },
        { id: 'action12Button', name: 'Action 12' },
        { id: 'action13Button', name: 'Action 13' },
        { id: 'action14Button', name: 'Action 14' },
        { id: 'action15Button', name: 'Action 15' },
        { id: 'action16Button', name: 'Action 16' }
    ];

    for (let i = 0; i < buttonDetails.length; i++) {
        const button = document.createElement('button');
        button.id = buttonDetails[i].id;
        button.classList.add('action-button');

        bottomButtonsContainer.appendChild(button);
    }

    gameWindow.appendChild(bottomButtonsContainer);

    document.body.appendChild(gameWindow);

    hideUpgradeButtonsGameStart(bottomButtonsContainer);
    disableButtons(true);
    writeTextInSections(buttonDetails);

    handleButtonClick('startShiftButton', 'startShift');
    handleButtonClick('peelPotatoButton', 'peeledCount');
    handleButtonClick('cutChipsButton', 'cutCount');
    handleButtonClick('fryChipsButton', 'chuckedInFryerCount');
    handleButtonClick('servingStorageButton', 'readyToServeCount');
    handleButtonClick('serveCustomerButton', 'customersWaitingCount');
}

export function writeTextInSections(buttonDetails) {
    document.getElementById('innerDiv2').innerHTML = 'Chip Shop Prepper';

    document.getElementById('subInnerDiv1_1').innerHTML = 'Shift Left (s):';
    document.getElementById('subInnerDiv1_2').innerHTML = "Start Shift";

    document.getElementById('subInnerDiv3_1').innerHTML = 'Served:';
    document.getElementById('subInnerDiv3_2').innerHTML = "0";

    document.getElementById('subInnerDivMid1_1').innerHTML = 'Potatoes:';
    document.getElementById('subInnerDivMid1_2').innerHTML = "0/" + POTATO_STORAGE.toString();

    const formattedCash = `$${STARTING_CASH.toFixed(2)}`;
    document.getElementById('subInnerDivMid3_1').innerHTML = 'Money:';
    document.getElementById('subInnerDivMid3_2').innerHTML = formattedCash;

    buttonDetails.forEach(buttonInfo => {
        const button = document.getElementById(buttonInfo.id);
        button.innerHTML = buttonInfo.name;
    });
}

export function hideUpgradeButtonsGameStart(bottomButtonsContainer) {
    bottomButtonsContainer.querySelectorAll('.action-button:nth-child(n+6):not(:nth-child(8))').forEach(button => {
        button.classList.add('hidden-button');
    });
}

export function showAllButtons() {
    const hiddenButtons = document.querySelectorAll('.hidden-button');
    hiddenButtons.forEach(button => {
        button.classList.remove('hidden-button');
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

