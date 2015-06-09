var should = require("chai").should(),
    _ = require('lodash');

var TileBag = require("../TileBag").TileBag,
    Treasures = require("../Treasures").Treasures;

describe('TileBag', function(){

    var tileBag;

    beforeEach(function(){
        tileBag = new TileBag();
    });

    describe('Tile I/O', function(){

        it('should peek at the next tile without removing it', function(){
            var count = tileBag.count();
            var topTile = tileBag.peek();
            tileBag.peek().should.eql(topTile);
            tileBag.count().should.equal(count);
        });

        it('should remove the next tile from the bag', function(){
            var count = tileBag.count();
            var topTile = tileBag.get();
            // TODO
            //tileBag.get().should.not.eql(topTile);
            tileBag.count().should.not.equal(count);
        });

        it('should return the number of tiles in the bag', function(){
            var initialCount = tileBag.count();
            tileBag.get();
            tileBag.count().should.equal(initialCount - 1);
            tileBag.get();
            tileBag.get();
            tileBag.count().should.equal(initialCount - 3);
        });

        it('should throw an error when peeking into an empty bag', function(){
            _.times(tileBag.count(), function(){
                tileBag.get();
            });
            // TODO
            //tileBag.peek().should.Throw();
        });

        it('should throw an error when removing a tile from an empty bag', function(){
            _.times(tileBag.count(), function(){
                tileBag.get();
            });
            // TODO
            //tileBag.get().should.Throw();
        });
    });

    describe('Initial setup', function(){

        it('should start with 34 tiles', function(){
            tileBag.count().should.equal(34);
        });

        function isTJunctionTile(tile){
            return tile.getExits().length === 3;
        }

        function isStraightTile(tile){

            if (tile.getExits().length !== 2) {
                return false;
            }

            return ((tile.hasExit(0) && tile.hasExit(2)) ||
                (tile.hasExit(1) && tile.hasExit(3)));
        }

        function isCornerTile(tile){

            if (tile.getExits().length !== 2) {
                return false;
            }

            return !isStraightTile(tile);
        }

        it('should contain 6 T-junction tiles', function(){
            var tileCount = 0;
            while(tileBag.count() !== 0) {
                if (isTJunctionTile(tileBag.get())) {
                    tileCount++;
                }
            }
            tileCount.should.equal(6);
        });

        it('should contain 12 straight tiles', function(){
            var tileCount = 0;
            while(tileBag.count() !== 0) {
                if (isStraightTile(tileBag.get())) {
                    tileCount++;
                }
            }
            tileCount.should.equal(12);
        });

        it('should contain 16 corner tiles', function(){
            var tileCount = 0;
            while(tileBag.count() !== 0) {
                if (isCornerTile(tileBag.get())) {
                    tileCount++;
                }
            }
            tileCount.should.equal(16);
        });

        it('should contain a ghost on a T-junction piece', function(){
            while(tileBag.count() !== 0) {
                var tile = tileBag.get();
                if (isTJunctionTile(tile) && tile.getTreasure() == Treasures.GHOST) {
                    return;
                }
            }
            should.fail();
        });

        it('should contain an owl on a corner piece', function(){
            while(tileBag.count() !== 0) {
                var tile = tileBag.get();
                if (isCornerTile(tile) && tile.getTreasure() == Treasures.OWL) {
                    return;
                }
            }
            should.fail();
        });
    });
});