var _ = require('lodash');

var play = require('../Play'),
    Board = require('../Board'),
    Player = require('../Player');

module.exports = function(game, playerId, playerType){

    playerType = playerType || Player.PLAYER_TYPE_CPU_OPEN;

    var response = play(game, playerId, "player " + playerId),
        playerCoords = response.payload.coords,
        objective = response.payload.objective,
        objectiveCoords = play(game, null, "treasure " + objective).payload;

    if (objectiveCoords == null) {
        playerCoords.distance = 100;
        return playerCoords;
    }

    var path = Board.path(game.board, playerCoords.x, playerCoords.y);

    _.each(path, function(coord){
       coord.distance = distance(coord, objectiveCoords);
    });

    path = _.sortBy(path, 'distance');

    if (_.first(path).distance > 0){
        addWarpMoves(game, path, objectiveCoords);
        path = _.sortBy(path, 'distance');
    }

    //console.log(path);

    return _.first(path);
};

function addWarpMoves(game, path, objectiveCoords){

    // Get all tiles on a the objective path
    var objectivePath = Board.path(game.board, objectiveCoords.x, objectiveCoords.y);

    // Must be on the edge of the board
    var warpLandingCoords = _.filter(objectivePath, function(coord){
        return onEdge(coord);
    });

    // Can land on a neighbouring edge tile
    _.each(warpLandingCoords, function(coord){

        var neighbour;

        if (onHorizontalEdge(coord)) {

            if (!onBottom(coord)) {
                neighbour = {x: coord.x, y: coord.y - 1};
                if (!_.contains(warpLandingCoords, neighbour)) {
                    warpLandingCoords.push(neighbour);
                }
            }

            if (!onTop(coord)) {
                neighbour = {x: coord.x, y: coord.y + 1};
                if (!_.contains(warpLandingCoords, neighbour)) {
                    warpLandingCoords.push(neighbour);
                }
            }
        }

        if (onVerticalEdge(coord)) {

            if (!onLeft(coord)) {
                neighbour = {x: coord.x - 1, y: coord.y};
                if (!_.contains(warpLandingCoords, neighbour)) {
                    warpLandingCoords.push(neighbour);
                }
            }

            if (!onRight(coord)) {
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
        return _.some(path, function(coord){
            if (onEdge(coord) && (coord.x == wCoord.x || coord.y == wCoord.y)) {
                coord.distance = _.min([coord.distance, 1 + (distance(objectiveCoords, wCoord) / 10)]);
                coord.isWarp = true;
                return true;
            }
            return false;
        });
    });
}

function onEdge(coord){
    return onVerticalEdge(coord) || onHorizontalEdge(coord);
}

function onVerticalEdge(coord){
    return onTop(coord) || onBottom(coord);
}

function onHorizontalEdge(coord){
    return onLeft(coord) || onRight(coord);
}

function onLeft(coord){
    return coord.x == 0;
}

function onRight(coord){
    return coord.x == Board.LENGTH - 1;
}

function onTop(coord){
    return coord.y == Board.LENGTH - 1;
}

function onBottom(coord){
    return coord.y == 0;
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