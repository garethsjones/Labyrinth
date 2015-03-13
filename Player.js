
function Player(id, colour) {

    this.id = id;
    this.symbol = '' + id;
    this.colour = colour;
    this.cards = [];
    this.isActive = true;
}

module.exports = Player;