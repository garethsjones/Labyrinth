
function Player(id, colour) {

    var self = this;
    this.id = id;
    this.symbol = '' + id;
    this.colour = colour;
    this.isActive = true;

    this.card = null;
    this.treasureCount = 0;

    this.assignCard = function(card) {
        if (self.card != null) {
            self.treasureCount++;
        }
        self.card = card;
    };
}

module.exports = Player;