let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let gameMode = "player-vs-player"; 
const statusDisplay = document.getElementById('game-status');


const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function updateStatus(message = null) {
    statusDisplay.textContent = message || (gameActive ? `Player ${currentPlayer}'s Turn` : `Game Over`);
}


function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        updateStatus(`Game Over: Player ${currentPlayer} Wins!`);
        return;
    }

    
    if (!board.includes("")) {
        updateStatus("Game Over: It's a Draw!");
        gameActive = false;
    }
}


function handleCellClick(event) {
    const cellIndex = parseInt(event.target.getAttribute('data-index'));

    
    if (board[cellIndex] !== "" || !gameActive) {
        return;
    }

    
    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

   
    checkResult();

    
    if (gameActive && gameMode === "player-vs-ai" && currentPlayer === "X") {
        currentPlayer = "O"; 
        updateStatus(`Player ${currentPlayer}'s Turn`);
        setTimeout(aiMove, 500); 
    } else if (gameActive && gameMode === "player-vs-player") {
        
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatus(`Player ${currentPlayer}'s Turn`);
    }
}


function aiMove() {
    
    let availableCells = board.map((val, index) => (val === "" ? index : null)).filter(val => val !== null);

   
    let randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];

    
    board[randomCell] = currentPlayer;
    document.querySelector(`.cell[data-index='${randomCell}']`).textContent = currentPlayer;

   
    checkResult();

    
    if (gameActive) {
        currentPlayer = "X";
        updateStatus(`Player ${currentPlayer}'s Turn`);
    }
}


function handleResetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = "");
    updateStatus(`Player X's Turn`);
}


function handleGameModeChange(event) {
    gameMode = event.target.value; 
    handleResetGame(); 
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('reset').addEventListener('click', handleResetGame);


document.getElementById('game-mode').addEventListener('change', handleGameModeChange);
