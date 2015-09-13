var BoardConstants = require('./Constants'),
    LENGTH = BoardConstants.LENGTH;

module.exports = function(board, x, y){

    var onRight = x == 0,
        onLeft = x == LENGTH - 1,
        onBottom = y == 0,
        onTop = y == LENGTH -1;

    if (!(onBottom || onTop || onRight || onLeft)) {
        return {isShiftable: false, message: "Must be on board edge"};
    }

    if (onBottom || onTop) {
        if (x % 2 == 0) {
            return {isShiftable: false, message: "Must be on odd column"};
        }

        if (x == board.previousShift.x && y != board.previousShift.y) {
            return {isShiftable: false, message: "You cannot negate the previous turn"};
        }
    }

    if (onRight || onLeft) {
        if (y % 2 == 0) {
            return {isShiftable: false, message: "Must be on odd row"};
        }

        if (y == board.previousShift.y && x != board.previousShift.x) {
            return {isShiftable: false, message: "You cannot negate the previous turn"};
        }
    }

    return {isShiftable: true, message: 'OK'};
};