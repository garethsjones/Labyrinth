var assert = require("chai").assert,
    _ = require('lodash');

var TileBag = require('../lib/TileBag'),
    Board = require('../lib/Board'),
    Deck = require('../lib/Deck'),
    Player = require('../lib/Player'),
    Tile = require('../lib/Tile'),
    play = require('../lib/Play'),
    Treasures = require('../lib/Treasures').Treasures,
    Printer = require('../AsciiPrinter'),
    AI = require('../lib/AI');

describe('AI', function(){

    it('should move onto an available objective', function(){

        var game = generateGame(0, 0, Treasures.RING, 'move');

        var coords = AI.bestMove(game, 1);

        assertCoord({x: 0, y: 2}, coords);
    });

    // This is a bit subjective
    //it.only('should move toward an unavailable objective', function(){
    //
    //    var game = generateGame(0, 0, Treasures.SPIDER, 'move');
    //
    //    Printer.printGame(game);
    //
    //    var coords = AI.bestMove(game, 1);
    //
    //    assertCoord({x: 0, y: 1}, coords);
    //});

    it('should not move away from an unavailable objective', function(){

        var game = generateGame(0, 0, Treasures.HELMET, 'move');

        var coords = AI.bestMove(game, 1);

        assertCoord({x: 0, y: 0}, coords);
    });

    it('should lay tile to make objective available', function(){

        var game = generateGame(0, 0, Treasures.HELMET, 'play');

        var placement = AI.bestPlacement(game, 1);

        assertCoord({x: 1, y: 0}, placement);
    });

    it('should lay tile on accessible space if objective is in hand', function(){

        var game = generateGame(0, 0, Treasures.GHOST, 'play');

        var placement = AI.bestPlacement(game, 1);

        assertCoord({x: 1, y: 0}, placement);
    });

    it('should not crash when objective is on the edge', function(){

        var game = generateGame(0, 0, Treasures.OWL, 'play');

        AI.bestPlacement(game, 1);
    });

    it('should think a move ahead to take advantage of warping', function(){

        var game = generateGame(0, 0, Treasures.SWORD, 'move');

        var move = AI.bestMove(game, 1);

        assertCoord({x: 0, y: 1}, move);
    });

    it('should warp across the board to pick up a treasure', function(){

        var game = generateGame(3, 0, Treasures.PURSE, 'play');

        var placement = AI.bestPlacement(game, 1);

        assertCoord({x: 3, y: 6}, placement);
    });

    it('should minimize opponents movement', function(){

        var game = generateGame(5, 4, Treasures.GEM, 'play');
        addDummy(game, 3, 5);

        var placement = AI.bestPlacement(game, 1, Player.PLAYER_TYPE_CPU_AGGRESSIVE);

        assertCoord({x: 3, y: 0}, placement);
    });

    function assertCoord(expected, actual){
        assert.equal(expected.x + ',' + expected.y, actual.x + ',' + actual.y);
    }

    function addDummy(game, x, y) {
        game.players[3] = Player.new(3, 'red',  Player.PLAYER_TYPE_CPU_OPEN);
        Tile.addPlayer(Board.get(game.board, x, y), game.players[3]);
    }

    function generateGame(x, y, treasure, phase){
        var deck = [];
        deck.push(treasure);

        var players = {
            1: Player.new(1, 'green',  Player.PLAYER_TYPE_CPU_OPEN)
        };

        Player.assignCard(players[1], Deck.deal(deck));

        var tileBag = TileBag.new();
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

        var board = Board.new(tileBag, players);

        Tile.removePlayer(Board.get(board, 0, 0), 1);
        Tile.addPlayer(Board.get(board, x, y), players[1]);

        return {
            deck: deck,
            board: board,
            tileBag: tileBag,
            players: players,
            turn: 0,
            phase: phase,
            winner: null
        };
    }
});