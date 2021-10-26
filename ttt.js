const GameBoard = (() => {
    var board = [];
    board.length = 9;
    let win = false;
    let draw = false;

    const resetBoard = () => {
        board = [];
        board.length = 9;
        win = false;
        draw = false;
    };
    
    const cell = document.querySelectorAll('.cell');
    let turn = 0;
    const currentPlay = () => {
        if (turn % 2 === 0) {
            return 'o'
        } else {
            return 'x'
        }
    };

    const updateBoard = () => {
        for (i=0; i<9; i++) {
            if (board[i] != undefined) {
                cell[i].innerHTML = board[i];
                cell[i].style.color = 'black'
            } else {
                cell[i].innerHTML = '';
            }
        };
    };

    cell.forEach(event => {
        event.addEventListener('click', () => {
            const cellIndex = event.id.slice(-1);
            if (win === true || draw === true) {
                resetBoard();
                updateBoard();
                displayInfo.updateInfo(turn, win, draw);
            } else if (board[cellIndex] === undefined) {
                board[cellIndex] = currentPlay();
                turn++;
                updateBoard();
                checkWin();
                displayInfo.updateInfo(turn, win, draw);
            }
        });
    });

    const checkWin = () => {
        if (board[0] !== undefined && board[0] === board[1] && board[0] === board[2]){ //top row
            colorLine(0, 1, 2);
            applyWin();
        } else if (board[3] !== undefined && board[3] === board[4] && board[3] === board[5]){ //middle row
            colorLine(3, 4, 5);
            applyWin();
        } else if (board[6] !== undefined && board[6] === board[7] && board[6] === board[8]){ //bottom row
            colorLine(6, 7, 8);
            applyWin();
        } else if (board[0] !== undefined && board[0] === board[3] && board[0] === board[6]){ //left column
            colorLine(0, 3, 6);
            applyWin();
        } else if (board[2] !== undefined && board[2] === board[5] && board[2] === board[8]){ //right column
            colorLine(2, 5, 8);
            applyWin();
        } else if (board[1] !== undefined && board[1] === board[4] && board[1] === board[7]){ //middle column
            colorLine(1, 4, 7);
            applyWin();
        } else if (board[0] !== undefined && board[0] === board[4] && board[0] === board[8]){ //diagonal \
            colorLine(0, 4, 8);
            applyWin();
        } else if (board[2] !== undefined && board[2] === board[4] && board[2] === board[6]){ //diagonal /
            colorLine(2, 4, 6);
            applyWin();
        } else if (board.includes(undefined) === false) {
            draw = true;
        }
    };

    const colorLine = (position1, position2, position3) => {
        const cell1 = document.getElementById('cell' + position1);
        const cell2 = document.getElementById('cell' + position2);
        const cell3 = document.getElementById('cell' + position3);
        cell1.style.color = 'green';
        cell2.style.color = 'green';
        cell3.style.color = 'green';
    }

    const applyWin = () => {
        if (turn % 2 === 0) {
            playerTwo.addWin();
        } else {
            playerOne.addWin();
        }
        displayInfo.updateScore();
        win = true;
        displayInfo.updateInfo(turn, win, draw);
    }

    updateBoard();
})();

const Player = (player) => {
    let wins = 0;
    const name = document.getElementById('player' + player)
    const getName = () => name.value;
    const checkWins = () => wins;
    const addWin = () => wins++;
    return {getName, checkWins, addWin}
};

const playerOne = Player(1)
const playerTwo = Player(2)

const displayInfo =(() => {
    const playerOneScore = document.getElementById('score1');
    const playerTwoScore = document.getElementById('score2');

    const updateScore = () => {
        playerOneScore.innerHTML = playerOne.checkWins();
        playerTwoScore.innerHTML = playerTwo.checkWins();
    }

    const info = document.getElementById('info')

    const updateInfo = (turn, win, draw) => {
        if (win === true) {
            if (turn % 2 === 0) {
                info.innerHTML = playerTwo.getName() + " wins"
            } else {
                info.innerHTML = playerOne.getName() + " wins"
            }
        } else if (draw === true) {
            info.innerHTML = "Draw"
        } else if (turn % 2 === 0){
            info.innerHTML = playerOne.getName() + "'s turn"
        } else {
            info.innerHTML = playerTwo.getName() + "'s turn"
        }
    }

    updateInfo(0, false);
    updateScore();

    return {updateScore, updateInfo}
})();