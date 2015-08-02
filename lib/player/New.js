

module.exports = function(id, colour) {

    var player = {};

    player.id = id;
    player.symbol = '' + id;
    player.colour = colour;
    player.isActive = true;

    player.card = null;
    player.treasureCount = 0;

    return player;
};