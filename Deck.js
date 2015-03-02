var _ = require('lodash');

var treasure = require('./Treasure');

var deck = [];

_.forEach(treasure, function(item) {
    if (item.collectable) {
        deck.push(_.omit(item, 'collectable'));
    }
});

deck = _.shuffle(deck);

module.exports = deck;