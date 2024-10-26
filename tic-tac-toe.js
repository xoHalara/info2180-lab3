document.addEventListener(`DOMContentLoaded`,() => {
    const squares = document.querySelectorAll(`#board div`);
    const status = document.getElementById('status');
    const newGameButton = document.querySelector('.btn');
    let currentPlayer = 'X';
    let gameOver = false;
    const gameState = Array(9).fill(null);

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //Columns
        [0, 4, 8], [2, 4, 6] //Diagonals
    ];

    //Checking for a winner
    function checkWinner() {
        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                status.textContent = `Congratulations! ${gameState[a]} is the Winner!`;
                status.classList.add('you-won');
                gameOver = true;
                return true;
            }
        }
        return false;
    }

    function resetGame() {
        gameState.fill(null);
        currentPlayer = 'X';
        gameOver = false;
        status.textContent = 'Move your mouse over a square and click to play an X or an O.';
        status.classList.remove('you-won');
        squares.forEach(square => {
            square.textContent = '';
            square.classList.remove('X', 'O');
        });
    }

    squares.forEach((square, index) => {
        square.classList.add('square');

        square.addEventListener('click', () => {
            if (!gameState[index] && !gameOver) {
                square.textContent = currentPlayer;
                square.classList.add(currentPlayer);
                gameState[index] = currentPlayer;

                if (!checkWinner()) {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }  
            }
        });
    });

    newGameButton.addEventListener('click',resetGame);
});