var _ = require('lodash'),
    sys = require('sys'),
    stdin = process.openStdin();

var Game = require('./lib/Game'),
    TileBag = require('./lib/TileBag'),
    Printer = require('./AsciiPrinter');

var play = require('./lib/Play');

var game = Game.new([1,2]);

Printer.printGame(game);

stdin.addListener("data", function(input) {

    input = input.toString().trim();

    var playerActingId = game.players[_.keys(game.players)[game.turn]].id;

    switch (true) {
        //case /^print$/.test(input):
        //    Printer.printGame(game);
        //    break;
        //case /^tile$/.test(input):
        //    Printer.printTile(TileBag.peek(game.tileBag));
        //    break;
        default:
            var engineResponse = play(game, playerActingId, input);
            console.log(engineResponse);
    }

    Printer.printGame(game);

    if (game.winner != null) {
        console.log('DONE');
    }
});