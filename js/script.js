
const TIMER_DURATION = 30;
const NUMBER_COUNT = 5;

let numbersToRemember = [];
let timeLeft = TIMER_DURATION;
let gameInterval;

const scoreDisplayElement = document.getElementById('scoreDisplay');
const displayAreaElement = document.getElementById('displayArea');
const instructionTextElement = document.getElementById('instructionText');
const confirmButtonElement = document.getElementById('confirmButton');
const resultAreaElement = document.getElementById('resultArea');

function generateNumbers() {
    displayAreaElement.innerHTML = '';
    instructionTextElement.classList.add('d-none');

    for (let i = 0; i < NUMBER_COUNT; i++) {
        const num = Math.floor(Math.random() * 90) + 10;
        numbersToRemember.push(num);
        displayAreaElement.innerHTML += `<div class="number-box">${num}</div>`;
    }
}

function startInputPhase() {
    scoreDisplayElement.textContent = '0';
    instructionTextElement.classList.remove('d-none');
    resultAreaElement.innerHTML = '';
    displayAreaElement.innerHTML = '';

    for (let i = 0; i < NUMBER_COUNT; i++) {
        displayAreaElement.innerHTML += `<input type="number" class="form-control input-box" id="userNum${i}">`;
    }

    confirmButtonElement.classList.remove('d-none');
    confirmButtonElement.onclick = checkResult;
}

function checkResult() {
    let userInputs = [];
    let correctCount = 0;
    let correctNumbers = [];
    let tempRemembered = [...numbersToRemember];

    for (let i = 0; i < NUMBER_COUNT; i++) {
        const inputElement = document.getElementById(`userNum${i}`);
        const value = parseInt(inputElement.value.trim(), 10);
        userInputs.push(value);
    }

    for (let i = 0; i < userInputs.length; i++) {
        const inputNum = userInputs[i];
        for (let j = 0; j < tempRemembered.length; j++) {
            if (inputNum === tempRemembered[j]) {
                correctCount++;
                correctNumbers.push(inputNum);
                tempRemembered.splice(j, 1);
                break;
            }
        }
    }

    const correctList = correctNumbers.join(',');
    resultAreaElement.innerHTML = `Hai indovinato ${correctCount} numeri! (${correctList})`;

    for (let i = 0; i < NUMBER_COUNT; i++) {
        document.getElementById(`userNum${i}`).setAttribute('disabled', true);
    }
    confirmButtonElement.classList.add('d-none');
}

document.addEventListener('DOMContentLoaded', () => {
    generateNumbers();
    scoreDisplayElement.textContent = timeLeft;

    gameInterval = setInterval(() => {
        timeLeft--;
        scoreDisplayElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            startInputPhase();
        }
    }, 1000);
});