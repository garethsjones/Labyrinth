var _ = require('lodash');

var bag = require('./Bag');

function play(board, x, y) {

    var width = board.grid.length,
        height = board.grid[0].length - 1;

    var onLeft = x == 0,
        onRight = x == width,
        onBottom = y == 0,
        onTop = y == height;

    function shiftColumnUp(board, x) {
        var spare = _.clone(board.grid[x][height - 1]);

        _.forEach(_.range(height - 1, -1, -1), function(y) {
            board.grid[x][y + 1] = board.grid[x][y];
        });

        board.grid[x][0] = board.tile;
        board.tile = spare;
    }

    if (!(onTop || onBottom || onRight || onLeft)) {
        console.log(x + "," + y + " is not a valid move. Must be on an edge.");
        return;
    }

    if (((onTop || onBottom) && x % 2 == 0) || ((onRight || onLeft) && y % 2 == 0)) {
        console.log(x + "," + y + " is not a valid move. Must be on an odd-numbered edge.");
    }

    if (onBottom) {
        shiftColumnUp(board, x);
    }
}

module.exports = {
    play: play
}