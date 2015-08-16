var _ = require('lodash'),
    sys = require('sys'),
    stdin = process.openStdin();

var TileBag = require('./lib/TileBag'),
    Board = require('./lib/Board'),
    Deck = require('./lib/Deck'),
    Player = require('./lib/Player'),
    Tile = require('./lib/Tile'),
    play = require('./lib/Play');

var tileBag = TileBag.new(),
    deck = Deck.new(),
    turn = 0,
    phase = 'play';

var player1 = Player.new(1, 'green'),
    player2 = Player.new(2, 'blue'),
    player3 = Player.new(3, 'yellow'),
    player4 = Player.new(4, 'red');

var players = {};
players[1] = player1;
//players[2] = player2;
//players[3] = player3;
//players[4] = player4;

_.forEach(players, function(player) {
    Player.assignCard(player, Deck.deal(deck));
});

var board = Board.new(tileBag, players);

var game = {
    deck: deck,
    board: board,
    tileBag: tileBag,
    players: players,
    turn: turn,
    phase: phase
};

play(game, "print");

stdin.addListener("data", function(input) {
    input = input.toString().trim();
    play(game, input);
});