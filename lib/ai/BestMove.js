var _ = require('lodash');

var play = require('../Play'),
    Board = require('../Board');

module.exports = function(game, playerId){

    var response = play(game, playerId, "player " + playerId),
        playerCoords = response.payload.coords,
        objective = response.payload.objective,
        objectiveCoords = play(game, null, "treasure " + objective).payload;

    if (objectiveCoords == null) {
        playerCoords.distance = 100;
        return playerCoords;
    }

    var availableCoords = Board.whereCanIGo(game.board, playerCoords.x, playerCoords.y);

    _.each(availableCoords, function(coord){
       coord.distance = distance(coord, objectiveCoords);
    });

    availableCoords = _.sortBy(availableCoords, 'distance');
    //console.log(availableCoords);

    return _.first(availableCoords);
};

function distance(coord1, coord2){

    var maxX = _.max([coord1.x, coord2.x]),
        minX = _.min([coord1.x, coord2.x]),
        maxY = _.max([coord1.y, coord2.y]),
        minY = _.min([coord1.y, coord2.y]);

    var deltaX = maxX - minX,
        deltaY = maxY - minY;

    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
}