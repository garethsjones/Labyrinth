var _ = require('lodash');

var Treasures = require('../Treasures');

var addPlayer = require('./AddPlayer');

module.exports = function(exits, treasure, players) {

    treasure = typeof treasure === 'undefined' ? Treasures.EMPTY : treasure;
    players = typeof players === 'undefined' ? [] : players;

    var tile = {};

    tile.exits = exits;
    tile.treasure = treasure;
    tile.players = {};

    _.each(players, function(player) {
        if (typeof player !== 'undefined') {
            addPlayer(tile, player);
        }
    });

    return tile;
};