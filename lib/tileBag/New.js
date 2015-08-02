var _ = require('lodash');

var Treasures = require('../Treasures').Treasures,
    Tile = require('../Tile');

module.exports = function() {

    var tiles = [];

    // T junctions
    var exits = [0,1,3];
    tiles.push(Tile.new(exits, Treasures.GHOST));
    tiles.push(Tile.new(exits, Treasures.PRINCESS));
    tiles.push(Tile.new(exits, Treasures.DRAGON));
    tiles.push(Tile.new(exits, Treasures.IMP));
    tiles.push(Tile.new(exits, Treasures.GENIE));
    tiles.push(Tile.new(exits, Treasures.BAT));

    // Corners
    exits = [2, 3];
    tiles.push(Tile.new(exits, Treasures.RAT));
    tiles.push(Tile.new(exits, Treasures.MOTH));
    tiles.push(Tile.new(exits, Treasures.LIZARD));
    tiles.push(Tile.new(exits, Treasures.OWL));
    tiles.push(Tile.new(exits, Treasures.SPIDER));
    tiles.push(Tile.new(exits, Treasures.BEETLE));

    _.times(10, function() {
        tiles.push(Tile.new(exits));
    });

    // Straights
    exits = [0, 2];
    _.times(12, function() {
        tiles.push(Tile.new(exits));
    });

    _.each(tiles, function(tile) {
        Tile.spin(tile);
    });

    var tileBag = {};
    tileBag.tiles = _.shuffle(tiles);

    return tileBag;
};