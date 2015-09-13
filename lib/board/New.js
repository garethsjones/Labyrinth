var _ = require('lodash');

var Tile = require('../Tile'),
    Treasure = require('../Treasures'),
    TileBag = require('../TileBag');

var BoardConstants = require('./Constants'),
    LENGTH = BoardConstants.LENGTH;

module.exports = function(tileBag, players) {

    var board = {};

    board.grid = [];
    board.previousShift = {x: null, y: null};

    _.each(_.range(LENGTH), function(x) {
        board.grid[x] = [];
    });

    board.grid[0][0] = Tile.new([0,1], Treasure.GREEN_EXIT, [players[1]]);
    board.grid[6][0] = Tile.new([0,3], Treasure.BLUE_EXIT, [players[2]]);
    board.grid[0][6] = Tile.new([1,2], Treasure.YELLOW_EXIT, [players[4]]);
    board.grid[6][6] = Tile.new([2,3], Treasure.RED_EXIT, [players[3]]);

    board.grid[2][0] = Tile.new([0,1,3], Treasure.CANDELABRA);
    board.grid[4][0] = Tile.new([0,1,3], Treasure.HELMET);
    board.grid[0][2] = Tile.new([0,1,2], Treasure.RING);
    board.grid[2][2] = Tile.new([0,1,3], Treasure.CHEST);
    board.grid[4][2] = Tile.new([0,2,3], Treasure.GEM);
    board.grid[6][2] = Tile.new([0,2,3], Treasure.SWORD);
    board.grid[0][4] = Tile.new([0,1,2], Treasure.MAP);
    board.grid[2][4] = Tile.new([0,1,2], Treasure.CROWN);
    board.grid[4][4] = Tile.new([1,2,3], Treasure.KEYS);
    board.grid[6][4] = Tile.new([0,2,3], Treasure.SKULL);
    board.grid[2][6] = Tile.new([1,2,3], Treasure.BOOK);
    board.grid[4][6] = Tile.new([1,2,3], Treasure.PURSE);

    _.each(_.range(LENGTH), function(x) {
        _.each(_.range(LENGTH), function(y) {
            if (typeof board.grid[x][y] === 'undefined') {
                board.grid[x][y] = TileBag.get(tileBag);
            }
        });
    });

    return board;
};