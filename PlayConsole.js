var _ = require('lodash'),
    sys = require('sys'),
    stdin = process.openStdin();

var TileBag = require('./TileBag').TileBag,
    Board = require('./Board').Board,
    Deck = require('./Deck').Deck,
    Player = require('./Player').Player,
    Printer = require('./AsciiBoardPrinter');

var bag = new TileBag(),
    deck = new Deck(),
    TREASURES_TO_WIN = 3,
    turn = 0,
    phase = 'play';

var player1 = new Player(1, 'green'),
    player2 = new Player(2, 'blue'),
    player3 = new Player(3, 'yellow'),
    player4 = new Player(4, 'red');

var players = {};
players[1] = player1;
players[2] = player2;
players[3] = player3;
players[4] = player4;

_.forEach(players, function(player) {
    player.assignCard(deck.deal());
});

var board = new Board(bag, players);

var player = players[_.keys(players)[turn]];

function say(s) {
    console.log(s);
}

function print() {
    var coords = board.whereIsPlayer(player.getId());
    var treasureCoords = board.whereIsTreasure(player.getCard().symbol);
    var availableCoords = [];
    if (coords != null) {
        availableCoords = board.whereCanIGo(coords.x, coords.y);
    }
    console.log('Board:');
    Printer.printGrid(board, availableCoords, player.getColour());
    console.log();
    console.log('Next piece:');
    Printer.printTile(bag.peek());
    console.log();
    say('What\'s up ' + player.getColour() + '?');
    if (treasureCoords != null) {
        say('You\'re looking for the ' + player.getCard().desc + ' (' + player.getCard().symbol + ") which is at " + treasureCoords.x + "," + treasureCoords.y);
    } else {
        if (bag.peek().getTreasure().symbol == player.getCard().symbol) {
            say('You\'re looking for the ' + player.getCard().desc + ' (' + player.getCard().symbol + ") which is on the spare tile");
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
            bag.peek().turn(1);
            Printer.printTile(bag.peek());
            break;
        case /turnl/.test(input):
        case /turna/.test(input):
            bag.peek().turn(3);
            Printer.printTile(bag.peek());
            break;
        case /flip/.test(input):
            bag.peek().turn(2);
            Printer.printTile(bag.peek());
            break;
        case /player (\d+)/.test(input):
            match = /player (\d+)/.exec(input);
            var playerId = match[1];
            coords = board.whereIsPlayer(match[1]);
            if (coords != null) {
                say('Player ' + playerId + ' is at ' + coords.x + ',' + coords.y);
            } else {
                say('Player ' + playerId + ' not found');
            }
            break;
        case /treasure (\w+)/.test(input):
            match = /treasure (\w+)/.exec(input);
            var treasureSymbol = match[1];
            coords = board.whereIsTreasure(treasureSymbol);
            if (coords != null) {
                say('Treasure ' + treasureSymbol + ' is at ' + coords.x + ',' + coords.y);
            } else {
                if (bag.peek().treasure.symbol == treasureSymbol) {
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
                legal = board.isPlayable(x, y);
                if (legal) {
                    var tile = board.play(x, y, bag.get());
                    bag.put(tile);
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
                coords = board.whereIsPlayer(player.getId());
                var availableCoords = board.whereCanIGo(coords.x, coords.y);

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

                board.get(coords.x, coords.y).removePlayer(player.id);
                board.get(x, y).addPlayer(player);

                if (board.get(x, y).getTreasure().symbol == player.getCard().symbol) {
                    if (player.getTreasureCount() < TREASURES_TO_WIN - 1) {
                        say("You've picked up the " + player.getCard().desc);
                        player.assignCard(deck.deal());
                        say("You have found " + player.getTreasureCount() + " Treasures" + (player.treasureCount == 1 ? "" : "s"));
                    } else if (player.getTreasureCount() == TREASURES_TO_WIN - 1) {
                        say("You've picked up the " + player.getCard().desc);
                        player.assignCard(deck.exits[player.getId()]);
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