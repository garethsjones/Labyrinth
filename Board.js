var _ = require('lodash');

var bag = require('./Bag'),
    treasure = require('./Treasure'),
    players = require('./Players');

var grid = [];

_.each(_.range(7), function(x) {
    grid[x] = [];
});

grid[0][0] = {exits: [0,1], treasure: treasure.GREEN_EXIT, players:[players._1]};
grid[6][0] = {exits: [0,3], treasure: treasure.BLUE_EXIT, players:[players._2]};
grid[0][6] = {exits: [1,2], treasure: treasure.YELLOW_EXIT, players:[players._3]};
grid[6][6] = {exits: [2,3], treasure: treasure.RED_EXIT, players:[players._4]};

grid[2][0] = {exits: [0,1,3], treasure: treasure.CANDELABRA, players:[]};
grid[4][0] = {exits: [0,1,3], treasure: treasure.HELMET, players:[]};
grid[0][2] = {exits: [0,1,2], treasure: treasure.RING, players:[]};
grid[2][2] = {exits: [0,1,3], treasure: treasure.CHEST, players:[]};
grid[4][2] = {exits: [0,2,3], treasure: treasure.GEM, players:[]};
grid[6][2] = {exits: [0,2,3], treasure: treasure.SWORD, players:[]};
grid[0][4] = {exits: [0,1,2], treasure: treasure.MAP, players:[]};
grid[2][4] = {exits: [0,1,2], treasure: treasure.CROWN, players:[]};
grid[4][4] = {exits: [1,2,3], treasure: treasure.KEYS, players:[]};
grid[6][4] = {exits: [0,2,3], treasure: treasure.SKULL, players:[]};
grid[2][6] = {exits: [1,2,3], treasure: treasure.BOOK, players:[]};
grid[4][6] = {exits: [1,2,3], treasure: treasure.PURSE, players:[]};

_.each(_.range(7), function(x) {
    _.each(_.range(7), function(y) {
        if (typeof grid[x][y] === 'undefined') {
            grid[x][y] = bag.pop();
        }
    });
});

var tile = bag.pop();

module.exports = {
    grid: grid,
    tile: tile
};