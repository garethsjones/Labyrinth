var _ = require('lodash'),
    colors = require('colors');

var treasure = require('./Treasure'),
    game = require('./Game');

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
    log(('' + n).white);
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
        maxY = grid.length - 1,
        player1 = game.players[1],
        player2 = game.players[2],
        player3 = game.players[3],
        player4 = game.players[4];

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
                        showWizards && player3.x == x && player3.y == y ? wizard(player3) : wall();
                        _.includes(exits, 0) ? space() : wall();
                        showWizards && player4.x == x && player4.y == y ? wizard(player4) : wall();
                        break;
                    case 1:
                        _.includes(exits, 3) ? space() : wall();
                        grid[x][y].treasure == treasure.EMPTY ? space() : treasureSpace(grid[x][y].treasure);
                        _.includes(exits, 1) ? space() : wall();
                        break;
                    case 2:
                        showWizards && player1.x == x && player1.y == y ? wizard(player1) : wall();
                        _.includes(exits, 2) ? space() : wall();
                        showWizards && player2.x == x && player2.y == y ? wizard(player2) : wall();
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