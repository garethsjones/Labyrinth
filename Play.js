var _ = require('lodash'),
    sys = require('sys'),
    colors = require('colors'),
    figlet = require('figlet'),
    stdin = process.openStdin();

var Game = require('./lib/Game'),
    TileBag = require('./lib/TileBag'),
    Player = require('./lib/Player'),
    AI = require('./lib/AI'),
    Printer = require('./lib/AsciiPrinter'),
    CliPlayerPicker = require('./lib/CliPlayerPicker');

var play = require('./lib/Play');

figlet.text('LABYRINTH', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}, function(err, text) {

    if (!err) {
        console.log(text);
    }

    console.log('\n' + play(null, null, '?').message);

    CliPlayerPicker(function(players){

        var game = Game.new(players[1], players[2], players[3], players[4]);

        Printer.printGame(game);
        prompt(game);

        stdin.addListener("data", function(input) {

            input = input.toString().trim();

            var actingPlayer = Game.whoseTurn(game);

            if (input == '?') {
                // Display help text
            } else if (actingPlayer.playerType.humanity != Player.PLAYER_TYPES.HUMAN.humanity) {
                if (game.phase == Game.PHASE_MOVE) {
                    var move = AI.bestMove(game, actingPlayer.id, actingPlayer.playerType);
                    input = 'move ' + move.x + ',' + move.y;
                } else {
                    var shift = AI.bestShift(game, actingPlayer.id, actingPlayer.playerType);
                    play(game, actingPlayer.id, shift.rotation);
                    console.log(shift.rotation);
                    input = 'shift ' + shift.x + ',' + shift.y;
                }
                console.log(input);
            }

            var engineResponse = play(game, actingPlayer.id, input);
            console.log('\nResponse:');
            console.log(engineResponse.message);

            Printer.printGame(game);

            if (game.winner != null) {
                console.log('\n__!!GAME OVER!!__');
                console.log('\nWinner: ' + actingPlayer.name);
                console.log('\nScores:');
                _.each(_.sortByOrder(game.players, ['score'], [false]), function(player){
                    console.log(player.name + ': ' + player.score);
                });
                process.exit(0);
            }

            prompt(game);
        });
    });
});

var prompt = function(game) {

    var actingPlayer = Game.whoseTurn(game);

    if (actingPlayer.playerType.humanity == Player.PLAYER_TYPES.HUMAN.humanity) {
        console.log('\nCommand:');
    } else {
        console.log('\nPress enter to continue:');
    }
};