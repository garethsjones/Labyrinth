var _ = require('lodash');

var Tile = require('./Tile'),
    Treasure = require('./Treasures');

function Board(bag, players) {

    var self = this;
    this.grid = [];
    this.length = 7;
    this.previousPlay = {x: null, y: null};

    _.each(_.range(self.length), function(x) {
        self.grid[x] = [];
    });

    this.grid[0][0] = new Tile([0,1], Treasure.GREEN_EXIT, [players[1]]);
    this.grid[6][0] = new Tile([0,3], Treasure.BLUE_EXIT, [players[2]]);
    this.grid[0][6] = new Tile([1,2], Treasure.YELLOW_EXIT, [players[3]]);
    this.grid[6][6] = new Tile([2,3], Treasure.RED_EXIT, [players[4]]);

    this.grid[2][0] = new Tile([0,1,3], Treasure.CANDELABRA);
    this.grid[4][0] = new Tile([0,1,3], Treasure.HELMET);
    this.grid[0][2] = new Tile([0,1,2], Treasure.RING);
    this.grid[2][2] = new Tile([0,1,3], Treasure.CHEST);
    this.grid[4][2] = new Tile([0,2,3], Treasure.GEM);
    this.grid[6][2] = new Tile([0,2,3], Treasure.SWORD);
    this.grid[0][4] = new Tile([0,1,2], Treasure.MAP);
    this.grid[2][4] = new Tile([0,1,2], Treasure.CROWN);
    this.grid[4][4] = new Tile([1,2,3], Treasure.KEYS);
    this.grid[6][4] = new Tile([0,2,3], Treasure.SKULL);
    this.grid[2][6] = new Tile([1,2,3], Treasure.BOOK);
    this.grid[4][6] = new Tile([1,2,3], Treasure.PURSE);

    _.each(_.range(self.length), function(x) {
        _.each(_.range(self.length), function(y) {
            if (typeof self.grid[x][y] === 'undefined') {
                self.grid[x][y] = bag.get();
            }
        });
    });

    var get = function(x, y) {
        return self.grid[x][y];
    };

    var whereIsTreasure = function(symbol) {
        var result = null;
        _.each(_.range(self.length), function(x) {
            _.each(_.range(self.length), function(y) {
                if (self.grid[x][y].getTreasure().symbol == symbol) {
                    result = {x: x, y: y};
                }
            });
        });
        return result;
    };

    var whereIsPlayer = function(id) {
        var result = null;
        _.each(_.range(self.length), function(x) {
            _.each(_.range(self.length), function(y) {
                if (self.grid[x][y].getPlayer(id)) {
                    result = {x: x, y: y};
                }
            });
        });
        return result;
    };

    var whereCanIGo = function(x, y) {

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
            var tile = self.grid[coords.x][coords.y];
            if (tileSeen(tile)) {
                continue;
            }

            var neighbour,
                nextCoords;

            //up
            if (coords.y < self.length - 1 && tile.hasExit(0) && self.grid[coords.x][coords.y + 1].hasExit(2)) {
                neighbour = self.grid[coords.x][coords.y + 1];
                if (!tileSeen(neighbour)) {
                    nextCoords = {x: coords.x, y: coords.y + 1};
                    resultCoords.push(nextCoords);
                    unexploredCoords.push(nextCoords);
                }
            }

            //down
            if (coords.y > 0 && tile.hasExit(2) && self.grid[coords.x][coords.y - 1].hasExit(0)) {
                neighbour = self.grid[coords.x][coords.y - 1];
                if (!tileSeen(neighbour)) {
                    nextCoords = {x: coords.x, y: coords.y - 1};
                    resultCoords.push(nextCoords);
                    unexploredCoords.push(nextCoords);
                }
            }

            //left
            if (coords.x > 0 && tile.hasExit(3) && self.grid[coords.x - 1][coords.y].hasExit(1)) {
                neighbour = self.grid[coords.x - 1][coords.y];
                if (!tileSeen(neighbour)) {
                    nextCoords = {x: coords.x - 1, y: coords.y};
                    resultCoords.push(nextCoords);
                    unexploredCoords.push(nextCoords);
                }
            }

            //right
            if (coords.x < self.length - 1 && tile.hasExit(1) && self.grid[coords.x + 1][coords.y].hasExit(3)) {
                neighbour = self.grid[coords.x + 1][coords.y];
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

    var isPlayable = function (x, y) {
        var onRight = x == 0,
            onLeft = x == self.length - 1,
            onBottom = y == 0,
            onTop = y == self.length -1;

        if (!(onBottom || onTop || onRight || onLeft)) {
            return {isPlayable: false, message: "Must be on board edge"};
        }

        if (onBottom || onTop) {
            if (x % 2 == 0) {
                return {isPlayable: false, message: "Must be on odd column"};
            }

            if (x == self.previousPlay.x && y != self.previousPlay.y) {
                return {isPlayable: false, message: "You cannot negate the previous turn"};
            }
        }

        if (onRight || onLeft) {
            if (y % 2 == 0) {
                return {isPlayable: false, message: "Must be on odd row"};
            }

            if (y == self.previousPlay.y && x != self.previousPlay.x) {
                return {isPlayable: false, message: "You cannot negate the previous turn"};
            }
        }

        return {isPlayable: true, message: 'OK'};
    };

    var play = function (x, y, tile) {

        var playability = isPlayable(x, y);
        if (!playability.isPlayable) {
            throw new Error("Illegal move: " + playability.message);
        }

        var onRight = x == 0,
            onLeft = x == self.length - 1,
            onBottom = y == 0,
            onTop = y == self.length -1,
            spare = null;

        if (onBottom) {
            spare = self.grid[x][self.length - 1];

            _.forEach(_.range(self.length - 1, 0, -1), function(y) {
                self.grid[x][y] = self.grid[x][y-1];
            });

            self.grid[x][0] = tile;
        }

        if (onTop) {
            spare = self.grid[x][0];

            _.forEach(_.range(0, self.length - 1, +1), function(y) {
                self.grid[x][y] = self.grid[x][y+1];
            });

            self.grid[x][self.length - 1] = tile;
        }

        if (onRight) {
            spare = self.grid[self.length - 1][y];

            _.forEach(_.range(self.length - 1, 0, -1), function(x) {
                self.grid[x][y] = self.grid[x-1][y];
            });

            self.grid[0][y] = tile;
        }

        if (onLeft) {
            spare = self.grid[0][y];

            _.forEach(_.range(0, self.length - 1, +1), function(x) {
                self.grid[x][y] = self.grid[x+1][y];
            });

            self.grid[self.length - 1][y] = tile;
        }

        tile.setPlayers(spare.getPlayers());
        spare.setPlayers({});

        self.previousPlay = {x: x, y: y};

        return spare;
    };

    return {
        get: get,
        whereIsTreasure: whereIsTreasure,
        whereIsPlayer: whereIsPlayer,
        whereCanIGo: whereCanIGo,
        isPlayable: isPlayable,
        play: play,
        length: this.length
    }
}

module.exports = Board;