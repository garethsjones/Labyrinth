function symbol(index) {
    return String.fromCharCode(60 + index);
}

var i = 0;
var treasure = {
    EMPTY: {symbol: i++, desc: 'Empty', collectable: false, colour: 'white'},
    GREEN_EXIT: {symbol: '' + i++, desc: 'Green exit', collectable: false, colour: 'green'},
    BLUE_EXIT: {symbol: '' + i++, desc: 'Blue exit', collectable: false, colour: 'blue'},
    YELLOW_EXIT: {symbol: '' + i++, desc: 'Yellow exit', collectable: false, colour: 'yellow'},
    RED_EXIT: {symbol: '' + i++, desc: 'Red exit', collectable: false, colour: 'red'},
    GHOST: {symbol: symbol(i++), desc: 'Ghost', collectable: true, colour: 'cyan'},
    PRINCESS: {symbol: symbol(i++), desc: 'Princess', collectable: true, colour: 'magenta'},
    DRAGON: {symbol: symbol(i++), desc: 'Dragon', collectable: true, colour: 'green'},
    IMP: {symbol: symbol(i++), desc: 'Imp', collectable: true, colour: 'yellow'},
    GENIE: {symbol: symbol(i++), desc: 'Genie', collectable: true, colour: 'cyan'},
    BAT: {symbol: symbol(i++), desc: 'Bat', collectable: true, colour: 'red'},
    RAT: {symbol: symbol(i++), desc: 'Rat', collectable: true, colour: 'red'},
    MOTH: {symbol: symbol(i++), desc: 'Moth', collectable: true, colour: 'magenta'},
    BEETLE: {symbol: symbol(i++), desc: 'Beetle', collectable: true, colour: 'blue'},
    LIZARD: {symbol: symbol(i++), desc: 'Lizard', collectable: true, colour: 'blue'},
    OWL: {symbol: symbol(i++), desc: 'Owl', collectable: true, colour: 'red'},
    SPIDER: {symbol: symbol(i++), desc: 'Spider', collectable: true, colour: 'red'},
    HELMET: {symbol: symbol(i++), desc: 'Helmet', collectable: true, colour: 'blue'},
    CANDELABRA: {symbol: symbol(i++), desc: 'Candelabra', collectable: true, colour: 'yellow'},
    SWORD: {symbol: symbol(i++), desc: 'Sword', collectable: true, colour: 'yellow'},
    GEM: {symbol: symbol(i++), desc: 'Gem', collectable: true, colour: 'green'},
    CHEST: {symbol: symbol(i++), desc: 'Chest', collectable: true, colour: 'red'},
    RING: {symbol: symbol(i++), desc: 'Ring', collectable: true, colour: 'yellow'},
    SKULL: {symbol: symbol(i++), desc: 'Skull', collectable: true, colour: 'magenta'},
    KEYS: {symbol: symbol(i++), desc: 'Keys', collectable: true, colour: 'yellow'},
    CROWN: {symbol: symbol(i++), desc: 'Crown', collectable: true, colour: 'red'},
    MAP: {symbol: symbol(i++), desc: 'Map', collectable: true, colour: 'blue'},
    PURSE: {symbol: symbol(i++), desc: 'Purse', collectable: true, colour: 'red'},
    BOOK: {symbol: symbol(i++), desc: 'Book', collectable: true, colour: 'red'}
};

module.exports = treasure;