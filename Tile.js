var _ = require('lodash');

var Treasures = require('./Treasures').Treasures,
    PLAYER = require('./Player');

var FROM_STATE = 'FROM_STATE';

function fromState(state){
    return new Tile(FROM_STATE, state);
}

function Tile(exits, treasure, players) {

    var self = this;

    if (exits === FROM_STATE) {
        self = treasure;
        _.forEach(_.keys(self.players), function(id){
            self.players[id] = PLAYER.fromState(self.players[id]);
        });
    } else {
        treasure = typeof treasure === 'undefined' ? Treasures.EMPTY : treasure;
        players = typeof players === 'undefined' ? [] : players;

        this.exits = exits;
        this.treasure = treasure;
        this.players = {};
    }

    var getState = function(){
        var state = {};
        state.exits = self.exits;
        state.treasure = self.treasure;
        state.players = {};
        _.forEach(_.keys(self.players), function(id){
            state.players[id] = self.players[id].getState();
        });
        return state;
    };

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
        getState: getState,
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

module.exports = {
    Tile: Tile,
    fromState: fromState
};