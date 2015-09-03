var TileBag = require('../TileBag'),
    Tile = require('../Tile'),
    EngineResponse = require('../EngineResponse');

module.exports = function(game, turns) {
    Tile.turn(TileBag.peek(game.tileBag), turns);
    return EngineResponse.new(true, TileBag.peek(game.tileBag), 'Tile turned');
};