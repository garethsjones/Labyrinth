var assert = require("chai").assert,
    _ = require('lodash');

var TileBag = require('../lib/TileBag'),
    Board = require('../lib/Board'),
    Deck = require('../lib/Deck'),
    Player = require('../lib/Player'),
    Tile = require('../lib/Tile'),
    play = require('../lib/Play'),
    Treasures = require('../lib/Treasures').Treasures;

describe.skip('Play', function(){

    it('should play out a whole damned solo game', function(){

        var deck = [];
        deck.push(Treasures.BEETLE);
        deck.push(Treasures.SKULL);
        deck.push(Treasures.KEYS);
        deck.push(Treasures.MOTH);

        var players = {
            1: Player.new(1, 'green')
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

        var game = {
            deck: deck,
            board: board,
            tileBag: tileBag,
            players: players,
            turn: 0,
            phase: 'play'
        };

        var go = _.curry(play)(game);
        go("turna");
        go("play 1,0");
        go("move 0,2");
        go("play 6,3");
        go("move 1,5");
        //go("print");
    });
});