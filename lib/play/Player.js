var Board = require('../Board'),
    EngineResponse = require('../EngineResponse');

module.exports = function(game, requestingPlayerId, playerId) {

    var player = game.players[playerId],
        coords = Board.locatePlayer(game.board, playerId),
        message,
        result = {};

    result.coords = coords;

    if (coords != null) {
        message = 'Player ' + playerId + ' is at ' + coords.x + ',' + coords.y;
    } else {
        message = 'Player ' + playerId + ' not found';
        return EngineResponse.new(false, null, message);
    }

    result.score = player.score;
    result.path = Board.path(game.board, coords.x, coords.y);

    message += ' and has ' + player.score + ' treasures';

    if (requestingPlayerId == playerId) {
        result.objective = player.card.symbol;
        result.objectiveCoords = Board.locateTreasure(game.board, player.card.symbol);
    }

    return EngineResponse.new(true, result, message);
};