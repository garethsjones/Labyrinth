var _ = require('lodash');

var Treasures = require('./Treasures').Treasures;

module.exports = {
    new: require('./deck/New'),
    deal: require('./deck/Deal'),
    exits: {
        1: _.omit(Treasures.GREEN_EXIT, 'collectable'),
        2: _.omit(Treasures.BLUE_EXIT, 'collectable'),
        3: _.omit(Treasures.YELLOW_EXIT, 'collectable'),
        4: _.omit(Treasures.RED_EXIT, 'collectable')
    }
};