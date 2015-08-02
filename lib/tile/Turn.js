var _ = require('lodash');

module.exports = function(tile, turns) {

    turns = typeof turns !== 'undefined' ? turns : 1;

    tile.exits = _.map(tile.exits, function(exit) {
        return (turns + exit) % 4;
    });

    tile.exits = _.sortBy(tile.exits);
};