let board, currentPlayer, gameActive, gameMode;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];


function startGame(mode) {
    gameMode = mode; 
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X'; 
    gameActive = true; 
    document.getElementById('message').innerText = '';
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    document.getElementById('reset-button').style.display = 'none';
}


function handleCellClick(index) {
    if (!gameActive || board[index]) return;

    board[index] = currentPlayer;
    document.querySelectorAll('.cell')[index].innerText = currentPlayer; 
    if (checkWinner()) {
        document.getElementById('message').innerText = `${currentPlayer} wins!`; 
        gameActive = false; 
        document.getElementById('reset-button').style.display = 'block';
    } else if (board.every(cell => cell)) {
        document.getElementById('message').innerText = 'Draw!'; 
        gameActive = false; 
        document.getElementById('reset-button').style.display = 'block'; 
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
        if (gameMode === 'single-player' && currentPlayer === 'O') aiMove(); 
    }
}


function checkWinner() {
    return winningCombinations.some(combination => 
        combination.every(index => board[index] === currentPlayer)
    );
}

function aiMove() {
    const emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    handleCellClick(randomIndex); 
}

// Reset the game
function resetGame() {
    startGame(gameMode); 
}
