var _ = require('lodash'),
    sys = require('sys'),
    stdin = process.openStdin();

var Game = require('./lib/Game'),
    TileBag = require('./lib/TileBag'),
    Player = require('./lib/Player'),
    AI = require('./lib/AI'),
    Printer = require('./AsciiPrinter');

var play = require('./lib/Play');

var game = Game.new(
    Player.PLAYER_TYPE_CPU_1,
    Player.PLAYER_TYPE_NONE,
    Player.PLAYER_TYPE_NONE,
    Player.PLAYER_TYPE_NONE);

Printer.printGame(game);
console.log('\nCommand:');

stdin.addListener("data", function(input) {

    input = input.toString().trim();

    var actingPlayer = Game.whoseTurn(game);

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
    console.log('\nResponse:');
    console.log(engineResponse.message);

    Printer.printGame(game);

    if (game.winner != null) {
        console.log('\n__!!GAME OVER!!__');
        console.log('\nWinner: ' + actingPlayer.colour);
        console.log('\nScores:');
        _.each(_.sortByOrder(game.players, ['treasureCount'], [false]), function(player){
            console.log(player.colour + ': ' + player.treasureCount);
        });
        process.exit(0);
    }

    console.log('\nCommand:');
});