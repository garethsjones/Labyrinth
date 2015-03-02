var _ = require('lodash');

function spin(tile) {
    var turns = _.random(3);
    return turn(tile, turns);
}

function turn(tile, turns) {
    tile.exits = _.map(tile.exits, function(exit) {
        return (turns + exit) % 4;
    });
}

module.exports = {
    spin: spin,
    turn: turn
};