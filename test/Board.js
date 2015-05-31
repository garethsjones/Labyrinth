var should = require("chai").should,
    expect = require("chai").expect,
    _ = require("lodash");

var Board = require('../Board'),
    Player = require('../Player'),
    TileBag = require('../TileBag'),
    Treasures = require('../Treasures'),
    Printer = require('../AsciiBoardPrinter'),
    Tile = require('../Tile');

describe('Board', function(){

    var board, players, tileBag;

    beforeEach(function(){
        players = {
            1: new Player(1, 'green'),
            2: new Player(2, 'blue'),
            3: new Player(3, 'yellow'),
            4: new Player(4, 'red')
        };

        tileBag = new TileBag();
        while(tileBag.count()) {
            tileBag.get();
        }

        tileBag.put(new Tile([0,1,2], Treasures.GHOST));
        tileBag.put(new Tile([1,3], Treasures.EMPTY));
        tileBag.put(new Tile([0,2], Treasures.EMPTY));
        tileBag.put(new Tile([2,3], Treasures.EMPTY));
        tileBag.put(new Tile([2,3], Treasures.LIZARD));
        tileBag.put(new Tile([1,2], Treasures.EMPTY));
        tileBag.put(new Tile([1,3], Treasures.EMPTY));
        tileBag.put(new Tile([0,2], Treasures.EMPTY));
        tileBag.put(new Tile([1,3], Treasures.EMPTY));
        tileBag.put(new Tile([1,2], Treasures.RAT));
        tileBag.put(new Tile([0,3], Treasures.EMPTY));
        tileBag.put(new Tile([1,2], Treasures.EMPTY));
        tileBag.put(new Tile([0,2], Treasures.EMPTY));
        tileBag.put(new Tile([1,2], Treasures.EMPTY));
        tileBag.put(new Tile([1,3], Treasures.EMPTY));
        tileBag.put(new Tile([0,3], Treasures.EMPTY));
        tileBag.put(new Tile([0,1], Treasures.BEETLE));
        tileBag.put(new Tile([0,2], Treasures.EMPTY));
        tileBag.put(new Tile([1,3], Treasures.EMPTY));
        tileBag.put(new Tile([2,3], Treasures.EMPTY));
        tileBag.put(new Tile([1,3], Treasures.EMPTY));
        tileBag.put(new Tile([1,2], Treasures.EMPTY));
        tileBag.put(new Tile([0,2], Treasures.EMPTY));
        tileBag.put(new Tile([0,2,3], Treasures.BAT));
        tileBag.put(new Tile([2,3], Treasures.EMPTY));
        tileBag.put(new Tile([0,1,2], Treasures.GENIE));
        tileBag.put(new Tile([2,3], Treasures.MOTH));
        tileBag.put(new Tile([0,1,3], Treasures.DRAGON));
        tileBag.put(new Tile([0,2], Treasures.EMPTY));
        tileBag.put(new Tile([0,1], Treasures.SPIDER));
        tileBag.put(new Tile([0,1,2], Treasures.IMP));
        tileBag.put(new Tile([0,3], Treasures.OWL));
        tileBag.put(new Tile([0,1], Treasures.EMPTY));
        tileBag.put(new Tile([0,1,2], Treasures.PRINCESS));

        board = new Board(tileBag, players);
    });

    //it('print the board', function(){
    //    Printer.printGrid(board, [], 'green');
    //    Printer.printTile(tileBag.peek());
    //});

    describe('get()', function(){

        it('should put player 1 at 0,0', function(){
            var tile = board.get(0,0);
            tile.getPlayer(1).should.exist;
            tile.getTreasure().should.equal(Treasures.GREEN_EXIT);
            tile.getExits().should.eql([0,1]);
        });
    });

    describe('whereIsTreasure()', function(){

        it('should find the coords of treasure on the board', function(){
            var coords = board.whereIsTreasure('I');
            coords.should.eql({x: 3, y: 4});
        });

        it('should find the coords of treasure off the board', function(){
            var coords = board.whereIsTreasure('A');
            expect(coords).to.be.null;
        });
    });

    describe('whereIsPlayer()', function(){

        it('should find a player', function(){
            board.whereIsPlayer(3).should.eql({x: 0, y: 6});
        });

        it('should return null when it can\'t find a player', function(){
            expect(board.whereIsPlayer(5)).to.be.null;
        });
    });

    describe('whereCanIGo()', function(){

        it('should return only the same coords when tile is isolated', function(){
            var coords = board.whereCanIGo(3, 3);
            coords.should.eql([{x: 3, y: 3}]);
        });

        it('should find an adjacent tile to the left', function(){
            var coords = board.whereCanIGo(5, 5);
            coords.length.should.equal(2);
            _.findWhere(coords, {x: 5, y: 5}).should.exist;
            _.findWhere(coords, {x: 6, y: 5}).should.exist;
        });

        it('should find contiguous tiles in any direction', function(){
            var coords = board.whereCanIGo(4, 3);
            coords.length.should.equal(15);
            _.findWhere(coords, {x: 6, y: 4}).should.exist;
            _.findWhere(coords, {x: 6, y: 3}).should.exist;
            _.findWhere(coords, {x: 6, y: 2}).should.exist;
            _.findWhere(coords, {x: 5, y: 4}).should.exist;
            _.findWhere(coords, {x: 5, y: 2}).should.exist;
            _.findWhere(coords, {x: 4, y: 4}).should.exist;
            _.findWhere(coords, {x: 4, y: 3}).should.exist;
            _.findWhere(coords, {x: 4, y: 2}).should.exist;
            _.findWhere(coords, {x: 3, y: 5}).should.exist;
            _.findWhere(coords, {x: 3, y: 4}).should.exist;
            _.findWhere(coords, {x: 3, y: 2}).should.exist;
            _.findWhere(coords, {x: 2, y: 5}).should.exist;
            _.findWhere(coords, {x: 2, y: 4}).should.exist;
            _.findWhere(coords, {x: 2, y: 3}).should.exist;
            _.findWhere(coords, {x: 2, y: 2}).should.exist;
        });
    });

    describe('isPlayable()', function(){

        it('should allow a top row move odd column play', function(){
            board.isPlayable(1, 6).isPlayable.should.equal(true);
            board.isPlayable(3, 6).isPlayable.should.equal(true);
            board.isPlayable(5, 6).isPlayable.should.equal(true);

            board.isPlayable(3, 6).message.should.equal('OK');
        });

        it('should disallow a top row even column play', function(){
            board.isPlayable(0, 6).isPlayable.should.equal(false);
            board.isPlayable(2, 6).isPlayable.should.equal(false);
            board.isPlayable(4, 6).isPlayable.should.equal(false);
            board.isPlayable(6, 6).isPlayable.should.equal(false);

            board.isPlayable(4, 6).message.should.equal('Must be on odd column');
        });

        it('should allow a bottom row move odd column play', function(){
            board.isPlayable(1, 0).isPlayable.should.equal(true);
            board.isPlayable(3, 0).isPlayable.should.equal(true);
            board.isPlayable(5, 0).isPlayable.should.equal(true);

            board.isPlayable(3, 0).message.should.equal('OK');
        });

        it('should disallow a bottom row even column play', function(){
            board.isPlayable(0, 0).isPlayable.should.equal(false);
            board.isPlayable(2, 0).isPlayable.should.equal(false);
            board.isPlayable(4, 0).isPlayable.should.equal(false);
            board.isPlayable(6, 0).isPlayable.should.equal(false);

            board.isPlayable(4, 0).message.should.equal('Must be on odd column');
        });

        it('should allow a right column odd row play', function(){
            board.isPlayable(6, 1).isPlayable.should.equal(true);
            board.isPlayable(6, 3).isPlayable.should.equal(true);
            board.isPlayable(6, 5).isPlayable.should.equal(true);

            board.isPlayable(6, 3).message.should.equal('OK');
        });

        it('should disallow a right column even row play', function(){
            board.isPlayable(6, 0).isPlayable.should.equal(false);
            board.isPlayable(6, 2).isPlayable.should.equal(false);
            board.isPlayable(6, 4).isPlayable.should.equal(false);
            board.isPlayable(6, 6).isPlayable.should.equal(false);

            board.isPlayable(6, 4).message.should.equal('Must be on odd row');
        });

        it('should allow a left column odd row play', function(){
            board.isPlayable(0, 1).isPlayable.should.equal(true);
            board.isPlayable(0, 3).isPlayable.should.equal(true);
            board.isPlayable(0, 5).isPlayable.should.equal(true);

            board.isPlayable(0, 3).message.should.equal('OK');
        });

        it('should disallow a left column even row play', function(){
            board.isPlayable(0, 0).isPlayable.should.equal(false);
            board.isPlayable(0, 2).isPlayable.should.equal(false);
            board.isPlayable(0, 4).isPlayable.should.equal(false);
            board.isPlayable(0, 6).isPlayable.should.equal(false);

            board.isPlayable(0, 4).message.should.equal('Must be on odd row');
        });

        it('should disallow any move not on the edge', function(){
            _.forEach(_.range(1, 4), function(x){
                _.forEach(_.range(1, 4), function(y){
                    board.isPlayable(x, y).isPlayable.should.equal(false);
                    board.isPlayable(x, y).message.should.equal('Must be on board edge');
                });
            });
        });

        it('should not allow you to negate the previous turn - right/left', function(){
            board.isPlayable(3, 0).isPlayable.should.equal(true);
            board.play(3, 6, tileBag.peek());
            board.isPlayable(3, 0).isPlayable.should.equal(false);
            board.isPlayable(3, 0).message.should.equal('You cannot negate the previous turn');
        });

        it('should not allow you to negate the previous turn - up/down', function(){
            board.isPlayable(0, 3).isPlayable.should.equal(true);
            board.play(6, 3, tileBag.peek());
            board.isPlayable(0, 3).isPlayable.should.equal(false);
            board.isPlayable(0, 3).message.should.equal('You cannot negate the previous turn');
        });
    });

    describe('play()', function(){

        function assertTile(actual, expectedExits, expectedTreasure){
            actual.getExits().should.eql(expectedExits);
            actual.getTreasure().symbol.should.eql(expectedTreasure.symbol);
        }

        it('should shift tiles to the right when a tile is played on the left', function(){
            var spare = board.play(0, 1, tileBag.peek());
            assertTile(spare, [2, 3], Treasures.EMPTY);
            assertTile(board.get(0, 1), [0, 1, 2], Treasures.GHOST);
            assertTile(board.get(1, 1), [0, 1, 2], Treasures.PRINCESS);
            assertTile(board.get(2, 1), [0, 1], Treasures.SPIDER);
            assertTile(board.get(3, 1), [0, 2, 3], Treasures.BAT);
            assertTile(board.get(4, 1), [2, 3], Treasures.EMPTY);
            assertTile(board.get(5, 1), [1, 2], Treasures.EMPTY);
            assertTile(board.get(6, 1), [1, 2], Treasures.RAT);
        });

        it('should shift tiles to the left when a tile is played on the right', function(){
            var spare = board.play(6, 3, tileBag.peek());
            assertTile(spare, [0, 1], Treasures.EMPTY);
            assertTile(board.get(6, 3), [0, 1, 2], Treasures.GHOST);
            assertTile(board.get(5, 3), [0, 2], Treasures.EMPTY);
            assertTile(board.get(4, 3), [0, 2], Treasures.EMPTY);
            assertTile(board.get(3, 3), [0, 2], Treasures.EMPTY);
            assertTile(board.get(2, 3), [0, 2], Treasures.EMPTY);
            assertTile(board.get(1, 3), [0, 2], Treasures.EMPTY);
            assertTile(board.get(0, 3), [0, 1, 3], Treasures.DRAGON);
        });

        it('should shift tiles to the bottom when a tile is played on the top', function(){
            var spare = board.play(5, 6, tileBag.peek());
            assertTile(spare, [0, 3], Treasures.EMPTY);
            assertTile(board.get(5, 6), [0, 1, 2], Treasures.GHOST);
            assertTile(board.get(5, 5), [2, 3], Treasures.LIZARD);
            assertTile(board.get(5, 4), [1, 2], Treasures.EMPTY);
            assertTile(board.get(5, 3), [1, 3], Treasures.EMPTY);
            assertTile(board.get(5, 2), [0, 2], Treasures.EMPTY);
            assertTile(board.get(5, 1), [1, 3], Treasures.EMPTY);
            assertTile(board.get(5, 0), [1, 2], Treasures.RAT);
        });

        it('should shift tiles to the top when a tile is played on the bottom', function(){
            var spare = board.play(1, 0, tileBag.peek());
            assertTile(spare, [2, 3], Treasures.EMPTY);
            assertTile(board.get(1, 0), [0, 1, 2], Treasures.GHOST);
            assertTile(board.get(1, 1), [0, 1, 2], Treasures.IMP);
            assertTile(board.get(1, 2), [0, 1], Treasures.SPIDER);
            assertTile(board.get(1, 3), [0, 2], Treasures.EMPTY);
            assertTile(board.get(1, 4), [0, 1, 3], Treasures.DRAGON);
            assertTile(board.get(1, 5), [2, 3], Treasures.MOTH);
            assertTile(board.get(1, 6), [0, 1, 2], Treasures.GENIE);
        });

        it('should throw an exception when an unplayable play is attempted', function(){
            board.play(0, 1, tileBag.peek()).should.throw;
        });

        it('should put a player on the incoming tile when they are pushed off the board', function(){
            board.get(6, 0).removePlayer(2);
            board.get(1, 0).addPlayer(players[2]);
            board.whereIsPlayer(2).should.eql({x: 1, y: 0});
            board.play(1, 6, tileBag.peek());
            board.whereIsPlayer(2).should.eql({x: 1, y: 6});
        });
    });
});