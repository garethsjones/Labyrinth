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
    EMPTY: new Destination(i++, ' ', 'Empty', 'white', false),
    /*1*/ GREEN_EXIT: Home(i++, 'Green exit', 'green'),
    /*2*/ BLUE_EXIT: Home(i++, 'Blue exit', 'blue'),
    /*3*/ RED_EXIT: Home(i++, 'Red exit', 'red'),
    /*4*/ YELLOW_EXIT: Home(i++, 'Yellow exit', 'yellow'),
    /*A*/ GHOST: Treasure(i++, 'Ghost', 'cyan'),
    /*B*/ PRINCESS: Treasure(i++, 'Princess', 'magenta'),
    /*C*/ DRAGON: Treasure(i++, 'Dragon', 'green'),
    /*D*/ IMP: Treasure(i++, 'Imp', 'yellow'),
    /*E*/ GENIE: Treasure(i++, 'Genie', 'cyan'),
    /*F*/ BAT: Treasure(i++, 'Bat', 'red'),
    /*G*/ RAT: Treasure(i++, 'Rat', 'red'),
    /*H*/ MOTH: Treasure(i++, 'Moth', 'magenta'),
    /*I*/ BEETLE: Treasure(i++, 'Beetle', 'blue'),
    /*J*/ LIZARD: Treasure(i++, 'Lizard', 'blue'),
    /*K*/ OWL: Treasure(i++, 'Owl', 'red'),
    /*L*/ SPIDER: Treasure(i++, 'Spider', 'red'),
    /*M*/ HELMET: Treasure(i++, 'Helmet', 'blue'),
    /*N*/ CANDELABRA: Treasure(i++, 'Candelabra', 'yellow'),
    /*O*/ SWORD: Treasure(i++, 'Sword', 'yellow'),
    /*P*/ GEM: Treasure(i++, 'Gem', 'green'),
    /*Q*/ CHEST: Treasure(i++, 'Chest', 'red'),
    /*R*/ RING: Treasure(i++, 'Ring', 'yellow'),
    /*S*/ SKULL: Treasure(i++, 'Skull', 'magenta'),
    /*T*/ KEYS: Treasure(i++, 'Keys', 'yellow'),
    /*U*/ CROWN: Treasure(i++, 'Crown', 'red'),
    /*V*/ MAP: Treasure(i++, 'Map', 'blue'),
    /*W*/ PURSE: Treasure(i++, 'Purse', 'red'),
    /*X*/ BOOK: Treasure(i++, 'Book', 'red')
};

module.exports = {
    Treasures: treasure
};