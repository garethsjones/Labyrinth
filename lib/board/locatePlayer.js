var _ = require('lodash');

var Tile = require('../Tile');

var BoardConstants = require('./Constants'),
    LENGTH = BoardConstants.LENGTH;

module.exports = function(board, id) {

    var result = null;
    _.each(_.range(LENGTH), function(x) {
        _.each(_.range(LENGTH), function(y) {
            if (Tile.getPlayer(board.grid[x][y], id)) {
                result = {x: x, y: y};
            }
        });
    });

    return result;
};