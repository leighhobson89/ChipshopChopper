import {customerTime, setCustomerTime} from './gameloop.js';

const PORTION_SIZE = 30;

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
                let cutChipsCount = parseInt(document.getElementById('cutCount').textContent);
                let fryerIncrement = 10;
                if (cutChipsCount < fryerIncrement) {
                    fryerIncrement = cutChipsCount;
                }
                decrementCounter('cutCount', fryerIncrement);
                incrementCounter(counter, fryerIncrement);
                break;
            case 'servingStorageButton':
                let chuckedInFryerCount = parseInt(document.getElementById('chuckedInFryerCount').textContent);
                let serveIncrement = 10;
                if (chuckedInFryerCount < serveIncrement) {
                    serveIncrement = chuckedInFryerCount;
                }
                decrementCounter('chuckedInFryerCount', serveIncrement);
                incrementCounter(counter, serveIncrement);
                break;
            case 'serveCustomerButton':
                let readyToServeCount = parseInt(document.getElementById('readyToServeCount').textContent);
                let customersWaitingCount = parseInt(document.getElementById('customersWaitingCount').textContent);
                decrementCounter('readyToServeCount', PORTION_SIZE);
                decrementCounter('customersWaitingCount', 1);
                //incrementCounter(money, price);
                break;
            default:
                // Default behavior (increment by 1)
                // incrementCounter(counter, 1);
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
        const serveCount = parseInt(document.getElementById('readyToServeCount').textContent);
        const customerCount = parseInt(document.getElementById('customersWaitingCount').textContent);

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
                case 'serveCustomerButton':
                    button.disabled = customerCount <= 0 || serveCount < PORTION_SIZE;
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

export function createRandomCustomerTime() {
    const timeUntilNextCustomer = Math.floor(Math.random() * 45) + 1;
    setCustomerTimerVariable(timeUntilNextCustomer);
}

export function setCustomerTimerVariable(value) {
    setCustomerTime(value); // Update customerTime indirectly through the setter
}

export function incrementCustomersWaiting() {
    let customerCount = parseInt(document.getElementById('customersWaitingCount').textContent);
    customerCount++;
    document.getElementById('customersWaitingCount').textContent = customerCount.toString();
}
