var _ = require('lodash');

var play = require('../Play'),
    Board = require('../Board'),
    Player = require('../Player');

var bestMove = require('./BestMove');

module.exports = function(game, playerId, playerType){

    playerType = playerType || Player.PLAYER_TYPES.CPU.OPEN;

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

    var intelligence = playerType.intelligence || 100;

    if (intelligence < 100) {
        var gotOne = false;
        moves = _.shuffle(moves);
        moves = _.filter(moves, function(move){
            if (!gotOne) {
                gotOne = true;
                return true;
            }
            return intelligence > _.random(0, 100);
        });
    }

    var bestDistance = _.sortBy(moves, 'distance')[0].distance;
    moves = _.filter(moves, {distance: bestDistance});

    _.each(moves, function(move){
        var future = _.cloneDeep(game);
        play(future, playerId, move.shift.rotation);
        play(future, playerId, "shift " + move.shift.x + "," + move.shift.y);

        move.quality = 0;
        move.metric = playerType.metric;

        if (bestDistance == 1) {
            move.quality = play(future, playerId, 'player ' + playerId).payload.path.length;
        } else {
            switch (playerType.metric) {
                case ('other_paths'):
                    _.each(game.players, function(player){
                        if (player.id != playerId) {
                            move.quality += play(future, playerId, 'player ' + player.id).payload.path.length;
                        }
                    });
                    break;
                case ('own_path'):
                default:
                    move.quality = play(future, playerId, 'player ' + playerId).payload.path.length;
            }
        }
    });

    moves = _.shuffle(moves);

    switch (playerType.order) {
        case 'random':
            break;
        case 'reverse':
            moves = _.sortByOrder(moves, ['quality'], [true]);
            break;
        default:
            moves = _.sortByOrder(moves, ['quality'], [false]);
    }

    // console.log(moves);

    return _.first(moves).shift;
};