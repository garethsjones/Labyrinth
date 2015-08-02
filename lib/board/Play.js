var _ = require('lodash');

var Tile = require('../Tile');

var BoardConstants = require('./Constants'),
    LENGTH = BoardConstants.LENGTH;

var isPlayable = require('./IsPlayable');

module.exports = function(board, x, y, tile) {

    var playability = isPlayable(board, x, y);
    if (!playability.isPlayable) {
        throw new Error("Illegal move: " + playability.message);
    }

    var onRight = x == 0,
        onLeft = x == LENGTH - 1,
        onBottom = y == 0,
        onTop = y == LENGTH -1,
        spare = null;

    if (onBottom) {
        spare = board.grid[x][LENGTH - 1];

        _.forEach(_.range(LENGTH - 1, 0, -1), function(y) {
            board.grid[x][y] = board.grid[x][y-1];
        });

        board.grid[x][0] = tile;
    }

    if (onTop) {
        spare = board.grid[x][0];

        _.forEach(_.range(0, LENGTH - 1, +1), function(y) {
            board.grid[x][y] = board.grid[x][y+1];
        });

        board.grid[x][LENGTH - 1] = tile;
    }

    if (onRight) {
        spare = board.grid[LENGTH - 1][y];

        _.forEach(_.range(LENGTH - 1, 0, -1), function(x) {
            board.grid[x][y] = board.grid[x-1][y];
        });

        board.grid[0][y] = tile;
    }

    if (onLeft) {
        spare = board.grid[0][y];

        _.forEach(_.range(0, LENGTH - 1, +1), function(x) {
            board.grid[x][y] = board.grid[x+1][y];
        });

        board.grid[LENGTH - 1][y] = tile;
    }

    tile.players = spare.players;
    spare.players = [];

    board.previousPlay = {x: x, y: y};

    return spare;
};