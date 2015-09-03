var assert = require("chai").assert,
    _ = require("lodash");

var Deck = require('../lib/Deck'),
    Treasures = require('../lib/Treasures').Treasures;

describe('Deck', function(){

    var deck;

    beforeEach(function(){
        deck = Deck.new();
    });

    describe('Exits', function(){

        it('should initialise with green exit', function(){
            assert.deepEqual(Deck.exits[1], _.omit(Treasures.GREEN_EXIT, 'collectable'));
        });

        it('should initialise with blue exit', function(){
            assert.deepEqual(Deck.exits[2], _.omit(Treasures.BLUE_EXIT, 'collectable'));
        });

        it('should initialise with red exit', function(){
            assert.deepEqual(Deck.exits[3], _.omit(Treasures.RED_EXIT, 'collectable'));
        });

        it('should initialise with yellow exit', function(){
            assert.deepEqual(Deck.exits[4], _.omit(Treasures.YELLOW_EXIT, 'collectable'));
        });
    });

    describe('Dealing', function(){

        it('should be able to deal 24 cards', function(){
            _.times(24, function(){
                assert.isNotNull(Deck.deal(deck));
            });
        });

        it('should throw an error when dealing from an empty deck', function(){
            _.times(24, function(){
                Deck.deal(deck);
            });

            assert.throws(function(){Deck.deal(deck)});
        });
    });
});
