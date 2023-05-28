const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
let options = Array(9).fill("");
let currentPlayer = "X";
let running = true;

const audio1 = new Audio('sound/NIGERS.wav');
audio1.volume = 0.08;

const audioWin = new Audio('sound/winsound.mp3');
audioWin.volume = 0.04;

let videoElem;


initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    updateStatus(`Ход игрока ${currentPlayer}`);
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] != "" || !running) return;
    updateCell(this, cellIndex);
    checkWinner();
}


function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    changePlayer();

    audio1.play();
    audio1.currentTime = 0;
}

function changePlayer() {
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    updateStatus(`Ход игрока ${currentPlayer}`);
}

function checkWinner() {
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (options[a] && options[a] == options[b] && options[b] == options[c]) {
            updateStatus(`Победил ${options[a]}!`);
            audioWin.play();
            createVideo();
            audioWin.currentTime = 0;
            running = false;
            return;
        }
    }
    if (!options.includes("")) {
        updateStatus("Ничья!");
        running = false;
    }
}

function restartGame() {
    currentPlayer = "X";
    options.fill("");
    updateStatus(`Ход игрока ${currentPlayer}`);
    cells.forEach(cell => cell.textContent = "");
    running = true;

    audio1.pause();
    audio1.currentTime = 0;

    audioWin.pause();
    audioWin.currentTime = 0;
    videoElem.remove();
}

function updateStatus(str) {
    statusText.textContent = str;
}

const body = document.querySelector('body');

let color1 = '#ff0000';
let color2 = '#ffff00';
let color3 = 'fff00';

function createVideo(){
    const element = `<video class="video" src="video/history.mp4" autoplay muted></video>`;
    body.insertAdjacentHTML('afterbegin', element);
    videoElem = document.querySelector('.video');
    setTimeout(()=>{
        videoElem.remove();
    }, 9000)
}