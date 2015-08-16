var TileBag = require('../TileBag'),
    Tile = require('../Tile'),
    Printer = require('../../AsciiBoardPrinter');

module.exports = function(game, turns) {
    Tile.turn(TileBag.peek(game.tileBag), turns);
    Printer.printTile(TileBag.peek(game.tileBag));
};