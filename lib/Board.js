
module.exports = {
    new: require('./board/New'),
    get: require('./board/Get'),
    isPlayable: require('./board/IsPlayable'),
    play: require('./board/Play'),
    whereCanIGo: require('./board/WhereCanIGo'),
    whereIsPlayer: require('./board/WhereIsPlayer'),
    whereIsTreasure: require('./board/WhereIsTreasure'),
    LENGTH: require('./board/Constants').LENGTH
};