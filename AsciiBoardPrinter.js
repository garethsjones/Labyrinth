var _ = require('lodash'),
    colors = require('colors');

var treasure = require('./Treasures');

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

function space() {
    log(SPACE.white.bgWhite);
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
    if (!player.isActive) {
        return wall();
    }

    var s = player.symbol;
    var colour = player.colour;

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

var WALL = '#',
    SPACE = 'O';

function printGrid(board, includeBorder, showWizards) {
    includeBorder = typeof includeBorder !== 'undefined' ? includeBorder : true;
    showWizards = typeof showWizards !== 'undefined' ? showWizards : true;

    function hr(bottomRow) {
        bottomRow = typeof bottomRow !== 'undefined' ? bottomRow : false;

        log((includeBorder ? '-+' : '+').grey);
        _.times((board.length), function(n) {
            hyphen();
            if (bottomRow && includeBorder) {
                coord(n);
            } else {
                hyphen();
            }
            hyphen();
            join();
        });
        return console.log();
    }

    var maxX = board.length - 1,
        maxY = board.length - 1;

    hr();

    for (var y = maxY; y >= 0; y--) {
        for (var pass = 0; pass < 3; pass++) {

            if (includeBorder) {
                if (pass == 1) {
                    coord(y)
                } else {
                    wall();
                }
            }

            for (var x = 0; x <= maxX; x++) {

                if (x == 0) pipe();

                var tile = board.get(x, y);

                switch (pass) {
                    case 0:
                        showWizards && tile.players[3] ? wizard(tile.players[3]) : wall();
                        _.includes(tile.exits, 0) ? space() : wall();
                        showWizards && tile.players[4] ? wizard(tile.players[4]) : wall();
                        break;
                    case 1:
                        _.includes(tile.exits, 3) ? space() : wall();
                        board.get(x, y).treasure == treasure.EMPTY ? space() : treasureSpace(tile.treasure);
                        _.includes(tile.exits, 1) ? space() : wall();
                        break;
                    case 2:
                        showWizards && tile.players[1] ? wizard(tile.players[1]) : wall();
                        _.includes(tile.exits, 2) ? space() : wall();
                        showWizards && tile.players[2] ? wizard(tile.players[2]) : wall();
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
                tile.treasure == treasure.EMPTY ? space() : treasureSpace(tile.treasure);
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