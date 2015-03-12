var _ = require('lodash');

var Tile = require('./Tile'),
    Treasure = require('./Treasures'),
    Player = require('./Player');

function Board(bag) {

    var grid = [];

    _.each(_.range(7), function(x) {
        grid[x] = [];
    });

    var player1 = new Player(1, 'green'),
        player2 = new Player(2, 'blue'),
        player3 = new Player(3, 'yellow'),
        player4 = new Player(4, 'red');

    grid[0][0] = new Tile([0,1], Treasure.GREEN_EXIT, [player1]);
    grid[6][0] = new Tile([0,3], Treasure.BLUE_EXIT, [player2]);
    grid[0][6] = new Tile([1,2], Treasure.YELLOW_EXIT, [player3]);
    grid[6][6] = new Tile([2,3], Treasure.RED_EXIT, [player4]);

    grid[2][0] = new Tile([0,1,3], Treasure.CANDELABRA);
    grid[4][0] = new Tile([0,1,3], Treasure.HELMET);
    grid[0][2] = new Tile([0,1,2], Treasure.RING);
    grid[2][2] = new Tile([0,1,3], Treasure.CHEST);
    grid[4][2] = new Tile([0,2,3], Treasure.GEM);
    grid[6][2] = new Tile([0,2,3], Treasure.SWORD);
    grid[0][4] = new Tile([0,1,2], Treasure.MAP);
    grid[2][4] = new Tile([0,1,2], Treasure.CROWN);
    grid[4][4] = new Tile([1,2,3], Treasure.KEYS);
    grid[6][4] = new Tile([0,2,3], Treasure.SKULL);
    grid[2][6] = new Tile([1,2,3], Treasure.BOOK);
    grid[4][6] = new Tile([1,2,3], Treasure.PURSE);

    _.each(_.range(7), function(x) {
        _.each(_.range(7), function(y) {
            if (typeof grid[x][y] === 'undefined') {
                grid[x][y] = bag.getTile();
            }
        });
    });

    this.length = 7;

    this.get = function(x, y) {
        return grid[x][y];
    };

    this.play = function (x, y, tile) {

        var onRight = x == 0,
            onLeft = x == this.length - 1,
            onBottom = y == 0,
            onTop = y == this.length -1,
            spare = null;

        if (!(onBottom || onTop ||onRight || onLeft)) {
            console.log("Illegal move. Must be on board edge.");
            return tile;
        }

        if (onBottom) {
            if (x % 2 == 0) {
                console.log("Illegal move. Must be on odd column.");
                return tile;
            }

            spare = grid[x][this.length - 1];

            _.forEach(_.range(this.length - 1, 0, -1), function(y) {
                grid[x][y] = grid[x][y-1];
            });

            grid[x][0] = tile;
        }

        if (onTop) {
            if (x % 2 == 0) {
                console.log("Illegal move. Must be on odd column.");
                return tile;
            }

            spare = grid[x][0];

            _.forEach(_.range(0, this.length - 1, +1), function(y) {
                grid[x][y] = grid[x][y+1];
            });

            grid[x][this.length - 1] = tile;
        }

        if (onRight) {
            if (y % 2 == 0) {
                console.log("Illegal move. Must be on odd row.");
                return tile;
            }

            spare = grid[this.length - 1][y];

            _.forEach(_.range(this.length - 1, 0, -1), function(x) {
                grid[x][y] = grid[x-1][y];
            });

            grid[0][y] = tile;
        }

        if (onLeft) {
            if (y % 2 == 0) {
                console.log("Illegal move. Must be on odd row.");
                return tile;
            }

            spare = grid[0][y];

            _.forEach(_.range(0, this.length - 1, +1), function(x) {
                grid[x][y] = grid[x+1][y];
            });

            grid[this.length - 1][y] = tile;
        }

        return spare;
    };
}

module.exports = Board;