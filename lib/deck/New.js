var _ = require('lodash');

var Treasures = require('../Treasures');

module.exports = function() {

    var cards = [];

    _.forEach(Treasures, function(item) {
        if (item.collectable) {
            cards.push(_.omit(item, 'collectable'));
        }
    });

    return _.shuffle(cards);
};