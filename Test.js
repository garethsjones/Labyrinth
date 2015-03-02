var _ = require('lodash');

var board = require('./Board'),
    grid = board.grid,
    tile = board.tile,
    printer = require('./AsciiBoardPrinter'),
    treasure = require('./Treasure'),
    deck = require('./Deck'),
    tileOps = require('./TileOps'),
    boardOps = require('./BoardOps');

printer.printGrid(grid);
printer.printTile(tile);

boardOps.play(board, 1, 0);

printer.printGrid(grid);
printer.printTile(tile);

// ---------------------------------
