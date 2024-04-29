const boardContainer = document.getElementById('board-container');
const resetBtn = document.getElementById('reset-btn');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;

function handleCellClick(event) {
  const cell = event.target;
  if (!gameOver && !cell.textContent) {
    cell.textContent = currentPlayer;
    board[parseInt(cell.dataset.index)] = currentPlayer;
    checkWin();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      gameOver = true;
      alert(`Player ${currentPlayer} wins!`);
      break;
    }
  }
}

function createBoard() {
  board = Array(9).fill(null);
  gameOver = false;
  boardContainer.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    boardContainer.appendChild(cell);
  }
}

function resetGame() {
  gameOver = false;
  currentPlayer = 'X';
  createBoard();
}

resetBtn.addEventListener('click', resetGame);
createBoard();