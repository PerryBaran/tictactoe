const GameBoard = (() => {
    var board = [];
    const container = document.getElementById('gameboard');
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
            } else {
                cell[i].innerHTML = '';
            }
        };
    };

    cell.forEach(event => {
        event.addEventListener('click', () => {
            const cellIndex = event.id.slice(-1);
            if (board[cellIndex] === undefined) {
                board[cellIndex] = currentPlay();
                turn++;
                updateBoard();
                checkWinner();
            }
        });
    });

    const checkWinner = () => {
        if (((board[4] !== undefined) &&
            ((board[4] === board[3] && board[4] === board[5]) ||
            (board[4] === board[1] && board[4] === board[7]) ||
            (board[4] === board[0] && board[4] === board[8]) ||
            (board[4] === board[6] && board[4] === board[2]) ))
            || ((board[0] !== undefined) &&
            ((board[0] === board[1] && board[0] === board[2]) ||
            (board[0] === board[3] && board[0] === board[6])))
            || ((board[8] !== undefined) &&
            ((board[8] === board[2] && board[8] === board[5]) ||
            (board[8] === board[7] && board[8] === board[6])))
            ){
                console.log("WINNER is u")
                board = [];
            }
        
    };

    updateBoard();
})();

const Player = (name) => {

}
