var _ = require('lodash');

var play = require('../Play'),
    Board = require('../Board'),
    Player = require('../Player');

var bestMove = require('./BestMove');

module.exports = function(game, playerId, playerType){

    playerType = playerType || Player.PLAYER_TYPE_CPU_OPEN;

    var shiftables = Board.shiftables(game.board),
        rotations = ['hold', 'turn', 'flip', 'turna'];

    var shifts = [];

    _.each(shiftables, function(coord){
        _.each(rotations, function(rotation){
            shifts.push({x: coord.x, y: coord.y, rotation: rotation});
        });
    });

    var moves = [];

    _.each(shifts, function(shift){
        var future = _.cloneDeep(game);
        play(future, playerId, shift.rotation);
        play(future, playerId, "shift " + shift.x + "," + shift.y);
        var move = bestMove(future, playerId, playerType);
        move.shift = shift;
        moves.push(move);
    });

    var bestDistance = _.sortBy(moves, 'distance')[0].distance;
    var candidates = _.filter(moves, {distance: bestDistance});

    _.each(candidates, function(candidate){
        var future = _.cloneDeep(game);
        play(future, playerId, candidate.shift.rotation);
        play(future, playerId, "shift " + candidate.shift.x + "," + candidate.shift.y);

        candidate.quality = 0;
        candidate.metric = playerType.metric;

        if (bestDistance == 1) {
            candidate.quality = play(future, playerId, 'player ' + playerId).payload.path.length;
        } else {
            switch (playerType.metric) {
                case ('other_paths'):
                    _.each(game.players, function(player){
                        if (player.id != playerId) {
                            candidate.quality += play(future, playerId, 'player ' + player.id).payload.path.length;
                        }
                    });
                    break;
                case ('own_path'):
                default:
                    candidate.quality = play(future, playerId, 'player ' + playerId).payload.path.length;
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

    return _.first(candidates).shift;
};