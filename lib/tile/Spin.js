var _ = require('lodash');

var turn = require('./Turn');

module.exports = function(tile) {

    var turns = _.random(3);
    turn(tile, turns);
};