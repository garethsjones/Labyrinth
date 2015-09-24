var _ = require('lodash'),
    colors = require('colors'),
    prompt = require('cli-input'),
    definitions = prompt.sets.definitions;

var Player = require('./Player');

module.exports = function(callback){

    var players = {
        1: _.cloneDeep(Player.PLAYER_TYPES.HUMAN),
        2: _.cloneDeep(Player.PLAYER_TYPES.NONE),
        3: _.cloneDeep(Player.PLAYER_TYPES.CPU_AGGRESSIVE),
        4: _.cloneDeep(Player.PLAYER_TYPES.NONE)
    };

    function displayPlayers(players){

        console.log("\nPlayers:");

        _.each(players, function (player, id){
            var description = player.desc;

            if (player.humanity == 'CPU'){
                description = 'CPU ' + description + ' (' + player.intelligence + ')';
            }

            description = id + ': ' + description;

            switch(id){
                case '1': description = description.green;  break;
                case '2': description = description.blue;  break;
                case '3': description = description.red;  break;
                case '4': description = description.yellow;  break;
            }

            console.log(description);
        });
    }

    var rootMenu = function(){

        displayPlayers(players);
        console.log('\nOptions:');

        var def = definitions.option.clone();
        var opts = {list: ['Edit player 1', 'Edit player 2', 'Edit player 3', 'Edit player 4', 'Start'], prompt: def};

        var ps = prompt();
        ps.select(opts, function(err, res, index, line){
            if (err || !res) return console.error(err);
            console.info('answer: "%s"', res.value);

            if (res.value == 'Start') {
                return start();
            }

            selectPlayerType(index + 1);
        });
    };

    var selectPlayerType = function(id){

        var def = definitions.option.clone();

        console.log('\nSelect player %s type:', id);
        var opts = {list: ['Human', 'CPU', 'None'], prompt: def};

        var ps = prompt();
        ps.select(opts, function(err, res, index, line){
            if (err || !res) return console.error(err);
            console.info('answer: "%s"', res.value);

            players[id].humanity = res.value;

            switch (res.value) {
                case 'None':
                    players[id].desc = res.value;
                    return rootMenu();
                case 'Human':
                    return selectPlayerName(id);
                case 'CPU':
                    return selectCpuPersonality(id);
            }
        });
    };

    var selectPlayerName = function(id){

        var def = definitions.question.clone();

        def.parameters = ['Give player a name:'];

        var ps = prompt();
        ps.run([def], function(err, res) {
            if(err) console.error(err);
            if(res && res.map) {
                var val = res.map.question;
                console.info('answer: "%s"', val);
            }

            players[id].desc = val;

            rootMenu();
        });
    };

    var selectCpuPersonality = function(id){

        var def = definitions.option.clone();

        console.log('\nSelect CPU %s personality:', id);
        var opts = {list: ['Aggressive', 'Open', 'Random', 'Closed', 'Nice'], prompt: def};

        var ps = prompt();
        ps.select(opts, function(err, res, index, line){
            if (err || !res) return console.error(err);
            console.info('answer: "%s"', res.value);

            players[id] = _.cloneDeep(_.first(_.filter(Player.PLAYER_TYPES, 'desc', res.value)));

            selectCpuIntelligence(id);
        });
    };

    var selectCpuIntelligence = function(id){

        var def = definitions.question.clone();

        def.parameters = ['Select CPU intelligence [0-100]:'];

        var ps = prompt();
        ps.run([def], function(err, res) {
            if(err) console.error(err);
            if(res && res.map) {
                var val = res.map.question;
                console.info('answer: "%s"', val);
            }

            players[id].intelligence = val;

            rootMenu();
        });
    };

    var start = function(){
        callback(players);
    };

    rootMenu();
};