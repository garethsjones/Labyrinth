var _ = require('lodash');

var Board = require('../Board'),
    EngineResponse = require('../EngineResponse');

module.exports = function(game) {

    var shiftables = Board.shiftables(game.board);

    var s = "";
    _.forEach(shiftables, function(coords) {
        s += coords.x + ',' + coords.y + ' ';
    });

    return EngineResponse.new(true, shiftables, s);
};