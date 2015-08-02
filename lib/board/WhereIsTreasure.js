var _ = require('lodash');

var BoardConstants = require('./Constants'),
    LENGTH = BoardConstants.LENGTH;

module.exports = function(board, symbol) {

    var result = null;
    _.each(_.range(LENGTH), function(x) {
        _.each(_.range(LENGTH), function(y) {
            if (board.grid[x][y].treasure.symbol == symbol) {
                result = {x: x, y: y};
            }
        });
    });

    return result;
};