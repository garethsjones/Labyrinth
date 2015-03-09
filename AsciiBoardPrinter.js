var _ = require('lodash'),
    colors = require('colors');

var treasure = require('./Treasure'),
    players = require('./Players');

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

function printGrid(grid, includeBorder, showWizards) {
    includeBorder = typeof includeBorder !== 'undefined' ? includeBorder : true;
    showWizards = typeof showWizards !== 'undefined' ? showWizards : true;

    function hr(bottomRow) {
        bottomRow = typeof bottomRow !== 'undefined' ? bottomRow : false;

        log((includeBorder ? '-+' : '+').grey);
        _.times((grid.length), function(n) {
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

    var maxX = grid.length - 1,
        maxY = grid.length - 1;

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

                var exits = grid[x][y].exits;
                switch (pass) {
                    case 0:
                        showWizards && _.includes(grid[x][y].players, players._3) ? wizard(players._3) : wall();
                        _.includes(exits, 0) ? space() : wall();
                        showWizards && _.includes(grid[x][y].players, players._4) ? wizard(players._4) : wall();
                        break;
                    case 1:
                        _.includes(exits, 3) ? space() : wall();
                        grid[x][y].treasure == treasure.EMPTY ? space() : treasureSpace(grid[x][y].treasure);
                        _.includes(exits, 1) ? space() : wall();
                        break;
                    case 2:
                        showWizards && _.includes(grid[x][y].players, players._1) ? wizard(players._1) : wall();
                        _.includes(exits, 2) ? space() : wall();
                        showWizards && _.includes(grid[x][y].players, players._2) ? wizard(players._2) : wall();
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
    var grid = [];
    grid[0] = [];
    grid[0][0] = tile;
    return printGrid(grid, false, false);
}

module.exports = {
    printGrid: printGrid,
    printTile: printTile
};