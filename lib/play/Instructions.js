
var EngineResponse = require('../EngineResponse'),
    Game = require('../Game');

var TREASURES_TO_WIN = require('./Constants').TREASURES_TO_WIN;

module.exports = function(game) {

    var message = "This is LABYRINTH. You are a wizard and you're treasure-hunting in a maze which won't stay still!";

    message += "\n\nEach wizard starts in their own corner of the labyrinth.";
    message += "\nThe objective is to collect " + TREASURES_TO_WIN + " designated treasures and then return to your corner before your opponents do the same.";
    message += "\nEach turn you will have a path tile which must be played to shift the layout of the labyrinth and a secret objective within the labyrinth which you must reach.";
    message += "\nThere are 2 phases to each turn:";
    message += "\n\tIn the SHIFT phase you MUST rotate and place your tile on the edge of the labyrinth and shift the other tiles in the row/column along. The tile pushed out the other side is passed to the next player.";
    message += "\n\tIn the MOVE phase you MAY move your wizard to any tile connected by a continuous path to your current tile. If you end your move on your objective then you collect it.";
    message += "\nAdditional rules:";
    message += "\n\tOnly ODD numbered rows and columns may be shifted.";
    message += "\n\tYou CANNOT reverse the shift of the previous player.";
    message += "\n\tIf a wizard is on a tile which is pushed out of the labyrinth they are warped onto the tile placed that turn. This does not count as a MOVE so you may do it to your own wizard and still move that turn.";
    message += "\n\tMoving is optional. If you do not wish to do so enter your current location when asked where you would like to go.";

    message += "\n\nCommands available at any time to anybody:";
    message += "\n? - Display this instructional text";
    message += "\nscores - Get the current score of each player";
    message += "\nplayer x - Get info about player x. If x is not you then you'll only see a limited data set.";
    message += "\ntreasure x - Get the location of treasure x";
    message += "\nshiftables - Get all the available locations to place the next tile. (Odd numbered row/columns not reversing the previous shift)";

    message += "\n\nCommands available on your turn:";
    message += "\nhold - do not rotate the tile in hand (this action does nothing).";
    message += "\nturn - spin the tile in hand clockwise.";
    message += "\nflip - spin the tile in hand 180 degrees.";
    message += "\nturna - spin the tile in hand anticlockwise.";
    message += "\nshift x,y - if it is your SHIFT phase place the tile in hand @ x,y and shift that row/column along.";
    message += "\nmove x,y - if this is your MOVE phase move your wizard to location x,y.";

    message += "\n\nWhen it's the CPUs turn to act submit an empty command to make them act.";

    var player = Game.whoseTurn(game);

    message += "\n\nCurrent game:";
    message += "\n\tActing player: " + player.id + " (" + player.colour + ")";
    message += "\n\tPhase: " + game.phase;

    return EngineResponse.new(true, null, message);
};