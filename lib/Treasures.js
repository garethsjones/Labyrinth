var Colours = require('./Colours');

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

module.exports = {
    EMPTY: new Destination(i++, ' ', 'Empty', Colours.WHITE, false),
    /*1*/ GREEN_EXIT: Home(i++, 'Green exit', Colours.GREEN),
    /*2*/ BLUE_EXIT: Home(i++, 'Blue exit', Colours.BLUE),
    /*3*/ RED_EXIT: Home(i++, 'Red exit', Colours.RED),
    /*4*/ YELLOW_EXIT: Home(i++, 'Yellow exit', Colours.YELLOW),
    /*A*/ GHOST: Treasure(i++, 'Ghost', Colours.CYAN),
    /*B*/ PRINCESS: Treasure(i++, 'Princess', Colours.MAGENTA),
    /*C*/ DRAGON: Treasure(i++, 'Dragon', Colours.GREEN),
    /*D*/ IMP: Treasure(i++, 'Imp', Colours.YELLOW),
    /*E*/ GENIE: Treasure(i++, 'Genie', Colours.CYAN),
    /*F*/ BAT: Treasure(i++, 'Bat', Colours.RED),
    /*G*/ RAT: Treasure(i++, 'Rat', Colours.RED),
    /*H*/ MOTH: Treasure(i++, 'Moth', Colours.MAGENTA),
    /*I*/ BEETLE: Treasure(i++, 'Beetle', Colours.BLUE),
    /*J*/ LIZARD: Treasure(i++, 'Lizard', Colours.BLUE),
    /*K*/ OWL: Treasure(i++, 'Owl', Colours.RED),
    /*L*/ SPIDER: Treasure(i++, 'Spider', Colours.RED),
    /*M*/ HELMET: Treasure(i++, 'Helmet', Colours.BLUE),
    /*N*/ CANDELABRA: Treasure(i++, 'Candelabra', Colours.YELLOW),
    /*O*/ SWORD: Treasure(i++, 'Sword', Colours.YELLOW),
    /*P*/ GEM: Treasure(i++, 'Gem', Colours.GREEN),
    /*Q*/ CHEST: Treasure(i++, 'Chest', Colours.RED),
    /*R*/ RING: Treasure(i++, 'Ring', Colours.YELLOW),
    /*S*/ SKULL: Treasure(i++, 'Skull', Colours.MAGENTA),
    /*T*/ KEYS: Treasure(i++, 'Keys', Colours.YELLOW),
    /*U*/ CROWN: Treasure(i++, 'Crown', Colours.RED),
    /*V*/ MAP: Treasure(i++, 'Map', Colours.BLUE),
    /*W*/ PURSE: Treasure(i++, 'Purse', Colours.RED),
    /*X*/ BOOK: Treasure(i++, 'Book', Colours.RED)
};