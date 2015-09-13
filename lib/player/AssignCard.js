
module.exports = function(player, card) {

    if (player.card != null) {
        player.score++;
    }

    player.card = card;
};