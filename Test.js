var _ = require('lodash'),
    sys = require('sys'),
    stdin = process.openStdin();

var Bag = require('./Bag'),
    Board = require('./Board'),
    Printer = require('./AsciiBoardPrinter');

var bag = new Bag(),
    board = new Board(bag);

function completer(line) {
    var completions = 'spin play exit'.split(' ');
    var hits = completions.filter(function(c) { return c.indexOf(line) == 0 });
    return [hits.length ? hits : completions, line];
}

console.log('Board:');
Printer.printGrid(board);
console.log();
console.log('Next piece:');
Printer.printTile(bag.peekTile());
console.log();
console.log('What\'s up?');

stdin.addListener("data", function(input) {

    input = input.toString().trim();

    switch (true) {
        case /print/.test(input):
            break;
        case /turn/.test(input):
        case /turnr/.test(input):
        case /turnc/.test(input):
            bag.peekTile().turn(1);
            break;
        case /turnl/.test(input):
        case /turna/.test(input):
            bag.peekTile().turn(3);
            break;
        case /flip/.test(input):
            bag.peekTile().turn(2);
            break;
        case /play (\d+) (\d+)/.test(input):
            var match = /play (\d+) (\d+)/.exec(input);
            var tile = board.play(match[1], match[2], bag.getTile())
            bag.putTile(tile);
            break;
        default:
            console.log("I don't know how to " + input);
            return;
    }

    console.log('----------------------------------');
    console.log('Board:');
    Printer.printGrid(board);
    console.log();
    console.log('Next piece:');
    Printer.printTile(bag.peekTile());
    console.log();
    console.log('What\'s up?');
});