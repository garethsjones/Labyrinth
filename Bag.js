var _ = require('lodash');

var Treasure = require('./Treasure');
var spin = require('./TileOps').spin;

var bag = [];

// T junctions
var exits = [0,1,3];
bag.push({exits: exits, treasure: Treasure.GHOST});
bag.push({exits: exits, treasure: Treasure.PRINCESS});
bag.push({exits: exits, treasure: Treasure.DRAGON});
bag.push({exits: exits, treasure: Treasure.IMP});
bag.push({exits: exits, treasure: Treasure.GENIE});
bag.push({exits: exits, treasure: Treasure.BAT});

// Corners
exits = [2, 3];
bag.push({exits: exits, treasure: Treasure.RAT});
bag.push({exits: exits, treasure: Treasure.MOTH});
bag.push({exits: exits, treasure: Treasure.LIZARD});
bag.push({exits: exits, treasure: Treasure.OWL});
bag.push({exits: exits, treasure: Treasure.SPIDER});
bag.push({exits: exits, treasure: Treasure.BEETLE});

_.times(10, function() {
    bag.push({exits: exits, treasure: Treasure.EMPTY});
});

// Straights
exits = [0, 2];
_.times(12, function() {
    bag.push({exits: exits, treasure: Treasure.EMPTY});
});

_.each(bag, spin);
bag = _.shuffle(bag);

module.exports = bag;