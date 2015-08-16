var Board = require('../Board'),
    TileBag = require('../TileBag');

var print = require('./Print');

module.exports = function(game, x, y) {
    if (game.phase == 'play') {
        var legal = Board.isPlayable(game.board, x, y);
        if (legal.isPlayable) {
            var tile = Board.play(game.board, x, y, TileBag.get(game.tileBag));
            TileBag.put(game.tileBag, tile);
            game.phase = 'move';
            print(game);
        } else {
            console.log("You can't play the tile there");
        }
    } else {
        console.log("You can't play a tile at the moment");
    }
};