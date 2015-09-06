var _ = require('lodash');

var Board = require('../Board'),
    TileBag = require('../TileBag'),
    Deck = require('../Deck'),
    Player = require('../Player');

module.exports = function(greenPlayerType, bluePlayerType, redPlayerType, yellowPlayerType) {

    var tileBag = TileBag.new(),
        deck = Deck.new(),
        phase = 'play';

    var player1 = Player.new(1, 'green', greenPlayerType),
        player2 = Player.new(2, 'blue', bluePlayerType),
        player3 = Player.new(3, 'red', redPlayerType),
        player4 = Player.new(4, 'yellow', yellowPlayerType);

    var players = {};

    if (greenPlayerType != Player.PLAYER_TYPE_NONE) players[1] = player1;
    if (bluePlayerType != Player.PLAYER_TYPE_NONE) players[2] = player2;
    if (redPlayerType != Player.PLAYER_TYPE_NONE) players[3] = player3;
    if (yellowPlayerType != Player.PLAYER_TYPE_NONE) players[4] = player4;

    var turn = _.random(0, _.keys(players).length - 1);

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
