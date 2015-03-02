var _ = require('lodash');

var Treasure = require('./Treasure');

var WALL = '#',
    SPACE = 'O';

function printGrid(grid, includeBorder, log) {
    includeBorder = typeof includeBorder !== 'undefined' ? includeBorder : true;
    log = typeof log !== 'undefined' ? log : true;

    function divider(bottomRow) {
        bottomRow = typeof bottomRow !== 'undefined' ? bottomRow : false;

        var s = includeBorder ? '--' : '-';
        _.times((grid.length), function(n) {
            s += '-' + (bottomRow && includeBorder ? n : '-') + '--';
        });
        return s + '\n';
    }

    var maxX = grid.length - 1;
    var maxY = grid.length - 1;

    var s = "";

    s += divider();

    for (var y = maxY; y >= 0; y--) {
        for (var pass = 0; pass < 3; pass++) {
            var gridRow = '';

            if (includeBorder) {
                if (pass == 1) {
                    gridRow += y;
                } else {
                    gridRow += '-'
                }
            }

            for (var x = 0; x <= maxX; x++) {
                var tileRow = (x == 0) ? "|" : "";
                var exits = grid[x][y].exits;
                switch (pass) {
                    case 0:
                        tileRow += WALL;
                        tileRow += _.includes(exits, 0) ? SPACE : WALL;
                        tileRow += WALL;
                        break;
                    case 1:
                        tileRow += _.includes(exits, 3) ? SPACE : WALL;
                        tileRow += grid[x][y].treasure == Treasure.EMPTY ? SPACE : grid[x][y].treasure.symbol;
                        tileRow += _.includes(exits, 1) ? SPACE : WALL;
                        break;
                    case 2:
                        tileRow += WALL;
                        tileRow += _.includes(exits, 2) ? SPACE : WALL;
                        tileRow += WALL;
                        break;
                }
                tileRow += '|';
                gridRow += tileRow;
            }
            gridRow += '\n';
            s += gridRow;
        }
        s += divider(y == 0);
    }

    if (log) {
        console.log(s);
    }

    return s;
}

function printTile(tile, log) {
    log = typeof log !== 'undefined' ? log : true;
    var grid = [];
    grid[0] = [];
    grid[0][0] = tile;
    return printGrid(grid, false, log);
}

module.exports = {
    printGrid: printGrid,
    printTile: printTile
};