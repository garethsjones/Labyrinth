var _ = require('lodash');

var EngineResponse = require('./EngineResponse'),
    Game = require('./Game');

var turn = require('./play/Turn'),
    player = require('./play/Player'),
    treasure = require('./play/Treasure'),
    placeTile = require('./play/PlaceTile'),
    move = require('./play/Move'),
    playableCoords = require('./play/PlayableCoords');

module.exports = function(game, requestingPlayerId, input) {

    try {
        var match,
            x,
            y;

        // Information
        switch (true) {
            case /^player (\d+)$/.test(input):
                match = /player (\d+)/.exec(input);
                var playerId = match[1];
                return player(game, requestingPlayerId, playerId);
            case /^treasure (\w+)$/.test(input):
                match = /treasure (\w+)/.exec(input);
                var treasureSymbol = match[1];
                return treasure(game, treasureSymbol);
            case /^playable$/.test(input):
                return playableCoords(game);
        }

        if (game.winner != null) {
            return EngineResponse.new(false, null, 'The game has finished');
        }

        if (requestingPlayerId == null) {
            return EngineResponse.new(false, null, "You are a guest, available actions are 'player X', 'treasure Y' & 'playable'");
        }

        if (requestingPlayerId !== Game.whoseTurn(game).id) {
            return EngineResponse.new(false, null, "It is not your turn to act");
        }

        // Actions
        switch (true) {
            case /^hold$/.test(input):
                return turn(game, 0);
            case /^turn$/.test(input):
            case /^turnr$/.test(input):
            case /^turnc$/.test(input):
                return turn(game, 1);
            case /^turnl$/.test(input):
            case /^turna$/.test(input):
                return turn(game, 3);
            case /^flip$/.test(input):
                return turn(game, 2);
            case /^play (\d+),(\d+)$/.test(input):
                match = /play (\d+),(\d+)/.exec(input);
                x = match[1];
                y = match[2];
                return placeTile(game, x, y);
            case /^move (\d+),(\d+)$/.test(input):
                match = /move (\d+),(\d+)/.exec(input);
                x = match[1];
                y = match[2];
                return move(game, x, y);
            default:
                return EngineResponse.new(false, null, "I don't know how to " + input);
        }
    } catch(ex) {
        return EngineResponse.new(false, ex, "An error occured");
    }
};