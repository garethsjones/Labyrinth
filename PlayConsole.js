var _ = require('lodash'),
    sys = require('sys'),
    stdin = process.openStdin();

var Game = require('./lib/Game'),
    TileBag = require('./lib/TileBag'),
    Player = require('./lib/Player'),
    AI = require('./lib/AI'),
    Printer = require('./AsciiPrinter');

var play = require('./lib/Play');

var game = Game.new(Player.PLAYER_TYPE_HUMAN, Player.PLAYER_TYPE_NONE, Player.PLAYER_TYPE_CPU_1, Player.PLAYER_TYPE_NONE);

Printer.printGame(game);

stdin.addListener("data", function(input) {

    input = input.toString().trim();

    var actingPlayer = game.players[_.keys(game.players)[game.turn]];

    if (actingPlayer.playerType == Player.PLAYER_TYPE_CPU_1) {
         if (game.phase == 'move') {
             var move = AI.bestMove(game, actingPlayer.id);
             input = 'move ' + move.x + ',' + move.y;
         } else {
             var placement = AI.bestPlacement(game, actingPlayer.id);
             play(game, actingPlayer.id, placement.rotation);
             console.log(placement.rotation);
             input = 'play ' + placement.x + ',' + placement.y;
         }
        console.log(input);
    }

    var engineResponse = play(game, actingPlayer.id, input);
    console.log(engineResponse);

    Printer.printGame(game);

    if (game.winner != null) {
        console.log('GAME OVER');
        process.exit(0);
    }
});