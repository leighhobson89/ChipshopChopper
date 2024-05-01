// actions.js

export function handleButtonClick(buttonId, counterId) {
    const button = document.getElementById(buttonId);
    const counter = document.getElementById(counterId);

    button.addEventListener('click', () => {
        switch (buttonId) {
            case 'peelPotatoButton':
                incrementCounter(counter, 1);
                break;
            case 'cutChipsButton':
                if (parseInt(document.getElementById('peeledCount').textContent) > 0) {
                    decrementCounter('peeledCount', 1);
                    incrementCounter(counter, 5);
                }
                break;
            case 'chuckInFryerButton':
                if (parseInt(document.getElementById('cutCount').textContent) > 0) {
                    decrementCounter('cutCount', 1);
                    incrementCounter(counter, 1);
                }
                break;
            case 'servingStorageButton':
                if (parseInt(document.getElementById('chuckedInFryerCount').textContent) > 0) {
                    decrementCounter('chuckedInFryerCount', 1);
                    incrementCounter(counter, 1);
                }
                break;
            default:
                // Default behavior (increment by 1)
                incrementCounter(counter, 1);
                break;
        }
        disableButtons(false);
    });
}

function incrementCounter(counterElement, value) {
    let count = parseInt(counterElement.textContent);
    count += value;
    counterElement.textContent = count.toString();
    disableButtons(false);
}

function decrementCounter(counterId, value) {
    const counterElement = document.getElementById(counterId);
    let count = parseInt(counterElement.textContent);
    count = Math.max(0, count - value); // Ensure count is not negative
    counterElement.textContent = count.toString();
    disableButtons(false);
}

// actions.js

export function disableButtons(init) {
    const buttons = document.querySelectorAll('.action-button');
    if (!init) {
        const peeledCount = parseInt(document.getElementById('peeledCount').textContent);
        const cutCount = parseInt(document.getElementById('cutCount').textContent);
        const chuckCount = parseInt(document.getElementById('chuckedInFryerCount').textContent);

        buttons.forEach(button => {
            switch (button.id) {
                //case 'peelPotatoButton': only needed if limited potato inventory
                case 'cutChipsButton':
                    button.disabled = peeledCount <= 0;
                    break;
                case 'chuckInFryerButton':
                    button.disabled = cutCount <= 0;
                    break;
                case 'servingStorageButton':
                    button.disabled = chuckCount <= 0;
                    break;
                default:
                    button.disabled = false;
                    break;
            }

            if (button.disabled) {
                button.classList.add('disabled');
            } else {
                button.classList.remove('disabled');
            }
        });
    } else {
        buttons.forEach(button => {
            if (button.id !== "peelPotatoButton") {
                button.disabled = true;
                button.classList.add('disabled');
            }
        });
    }
}
