var should = require("chai").should(),
    _ = require('lodash');

var TileBag = require("../lib/TileBag"),
    Treasures = require("../lib/Treasures"),
    Tile = require('../lib/Tile');

describe('TileBag', function(){

    var tileBag;

    beforeEach(function(){
        tileBag = TileBag.new();
    });

    describe('Tile I/O', function(){

        it('should peek at the next tile without removing it', function(){
            var count = TileBag.count(tileBag);
            var topTile = TileBag.peek(tileBag);
            TileBag.peek(tileBag).should.eql(topTile);
            TileBag.count(tileBag).should.equal(count);
        });

        it('should remove the next tile from the bag', function(){
            var count = TileBag.count(tileBag);
            var topTile = TileBag.get(tileBag);
            // TODO
            //tileBag.get().should.not.eql(topTile);
            TileBag.count(tileBag).should.not.equal(count);
        });

        it('should return the number of tiles in the bag', function(){
            var initialCount = TileBag.count(tileBag);
            TileBag.get(tileBag);
            TileBag.count(tileBag).should.equal(initialCount - 1);
            TileBag.get(tileBag);
            TileBag.get(tileBag);
            TileBag.count(tileBag).should.equal(initialCount - 3);
        });

        it('should throw an error when peeking into an empty bag', function(){
            _.times(TileBag.count(tileBag), function(){
                TileBag.get(tileBag);
            });
            // TODO
            //tileBag.peek().should.Throw();
        });

        it('should throw an error when removing a tile from an empty bag', function(){
            _.times(TileBag.count(tileBag), function(){
                TileBag.get(tileBag);
            });
            // TODO
            //tileBag.get().should.Throw();
        });
    });

    describe('Initial setup', function(){

        it('should start with 34 tiles', function(){
            TileBag.count(tileBag).should.equal(34);
        });

        function isTJunctionTile(tile){
            return tile.exits.length === 3;
        }

        function isStraightTile(tile){

            if (tile.exits.length !== 2) {
                return false;
            }

            return ((Tile.hasExit(tile, 0) && Tile.hasExit(tile, 2)) ||
                (Tile.hasExit(tile, 1) && Tile.hasExit(tile, 3)));
        }

        function isCornerTile(tile){
            if (tile.exits.length !== 2) {
                return false;
            }

            return !isStraightTile(tile);
        }

        it('should contain 6 T-junction tiles', function(){
            var tileCount = 0;
            while(TileBag.count(tileBag) !== 0) {
                if (isTJunctionTile(TileBag.get(tileBag))) {
                    tileCount++;
                }
            }
            tileCount.should.equal(6);
        });

        it('should contain 12 straight tiles', function(){
            var tileCount = 0;
            while(TileBag.count(tileBag) !== 0) {
                if (isStraightTile(TileBag.get(tileBag))) {
                    tileCount++;
                }
            }
            tileCount.should.equal(12);
        });

        it('should contain 16 corner tiles', function(){
            var tileCount = 0;
            while(TileBag.count(tileBag) !== 0) {
                if (isCornerTile(TileBag.get(tileBag))) {
                    tileCount++;
                }
            }
            tileCount.should.equal(16);
        });

        it('should contain a ghost on a T-junction piece', function(){
            while(TileBag.count(tileBag) !== 0) {
                var tile = TileBag.get(tileBag);
                if (isTJunctionTile(tile) && tile.treasure == Treasures.GHOST) {
                    return;
                }
            }
            should.fail();
        });

        it('should contain an owl on a corner piece', function(){
            while(TileBag.count(tileBag) !== 0) {
                var tile = TileBag.get(tileBag);
                if (isCornerTile(tile) && tile.treasure == Treasures.OWL) {
                    return;
                }
            }
            should.fail();
        });
    });
});