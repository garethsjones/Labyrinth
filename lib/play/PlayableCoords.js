var _ = require('lodash');

var Board = require('../Board');

module.exports = function(game) {
    var playableCoords = Board.playableCoords(game.board);

    var s = "";
    _.forEach(playableCoords, function(coords) {
        s += coords.x + ',' + coords.y + ' ';
    });
    console.log('Playable coords: ' + s);
};