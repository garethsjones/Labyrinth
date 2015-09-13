var PLAYER_TYPE_HUMAN = require('../Player').PLAYER_TYPE_HUMAN;

module.exports = function(id, colour, playerType) {

    playerType = typeof playerType !== 'undefined' ? playerType : PLAYER_TYPE_HUMAN;

    var player = {};

    player.id = id;
    player.playerType = playerType;
    player.symbol = '' + id;
    player.colour = colour;
    player.isActive = true;

    player.card = null;
    player.score = 0;

    return player;
};