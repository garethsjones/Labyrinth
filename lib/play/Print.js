var _ = require('lodash');

var TileBag = require('../TileBag'),
    Board = require('../Board'),
    Deck = require('../Deck'),
    Player = require('../Player'),
    Tile = require('../Tile'),
    Printer = require('../../AsciiBoardPrinter');

var print = require('./Print');

module.exports = function(game, player) {

    player = typeof player !== 'undefined' ? player : game.players[_.keys(game.players)[game.turn]];

    var coords = Board.whereIsPlayer(game.board, player.id),
        treasureCoords = Board.whereIsTreasure(game.board, player.card.symbol),
        availableCoords = [];

    if (coords != null) {
        availableCoords = Board.whereCanIGo(game.board, coords.x, coords.y);
    }

    console.log('\nBoard:');
    Printer.printBoard(game.board, availableCoords, player.colour);

    console.log('\nTile in hand:');
    Printer.printTile(TileBag.peek(game.tileBag));

    console.log('\nCurrent turn: ' + player.colour + " (" + player.treasureCount + ")");
    console.log('Turn phase: ' + game.phase);
    console.log('Position: ' + coords.x + ',' + coords.y);

    if (treasureCoords != null) {
        console.log('Objective: ' + player.card.desc + ' (' + player.card.symbol + ") @ " + treasureCoords.x + "," + treasureCoords.y);
    } else {
        console.log('Objective: ' + player.card.desc + ' (' + player.card.symbol + ") in hand");
    }

    var s = "";
    _.forEach(availableCoords, function(coords) {
        s += coords.x + ',' + coords.y + ' ';
    });
    console.log("Available moves: " + s);
};