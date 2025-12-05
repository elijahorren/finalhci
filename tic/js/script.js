const board = document.getElementById('board');
const status = document.getElementById('status');
let cells = [];
let boardState = Array(9).fill(null);
let gameActive = true;

let currentPlayer = 'X';


function createBoard() {
    board.innerHTML = '';
    cells = [];
    status.textContent = `New Game! Player ${currentPlayer}'s turn`;
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleMove);
        board.appendChild(cell);
        cells.push(cell);
    }
}


function resetGame() {
    console.log('Game reset');
    boardState = Array(9).fill(null);
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
    createBoard();
}

function handleMove(event) {
    const index = event.target.dataset.index;
    console.log(index);


    if (!boardState[index]) {
        boardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
    }

    if (event.target.textContent === 'X') {
        event.target.classList.add('x');

    } else if (event.target.textContent === 'O') {
        event.target.classList.add('o');
    }

    if (event.target.textContent !== '') {
        event.target.removeEventListener('click', handleMove);
    }

    if (checkWin()) {
        status.textContent = `Player ${boardState[index]} wins!`;
        cells.forEach(cell => {
            cell.removeEventListener('click', handleMove);
            cell.classList.add('disabled');
        });
        return;
    }

    if (!boardState.includes(null)) {
        status.textContent = "It's a draw!";
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;

}

function checkWin() {
    const winGame = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (const combination of winGame) {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            status.textContent = `Player ${boardState[a]} wins!`;
            return true;
        }
    }
    return false;
}

createBoard()
