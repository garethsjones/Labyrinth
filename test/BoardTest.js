var assert = require("chai").assert,
    _ = require("lodash");

var Board = require('../lib/Board'),
    Player = require('../lib/Player'),
    TileBag = require('../lib/TileBag'),
    Treasures = require('../lib/Treasures').Treasures,
    Printer = require('../AsciiBoardPrinter'),
    Tile = require('../lib/Tile');

describe('Board', function(){

    var board, players, tileBag;

    beforeEach(function(){
        players = {
            1: Player.new(1, 'green'),
            2: Player.new(2, 'blue'),
            3: Player.new(3, 'yellow'),
            4: Player.new(4, 'red')
        };

        tileBag = TileBag.new();
        while(TileBag.count(tileBag)) {
            TileBag.get(tileBag);
        }

        TileBag.put(tileBag, Tile.new([0,1,2], Treasures.GHOST));
        TileBag.put(tileBag, Tile.new([1,3], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([0,2], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([2,3], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([2,3], Treasures.LIZARD));
        TileBag.put(tileBag, Tile.new([1,2], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([1,3], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([0,2], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([1,3], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([1,2], Treasures.RAT));
        TileBag.put(tileBag, Tile.new([0,3], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([1,2], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([0,2], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([1,2], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([1,3], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([0,3], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([0,1], Treasures.BEETLE));
        TileBag.put(tileBag, Tile.new([0,2], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([1,3], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([2,3], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([1,3], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([1,2], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([0,2], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([0,2,3], Treasures.BAT));
        TileBag.put(tileBag, Tile.new([2,3], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([0,1,2], Treasures.GENIE));
        TileBag.put(tileBag, Tile.new([2,3], Treasures.MOTH));
        TileBag.put(tileBag, Tile.new([0,1,3], Treasures.DRAGON));
        TileBag.put(tileBag, Tile.new([0,2], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([0,1], Treasures.SPIDER));
        TileBag.put(tileBag, Tile.new([0,1,2], Treasures.IMP));
        TileBag.put(tileBag, Tile.new([0,3], Treasures.OWL));
        TileBag.put(tileBag, Tile.new([0,1], Treasures.EMPTY));
        TileBag.put(tileBag, Tile.new([0,1,2], Treasures.PRINCESS));

        board = Board.new(tileBag, players);
    });

    it('print the board', function(){
        Printer.printBoard(board, [], 'green');
        Printer.printTile(TileBag.peek(tileBag));
    });

    describe('get()', function(){

        it('should put player 1 at 0,0', function(){
            var tile = Board.get(board, 0, 0);
            assert.isDefined(Tile.getPlayer(tile, 1));
            assert.equal(tile.treasure, Treasures.GREEN_EXIT);
            assert.deepEqual(tile.exits, [0,1]);
        });
    });

    describe('whereIsTreasure()', function(){

        it('should find the coords of treasure on the board', function(){
            var coords = Board.whereIsTreasure(board, 'I');
            assert.deepEqual(coords, {x: 3, y: 4});
        });

        it('should find the coords of treasure off the board', function(){
            var coords = Board.whereIsTreasure(board, 'A');
            assert.isNull(coords);
        });
    });

    describe('whereIsPlayer()', function(){

        it('should find a player', function(){
            assert.deepEqual(Board.whereIsPlayer(board, 3), {x: 0, y: 6});
        });

        it('should return null when it can\'t find a player', function(){
            assert.isNull(Board.whereIsPlayer(board, 5));
        });
    });

    describe('whereCanIGo()', function(){

        it('should return only the same coords when tile is isolated', function(){
            var coords = Board.whereCanIGo(board, 3, 3);
            assert.deepEqual(coords, [{x: 3, y: 3}]);
        });

        it('should find an adjacent tile to the left', function(){
            var coords = Board.whereCanIGo(board, 5, 5);
            assert.equal(coords.length, 2);
            assert.isNotNull(_.findWhere(coords, {x: 5, y: 5}));
            assert.isNotNull(_.findWhere(coords, {x: 6, y: 5}));
        });

        it('should find contiguous tiles in any direction', function(){
            var coords = Board.whereCanIGo(board, 4, 3);
            assert.equal(coords.length, 15);
            assert.isNotNull(_.findWhere(coords, {x: 6, y: 4}));
            assert.isNotNull(_.findWhere(coords, {x: 6, y: 3}));
            assert.isNotNull(_.findWhere(coords, {x: 6, y: 2}));
            assert.isNotNull(_.findWhere(coords, {x: 5, y: 4}));
            assert.isNotNull(_.findWhere(coords, {x: 5, y: 2}));
            assert.isNotNull(_.findWhere(coords, {x: 4, y: 4}));
            assert.isNotNull(_.findWhere(coords, {x: 4, y: 3}));
            assert.isNotNull(_.findWhere(coords, {x: 4, y: 2}));
            assert.isNotNull(_.findWhere(coords, {x: 3, y: 5}));
            assert.isNotNull(_.findWhere(coords, {x: 3, y: 4}));
            assert.isNotNull(_.findWhere(coords, {x: 3, y: 2}));
            assert.isNotNull(_.findWhere(coords, {x: 2, y: 5}));
            assert.isNotNull(_.findWhere(coords, {x: 2, y: 4}));
            assert.isNotNull(_.findWhere(coords, {x: 2, y: 3}));
            assert.isNotNull(_.findWhere(coords, {x: 2, y: 2}));
        });
    });

    describe('isPlayable()', function(){

        it('should allow a top row move odd column play', function(){
            assert.isTrue(Board.isPlayable(board, 1, 6).isPlayable);
            assert.isTrue(Board.isPlayable(board, 3, 6).isPlayable);
            assert.isTrue(Board.isPlayable(board, 5, 6).isPlayable);

            assert.equal(Board.isPlayable(board, 3, 6).message, 'OK');
        });

        it('should disallow a top row even column play', function(){
            assert.isFalse(Board.isPlayable(board, 0, 6).isPlayable);
            assert.isFalse(Board.isPlayable(board, 2, 6).isPlayable);
            assert.isFalse(Board.isPlayable(board, 4, 6).isPlayable);
            assert.isFalse(Board.isPlayable(board, 6, 6).isPlayable);

            assert.equal(Board.isPlayable(board, 4, 6).message, 'Must be on odd column');
        });

        it('should allow a bottom row move odd column play', function(){
            assert.isTrue(Board.isPlayable(board, 1, 0).isPlayable);
            assert.isTrue(Board.isPlayable(board, 3, 0).isPlayable);
            assert.isTrue(Board.isPlayable(board, 5, 0).isPlayable);

            assert.equal(Board.isPlayable(board, 3, 0).message, 'OK');
        });

        it('should disallow a bottom row even column play', function(){
            assert.isFalse(Board.isPlayable(board, 0, 0).isPlayable);
            assert.isFalse(Board.isPlayable(board, 2, 0).isPlayable);
            assert.isFalse(Board.isPlayable(board, 4, 0).isPlayable);
            assert.isFalse(Board.isPlayable(board, 6, 0).isPlayable);

            assert.equal(Board.isPlayable(board, 4, 0).message, 'Must be on odd column');
        });

        it('should allow a right column odd row play', function(){
            assert.isTrue(Board.isPlayable(board, 6, 1).isPlayable);
            assert.isTrue(Board.isPlayable(board, 6, 3).isPlayable);
            assert.isTrue(Board.isPlayable(board, 6, 5).isPlayable);

            assert.equal(Board.isPlayable(board, 6, 3).message, 'OK');
        });

        it('should disallow a right column even row play', function(){
            assert.isFalse(Board.isPlayable(board, 6, 0).isPlayable);
            assert.isFalse(Board.isPlayable(board, 6, 2).isPlayable);
            assert.isFalse(Board.isPlayable(board, 6, 4).isPlayable);
            assert.isFalse(Board.isPlayable(board, 6, 6).isPlayable);

            assert.equal(Board.isPlayable(board, 6, 4).message, 'Must be on odd row');
        });

        it('should allow a left column odd row play', function(){
            assert.isTrue(Board.isPlayable(board, 0, 1).isPlayable);
            assert.isTrue(Board.isPlayable(board, 0, 3).isPlayable);
            assert.isTrue(Board.isPlayable(board, 0, 5).isPlayable);

            assert.equal(Board.isPlayable(board, 0, 3).message, 'OK');
        });

        it('should disallow a left column even row play', function(){
            assert.isFalse(Board.isPlayable(board, 0, 0).isPlayable);
            assert.isFalse(Board.isPlayable(board, 0, 2).isPlayable);
            assert.isFalse(Board.isPlayable(board, 0, 4).isPlayable);
            assert.isFalse(Board.isPlayable(board, 0, 6).isPlayable);

            assert.equal(Board.isPlayable(board, 0, 4).message, 'Must be on odd row');
        });

        it('should disallow any move not on the edge', function(){
            _.forEach(_.range(1, 4), function(x){
                _.forEach(_.range(1, 4), function(y){
                    assert.isFalse(Board.isPlayable(board, x, y).isPlayable);
                    assert.equal(Board.isPlayable(board, x, y).message, 'Must be on board edge');
                });
            });
        });

        it('should not allow you to negate the previous turn - right/left', function(){
            assert.isTrue(Board.isPlayable(board, 3, 0).isPlayable);
            Board.play(board, 3, 6, TileBag.peek(tileBag));
            assert.isFalse(Board.isPlayable(board, 3, 0).isPlayable);
            assert.equal(Board.isPlayable(board, 3, 0).message, 'You cannot negate the previous turn');
        });

        it('should not allow you to negate the previous turn - up/down', function(){
            assert.isTrue(Board.isPlayable(board, 0, 3).isPlayable, true);
            Board.play(board, 6, 3, TileBag.peek(tileBag));
            assert.isFalse(Board.isPlayable(board, 0, 3).isPlayable);
            assert.equal(Board.isPlayable(board, 0, 3).message, 'You cannot negate the previous turn');
        });
    });

    describe('play()', function(){

        function assertTile(actual, expectedExits, expectedTreasure){
            assert.deepEqual(actual.exits, expectedExits);
            assert.equal(actual.treasure.symbol, expectedTreasure.symbol);
        }

        it('should shift tiles to the right when a tile is played on the left', function(){
            var spare = Board.play(board, 0, 1, TileBag.peek(tileBag));
            assertTile(spare, [2, 3], Treasures.EMPTY);
            assertTile(Board.get(board, 0, 1), [0, 1, 2], Treasures.GHOST);
            assertTile(Board.get(board, 1, 1), [0, 1, 2], Treasures.PRINCESS);
            assertTile(Board.get(board, 2, 1), [0, 1], Treasures.SPIDER);
            assertTile(Board.get(board, 3, 1), [0, 2, 3], Treasures.BAT);
            assertTile(Board.get(board, 4, 1), [2, 3], Treasures.EMPTY);
            assertTile(Board.get(board, 5, 1), [1, 2], Treasures.EMPTY);
            assertTile(Board.get(board, 6, 1), [1, 2], Treasures.RAT);
        });

        it('should shift tiles to the left when a tile is played on the right', function(){
            var spare = Board.play(board, 6, 3, TileBag.peek(tileBag));
            assertTile(spare, [0, 1], Treasures.EMPTY);
            assertTile(Board.get(board, 6, 3), [0, 1, 2], Treasures.GHOST);
            assertTile(Board.get(board, 5, 3), [0, 2], Treasures.EMPTY);
            assertTile(Board.get(board, 4, 3), [0, 2], Treasures.EMPTY);
            assertTile(Board.get(board, 3, 3), [0, 2], Treasures.EMPTY);
            assertTile(Board.get(board, 2, 3), [0, 2], Treasures.EMPTY);
            assertTile(Board.get(board, 1, 3), [0, 2], Treasures.EMPTY);
            assertTile(Board.get(board, 0, 3), [0, 1, 3], Treasures.DRAGON);
        });

        it('should shift tiles to the bottom when a tile is played on the top', function(){
            var spare = Board.play(board, 5, 6, TileBag.peek(tileBag));
            assertTile(spare, [0, 3], Treasures.EMPTY);
            assertTile(Board.get(board, 5, 6), [0, 1, 2], Treasures.GHOST);
            assertTile(Board.get(board, 5, 5), [2, 3], Treasures.LIZARD);
            assertTile(Board.get(board, 5, 4), [1, 2], Treasures.EMPTY);
            assertTile(Board.get(board, 5, 3), [1, 3], Treasures.EMPTY);
            assertTile(Board.get(board, 5, 2), [0, 2], Treasures.EMPTY);
            assertTile(Board.get(board, 5, 1), [1, 3], Treasures.EMPTY);
            assertTile(Board.get(board, 5, 0), [1, 2], Treasures.RAT);
        });

        it('should shift tiles to the top when a tile is played on the bottom', function(){
            var spare = Board.play(board, 1, 0, TileBag.peek(tileBag));
            assertTile(spare, [2, 3], Treasures.EMPTY);
            assertTile(Board.get(board, 1, 0), [0, 1, 2], Treasures.GHOST);
            assertTile(Board.get(board, 1, 1), [0, 1, 2], Treasures.IMP);
            assertTile(Board.get(board, 1, 2), [0, 1], Treasures.SPIDER);
            assertTile(Board.get(board, 1, 3), [0, 2], Treasures.EMPTY);
            assertTile(Board.get(board, 1, 4), [0, 1, 3], Treasures.DRAGON);
            assertTile(Board.get(board, 1, 5), [2, 3], Treasures.MOTH);
            assertTile(Board.get(board, 1, 6), [0, 1, 2], Treasures.GENIE);
        });

        it('should throw an exception when an unplayable play is attempted', function(){
            Board.play(board, 0, 1, TileBag.peek(tileBag));
        });

        it('should put a player on the incoming tile when they are pushed off the board', function(){
            Tile.removePlayer(Board.get(board, 6, 0), 2);
            Tile.addPlayer(Board.get(board, 1, 0), players[2]);
            assert.deepEqual(Board.whereIsPlayer(board, 2), {x: 1, y: 0});
            Board.play(board, 1, 6, TileBag.peek(tileBag));
            assert.deepEqual(Board.whereIsPlayer(board, 2), {x: 1, y: 6});
        });
    });

    describe('playableCoords()', function(){

        function assertNotContainsCoord(coords, x, y){
            assert.equal(_.filter(coords, function(coord){
                return coord.x == x && coord.y == y;
            }).length, 0);
        }

        it('should allow all coords on first turn', function(){
            var coords = Board.playableCoords(board);
            assert.equal(coords.length, 12);
        });

        it('should disallow pushing column back down', function(){
            Board.play(board, 1, 0, TileBag.peek(tileBag));
            var coords = Board.playableCoords(board);
            assert.equal(coords.length, 11);
            assertNotContainsCoord(coords, 1, 6);
        });

        it('should disallow pushing column back up', function(){
            Board.play(board, 3, 6, TileBag.peek(tileBag));
            var coords = Board.playableCoords(board);
            assert.equal(coords.length, 11);
            assertNotContainsCoord(coords, 3, 0);
        });

        it('should disallow pushing column back right', function(){
            Board.play(board, 6, 5, TileBag.peek(tileBag));
            var coords = Board.playableCoords(board);
            assert.equal(coords.length, 11);
            assertNotContainsCoord(coords, 0, 5);
        });

        it('should disallow pushing column back left', function(){
            Board.play(board, 0, 3, TileBag.peek(tileBag));
            var coords = Board.playableCoords(board);
            assert.equal(coords.length, 11);
            assertNotContainsCoord(coords, 6, 3);
        });
    })
});