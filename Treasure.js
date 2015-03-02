function symbol(index) {
    return String.fromCharCode(60 + index);
}

var i = 0;
var treasure = {
    EMPTY: {symbol: i++, desc: 'Empty', collectable: false},
    GREEN_EXIT: {symbol: i++, desc: 'Green exit', collectable: false},
    BLUE_EXIT: {symbol: i++, desc: 'Blue exit', collectable: false},
    YELLOW_EXIT: {symbol: i++, desc: 'Yellow exit', collectable: false},
    RED_EXIT: {symbol: i++, desc: 'Red exit', collectable: false},
    GHOST: {symbol: symbol(i++), desc: 'Ghost', collectable: true},
    PRINCESS: {symbol: symbol(i++), desc: 'Princess', collectable: true},
    DRAGON: {symbol: symbol(i++), desc: 'Dragon', collectable: true},
    IMP: {symbol: symbol(i++), desc: 'Imp', collectable: true},
    GENIE: {symbol: symbol(i++), desc: 'Genie', collectable: true},
    BAT: {symbol: symbol(i++), desc: 'Bat', collectable: true},
    RAT: {symbol: symbol(i++), desc: 'Rat', collectable: true},
    MOTH: {symbol: symbol(i++), desc: 'Moth', collectable: true},
    BEETLE: {symbol: symbol(i++), desc: 'Beetle', collectable: true},
    LIZARD: {symbol: symbol(i++), desc: 'Lizard', collectable: true},
    OWL: {symbol: symbol(i++), desc: 'Owl', collectable: true},
    SPIDER: {symbol: symbol(i++), desc: 'Spider', collectable: true},
    HELMET: {symbol: symbol(i++), desc: 'Helmet', collectable: true},
    CANDELABRA: {symbol: symbol(i++), desc: 'Candelabra', collectable: true},
    SWORD: {symbol: symbol(i++), desc: 'Sword', collectable: true},
    GEM: {symbol: symbol(i++), desc: 'Gem', collectable: true},
    CHEST: {symbol: symbol(i++), desc: 'Chest', collectable: true},
    RING: {symbol: symbol(i++), desc: 'Ring', collectable: true},
    SKULL: {symbol: symbol(i++), desc: 'Skull', collectable: true},
    KEYS: {symbol: symbol(i++), desc: 'Keys', collectable: true},
    CROWN: {symbol: symbol(i++), desc: 'Crown', collectable: true},
    MAP: {symbol: symbol(i++), desc: 'Map', collectable: true},
    PURSE: {symbol: symbol(i++), desc: 'Purse', collectable: true},
    BOOK: {symbol: symbol(i++), desc: 'Book', collectable: true}
};

module.exports = treasure;