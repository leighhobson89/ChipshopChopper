// ui.js
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

    // Append the title screen to the body
    document.body.appendChild(titleScreen);
}

export function writeTextInSections() {
    const topSection = document.querySelector('.top-section');
    const bottomSection = document.querySelector('.bottom-section');

    const topDivRow1 = document.createElement('div');
    topDivRow1.classList.add('top-div-row-1');

    const topTextRow1 = document.createElement('h2');
    topTextRow1.textContent = 'Chips Prepped';
    topTextRow1.classList.add('top-section-text');

    const topDivRow2 = document.createElement('div');
    topDivRow2.classList.add('top-div-row-2');

    const bottomButtonsContainer = document.createElement('div');
    bottomButtonsContainer.classList.add('bottom-buttons-container');

    const buttonContainerWidth = bottomButtonsContainer.offsetWidth;
    const buttonWidth = buttonContainerWidth / 4; // Assuming 4 buttons in a row

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

    const buttonNames = [
        'Peel Potato',
        'Cut Chips',
        'Chuck In Fryer',
        'Serving Storage',
        'Action 5',
        'Action 6',
        'Action 7',
        'Action 8',
        'Action 9',
        'Action 10',
        'Action 11',
        'Action 12',
        'Action 13',
        'Action 14',
        'Action 15',
        'Action 16'
    ];

    for (let i = 0; i < 16; i++) {
        const button = document.createElement('button');

        // Assign text content based on index
        button.textContent = buttonNames[i];

        button.classList.add('action-button');
        bottomButtonsContainer.appendChild(button);
    }

    bottomSection.appendChild(bottomButtonsContainer);
    hideExtraButtons(); // Hide buttons 5 to 16
}

export function hideExtraButtons() {
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

