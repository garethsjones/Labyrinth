
module.exports = {
    new: require('./board/New'),
    get: require('./board/Get'),
    isShiftable: require('./board/IsShiftable'),
    play: require('./board/Play'),
    path: require('./board/Path'),
    locatePlayer: require('./board/locatePlayer'),
    locateTreasure: require('./board/locateTreasure'),
    shiftables: require('./board/Shiftables'),
    LENGTH: require('./board/Constants').LENGTH
};