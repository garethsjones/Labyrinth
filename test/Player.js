var should = require("chai").should();

var Player = require('../Player');

describe('Player', function(){

    describe('Treasure Count', function(){

        var player;

        beforeEach(function(){
            player = new Player(1, 'green');
        });

        it('should start at 0 for a new player', function(){
            player.getTreasureCount().should.equal(0);
        });

        it('should stay at 0 when the player receives their first card', function(){
            var card = {};
            player.assignCard(card);
            player.getTreasureCount().should.equal(0);
        });

        it('should increment the count when the player receives another card', function(){
            var card = {}, card2 = {};
            player.assignCard(card);
            player.assignCard(card2);
            player.getTreasureCount().should.equal(1);

            player.assignCard(card);
            player.getTreasureCount().should.equal(2);
        });
    })
});