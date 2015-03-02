var _ = require('lodash');

var bag = require('./Bag'),
    Treasure = require('./Treasure');

var grid = [];

_.each(_.range(7), function(x) {
    grid[x] = [];
});

grid[0][0] = {exits: [0,1], treasure: Treasure.GREEN_EXIT};
grid[6][0] = {exits: [0,3], treasure: Treasure.BLUE_EXIT};
grid[0][6] = {exits: [1,2], treasure: Treasure.YELLOW_EXIT};
grid[6][6] = {exits: [2,3], treasure: Treasure.RED_EXIT};

grid[2][0] = {exits: [0,1,3], treasure: Treasure.CANDELABRA};
grid[4][0] = {exits: [0,1,3], treasure: Treasure.HELMET};
grid[0][2] = {exits: [0,1,2], treasure: Treasure.RING};
grid[2][2] = {exits: [0,1,3], treasure: Treasure.CHEST};
grid[4][2] = {exits: [0,2,3], treasure: Treasure.GEM};
grid[6][2] = {exits: [0,2,3], treasure: Treasure.SWORD};
grid[0][4] = {exits: [0,1,2], treasure: Treasure.MAP};
grid[2][4] = {exits: [0,1,2], treasure: Treasure.CROWN};
grid[4][4] = {exits: [1,2,3], treasure: Treasure.KEYS};
grid[6][4] = {exits: [0,2,3], treasure: Treasure.SKULL};
grid[2][6] = {exits: [1,2,3], treasure: Treasure.BOOK};
grid[4][6] = {exits: [1,2,3], treasure: Treasure.PURSE};

_.each(_.range(7), function(x) {
    _.each(_.range(7), function(y) {
        if (typeof grid[x][y] === 'undefined') {
            grid[x][y] = bag.pop();
        }
    });
});

module.exports = {
    grid: grid,
    tile: bag[0]
};