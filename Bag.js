var _ = require('lodash');

var Treasures = require('./Treasures'),
    Tile = require('./Tile');

function Bag() {
    var tiles = [];

    // T junctions
    var exits = [0,1,3];
    tiles.push(new Tile(exits, Treasures.GHOST));
    tiles.push(new Tile(exits, Treasures.PRINCESS));
    tiles.push(new Tile(exits, Treasures.DRAGON));
    tiles.push(new Tile(exits, Treasures.IMP));
    tiles.push(new Tile(exits, Treasures.GENIE));
    tiles.push(new Tile(exits, Treasures.BAT));

    // Corners
    exits = [2, 3];
    tiles.push(new Tile(exits, Treasures.RAT));
    tiles.push(new Tile(exits, Treasures.MOTH));
    tiles.push(new Tile(exits, Treasures.LIZARD));
    tiles.push(new Tile(exits, Treasures.OWL));
    tiles.push(new Tile(exits, Treasures.SPIDER));
    tiles.push(new Tile(exits, Treasures.BEETLE));

    _.times(10, function() {
        tiles.push(new Tile(exits));
    });

    // Straights
    exits = [0, 2];
    _.times(12, function() {
        tiles.push(new Tile(exits));
    });

    _.each(tiles, function(tile) {
        tile.spin();
    });
    tiles = _.shuffle(tiles);

    this.peekTile = function() {
        return tiles[0];
    };

    this.getTile = function() {
        return tiles.pop();
    };

    this.putTile = function(tile) {
        tiles.push(tile);
    };

    this.count = function() {
        return tiles.length;
    }
}

module.exports = Bag;