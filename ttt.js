var gameBoard = (() => {
    var board = ['','','','','','','','','']
    const container = document.getElementById('gameboard');
    for (i=0; i<9; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = 'cell' + i;
        cell.innerHTML = board[i];
        container.appendChild(cell);
    }
})();

