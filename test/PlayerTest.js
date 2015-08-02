var assert = require("chai").assert,
    _ = require('lodash');

var Player = require('../lib/Player');

describe('Player', function(){

    describe('Treasure Count', function(){

        var player;

        beforeEach(function(){
            player = Player.new(1, 'green');
        });

        it('should start at 0 for a new player', function(){
            assert.equal(player.treasureCount, 0);
        });

        it('should stay at 0 when the player receives their first card', function(){
            var card = {};
            Player.assignCard(player, card);
            assert.equal(player.treasureCount, 0);
        });

        it('should increment the count when the player receives another card', function(){
            var card = {}, card2 = {};
            var assignCardToPlayer = _.curry(Player.assignCard)(player);

            assignCardToPlayer(card);
            assignCardToPlayer(card2);
            assert.equal(player.treasureCount, 1);

            assignCardToPlayer(card);
            assert.equal(player.treasureCount, 2);
        });
    })
});