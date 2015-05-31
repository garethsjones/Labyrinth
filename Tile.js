var _ = require('lodash');

var Treasures = require('./Treasures');

function Tile(exits, treasure, players) {
    treasure = typeof treasure === 'undefined' ? Treasures.EMPTY : treasure;
    players = typeof players === 'undefined' ? [] : players;

    var self = this;
    this.exits = exits;
    this.treasure = treasure;
    this.players = {};

    var addPlayer = function(player) {
        self.players[player.getId()] = player;
    };

    _.each(players, function(player) {
        if (typeof player !== 'undefined') {
            addPlayer(player);
        }
    });

    var removePlayer = function(id) {
        delete self.players[id];
    };

    var getPlayers = function() {
        return self.players;
    };

    var getPlayer = function(id) {
        return self.players[id];
    };

    var setPlayers = function(players) {
        self.players = players;
    };

    var getTreasure = function() {
        return self.treasure;
    };

    var spin = function() {
        var turns = _.random(3);
        return this.turn(turns);
    };

    var turn = function(turns) {
        turns = typeof turns !== 'undefined' ? turns : 1;

        self.exits = _.map(self.exits, function(exit) {
            return (turns + exit) % 4;
        });

        self.exits = _.sortBy(self.exits);
    };

    var getExits = function() {
        return self.exits;
    };

    var hasExit = function(exit) {
        return _.contains(self.exits, exit);
    };

    return {
        addPlayer: addPlayer,
        removePlayer: removePlayer,
        getPlayers: getPlayers,
        getPlayer: getPlayer,
        setPlayers: setPlayers,
        getTreasure: getTreasure,
        getExits: getExits,
        hasExit: hasExit,
        spin: spin,
        turn: turn
    }
 }

module.exports = Tile;