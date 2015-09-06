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

    it('should move toward an unavailable objective', function(){

        var game = generateGame(0, 0, Treasures.SPIDER, 'move');

        var coords = AI.bestMove(game, 1);

        assertCoord({x: 0, y: 1}, coords);
    });

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

    it.only('should lay tile on accessible space if objective is in hand', function(){

        var game = generateGame(0, 0, Treasures.GHOST, 'play');

        Printer.printGame(game);

        var placement = AI.bestPlacement(game, 1);

        assertCoord({x: 1, y: 0}, placement);
    });

    it('should not crash when objective is on the edge', function(){

        var game = generateGame(0, 0, Treasures.OWL, 'play');

        AI.bestPlacement(game, 1);
    });

    function assertCoord(expected, actual){
        assert.equal(expected.x + ',' + expected.y, actual.x + ',' + actual.y);
    }

    function generateGame(x, y, treasure, phase){
        var deck = [];
        deck.push(treasure);

        var players = {
            1: Player.new(1, 'green',  Player.PLAYER_TYPE_CPU_1)
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