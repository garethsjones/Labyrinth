var assert = require("chai").assert,
    _ = require('lodash');

var TileBag = require('../lib/TileBag'),
    Board = require('../lib/Board'),
    Deck = require('../lib/Deck'),
    Player = require('../lib/Player'),
    Tile = require('../lib/Tile'),
    play = require('../lib/Play'),
    Treasures = require('../lib/Treasures').Treasures;

describe('Play', function(){

    it('should play out a whole damned game', function(){

        var game = generateGame();

        var playGame = _.curry(play)(game),
            assertPos = _.curry(assertPlayerPosition)(game),
            assertScores = _.curry(assertPlayerScores)(game),
            lastResponse = null;

        var act = function(playerId, action, expectedSuccess) {
            expectedSuccess = typeof expectedSuccess !== 'undefined' ? expectedSuccess : true;
            lastResponse = playGame(playerId, action);
            assert.isNotNull(lastResponse);
            assert.equal(expectedSuccess, lastResponse.success);
        };

        assertScores(0, 0, 0, 0);

        //act out of turn
        act(2, "turn", false);

        act(1, "turna");
        act(1, "play 1,0");
        act(1, "move 2,0");
        assertPos(1, 2, 0);
        assertScores(1, 0, 0, 0);

        act(2, "flip");
        act(2, "play 6,5");
        act(2, "move 4,0");
        assertPos(2, 4, 0);
        assertScores(1, 0, 0, 0);

        act(3, "play 5,0");
        act(3, "move 1,4");
        assertPos(3, 1, 4);
        assertScores(1, 0, 1, 0);

        act(4, "play 1,6");
        act(4, "move 1,6");
        assertPos(3, 1, 3);
        assertPos(4, 1, 6);
        assertScores(1, 0, 1, 0);

        act(1, "turna");
        act(1, "play 6,3");
        act(1, "move 1,4");
        assertPos(3, 0, 3);
        assertScores(1, 0, 1, 0);

        act(2, "turn");
        act(2, "play 6,5");
        act(2, "move 6,5");

        act(3, "turna");
        act(3, "play 0,3");
        act(3, "move 0,1");
        assertScores(1, 0, 2, 0);

        act(4, "turn");
        act(4, "play 1,0");
        act(4, "move 5,0");
        assertScores(1, 0, 2, 1);

        act(1, "turn");
        act(1, "play 6,5");
        act(1, "move 0,4");
        assertScores(2, 0, 2, 1);

        act(2, "flip");
        act(2, "play 6,3");
        act(2, "move 6,5");
        assertScores(2, 1, 2, 1);

        act(3, "flip");
        act(3, "play 1,0");
        act(3, "move 4,6");
        assertScores(2, 1, 3, 1);

        act(4, "play 0,3");
        act(4, "move 1,2");
        assertScores(2, 1, 3, 2);

        act(1, "flip");
        act(1, "play 0,3");
        act(1, "move 1,0");
        assertScores(3, 1, 3, 2);

        act(2, "play 0,1");
        act(2, "move 4,4");
        assertScores(3, 2, 3, 2);

        assert.equal(null, game.winner);
        act(3, "flip");
        act(3, "play 1,0");
        act(3, "move 6,6");
        assert.equal(3, game.winner);

        //act after game won
        act(4, "turn", false);
    });

    function generateGame(){
        var deck = [];
        deck.push(Treasures.BEETLE);
        deck.push(Treasures.SKULL);
        deck.push(Treasures.KEYS);
        deck.push(Treasures.MOTH);
        deck.push(Treasures.IMP);
        deck.push(Treasures.PURSE);
        deck.push(Treasures.PRINCESS);
        deck.push(Treasures.MAP);
        deck.push(Treasures.OWL);
        deck.push(Treasures.DRAGON);
        deck.push(Treasures.LIZARD);
        deck.push(Treasures.CANDELABRA);

        var players = {
            1: Player.new(1, 'green'),
            2: Player.new(2, 'blue'),
            3: Player.new(3, 'red'),
            4: Player.new(4, 'yellow')
        };

        Player.assignCard(players[1], Deck.deal(deck));
        Player.assignCard(players[2], Deck.deal(deck));
        Player.assignCard(players[3], Deck.deal(deck));
        Player.assignCard(players[4], Deck.deal(deck));

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

        return {
            deck: deck,
            board: board,
            tileBag: tileBag,
            players: players,
            turn: 0,
            phase: 'play',
            winner: null
        };
    }

    function assertPlayerPosition(game, playerId, x, y){
        var response = play(game, null, "player " + playerId);
        assert.equal(x, response.payload.coords.x);
        assert.equal(y, response.payload.coords.y);
    }

    function assertPlayerScores(game, score1, score2, score3, score4){
        assert.equal(score1, play(game, null, "player 1").payload.score);
        assert.equal(score2, play(game, null, "player 2").payload.score);
        assert.equal(score3, play(game, null, "player 3").payload.score);
        assert.equal(score4, play(game, null, "player 4").payload.score);
    }
});