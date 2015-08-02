var BoardConstants = require('./Constants'),
    LENGTH = BoardConstants.LENGTH;

module.exports = function(board, x, y){

    var onRight = x == 0,
        onLeft = x == LENGTH - 1,
        onBottom = y == 0,
        onTop = y == LENGTH -1;

    if (!(onBottom || onTop || onRight || onLeft)) {
        return {isPlayable: false, message: "Must be on board edge"};
    }

    if (onBottom || onTop) {
        if (x % 2 == 0) {
            return {isPlayable: false, message: "Must be on odd column"};
        }

        if (x == board.previousPlay.x && y != board.previousPlay.y) {
            return {isPlayable: false, message: "You cannot negate the previous turn"};
        }
    }

    if (onRight || onLeft) {
        if (y % 2 == 0) {
            return {isPlayable: false, message: "Must be on odd row"};
        }

        if (y == board.previousPlay.y && x != board.previousPlay.x) {
            return {isPlayable: false, message: "You cannot negate the previous turn"};
        }
    }

    return {isPlayable: true, message: 'OK'};
};