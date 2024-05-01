// ui.js
import {handleButtonClick, disableButtons} from "./actions.js";

export function createGameWindow() {
    const gameWindow = document.createElement('div');
    gameWindow.classList.add('game-window');
    gameWindow.id = "gameWindow";

    const topSection = document.createElement('div');
    topSection.classList.add('top-section');

    const bottomSection = document.createElement('div');
    bottomSection.classList.add('bottom-section');

    gameWindow.appendChild(topSection);
    gameWindow.appendChild(bottomSection);

    document.body.appendChild(gameWindow);
    writeTextInSections();

    handleButtonClick('peelPotatoButton', 'peeledCount');
    handleButtonClick('cutChipsButton', 'cutCount');
    handleButtonClick('chuckInFryerButton', 'chuckedInFryerCount');
    handleButtonClick('servingStorageButton', 'readyToServeCount');
}

export function createTitleScreen() {
    const titleScreen = document.createElement('div');
    titleScreen.classList.add('title-screen');

    const title = document.createElement('h1');
    title.textContent = 'Counter Game';
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
        option.textContent = optionInfo[i].name;
        option.classList.add('option');
        option.style.backgroundColor = optionInfo[i].color;
        option.id = `option${i + 1}`;
        options.appendChild(option);
    }

    titleScreen.appendChild(title);
    titleScreen.appendChild(options);

    document.body.appendChild(titleScreen);
}

export function writeTextInSections() {
    const topSection = document.querySelector('.top-section');
    const bottomSection = document.querySelector('.bottom-section');

    const topDivRow1 = document.createElement('div');
    topDivRow1.classList.add('top-div-row-1');

    const topTextRow1 = document.createElement('h2');
    topTextRow1.textContent = 'Chip Shop Chopper';
    topTextRow1.classList.add('top-section-text');

    const topDivRow2 = document.createElement('div');
    topDivRow2.classList.add('top-div-row-2');

    const bottomButtonsContainer = document.createElement('div');
    bottomButtonsContainer.classList.add('bottom-buttons-container');

    const counterIds = ['peeledCount', 'cutCount', 'chuckedInFryerCount', 'readyToServeCount'];

    for (let i = 0; i < counterIds.length; i++) {
        let valuesCounterRow = document.createElement('div');
        valuesCounterRow.classList.add('counter-columns');
        valuesCounterRow.textContent = '0';

        valuesCounterRow.id = counterIds[i];

        topDivRow2.appendChild(valuesCounterRow);
    }

    topDivRow1.appendChild(topTextRow1);

    topSection.appendChild(topDivRow1);
    topSection.appendChild(topDivRow2);

    const buttonDetails = [
        { name: 'Peel Potato', id: 'peelPotatoButton' },
        { name: 'Cut Chips', id: 'cutChipsButton' },
        { name: 'Chuck In Fryer', id: 'chuckInFryerButton' },
        { name: 'Serving Storage', id: 'servingStorageButton' },
        { name: 'Action 5', id: 'action5Button' },
        { name: 'Action 6', id: 'action6Button' },
        { name: 'Action 7', id: 'action7Button' },
        { name: 'Action 8', id: 'action8Button' },
        { name: 'Action 9', id: 'action9Button' },
        { name: 'Action 10', id: 'action10Button' },
        { name: 'Action 11', id: 'action11Button' },
        { name: 'Action 12', id: 'action12Button' },
        { name: 'Action 13', id: 'action13Button' },
        { name: 'Action 14', id: 'action14Button' },
        { name: 'Action 15', id: 'action15Button' },
        { name: 'Action 16', id: 'action16Button' }
    ];

    for (let i = 0; i < buttonDetails.length; i++) {
        const button = document.createElement('button');
        button.textContent = buttonDetails[i].name;
        button.id = buttonDetails[i].id;
        button.classList.add('action-button');

        bottomButtonsContainer.appendChild(button);
    }

    bottomSection.appendChild(bottomButtonsContainer);

    // Add disabled attribute to all buttons except 'peelPotatoButton' at start of game
    disableButtons(true);

    hideUpgradeButtons();
}

export function hideUpgradeButtons() {
    const extraButtons = document.querySelectorAll('.action-button:nth-child(n+5)');
    extraButtons.forEach(button => {
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

