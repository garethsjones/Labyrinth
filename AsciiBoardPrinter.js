var _ = require('lodash'),
    colors = require('colors');

var Treasures = require('./Treasures').Treasures,
    BOARD_LENGTH = require('./Board').LENGTH;

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
        case 'red':
            log(SPACE.red.bgRed);
            break;
        case 'yellow':
            log(SPACE.yellow.bgYellow);
            break;
        case 'blue':
            log(SPACE.blue.bgBlue);
            break;
        case 'green':
            log(SPACE.green.bgGreen);
            break;
        case 'cyan':
            log(SPACE.cyan.bgCyan);
            break;
        case 'magenta':
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
        case 'red':
            log(s.red.bgWhite);
            break;
        case 'yellow':
            log(s.yellow.bgWhite);
            break;
        case 'blue':
            log(s.blue.bgWhite);
            break;
        case 'green':
            log(s.green.bgWhite);
            break;
        case 'cyan':
            log(s.cyan.bgWhite);
            break;
        case 'magenta':
            log(s.magenta.bgWhite);
            break;
        default:
            log(s);
    }
}

function wizard(player) {

    if (!player.isActive()) {
        return wall();
    }

    var s = player.getSymbol();
    var colour = player.getColour();

    switch (colour) {
        case 'red':
            log(s.red.bgBlack);
            break;
        case 'yellow':
            log(s.yellow.bgBlack);
            break;
        case 'blue':
            log(s.blue.bgBlack);
            break;
        case 'green':
            log(s.green.bgBlack);
            break;
        case 'cyan':
            log(s.cyan.bgBlack);
            break;
        case 'magenta':
            log(s.magenta.bgBlack);
            break;
        default:
            log(s);
    }
}

function printGrid(board, highlightCoords, highlightColour) {

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

                var tile = board.get(x, y);
                var spaceColour = 'white';

                if (_.some(highlightCoords, {x: x, y: y})) {
                    spaceColour = highlightColour;
                }

                switch (pass) {
                    case 0:
                        tile.getPlayer(3) ? wizard(tile.getPlayer(3)) : wall();
                        tile.hasExit(0) ? space(spaceColour) : wall();
                        tile.getPlayer(4) ? wizard(tile.getPlayer(4)) : wall();
                        break;
                    case 1:
                        tile.hasExit(3) ? space(spaceColour) : wall();
                        board.get(x, y).getTreasure().symbol == ' ' ? space(spaceColour) : treasureSpace(tile.getTreasure());
                        tile.hasExit(1) ? space(spaceColour) : wall();
                        break;
                    case 2:
                        tile.getPlayer(1) ? wizard(tile.getPlayer(1)) : wall();
                        tile.hasExit(2) ? space(spaceColour) : wall();
                        tile.getPlayer(2) ? wizard(tile.getPlayer(2)) : wall();
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

    var exits = tile.getExits();

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
                tile.getTreasure().symbol == ' ' ? space('white') : treasureSpace(tile.getTreasure());
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
    printGrid: printGrid,
    printTile: printTile
};