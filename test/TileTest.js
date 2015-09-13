var assert = require("chai").assert,
    _ = require("lodash");

var Colours = require('../lib/Colours'),
    Tile = require('../lib/Tile'),
    Treasures = require('../lib/Treasures'),
    Player = require('../lib/Player');

describe('Tile', function(){

    describe('Treasure', function(){

        it('should return empty when no treasure set', function(){
            var tile = Tile.new([0,2]);
            assert.equal(tile.treasure, Treasures.EMPTY);
        });

        it('should return bat when treasure is bat', function() {
            var tile = Tile.new([0,2], Treasures.BAT);
            tile.treasure.should.equal(Treasures.BAT);
        });
    });

    describe('Players', function(){

        var tile;
        var players;

        beforeEach(function(){
            tile = Tile.new([0,2]);
            players = {
                1: Player.new(1, Colours.GREEN),
                2: Player.new(2, Colours.BLUE),
                3: Player.new(3, Colours.RED),
                4: Player.new(4, Colours.YELLOW)
            };
        });

        it('should be able to get players', function(){
            tile = Tile.new([1,2], Treasures.EMPTY, [players[1]]);
            Tile.getPlayer(tile, 1).colour.should.equal(Colours.GREEN);
            Tile.getPlayer(tile, 1).id.should.equal(1);
            // TODO
            // expect(Tile.getPlayer(tile, 2)).to.be.undefined;
        });

        it('should be able to add players', function(){
            Tile.addPlayer(tile, Player.new(3, Colours.RED));
            Tile.addPlayer(tile, Player.new(4, Colours.YELLOW));
            Tile.getPlayer(tile, 3).colour.should.equal(Colours.RED);
        });
    });

    describe('Orientation', function(){

        var tile;

        beforeEach(function() {
            tile = Tile.new([0]);
        });

        it('should return the same exits on output as input', function(){
            tile.exits.should.eql([0]);
        });

        it('should turn exits to the right', function(){
            Tile.turn(tile, 1);
            tile.exits.should.eql([1]);
        });

        it('should turn exits to the left', function(){
            Tile.turn(tile, 3);
            tile.exits.should.eql([3]);
        });

        it('should turn exits the opposite direction', function(){
            Tile.turn(tile, 2);
            tile.exits.should.eql([2]);
        });

        it('should tell us if it has an exit', function(){
            Tile.hasExit(tile, 0).should.equal(true);
            _.forEach([1, 2, 3], function(n){
                Tile.hasExit(tile, n).should.equal(false);
            })
        });
    });
});