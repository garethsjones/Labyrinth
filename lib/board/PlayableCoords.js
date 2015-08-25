var _ = require('lodash');

var isPlayable = require('./IsPlayable');

function coord(x, y) {
    return {x: x, y: y};
}

var ALL = [
    coord(0,1),
    coord(0,3),
    coord(0,5),
    coord(1,0),
    coord(3,0),
    coord(5,0),
    coord(6,1),
    coord(6,3),
    coord(6,5),
    coord(1,6),
    coord(3,6),
    coord(5,6)
];

module.exports = function(board) {
    return _.filter(ALL, function(coord){
        return isPlayable(board, coord.x, coord.y).isPlayable;
    })
};