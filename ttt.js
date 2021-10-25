var gameBoard = (() => {
    //const board = Array(9);
    const board = ['x', 'o', 'x', 'o' , 'x', 'o', 'x', 'o', 'x']
    return {
        boardLength: function() {
            console.log(board.length);
        }
    }
})();

gameBoard.boardLength();
