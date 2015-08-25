var _ = require('lodash');

var print = require('./play/Print'),
    turn = require('./play/Turn'),
    findPlayer = require('./play/FindPlayer'),
    findTreasure = require('./play/FindTreasure'),
    placeTile = require('./play/PlaceTile'),
    move = require('./play/Move'),
    playableCoords = require('./play/PlayableCoords');

module.exports = function(game, input) {

    var match,
        x,
        y;

    var player = game.players[_.keys(game.players)[game.turn]];

    switch (true) {
        case /^print$/.test(input):
            print(game, player);
            break;
        case /^turn$/.test(input):
        case /^turnr$/.test(input):
        case /^turnc$/.test(input):
            turn(game, 1);
            break;
        case /^turnl$/.test(input):
        case /^turna$/.test(input):
            turn(game, 3);
            break;
        case /^flip$/.test(input):
            turn(game, 2);
            break;
        case /^player (\d+)$/.test(input):
            match = /player (\d+)/.exec(input);
            var playerId = match[1];
            findPlayer(game, playerId);
            break;
        case /^treasure (\w+)$/.test(input):
            match = /treasure (\w+)/.exec(input);
            var treasureSymbol = match[1];
            findTreasure(game, treasureSymbol);
            break;
        case /^playable$/.test(input):
            playableCoords(game);
            break;
        case /^play (\d+),(\d+)$/.test(input):
            match = /play (\d+),(\d+)/.exec(input);
            x = match[1];
            y = match[2];
            placeTile(game, x, y);
            break;
        case /^move (\d+),(\d+)$/.test(input):
            match = /move (\d+),(\d+)/.exec(input);
            x = match[1];
            y = match[2];
            move(game, x, y);
            break;
        default:
            console.log("I don't know how to " + input);
            return;
    }
};