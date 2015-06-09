var FROM_STATE = 'FROM_STATE';

function fromState(state){
    return new Player(FROM_STATE, state);
}

function Player(id, colour) {

    var self = this;

    if (id === FROM_STATE) {
        self = colour;
    } else {
        this.id = id;
        this.symbol = '' + id;
        this.colour = colour;
        this.isActive = true;

        this.card = null;
        this.treasureCount = 0;
    }

    var getState = function(){
        return self;
    };

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
        getState: getState,
        getId: getId,
        getSymbol: getSymbol,
        getColour: getColour,
        isActive: isActive,
        getCard: getCard,
        getTreasureCount: getTreasureCount,
        assignCard: assignCard
    }
}

module.exports = {
    Player: Player,
    fromState: fromState
};