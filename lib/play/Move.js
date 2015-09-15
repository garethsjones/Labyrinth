var _ = require('lodash');

var Board = require('../Board'),
    Tile = require('../Tile'),
    Player = require('../Player'),
    Deck = require('../Deck'),
    Game = require('../Game'),
    EngineResponse = require('../EngineResponse');

var TREASURES_TO_WIN = require('./Constants').TREASURES_TO_WIN;

module.exports = function(game, x, y) {

    if (game.phase == Game.PHASE_MOVE) {
        var player = Game.whoseTurn(game),
            coords = Board.locatePlayer(game.board, player.id),
            path = Board.path(game.board, coords.x, coords.y);

        var legal = false;
        _.forEach(path, function (coord) {
            if (coord.x == x && coord.y == y) {
                legal = true;
            }
        });

        if (!legal) {
            return EngineResponse.new(false, null, "You can't move to " + x + "," + y);
        }

        Tile.removePlayer(Board.get(game.board, coords.x, coords.y), player.id);
        Tile.addPlayer(Board.get(game.board, x, y), player);

        var message = 'moved';

        if (Board.get(game.board, x, y).treasure.symbol == player.card.symbol) {
            if (player.score < TREASURES_TO_WIN - 1) {
                message = "You've picked up the " + player.card.desc;
                Player.assignCard(player, Deck.deal(game.deck));
                message += "\nYou have found " + player.score + " treasures" + (player.score == 1 ? "" : "s");
            } else if (player.score == TREASURES_TO_WIN - 1) {
                message = "You've picked up the " + player.card.desc;
                Player.assignCard(player, Deck.exits[player.id]);
                message += "\nTime to race for home!!";
            } else {
                game.winner = player.id;
                return EngineResponse.new(true, null, "You've won!!!");
            }
        }

        game.turn = ++game.turn % _.keys(game.players).length;
        game.phase = Game.PHASE_SHIFT;

        return EngineResponse.new(true, null, message);
    } else {
        return EngineResponse.new(false, null, "You can't move right now");
    }
};