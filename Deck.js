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
};

module.exports = Deck;