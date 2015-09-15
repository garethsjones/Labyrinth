
module.exports = {
    new: require('./player/New'),
    assignCard: require('./player/AssignCard'),
    PLAYER_TYPES:{
        NONE: {desc: 'Empty', humanity: 'none'},
        HUMAN: {desc: 'Human', humanity: 'human'},
        CPU: {
            AGGRESSIVE: {desc: 'Aggressive', humanity: 'robot', metric: 'other_paths', order: 'reverse'},
            OPEN: {desc: 'Open', humanity: 'robot', metric: 'own_path'},
            RANDOM: {desc: 'Random', humanity: 'robot', metric: 'own_path', order: 'random'},
            CLOSED: {desc: 'Closed', humanity: 'robot', metric: 'own_path', order: 'reverse'},
            NICE: {desc: 'Nice', humanity: 'robot', metric: 'other_paths'}
        }
    }
};