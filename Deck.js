var _ = require('lodash');

var Treasure = require('./Treasures');

var Deck = function () {
    var self = this;
    this.cards = [];

    _.forEach(Treasure, function(item) {
        if (item.collectable) {
            self.cards.push(_.omit(item, 'collectable'));
        }
    });

    this.cards = _.shuffle(this.cards);

    this.deal = function() {
        return self.cards.pop();
    };

    this.exits = {
        1: _.omit(Treasure.GREEN_EXIT, 'collectable'),
        2: _.omit(Treasure.BLUE_EXIT, 'collectable'),
        3: _.omit(Treasure.YELLOW_EXIT, 'collectable'),
        4: _.omit(Treasure.RED_EXIT, 'collectable')
    };
};

module.exports = Deck;