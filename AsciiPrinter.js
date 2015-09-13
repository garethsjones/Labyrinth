var _ = require('lodash'),
    colors = require('colors');

var Colours = require('./lib/Colours'),
    Board = require('./lib/Board'),
    Tile = require('./lib/Tile'),
    Treasures = require('./lib/Treasures'),
    TileBag = require('./lib/TileBag'),
    Deck = require('./lib/Deck'),
    Player = require('./lib/Player'),
    Game = require('./lib/Game'),
    BOARD_LENGTH = Board.LENGTH;

var WALL = '#',
    SPACE = 'O';

function log(text) {
    process.stdout.write(text);
}

function hyphen(length) {
    length = typeof length !== 'undefined' ? length : 1;
    var s = '';
    _.times(length, function() {
        s += '-';
    });
    log(s.grey);
}

function join() {
    log('+'.grey);
}

function pipe() {
    log('|'.grey);
}

function coord(n) {
    if (n % 2 == 1) {
        log(('' + n).yellow);
    } else {
        log(('' + n).white);
    }
}

function wall() {
    log(WALL.black);
}

function space(colour) {

    switch (colour) {
        case Colours.RED:
            log(SPACE.red.bgRed);
            break;
        case Colours.YELLOW:
            log(SPACE.yellow.bgYellow);
            break;
        case Colours.BLUE:
            log(SPACE.blue.bgBlue);
            break;
        case Colours.GREEN:
            log(SPACE.green.bgGreen);
            break;
        case Colours.CYAN:
            log(SPACE.cyan.bgCyan);
            break;
        case Colours.MAGENTA:
            log(SPACE.magenta.bgMagenta);
            break;
        default:
            log(SPACE.white.bgWhite);
    }
}

function treasureSpace(treasure) {
    var s = treasure.symbol;
    var colour = treasure.colour;
    switch (colour) {
        case Colours.RED:
            log(s.red.bgWhite);
            break;
        case Colours.YELLOW:
            log(s.yellow.bgWhite);
            break;
        case Colours.BLUE:
            log(s.blue.bgWhite);
            break;
        case Colours.GREEN:
            log(s.green.bgWhite);
            break;
        case Colours.CYAN:
            log(s.cyan.bgWhite);
            break;
        case Colours.MAGENTA:
            log(s.magenta.bgWhite);
            break;
        default:
            log(s);
    }
}

function wizard(player) {

    if (!player.isActive) {
        return wall();
    }

    var s = player.symbol;
    var colour = player.colour;

    switch (colour) {
        case Colours.RED:
            log(s.red.bgBlack);
            break;
        case Colours.YELLOW:
            log(s.yellow.bgBlack);
            break;
        case Colours.BLUE:
            log(s.blue.bgBlack);
            break;
        case Colours.GREEN:
            log(s.green.bgBlack);
            break;
        case Colours.CYAN:
            log(s.cyan.bgBlack);
            break;
        case Colours.MAGENTA:
            log(s.magenta.bgBlack);
            break;
        default:
            log(s);
    }
}

function printGame(game, player) {

    player = typeof player !== 'undefined' ? player : Game.whoseTurn(game);

    var coords = Board.locatePlayer(game.board, player.id),
        treasureCoords = Board.locateTreasure(game.board, player.card.symbol),
        availableCoords = [];

    if (coords != null) {
        availableCoords = Board.path(game.board, coords.x, coords.y);
    }

    console.log('\nBoard:');
    printBoard(game.board, availableCoords, treasureCoords, player.colour);

    console.log('\nTile in hand:');
    printTile(TileBag.peek(game.tileBag));

    console.log('\nCurrent turn: ' + player.colour + " (" + player.score + ")");
    console.log('Turn phase: ' + game.phase);
    console.log('Position: ' + coords.x + ',' + coords.y);

    if (treasureCoords != null) {
        console.log('Objective: ' + player.card.desc + ' (' + player.card.symbol + ") @ " + treasureCoords.x + "," + treasureCoords.y);
    } else {
        console.log('Objective: ' + player.card.desc + ' (' + player.card.symbol + ") in hand");
    }
}

function printBoard(board, availableCoords, objectiveCoord, highlightColour) {

    availableCoords = availableCoords || [];
    objectiveCoord = objectiveCoord || null;
    highlightColour = highlightColour || Colours.WHITE;

    function hr(bottomRow) {
        bottomRow = typeof bottomRow !== 'undefined' ? bottomRow : false;

        log('-+'.grey);
        _.times((BOARD_LENGTH), function(n) {
            hyphen();
            if (bottomRow) {
                coord(n);
            } else {
                hyphen();
            }
            hyphen();
            join();
        });
        return console.log();
    }

    var maxX = BOARD_LENGTH - 1,
        maxY = BOARD_LENGTH - 1;

    hr();

    for (var y = maxY; y >= 0; y--) {
        for (var pass = 0; pass < 3; pass++) {

            if (pass == 1) {
                coord(y)
            } else {
                wall();
            }

            for (var x = 0; x <= maxX; x++) {

                if (x == 0) pipe();

                var tile = Board.get(board, x, y),
                    getPlayer = _.curry(Tile.getPlayer)(tile),
                    hasExit = _.curry(Tile.hasExit)(tile);

                var spaceColour = Colours.WHITE;

                if (objectiveCoord != null && objectiveCoord.x == x && objectiveCoord.y == y) {
                    spaceColour = Colours.MAGENTA;
                } else if (_.some(availableCoords, {x: x, y: y})) {
                    spaceColour = highlightColour;
                }

                switch (pass) {
                    case 0:
                        getPlayer(4) ? wizard(getPlayer(4)) : wall();
                        hasExit(0) ? space(spaceColour) : wall();
                        getPlayer(3) ? wizard(getPlayer(3)) : wall();
                        break;
                    case 1:
                        hasExit(3) ? space(spaceColour) : wall();
                        Board.get(board, x, y).treasure.symbol == ' ' ? space(spaceColour) : treasureSpace(tile.treasure);
                        hasExit(1) ? space(spaceColour) : wall();
                        break;
                    case 2:
                        getPlayer(1) ? wizard(getPlayer(1)) : wall();
                        hasExit(2) ? space(spaceColour) : wall();
                        getPlayer(2) ? wizard(getPlayer(2)) : wall();
                        break;
                }
                pipe();
            }
            console.log();
        }
        hr(y == 0);
    }
}

function printTile(tile) {

    var exits = tile.exits;

    function hr() {
        wall();
        log('+'.grey);
        _.times(3, hyphen);
        join();
        return console.log();
    }

    hr();

    _.times(3, function(pass) {
        wall();
        pipe();

        switch (pass) {
            case 0:
                wall();
                _.includes(exits, 0) ? space() : wall();
                wall();
                break;
            case 1:
                _.includes(exits, 3) ? space() : wall();
                tile.treasure.symbol == ' ' ? space(Colours.WHITE) : treasureSpace(tile.treasure);
                _.includes(exits, 1) ? space() : wall();
                break;
            case 2:
                wall();
                _.includes(exits, 2) ? space() : wall();
                wall();
                break;
        }

        pipe();
        console.log();
    });

    hr();
}

module.exports = {
    printGame: printGame,
    printBoard: printBoard,
    printTile: printTile
};