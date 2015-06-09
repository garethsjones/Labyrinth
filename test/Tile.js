var should = require("chai").should(),
    expect = require("chai").expect,
    _ = require("lodash");

var Tile = require('../Tile').Tile,
    Treasures = require('../Treasures').Treasures,
    Player = require('../Player').Player;

describe('Tile', function(){

    describe('Treasure', function(){

        it('should return empty when no treasure set', function(){
            var tile = new Tile([0,2]);
            tile.getTreasure().should.equal(Treasures.EMPTY);
        });

        it('should return bat when treasure is bat', function() {
            var tile = new Tile([0,2], Treasures.BAT);
            tile.getTreasure().should.equal(Treasures.BAT);
        });
    });

    describe('Players', function(){

        var tile;
        var players;

        beforeEach(function(){
            tile = new Tile([0,2]);
            players = {
                1: new Player(1, 'green'),
                2: new Player(2, 'blue'),
                3: new Player(3, 'yellow'),
                4: new Player(4, 'red')
            };
        });

        it('should return no player by default', function(){
            tile.getPlayers().should.eql({});
        });

        it('should be able to get players', function(){
            tile = new Tile([1,2], Treasures.EMPTY, [players[1]]);
            tile.getPlayers()[1].getColour().should.equal('green');
            tile.getPlayer(1).getId().should.equal(1);
            expect(tile.getPlayer(2)).to.be.undefined;
        });

        it('should be able to add players', function(){
            tile.addPlayer(new Player(3, 'yellow'));
            tile.addPlayer(new Player(4, 'red'));
            tile.getPlayer(3).getColour().should.equal('yellow');
        });
    });

    describe('Orientation', function(){

        var tile;

        beforeEach(function() {
            tile = new Tile([0]);
        });

        it('should return the same exits on output as input', function(){
            tile.getExits().should.eql([0]);
        });

        it('should turn exits to the right', function(){
            tile.turn(1);
            tile.getExits().should.eql([1]);
        });

        it('should turn exits to the left', function(){
            tile.turn(3);
            tile.getExits().should.eql([3]);
        });

        it('should turn exits the opposite direction', function(){
            tile.turn(2);
            tile.getExits().should.eql([2]);
        });

        it('should tell us if it has an exit', function(){
            tile.hasExit(0).should.equal(true);
            _.forEach([1, 2, 3], function(n){
                tile.hasExit(n).should.equal(false);
            })
        });
    });
});