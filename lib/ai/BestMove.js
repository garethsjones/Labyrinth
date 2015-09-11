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

    if (_.first(availableCoords).distance > 0){
        addWarpMoves(game, availableCoords, objectiveCoords);
        availableCoords = _.sortBy(availableCoords, 'distance');
    }

    //console.log(availableCoords);

    return _.first(availableCoords);
};

function addWarpMoves(game, availableCoords, objectiveCoords){

    // Get all tiles on a the objective path
    var objectiveAvailableCoords = Board.whereCanIGo(game.board, objectiveCoords.x, objectiveCoords.y);

    // Must be on the edge of the board
    var warpLandingCoords = _.filter(objectiveAvailableCoords, function(coord){
        return coord.x == 0 || coord.x == Board.LENGTH - 1 ||
            coord.y == 0 || coord.y == Board.LENGTH - 1;
    });

    // Can land on a neighbouring edge tile
    _.each(warpLandingCoords, function(coord){

        var neighbour;

        if (coord.x == 0 || coord.x == Board.LENGTH - 1) {

            if (coord.y > 0) {
                neighbour = {x: coord.x, y: coord.y - 1};
                if (!_.contains(warpLandingCoords, neighbour)) {
                    warpLandingCoords.push(neighbour);
                }
            }

            if (coord.y < Board.LENGTH - 1) {
                neighbour = {x: coord.x, y: coord.y + 1};
                if (!_.contains(warpLandingCoords, neighbour)) {
                    warpLandingCoords.push(neighbour);
                }
            }
        }

        if (coord.y == 0 || coord.y == Board.LENGTH - 1) {

            if (coord.x > 0) {
                neighbour = {x: coord.x - 1, y: coord.y};
                if (!_.contains(warpLandingCoords, neighbour)) {
                    warpLandingCoords.push(neighbour);
                }
            }

            if (coord.x < Board.LENGTH - 1) {
                neighbour = {x: coord.x + 1, y: coord.y};
                if (!_.contains(warpLandingCoords, neighbour)) {
                    warpLandingCoords.push(neighbour);
                }
            }
        }
    });

    // Must be movable
    warpLandingCoords = _.filter(warpLandingCoords, function(coord){
        return coord.x % 2 == 1 || coord.y % 2 == 1;
    });

    // Must be opposite an available tile
    warpLandingCoords = _.filter(warpLandingCoords, function(wCoord){
        return _.some(availableCoords, function(aCoord){
            if (aCoord.x == wCoord.x || aCoord.y == wCoord.y) {
                aCoord.distance = 1 + (distance(objectiveCoords, wCoord) / 10);
                aCoord.isWarp = true;
                return true;
            }
            return false;
        });
    });
}

function distance(coord1, coord2){

    var maxX = _.max([coord1.x, coord2.x]),
        minX = _.min([coord1.x, coord2.x]),
        maxY = _.max([coord1.y, coord2.y]),
        minY = _.min([coord1.y, coord2.y]);

    var deltaX = maxX - minX,
        deltaY = maxY - minY;

    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
}