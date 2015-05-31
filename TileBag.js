var _ = require('lodash');

var Treasures = require('./Treasures'),
    Tile = require('./Tile');

function TileBag() {
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

    var peek = function() {
        if (count() === 0) {
            throw new Error('No tiles left in bag');
        }
        return tiles[0];
    };

    var get = function() {
        if (count() === 0){
            throw new Error('No tiles left in bag');
        }
        return tiles.pop();
    };

    var put = function(tile) {
        tiles.push(tile);
    };

    var count = function() {
        return tiles.length;
    };

    return {
        count: count,
        peek: peek,
        get: get,
        put: put,
    }
}

module.exports = TileBag;