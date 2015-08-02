var _ = require('lodash');

module.exports = function(tile, exit) {

    return _.contains(tile.exits, exit);
};