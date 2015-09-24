
module.exports = function(id, colour, playerType) {

    var player = {};

    player.id = id;
    player.name = playerType.name || colour;
    player.playerType = playerType;
    player.symbol = '' + id;
    player.colour = colour;
    player.isActive = true;

    player.card = null;
    player.score = 0;

    return player;
};