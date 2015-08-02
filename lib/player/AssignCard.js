
module.exports = function(player, card) {

    if (player.card != null) {
        player.treasureCount++;
    }

    player.card = card;
};