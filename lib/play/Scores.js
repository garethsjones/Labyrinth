var _ = require('lodash');

var EngineResponse = require('../EngineResponse');

module.exports = function(game){
    var scores = {};
    var message = '';

    _.each(game.players, function(player){
        scores[player.id] = player.score;
        message += 'Player ' + player.id + ": " + player.score + "\n";
    });

    return EngineResponse.new(true, scores, message);
};