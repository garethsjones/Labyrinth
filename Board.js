var _ = require('lodash');

var Tile = require('./Tile'),
    Treasure = require('./Treasures');

function Board(bag, players) {

    var self = this;
    var grid = [];
    this.length = 7;

    _.each(_.range(self.length), function(x) {
        grid[x] = [];
    });

    grid[0][0] = new Tile([0,1], Treasure.GREEN_EXIT, [players[1]]);
    grid[6][0] = new Tile([0,3], Treasure.BLUE_EXIT, [players[2]]);
    grid[0][6] = new Tile([1,2], Treasure.YELLOW_EXIT, [players[3]]);
    grid[6][6] = new Tile([2,3], Treasure.RED_EXIT, [players[4]]);

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

    _.each(_.range(self.length), function(x) {
        _.each(_.range(self.length), function(y) {
            if (typeof grid[x][y] === 'undefined') {
                grid[x][y] = bag.getTile();
            }
        });
    });

    this.get = function(x, y) {
        return grid[x][y];
    };

    this.whereIsTreasure = function(symbol) {
        var result = {x: '?', y: '?'};
        _.each(_.range(self.length), function(x) {
            _.each(_.range(self.length), function(y) {
                if (grid[x][y].treasure.symbol == symbol) {
                    result = {x: x, y: y};
                }
            });
        });
        return result;
    };

    this.whereIsPlayer = function(id) {
        var result = {x: '?', y: '?'};
        _.each(_.range(self.length), function(x) {
            _.each(_.range(self.length), function(y) {
                _.each(grid[x][y].players, function(player) {
                    if (player.id == id) {
                        result = {x: x, y: y};
                    }
                });
            });
        });
        return result;
    };

    this.whereCanIGo = function(x, y) {

        var resultCoords = [],
            accessibleTiles = [],
            unexploredCoords = [];

        function tileSeen(tile) {
            return _.some(accessibleTiles, function(accessibleTile) {
                return _.isEqual(accessibleTile, tile);
            });
        }

        var coords = {x: x, y: y};
        resultCoords.push(coords);
        unexploredCoords.push(coords);

        while (unexploredCoords.length != 0) {

            coords = unexploredCoords.pop();
            var tile = grid[coords.x][coords.y];
            if (tileSeen(tile)) {
                continue;
            }

            var neighbour,
                nextCoords;

            //up
            if (coords.y < self.length - 1 && _.contains(tile.exits, 0) && _.contains(grid[coords.x][coords.y + 1].exits, 2)) {
                neighbour = grid[coords.x][coords.y + 1];
                if (!tileSeen(neighbour)) {
                    nextCoords = {x: coords.x, y: coords.y + 1};
                    resultCoords.push(nextCoords);
                    unexploredCoords.push(nextCoords);
                }
            }

            //down
            if (coords.y > 0 && _.contains(tile.exits, 2) && _.contains(grid[coords.x][coords.y - 1].exits, 0)) {
                neighbour = grid[coords.x][coords.y - 1];
                if (!tileSeen(neighbour)) {
                    nextCoords = {x: coords.x, y: coords.y - 1};
                    resultCoords.push(nextCoords);
                    unexploredCoords.push(nextCoords);
                }
            }

            //left
            if (coords.x > 0 && _.contains(tile.exits, 3) && _.contains(grid[coords.x - 1][coords.y].exits, 1)) {
                neighbour = grid[coords.x - 1][coords.y];
                if (!tileSeen(neighbour)) {
                    nextCoords = {x: coords.x - 1, y: coords.y};
                    resultCoords.push(nextCoords);
                    unexploredCoords.push(nextCoords);
                }
            }

            //right
            if (coords.x < self.length - 1 && _.contains(tile.exits, 1) && _.contains(grid[coords.x + 1][coords.y].exits, 3)) {
                neighbour = grid[coords.x + 1][coords.y];
                if (!tileSeen(neighbour)) {
                    nextCoords = {x: coords.x + 1, y: coords.y};
                    resultCoords.push(nextCoords);
                    unexploredCoords.push(nextCoords);
                }
            }

            accessibleTiles.push(tile);
        }

        return resultCoords;
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