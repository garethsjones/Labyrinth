var count = require('./Count');

module.exports = function(tileBag) {

    if (count(tileBag) === 0) {
        throw new Error('No tiles left in bag');
    }

    return tileBag.tiles[0];
};