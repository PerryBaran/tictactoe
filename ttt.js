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
        startingTurn++
        turn = startingTurn;
    };

    let startingTurn = 0;
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

    const cell = document.querySelectorAll('.cell');
    var waiting = false;
    cell.forEach(event => {
        event.addEventListener('click', () => {
            if (waiting) {
                return
            } else {
                const cellIndex = event.id.slice(-1);
                if (win === true || draw === true) {
                    resetBoard();
                    updateBoard();
                    displayInfo.updateInfo(turn, win, draw);
                } else if (playerTwo.isComputer() && turn % 2 !== 0) {
                } else if (board[cellIndex] === undefined) {
                    board[cellIndex] = currentPlay();
                    turn++;
                    updateBoard();
                    checkWin();
                    displayInfo.updateInfo(turn, win, draw);
                }
                if (playerTwo.isComputer() && win === false && draw === false && turn % 2 !== 0) {
                    waiting = true;
                    setTimeout(() => {
                        var play = computerPlay();
                        board[play] = currentPlay();
                        turn++;
                        updateBoard();
                        checkWin();
                        displayInfo.updateInfo(turn, win, draw);
                        waiting = false;
                    }, 300);   
                }
            }
        });
    });

    const checkWin = () => {
        if (board[0] !== undefined && board[0] === board[1] && board[0] === board[2]){ //top row
            colorLine(0, 1, 2);
            win = true;
        } if (board[3] !== undefined && board[3] === board[4] && board[3] === board[5]){ //middle row
            colorLine(3, 4, 5);
            win = true;
        } if (board[6] !== undefined && board[6] === board[7] && board[6] === board[8]){ //bottom row
            colorLine(6, 7, 8);
            win = true;
        } if (board[0] !== undefined && board[0] === board[3] && board[0] === board[6]){ //left column
            colorLine(0, 3, 6);
            win = true;
        } if (board[2] !== undefined && board[2] === board[5] && board[2] === board[8]){ //right column
            colorLine(2, 5, 8);
            win = true;
        } if (board[1] !== undefined && board[1] === board[4] && board[1] === board[7]){ //middle column
            colorLine(1, 4, 7);
            win = true;
        } if (board[0] !== undefined && board[0] === board[4] && board[0] === board[8]){ //diagonal \
            colorLine(0, 4, 8);
            win = true;
        } if (board[2] !== undefined && board[2] === board[4] && board[2] === board[6]){ //diagonal /
            colorLine(2, 4, 6);
            win = true;
        }
        if (win) {
            applyWin();
        } else if (!board.includes(undefined)) {
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
        displayInfo.updateInfo(turn, win, draw);
    }

    const computerPlay = () => {
        const play = () => Math.floor(Math.random()*9)
        var currentPlay = play();
        while (board[currentPlay] !== undefined) {
            currentPlay = play();
        } return currentPlay
    };

    updateBoard();
})();

const Player = (player) => {
    let wins = 0;
    var computer = false;
    const name = document.getElementById('player' + player)
    const getName = () => name.value;
    const checkWins = () => wins;
    const addWin = () => wins++;
    const changeComputer = () => computer = (computer ? false : true);
    const isComputer = () => computer; 
    return {getName, checkWins, addWin, changeComputer, isComputer}
};


const playerOne = Player(1)
const playerTwo = Player(2)

const swapComputer = (() => {
    const button = document.getElementById('switch');
    button.dataset.index = '0';
    var savedName = 'Player 2'
    button.addEventListener('click', () => {
        const name = document.getElementById('player2')
        if (button.dataset.index === '0') {
            savedName = name.value;
            name.value = 'Computer 1';
            name.setAttribute('readonly', true)
            button.innerHTML = 'C';
            button.dataset.index = '1';
        } else {
            name.value = savedName;
            name.removeAttribute('readonly')
            button.innerHTML = 'P';
            button.dataset.index = '0';
        }
        playerTwo.changeComputer();
    });
})();

const displayInfo = (() => {
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
            if (playerOne.getName().slice(-1) === 's') {
                info.innerHTML = playerOne.getName() + "' turn"
            } else {
                info.innerHTML = playerOne.getName() + "'s turn"
            }
        } else {
            if (playerTwo.getName().slice(-1) === 's') {
                info.innerHTML = playerTwo.getName() + "' turn"
            } else {
                info.innerHTML = playerTwo.getName() + "'s turn"
            }
        }
    }

    updateInfo(0, false, false);
    updateScore();

    return {updateScore, updateInfo}
})();