var Board = require = ('../Board');

module.exports = function(game, playerId) {
    var coords = Board.whereIsPlayer(game.board, playerId);
    if (coords != null) {
        console.log('Player ' + playerId + ' is at ' + coords.x + ',' + coords.y);
    } else {
        console.log('Player ' + playerId + ' not found');
    }
};