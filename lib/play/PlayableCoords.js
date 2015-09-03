var _ = require('lodash');

var Board = require('../Board'),
    EngineResponse = require('../EngineResponse');

module.exports = function(game) {

    var playableCoords = Board.playableCoords(game.board);

    var s = "";
    _.forEach(playableCoords, function(coords) {
        s += coords.x + ',' + coords.y + ' ';
    });

    return EngineResponse.new(true, playableCoords, s);
};