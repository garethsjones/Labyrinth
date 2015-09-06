var _ = require('lodash');

var play = require('../Play'),
    Board = require('../Board');

var bestMove = require('./BestMove');

module.exports = function(game, playerId){

    var playableCoords = Board.playableCoords(game.board),
        rotations = ['hold', 'turn', 'flip', 'turna'];

    var placements = [];

    _.each(playableCoords, function(coord){
        _.each(rotations, function(rotation){
            placements.push({x: coord.x, y: coord.y, rotation: rotation});
        });
    });

    var moves = [];

    _.each(placements, function(placement){
        var future = _.cloneDeep(game);
        play(future, playerId, placement.rotation);
        play(future, playerId, "play " + placement.x + "," + placement.y);
        var move = bestMove(future, playerId);
        move.placement = placement;
        moves.push(move);
    });

    var bestDistance = _.sortBy(moves, 'distance')[0].distance;
    var candidates = _.filter(moves, {distance: bestDistance});

    _.each(candidates, function(candidate){
        var future = _.cloneDeep(game);
        play(future, playerId, candidate.placement.rotation);
        play(future, playerId, "play " + candidate.placement.x + "," + candidate.placement.y);
        candidate.accessibleTiles = play(future, playerId, 'player ' + playerId).payload.accessibleTiles.length;
    });

    candidates = _.sortByOrder(candidates, ['accessibleTiles'], [false]);
    //console.log(candidates);

    return _.first(candidates).placement;
};
