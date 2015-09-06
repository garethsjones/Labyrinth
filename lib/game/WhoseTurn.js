var _ = require('lodash');

module.exports = function(game){
    return game.players[_.keys(game.players)[game.turn]];
};