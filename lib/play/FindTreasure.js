var Board = require('../Board'),
    TileBag = require('../TileBag');

module.exports = function(game, treasureSymbol) {
    var coords = Board.whereIsTreasure(game.board, treasureSymbol);
    if (coords != null) {
        console.log('Treasure ' + treasureSymbol + ' is at ' + coords.x + ',' + coords.y);
    } else {
        if (TileBag.peek(game.tileBag).treasure.symbol == treasureSymbol) {
            console.log('Treasure ' + treasureSymbol + ' is on the spare tile');
        } else {
            console.log('Treasure ' + treasureSymbol + ' not found');
        }
    }
};