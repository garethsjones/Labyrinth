var should = require("chai").should(),
    _ = require("lodash");

var Deck = require('../Deck'),
    Treasures = require('../Treasures');

describe('Deck', function(){

    var deck;

    beforeEach(function(){
        deck = new Deck();
    });

    describe('Exits', function(){

        it('should initialise with green exit', function(){
            deck.exits[1].should.eql(_.omit(Treasures.GREEN_EXIT, 'collectable'));
        });

        it('should initialise with blue exit', function(){
            deck.exits[2].should.eql(_.omit(Treasures.BLUE_EXIT, 'collectable'));
        });

        it('should initialise with yellow exit', function(){
            deck.exits[3].should.eql(_.omit(Treasures.YELLOW_EXIT, 'collectable'));
        });

        it('should initialise with red exit', function(){
            deck.exits[4].should.eql(_.omit(Treasures.RED_EXIT, 'collectable'));
        });
    });

    describe('Dealing', function(){

        it('should be able to deal 24 cards', function(){
            _.times(24, function(){
                deck.deal().should.exist;
            });
        });

        it('should throw an error when dealing from an empty deck', function(){
            _.times(24, function(){
                deck.deal();
            });
            // TODO
            //deck.deal().should.throw();
        });
    });
});
