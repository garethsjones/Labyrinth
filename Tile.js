var _ = require('lodash');

var Treasures = require('./Treasures');

function Tile(exits, treasure, players) {
    treasure = typeof treasure === 'undefined' ? Treasures.EMPTY : treasure;
    players = typeof players === 'undefined' ? [] : players;

    this.exits = exits;
    this.treasure = treasure;
    this.players = {};
    var self = this;

    this.addPlayer = function(player) {
        self.players[player.id] = player;
    };

    _.each(players, function(player) {
        if (typeof player !== 'undefined') {
            self.addPlayer(player);
        }
    });

    this.removePlayer = function(id) {
        delete self.players[id];
    };

    this.spin = function() {
        var turns = _.random(3);
        return this.turn(turns);
    };

    this.turn = function(turns) {
        turns = typeof turns !== 'undefined' ? turns : 1;

        this.exits = _.map(this.exits, function(exit) {
            return (turns + exit) % 4;
        });
    };
}

module.exports = Tile;