var _ = require('lodash'),
    sys = require('sys'),
    stdin = process.openStdin();

var TileBag = require('./lib/TileBag'),
    Board = require('./lib/Board'),
    Deck = require('./lib/Deck'),
    Player = require('./lib/Player'),
    Tile = require('./lib/Tile'),
    Printer = require('./AsciiBoardPrinter');

var tileBag = TileBag.new(),
    deck = Deck.new(),
    TREASURES_TO_WIN = 3,
    turn = 0,
    phase = 'play';

var player1 = Player.new(1, 'green'),
    player2 = Player.new(2, 'blue'),
    player3 = Player.new(3, 'yellow'),
    player4 = Player.new(4, 'red');

var players = {};
players[1] = player1;
players[2] = player2;
players[3] = player3;
players[4] = player4;

_.forEach(players, function(player) {
    Player.assignCard(player, Deck.deal(deck));
});

var board = Board.new(tileBag, players);

var player = players[_.keys(players)[turn]];

function say(s) {
    console.log(s);
}

function print() {
    var coords = Board.whereIsPlayer(board, player.id);
    var treasureCoords = Board.whereIsTreasure(board, player.card.symbol);
    var availableCoords = [];
    if (coords != null) {
        availableCoords = Board.whereCanIGo(board, coords.x, coords.y);
    }
    console.log('Board:');
    Printer.printBoard(board, availableCoords, player.colour);
    console.log();
    console.log('Next piece:');
    Printer.printTile(TileBag.peek(tileBag));
    console.log();
    say('What\'s up ' + player.colour + '?');
    if (treasureCoords != null) {
        say('You\'re looking for the ' + player.card.desc + ' (' + player.card.symbol + ") which is at " + treasureCoords.x + "," + treasureCoords.y);
    } else {
        if (TileBag.peek(tileBag).treasure.symbol == player.card.symbol) {
            say('You\'re looking for the ' + player.card.desc + ' (' + player.card.symbol + ") which is on the spare tile");
        } else {
            say('The treasure you\'re looking is nowhere to be found');
        }
    }

    say('You\'re at ' + coords.x + ',' + coords.y);

    if (phase == 'play') {
        say("Where do you want to play the tile?");
    }

    if (phase == 'move') {
        say("You can go:");
        var s = "";
        _.forEach(availableCoords, function(coords) {
            s += coords.x + ',' + coords.y + ' ';
        });
        say(s);
    }
}

print();

stdin.addListener("data", function(input) {

    var match,
        coords,
        legal,
        x,
        y;

    input = input.toString().trim();

    switch (true) {
        case /print/.test(input):
            print();
            break;
        case /turn/.test(input):
        case /turnr/.test(input):
        case /turnc/.test(input):
            Tile.turn(TileBag.peek(tileBag), 1);
            Printer.printTile(TileBag.peek(tileBag));
            break;
        case /turnl/.test(input):
        case /turna/.test(input):
            Tile.turn(TileBag.peek(tileBag), 3);
            Printer.printTile(TileBag.peek(tileBag));
            break;
        case /flip/.test(input):
            Tile.turn(TileBag.peek(tileBag), 2);
            Printer.printTile(TileBag.peek(tileBag));
            break;
        case /player (\d+)/.test(input):
            match = /player (\d+)/.exec(input);
            var playerId = match[1];
            coords = Board.whereIsPlayer(board, match[1]);
            if (coords != null) {
                say('Player ' + playerId + ' is at ' + coords.x + ',' + coords.y);
            } else {
                say('Player ' + playerId + ' not found');
            }
            break;
        case /treasure (\w+)/.test(input):
            match = /treasure (\w+)/.exec(input);
            var treasureSymbol = match[1];
            coords = Board.whereIsTreasure(board, treasureSymbol);
            if (coords != null) {
                say('Treasure ' + treasureSymbol + ' is at ' + coords.x + ',' + coords.y);
            } else {
                if (TileBag.peek(tileBag).treasure.symbol == treasureSymbol) {
                    say('Treasure ' + treasureSymbol + ' is on the spare tile');
                } else {
                    say('Treasure ' + treasureSymbol + ' not found');
                }
            }
            break;
        case /play (\d+),(\d+)/.test(input):
            if (phase == 'play') {
                match = /play (\d+),(\d+)/.exec(input);
                x = match[1];
                y = match[2];
                legal = Board.isPlayable(board, x, y);
                if (legal) {
                    var tile = Board.play(board, x, y, TileBag.get(tileBag));
                    TileBag.put(tileBag, tile);
                    phase = 'move';
                    print();
                } else {
                    say("You can't play the tile there");
                }
            } else {
                say("You can't play a tile at the moment");
            }
            break;
        case /move (\d+),(\d+)/.test(input):
            if (phase == 'move') {
                match = /move (\d+),(\d+)/.exec(input);
                x = match[1];
                y = match[2];
                coords = Board.whereIsPlayer(board, player.id);
                var availableCoords = Board.whereCanIGo(board, coords.x, coords.y);

                legal = false;
                _.forEach(availableCoords, function (coord) {
                    if (coord.x == x && coord.y == y) {
                        legal = true;
                    }
                });

                if (!legal) {
                    say("You can't move to " + match[1] + "," + match[2]);
                    break;
                }

                Tile.removePlayer(Board.get(board, coords.x, coords.y), player);
                Tile.addPlayer(Board.get(board, x, y), player);

                if (Board.get(board, x, y).treasure.symbol == player.card.symbol) {
                    if (player.treasureCount < TREASURES_TO_WIN - 1) {
                        say("You've picked up the " + player.card.desc);
                        player.assignCard(Deck.deal(deck));
                        say("You have found " + player.treasureCount + " treasures" + (player.treasureCount == 1 ? "" : "s"));
                    } else if (player.treasureCount == TREASURES_TO_WIN - 1) {
                        say("You've picked up the " + player.card.desc);
                        Player.assignCard(player, Deck.exits[player.id]);
                        say("Time to race for home!!");
                    } else {
                        say("You've won!!!!!!!!!!!!!!!!!");
                        process.exit();
                    }
                }

                turn = ++turn % _.keys(players).length;
                player = players[_.keys(players)[turn]];
                phase = 'play';
                print();
            } else {
                say("You can't move right now");
            }
            break;
        default:
            say("I don't know how to " + input);
            return;
    }
});