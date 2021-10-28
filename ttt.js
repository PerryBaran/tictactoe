const gameBoard = (() => {
    var board = [];
    board.length = 9;
    var lastWin = [];
    let win = false;
    let draw = false;
    const winTrue = () => win;
    const drawTrue = () => draw;
    const checkLastWin = (i) => lastWin[i];

    const clearBoard = () => {
        board = [];
        board.length = 9;
        win = false;
        draw = false;
        startingTurn++
        turn = 0;
    };

    const resetBoard = () => {
        board = [];
        board.length = 9;
        win = false;
        draw = false;
        turn = 0;
    };

    let startingTurn = 0;
    let turn = 0;
    const currentPlay = () => {
        if (startingTurn % 2 === 0) {
            if (turn % 2 === 0) {
                return 'o'
            } else {
                return 'x'
            }
        } else {
            if (turn % 2 === 0) {
                return 'x'
            } else {
                return 'o'
            }
        }
    };

    const updateBoard = () => {
        for (i=0; i<9; i++) {
            if (board[i] != undefined) {
                cell[i].innerHTML = board[i];
                cell[i].style.color = 'white';
                cell[i].style.textShadow = '0 0 1em white';
            } else {
                cell[i].innerHTML = '';
            }
        };
    };

    const cell = document.querySelectorAll('.cell');
    var waiting = false;
    cell.forEach(event => {
        event.addEventListener('click', () => {
            if (playerOne.isComputer() && playerTwo.isComputer()){
                if (win || draw) {
                    clearBoard();
                    updateBoard();
                    displayInfo.updateInfo(currentPlay(), win, draw);
                } 
                i = true;
                while(i) {
                        computerPlay();
                        if (win || draw) {
                            i = false;
                        } 
                }
            } else if (waiting) {
                return

            } else {
                const cellIndex = event.id.slice(-1);
                if (win || draw) {
                    clearBoard();
                    updateBoard();
                    displayInfo.updateInfo(currentPlay(), win, draw);
                } else if ((playerOne.isComputer() && currentPlay() === 'o') || (playerTwo.isComputer() && currentPlay() === 'x')) {
                } else if (board[cellIndex] === undefined) {
                    board[cellIndex] = currentPlay();
                    turn++;
                    updateBoard();
                    checkWin();
                    displayInfo.updateInfo(currentPlay(), win, draw);
                }
                if (playerOne.isComputer() && win === false && draw === false && currentPlay() === 'o') {
                    waiting = true;
                    setTimeout(() => {
                        computerPlay();
                        waiting = false;
                    }, 300);   
                }
                if (playerTwo.isComputer() && win === false && draw === false && currentPlay() === 'x') {
                    waiting = true;
                    setTimeout(() => {
                        computerPlay();
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
        } if (win) {
            applyWin();
        } else if (!board.includes(undefined)) {
            draw = true;
        }
    };

    const colorLine = (position1, position2, position3) => {
        const cell1 = document.getElementById('cell' + position1);
        const cell2 = document.getElementById('cell' + position2);
        const cell3 = document.getElementById('cell' + position3);
        var winner = undefined
        if (currentPlay() === 'x') {
            winner = playerOne;
        } else {
            winner = playerTwo;
        }
        displayInfo.updateColor(cell1, winner, 1);
        displayInfo.updateColor(cell2, winner, 1);
        displayInfo.updateColor(cell3, winner, 1);
        lastWin = [position1, position2, position3]
    }

    const applyWin = () => {
        if (currentPlay() === 'o') {
            playerTwo.addWin();
        } else {
            playerOne.addWin();
        }
        displayInfo.updateScore();
        displayInfo.updateInfo(currentPlay(), win, draw);
    }

    const computerPlay = () => {
        if(playerOne.isHard() && currentPlay() === 'o' || playerTwo.isHard() && currentPlay() === 'x') {
            var placement = computerHard.bestMove(board, turn)
            board[placement] = currentPlay();
            turn++;
            updateBoard();
            checkWin();
            displayInfo.updateInfo(currentPlay(), win, draw);
        } else {
            const play = () => Math.floor(Math.random()*9)
            var placement = play()
            while (board[placement] !== undefined) {
                placement = play();
            } 
            board[placement] = currentPlay();
            turn++;
            updateBoard();
            checkWin();
            displayInfo.updateInfo(currentPlay(), win, draw);
        }
    };

    updateBoard();

    return {resetBoard, updateBoard, currentPlay, colorLine, winTrue, drawTrue, checkLastWin}
})();

const Player = (player) => {
    let wins = 0;
    var computer = false;
    var hardDifficulty = false;
    const name = document.getElementById('player' + player)
    const color = document.getElementById('color' + player);
    const getName = () => name.value;
    const getColor = () => color.value;
    const addWin = () => wins++;
    const resetWin = () => wins = 0;
    const checkWins = () => wins;
    const changeComputer = () => computer = (computer ? false : true);
    const isComputer = () => computer;
    const changeDifficulty = () => hardDifficulty = (hardDifficulty ? false : true);
    const isHard = () => hardDifficulty; 
    return {getName, getColor, addWin, resetWin, checkWins, changeComputer, isComputer, changeDifficulty, isHard}
};


const playerOne = Player(1)
const playerTwo = Player(2)

const swapComputer = (() => {
    const switch1 = document.getElementById('switch1');
    switch1.dataset.index = '0';
    const diff1 = document.getElementById('diff1')
    diff1.dataset.index = '0';
    switch1.addEventListener('click', () => {
        if (switch1.dataset.index === '0') {
            switch1.innerHTML = '<img src="ttt/computer.png">';
            switch1.dataset.index = '1';
            diff1.style.display = "inline-flex";
        } else {
            switch1.innerHTML = '<img src="ttt/user.png">';
            switch1.dataset.index = '0';
            diff1.style.display = "none";
        } 
        playerOne.changeComputer();
        reset();
    });
    diff1.addEventListener('click', () => {
        if (diff1.dataset.index === '0') {
            diff1.innerHTML = 'HARD';
            diff1.dataset.index = '1';
        } else {
            diff1.innerHTML = 'EASY';
            diff1.dataset.index = '0';
        } 
        playerOne.changeDifficulty();
        reset();
    });

    const switch2 = document.getElementById('switch2');
    switch2.dataset.index = '0';
    const diff2 = document.getElementById('diff2')
    diff2.dataset.index = '0';
    switch2.addEventListener('click', () => {
        if (switch2.dataset.index === '0') {
            switch2.innerHTML = '<img src="ttt/computer.png">';
            switch2.dataset.index = '1';
            diff2.style.display = "inline-flex";
        } else {
            switch2.innerHTML = '<img src="ttt/user.png">';
            switch2.dataset.index = '0';
            diff2.style.display = "none";
        } 
        playerTwo.changeComputer();
        reset();
    });
    diff2.addEventListener('click', () => {
        if (diff2.dataset.index === '0') {
            diff2.innerHTML = 'HARD';
            diff2.dataset.index = '1';
        } else {
            diff2.innerHTML = 'EASY';
            diff2.dataset.index = '0';
        } 
        playerTwo.changeDifficulty();
        reset();
    });

    const reset = () => {
        gameBoard.resetBoard();
        gameBoard.updateBoard();
        playerOne.resetWin();
        playerTwo.resetWin();
        displayInfo.updateScore();
        displayInfo.updateInfo(gameBoard.currentPlay(), false, false)
    }
})();

const displayInfo = (() => {
    const playerOneScore = document.getElementById('score1');
    const playerTwoScore = document.getElementById('score2');

    const updateScore = () => {
        playerOneScore.innerHTML = playerOne.checkWins();
        updateColor(playerOneScore, playerOne, 1);
        playerTwoScore.innerHTML = playerTwo.checkWins();
        updateColor(playerTwoScore, playerTwo, 1)
    }

    const info = document.getElementById('info')

    const updateInfo = (play, win, draw) => {
        if (win === true) {
            if (play === 'o') {
                info.innerHTML = playerTwo.getName() + " wins"
                updateColor(info, playerTwo, 0.25);
            } else {
                info.innerHTML = playerOne.getName() + " wins"
                updateColor(info, playerOne, 0.25);
            }
        } else if (draw === true) {
            info.innerHTML = "Draw"
            info.style.color = 'white';
            info.style.textShadow = '0 0 0.25em white'
        } else if (play  === 'o'){
            updateColor(info, playerOne, 0.25);
            if (playerOne.getName().slice(-1) === 's') {
                info.innerHTML = playerOne.getName() + "' turn"
            } else {
                info.innerHTML = playerOne.getName() + "'s turn"
            }
        } else {
            updateColor(info, playerTwo, 0.25);
            if (playerTwo.getName().slice(-1) === 's') {
                info.innerHTML = playerTwo.getName() + "' turn"
            } else {
                info.innerHTML = playerTwo.getName() + "'s turn"
            }
        }
    }

    const updateColor = (event, player, shadow) => {
        event.style.color = player.getColor();
        event.style.textShadow = '0 0 '+ shadow + 'em ' + player.getColor();
    }

    const colorPicker = document.querySelectorAll('.color');
    colorPicker.forEach(event => {
        event.addEventListener('input', () => {
            updateScore();
            updateInfo(gameBoard.currentPlay(), gameBoard.winTrue(), gameBoard.drawTrue());
            gameBoard.colorLine(gameBoard.checkLastWin(0), gameBoard.checkLastWin(1), gameBoard.checkLastWin(2));
        });
    });

    const nameChange = document.querySelectorAll('.name');
    nameChange.forEach(event => {
        event.addEventListener('input', () => {
            updateInfo(gameBoard.currentPlay(), gameBoard.winTrue(), gameBoard.drawTrue())
        });
    });

    updateInfo('o', gameBoard.winTrue(), gameBoard.drawTrue());
    updateScore();

    return {updateScore, updateInfo, updateColor}
})();

const computerHard = (() => {
    var firstPlay = undefined;
    var secondPlay = undefined;
    var play = undefined;

    const checkForWin = (board, position1, position2, position3, play, guard) => {
        console.log(position1, position2, position3, guard)
        if (guard) {
            return (board[position1] !== play && board[position1] !== undefined && board[position1] === board[position2] && board[position3] === undefined)
        } else {
            return (board[position1] === play && board[position1] !== undefined && board[position1] === board[position2] && board[position3] === undefined)
        }
    }
        

    const bestMove = (board, turn) => {
        if (turn === 0) {
            firstPlay = gameBoard.currentPlay();
            return 0;            
        } if (turn === 1) {
            secondPlay = gameBoard.currentPlay();
            if (board[4] === undefined) {
                return 4;
            } else {
                return 0;
            } 
        } if (turn === 2) {
            if (board[4] === undefined) {
                return 4;
            } else {
                return 8;
            }
        }
        if (turn % 2 !== 0) {
            play = secondPlay;
        } else {
            play = firstPlay;
        }
        for (i = 0; i < 2; i++){
            if (i === 0) {
                guard = false;
            } else {
                guard = true;
            }
            if (checkForWin(board, 4, 0, 8, play, guard)) {return 8;}
            if (checkForWin(board, 4, 1, 7, play, guard)) {return 7;}
            if (checkForWin(board, 4, 2, 6, play, guard)) {return 6;}
            if (checkForWin(board, 4, 3, 5, play, guard)) {return 5;}
            if (checkForWin(board, 4, 5, 3, play, guard)) {return 3;}
            if (checkForWin(board, 4, 6, 2, play, guard)) {return 2;}
            if (checkForWin(board, 4, 7, 1, play, guard)) {return 1;}
            if (checkForWin(board, 0, 1, 2, play, guard)) {return 2;}
            if (checkForWin(board, 0, 2, 1, play, guard)) {return 1;}
            if (checkForWin(board, 0, 3, 6, play, guard)) {return 6;}
            if (checkForWin(board, 0, 6, 3, play, guard)) {return 3;}
            if (checkForWin(board, 8, 6, 7, play, guard)) {return 7;}
            if (checkForWin(board, 8, 7, 6, play, guard)) {return 6;}
            if (checkForWin(board, 8, 2, 5, play, guard)) {return 5;}
            if (checkForWin(board, 8, 5, 2, play, guard)) {return 2;}
            if (checkForWin(board, 2, 1, 0, play, guard)) {return 0;}
            if (checkForWin(board, 2, 5, 8, play, guard)) {return 8;}
            if (checkForWin(board, 6, 3, 0, play, guard)) {return 0;}
            if (checkForWin(board, 6, 7, 8, play, guard)) {return 8;}   
        }  
        if (board[1] === undefined && board[7] === undefined && (board[0] !== undefined || board[2] !== undefined || board[5] !== undefined || board[8] !== undefined)) {
            return 1;
        } if (board[5] === undefined && board[3] === undefined && (board[0] !== undefined || board[7] !== undefined)) {
            return 5;
        } if (board[8] === undefined && board[5] !== undefined && board[7] !== undefined) {
            return 8;
        } if (board[0] === undefined) {
            return 0;
        } if (board[2] === undefined) {
            return 2;
        } if (board[7] === undefined) {
            return 7;
        } if (board[3] === undefined) {
            return 3;
        } if (board[6] === undefined) {
            return 6;
        }
    }

    return {bestMove}
})();