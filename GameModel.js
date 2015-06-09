var mongoose = require('mongoose');

var GameModel = mongoose.model('Game', mongoose.Schema({
    deck: String,
    board: String,
    tileBag: String,
    players: {
        1: String,
        2: String,
        3: String,
        4: String
    },
    turn: Number,
    phase: String,
    created: Date,
    updated: {type: Date, default: Date.now}
}));

module.exports = {
    GameModel: GameModel
}