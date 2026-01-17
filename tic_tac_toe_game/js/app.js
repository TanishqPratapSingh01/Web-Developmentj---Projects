// ===== DOM ELEMENTS =====
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("newgame");

const xScoreText = document.getElementById("xScore");
const oScoreText = document.getElementById("oScore");

// ===== GAME STATE =====
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

let xScore = 0;
let oScore = 0;

// ===== WINNING COMBINATIONS =====
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// ===== EVENT HANDLERS =====
function handleClick(e) {
    const index = e.target.getAttribute("data-index");

    // Prevent invalid moves
    if (!gameActive || board[index] !== "" || currentPlayer !== "X") return;

    makeMove(index, "X");
    checkResult();

    if (gameActive) {
        setTimeout(computerMove, 400);
    }
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
}

function computerMove() {
    if (!gameActive) return;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            makeMove(i, "O");
            break;
        }
    }

    checkResult();
}

// ===== GAME LOGIC =====
function checkResult() {
    let roundWon = false;

    for (let combo of winCombinations) {
        const [a, b, c] = combo;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;

        if (currentPlayer === "X") {
            xScore++;
            xScoreText.textContent = xScore;
        } else {
            oScore++;
            oScoreText.textContent = oScore;
        }

        gameActive = false;
        return;
    }

    // Draw condition
    if (!board.includes("")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    // Switch turn
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent =
        currentPlayer === "X"
            ? "Your turn (X)"
            : "Computer's turn (O)";
}

// ===== RESET GAME (SCORES PERSIST) =====
function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Your turn (X)";
    cells.forEach(cell => (cell.textContent = ""));
}

// ===== ATTACH LISTENERS =====
cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
