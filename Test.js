var _ = require('lodash'),
    sys = require('sys'),
    stdin = process.openStdin();

var Bag = require('./Bag'),
    Board = require('./Board'),
    Player = require('./Player'),
    Printer = require('./AsciiBoardPrinter');

var player1 = new Player(1, 'green'),
    player2 = new Player(2, 'blue'),
    player3 = new Player(3, 'yellow'),
    player4 = new Player(4, 'red');

var players = {};
players[1] = player1;
players[2] = player2;
//players[3] = player3;
players[4] = player4;


var bag = new Bag(),
    board = new Board(bag, players),
    turn = 0;

var player = players[_.keys(players)[turn]];

function print() {
    Printer.printGrid(board, [], player.colour);
    var coords = board.whereIsPlayer(player.id);
    var availableCoords = board.whereCanIGo(coords.x, coords.y);
    console.log('Board:');
    Printer.printGrid(board, availableCoords, player.colour);
    console.log();
    console.log('Next piece:');
    Printer.printTile(bag.peekTile());
    console.log();
    console.log('What\'s up ' + player.colour + '?');
    console.log('You\'re at ' + coords.x + ',' + coords.y);
    console.log("You can go:");
    var s = "";
    _.forEach(availableCoords, function(coords) {
        s += coords.x + ',' + coords.y + ' ';
    });
    console.log(s);
}

print();

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
        case /play (\d+),(\d+)/.test(input):
            var match = /play (\d+),(\d+)/.exec(input);
            var tile = board.play(match[1], match[2], bag.getTile())
            bag.putTile(tile);
            break;
        case /move (\d+),(\d+)/.test(input):
            var match = /move (\d+),(\d+)/.exec(input);

            var coords = board.whereIsPlayer(player.id);
            var availableCoords = board.whereCanIGo(coords.x, coords.y);

            var legal = false;
            _.forEach(availableCoords, function (coord) {
                if (coord.x == match[1] && coord.y == match[2]) {
                    legal = true;
                }
            });

            if (!legal) {
                console.log("You can't move to " + match[1] + "," + match[2]);
                break;
            }

            board.get(coords.x, coords.y).removePlayer(player.id);
            board.get(match[1], match[2]).addPlayer(player);

            turn = ++turn % _.keys(players).length;
            player = players[_.keys(players)[turn]];
            phase = 'play';

            break;
        default:
            console.log("I don't know how to " + input);
            return;
    }

    print();
});