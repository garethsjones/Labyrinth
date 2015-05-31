var _ = require('lodash');

var Treasures = require('./Treasures');

var Deck = function () {
    var self = this;
    this.cards = [];

    _.forEach(Treasures, function(item) {
        if (item.collectable) {
            self.cards.push(_.omit(item, 'collectable'));
        }
    });

    this.cards = _.shuffle(this.cards);

    var deal = function() {
        if (self.cards.length === 0) {
            throw new Error('No cards left in deck');
        }
        return self.cards.pop();
    };

    var exits = {
        1: _.omit(Treasures.GREEN_EXIT, 'collectable'),
        2: _.omit(Treasures.BLUE_EXIT, 'collectable'),
        3: _.omit(Treasures.YELLOW_EXIT, 'collectable'),
        4: _.omit(Treasures.RED_EXIT, 'collectable')
    };

    return {
        deal: deal,
        exits: exits
    }
};

module.exports = Deck;