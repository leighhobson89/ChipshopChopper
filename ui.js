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

    const topTextRow2 = document.createElement('h2');
    topTextRow2.textContent = '0';
    topTextRow2.classList.add('top-section-text');

    topDivRow1.appendChild(topTextRow1);
    topDivRow2.appendChild(topTextRow2);

    topSection.appendChild(topDivRow1);
    topSection.appendChild(topDivRow2);

    const bottomSectionText = document.createElement('h2');
    bottomSectionText.textContent = 'Hello World';
    bottomSectionText.classList.add('bottom-section-text');

    bottomSection.appendChild(bottomSectionText);
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

