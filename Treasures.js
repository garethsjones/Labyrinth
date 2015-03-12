function symbol(index) {
    return String.fromCharCode(60 + index);
}

function Destination(id, symbol, desc, colour, collectable) {
    this.id = id;
    this.symbol = '' + symbol;
    this.desc = desc;
    this.colour = colour;
    this.collectable = collectable;
}

Destination.prototype = {
    constructor: new Destination
};

function Treasure(id, desc, colour) {
    return new Destination(id, symbol(id), desc, colour, true);
}

function Home(id, desc, colour) {
    return new Destination(id, id, desc, colour, false);
}

var i = 0;
var treasure = {
    EMPTY: new Destination(i++, 'Empty', 'white', false),
    GREEN_EXIT: Home(i++, 'Green exit', 'green'),
    BLUE_EXIT: Home(i++, 'Blue exit', 'blue'),
    YELLOW_EXIT: Home(i++, 'Yellow exit', 'yellow'),
    RED_EXIT: Home(i++, 'Red exit', 'red'),
    GHOST: Treasure(i++, 'Ghost', 'cyan'),
    PRINCESS: Treasure(i++, 'Princess', 'magenta'),
    DRAGON: Treasure(i++, 'Dragon', 'green'),
    IMP: Treasure(i++, 'Imp', 'yellow'),
    GENIE: Treasure(i++, 'Genie', 'cyan'),
    BAT: Treasure(i++, 'Bat', 'red'),
    RAT: Treasure(i++, 'Rat', 'red'),
    MOTH: Treasure(i++, 'Moth', 'magenta'),
    BEETLE: Treasure(i++, 'Beetle', 'blue'),
    LIZARD: Treasure(i++, 'Lizard', 'blue'),
    OWL: Treasure(i++, 'Owl', 'red'),
    SPIDER: Treasure(i++, 'Spider', 'red'),
    HELMET: Treasure(i++, 'Helmet', 'blue'),
    CANDELABRA: Treasure(i++, 'Candelabra', 'yellow'),
    SWORD: Treasure(i++, 'Sword', 'yellow'),
    GEM: Treasure(i++, 'Gem', 'green'),
    CHEST: Treasure(i++, 'Chest', 'red'),
    RING: Treasure(i++, 'Ring', 'yellow'),
    SKULL: Treasure(i++, 'Skull', 'magenta'),
    KEYS: Treasure(i++, 'Keys', 'yellow'),
    CROWN: Treasure(i++, 'Crown', 'red'),
    MAP: Treasure(i++, 'Map', 'blue'),
    PURSE: Treasure(i++, 'Purse', 'red'),
    BOOK: Treasure(i++, 'Book', 'red')
};

module.exports = treasure;