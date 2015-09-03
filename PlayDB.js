var _ = require('lodash'),
    mongoose = require('mongoose'),
    argv = require('minimist')(process.argv.slice(2));

mongoose.connect('mongodb://localhost/labyrinth');

var TILE_BAG = require('./lib/TileBag'),
    BOARD = require('./lib/Board'),
    DECK = require('./lib/Deck'),
    PLAYER = require('./lib/Player'),
    TileBag = TILE_BAG.TileBag,
    Board = BOARD.Board,
    Deck = DECK.Deck,
    Player = PLAYER.Player,
    Printer = require('./AsciiPrinter'),
    GameModel = require('./GameModel').GameModel,
    TREASURES_TO_WIN = 3;

function create(){
    var tileBag = new TileBag(),
        deck = new Deck();

    var players = {
        1: new Player(1, 'green'),
        2: new Player(2, 'blue'),
        3: new Player(3, 'yellow'),
        4: new Player(4, 'red')
    };

    _.forEach(players, function(player) {
        player.assignCard(deck.deal());
    });

    var board = new Board(tileBag, players);

    var playerModel = {};
    _.each(_.keys(players), function(n){
        playerModel[n] = JSON.stringify(players[n].getState());
    });

    return new GameModel({
        board: JSON.stringify(board.getState()),
        deck: JSON.stringify(deck.getState()),
        tileBag: JSON.stringify(tileBag.getState()),
        players: playerModel,
        turn: 0,
        phase: 'play',
        created: Date.now()
    });
}

function load(id, callback){
    GameModel.findById(id, play);
}

function close(err){
    if (err) console.error(err);
    mongoose.disconnect();
}

if (_.indexOf(argv._, 'create') != -1) {
    var gameModel = create();
    gameModel.save(function(err, doc){
        if (err) return close(err);
        console.log('Created ID: ' + doc._id);
        play(null, doc);
    });
} else if (argv.id) {
    load(argv.id, play);
} else {
    displayAll();
}

function play(err, gameModel) {
    if (err) return close(err);

    var game = {};

    game.deck = DECK.fromState(JSON.parse(gameModel.deck));
    game.board = BOARD.fromState(JSON.parse(gameModel.board));
    game.tileBag = TILE_BAG.fromState(JSON.parse(gameModel.tileBag));
    game.turn = gameModel.turn;
    game.phase = gameModel.phase;
    game.players = gameModel.players;
    game.created = gameModel.created;
    game.updated = gameModel.updated;

    var player = PLAYER.fromState(JSON.parse(game.players[_.keys(game.players)[game.turn]]));

    print(game, player);

    gameModel.save(function(err){
        close(err);
    });
}

function print(game, player) {
    var coords = game.board.whereIsPlayer(player.getId());
    var treasureCoords = game.board.whereIsTreasure(player.getCard().symbol);
    var availableCoords = [];

    if (coords != null) {
        availableCoords = game.board.whereCanIGo(coords.x, coords.y);
    }

    console.log('Board:');
    Printer.printGrid(game.board, availableCoords, player.getColour());
    console.log();
    console.log('Next piece:');
    Printer.printTile(game.tileBag.peek());
    console.log();
    console.log('What\'s up ' + player.getColour() + '?');

    if (treasureCoords != null) {
        console.log('You\'re looking for the ' + player.getCard().desc + ' (' + player.getCard().symbol + ") which is at " + treasureCoords.x + "," + treasureCoords.y);
    } else {
        if (game.tileBag.peek().getTreasure().symbol == player.getCard().symbol) {
            console.log('You\'re looking for the ' + player.getCard().desc + ' (' + player.getCard().symbol + ") which is on the spare tile");
        } else {
            console.log('The treasure you\'re looking is nowhere to be found');
        }
    }

    console.log('You\'re at ' + coords.x + ',' + coords.y);

    if (game.phase == 'play') {
        console.log("Where do you want to play the tile?");
    }

    if (game.phase == 'move') {
        console.log("You can go:");
        var s = "";
        _.forEach(availableCoords, function(coords) {
            s += coords.x + ',' + coords.y + ' ';
        });
        console.log(s);
    }
}

function displayAll(){
    console.log('All games:');
    GameModel.find(function(err, games){
        if (err) return close(err);

        _.forEach(games, function(game){
            displayGame(game);
        });

        close('What game do you want to play?');
    });
}

function displayGame(game){
    console.log('ID ' + game._id);
}