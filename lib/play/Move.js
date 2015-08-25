var _ = require('lodash');

var TREASURES_TO_WIN = 3;

var Board = require('../Board'),
    Tile = require('../Tile'),
    Player = require('../Player'),
    Deck = require('../Deck');

var print = require('./Print');

module.exports = function(game, x, y) {
    if (game.phase == 'move') {

        var player = game.players[_.keys(game.players)[game.turn]],
            coords = Board.whereIsPlayer(game.board, player.id),
            availableCoords = Board.whereCanIGo(game.board, coords.x, coords.y);

        var legal = false;
        _.forEach(availableCoords, function (coord) {
            if (coord.x == x && coord.y == y) {
                legal = true;
            }
        });

        if (!legal) {
            console.log("You can't move to " + x + "," + y);
            return;
        }

        Tile.removePlayer(Board.get(game.board, coords.x, coords.y), player.id);
        Tile.addPlayer(Board.get(game.board, x, y), player);

        if (Board.get(game.board, x, y).treasure.symbol == player.card.symbol) {
            if (player.treasureCount < TREASURES_TO_WIN - 1) {
                console.log("You've picked up the " + player.card.desc);
                Player.assignCard(player, Deck.deal(game.deck));
                console.log("You have found " + player.treasureCount + " treasures" + (player.treasureCount == 1 ? "" : "s"));
            } else if (player.treasureCount == TREASURES_TO_WIN - 1) {
                console.log("You've picked up the " + player.card.desc);
                Player.assignCard(player, Deck.exits[player.id]);
                console.log("Time to race for home!!");
            } else {
                console.log("You've won!!!!!!!!!!!!!!!!!");
                return;
            }
        }

        game.turn = ++game.turn % _.keys(game.players).length;
        game.phase = 'play';
        print(game);
    } else {
        console.log("You can't move right now");
    }
};