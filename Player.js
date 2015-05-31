
function Player(id, colour) {

    var self = this;
    this.id = id;
    this.symbol = '' + id;
    this.colour = colour;
    this.isActive = true;

    this.card = null;
    this.treasureCount = 0;

    var assignCard = function(card) {
        if (self.card != null) {
            self.treasureCount++;
        }
        self.card = card;
    };

    var getId = function() {
        return self.id;
    };

    var getSymbol = function() {
        return self.symbol;
    };

    var getColour = function() {
        return self.colour;
    };

    var isActive = function() {
        return self.isActive;
    };

    var getCard = function() {
        return self.card;
    };

    var getTreasureCount = function() {
        return self.treasureCount;
    };

    return {
        getId: getId,
        getSymbol: getSymbol,
        getColour: getColour,
        isActive: isActive,
        getCard: getCard,
        getTreasureCount: getTreasureCount,
        assignCard: assignCard
    }
}

module.exports = Player;