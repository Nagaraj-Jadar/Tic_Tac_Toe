const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

// Function to check winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            showWinner(board[a]);
            return;
        }
    }

    // Check for a draw
    if (!board.includes("")) {
        gameActive = false;
        showWinner("Draw");
    }
};

// Function to display winner message
const showWinner = (winner) => {
    msg.innerText = (winner === "Draw") ? "It's a Draw!" : `Player ${winner} Wins!`;
    msgContainer.classList.remove("hide");
};

// Function to handle box click
const handleClick = (index) => {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X"; // Toggle player
    }
};

// Add event listeners to boxes
boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleClick(index));
});

// Reset game function
const resetGame = () => {
    board.fill("");
    boxes.forEach(box => box.innerText = "");
    currentPlayer = "X";
    gameActive = true;
    msgContainer.classList.add("hide");
};

// Event listeners for reset and new game buttons
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
