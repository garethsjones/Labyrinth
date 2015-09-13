var _ = require('lodash');

var play = require('../Play'),
    Board = require('../Board'),
    Player = require('../Player');

var bestMove = require('./BestMove');

module.exports = function(game, playerId, playerType){

    playerType = playerType || Player.PLAYER_TYPE_CPU_OPEN;

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
        var move = bestMove(future, playerId, playerType);
        move.placement = placement;
        moves.push(move);
    });

    var bestDistance = _.sortBy(moves, 'distance')[0].distance;
    var candidates = _.filter(moves, {distance: bestDistance});

    _.each(candidates, function(candidate){
        var future = _.cloneDeep(game);
        play(future, playerId, candidate.placement.rotation);
        play(future, playerId, "play " + candidate.placement.x + "," + candidate.placement.y);

        candidate.quality = 0;
        candidate.metric = playerType.metric;

        if (bestDistance == 1) {
            candidate.quality = play(future, playerId, 'player ' + playerId).payload.accessibleTiles.length;
        } else {
            switch (playerType.metric) {
                case ('other_paths'):
                    _.each(game.players, function(player){
                        if (player.id != playerId) {
                            candidate.quality += play(future, playerId, 'player ' + player.id).payload.accessibleTiles.length;
                        }
                    });
                    break;
                case ('own_path'):
                default:
                    candidate.quality = play(future, playerId, 'player ' + playerId).payload.accessibleTiles.length;
            }
        }
    });

    candidates = _.shuffle(candidates);

    switch (playerType.order) {
        case 'random':
            break;
        case 'reverse':
            candidates = _.sortByOrder(candidates, ['quality'], [true]);
            break;
        default:
            candidates = _.sortByOrder(candidates, ['quality'], [false]);
    }

    // console.log(candidates);

    return _.first(candidates).placement;
};