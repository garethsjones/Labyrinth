var _ = require('lodash');

var Tile = require('../Tile');

var BoardConstants = require('./Constants'),
    LENGTH = BoardConstants.LENGTH;

module.exports = function(board, x, y) {

    var resultPoints = [],
        unexploredPoints = [];

    function pointsSeen(point) {
        return _.some(resultPoints, function(resultPoint) {
            return _.isEqual(resultPoint, point);
        });
    }

    var point = {x: x, y: y};
    resultPoints.push(point);
    unexploredPoints.push(point);

    while (unexploredPoints.length != 0) {

        point = unexploredPoints.pop();
        var tile = board.grid[point.x][point.y];

        if (pointsSeen(tile)) {
            continue;
        }

        var neighbour,
            hasExit = _.curry(Tile.hasExit)(tile);

        //up
        if (point.y < LENGTH - 1 && hasExit(0) && Tile.hasExit(board.grid[point.x][point.y + 1], 2)) {
            neighbour = {x: point.x, y: point.y + 1};
            if (!pointsSeen(neighbour)) {
                resultPoints.push(neighbour);
                unexploredPoints.push(neighbour);
            }
        }

        //down
        if (point.y > 0 && hasExit(2) && Tile.hasExit(board.grid[point.x][point.y - 1], 0)) {
            neighbour = {x: point.x, y: point.y - 1};
            if (!pointsSeen(neighbour)) {
                resultPoints.push(neighbour);
                unexploredPoints.push(neighbour);
            }
        }

        //left
        if (point.x > 0 && hasExit(3) && Tile.hasExit(board.grid[point.x - 1][point.y], 1)) {
            neighbour = {x: point.x - 1, y: point.y};
            if (!pointsSeen(neighbour)) {
                resultPoints.push(neighbour);
                unexploredPoints.push(neighbour);
            }
        }

        //right
        if (point.x < LENGTH - 1 && hasExit(1) && Tile.hasExit(board.grid[point.x + 1][point.y], 3)) {
            neighbour = {x: point.x + 1, y: point.y};
            if (!pointsSeen(neighbour)) {
                resultPoints.push(neighbour);
                unexploredPoints.push(neighbour);
            }
        }
    }

    return resultPoints;
};