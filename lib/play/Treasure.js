var Board = require('../Board'),
    TileBag = require('../TileBag'),
    EngineResponse = require('../EngineResponse');

module.exports = function(game, treasureSymbol) {

    var coords = Board.locateTreasure(game.board, treasureSymbol),
        message,
        success = true;

    if (coords != null) {
        message = 'Treasure ' + treasureSymbol + ' is at ' + coords.x + ',' + coords.y;
    } else {
        if (TileBag.peek(game.tileBag).treasure.symbol == treasureSymbol) {
            message = 'Treasure ' + treasureSymbol + ' is on the spare tile';
        } else {
            message = 'Treasure ' + treasureSymbol + ' not found';
            success = false;
        }
    }

    return EngineResponse.new(success, coords, message);
};