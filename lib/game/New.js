var _ = require('lodash');

var Board = require('../Board'),
    TileBag = require('../TileBag'),
    Deck = require('../Deck'),
    Player = require('../Player');

module.exports = function(selectedPlayers) {

    var tileBag = TileBag.new(),
        deck = Deck.new(),
        turn = 0,
        phase = 'play';

    var player1 = Player.new(1, 'green'),
        player2 = Player.new(2, 'blue'),
        player3 = Player.new(3, 'red'),
        player4 = Player.new(4, 'yellow');

    var players = {};

    if (_.contains(selectedPlayers, 1)) players[1] = player1;
    if (_.contains(selectedPlayers, 2)) players[2] = player2;
    if (_.contains(selectedPlayers, 3)) players[3] = player3;
    if (_.contains(selectedPlayers, 4)) players[4] = player4;

    _.forEach(players, function(player) {
        Player.assignCard(player, Deck.deal(deck));
    });

    var board = Board.new(tileBag, players);

    return {
        deck: deck,
        board: board,
        tileBag: tileBag,
        players: players,
        turn: turn,
        phase: phase,
        winner: null
    };
};
