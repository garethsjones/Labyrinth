var Game = require('../Game'),
    Board = require('../Board'),
    TileBag = require('../TileBag'),
    EngineResponse = require('../EngineResponse');

module.exports = function(game, x, y) {

    if (game.phase == Game.PHASE_SHIFT) {
        var legal = Board.isShiftable(game.board, x, y);
        if (legal.isShiftable) {
            var tile = Board.play(game.board, x, y, TileBag.get(game.tileBag));
            TileBag.put(game.tileBag, tile);
            game.phase = Game.PHASE_MOVE;
            return EngineResponse.new(true, null, 'Tile placed');
        } else {
            return EngineResponse.new(false, null, "You can't play the tile there");
        }
    } else {
        return EngineResponse.new(false, null, "You can't play a tile at the moment");
    }
};