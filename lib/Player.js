
module.exports = {
    new: require('./player/New'),
    assignCard: require('./player/AssignCard'),
    PLAYER_TYPES:{
        NONE: {desc: 'Empty', humanity: 'None'},
        HUMAN: {desc: 'Human', humanity: 'Human'},
        CPU_AGGRESSIVE: {desc: 'Aggressive', humanity: 'CPU', metric: 'other_paths', order: 'reverse', intelligence: 100},
        CPU_OPEN: {desc: 'Open', humanity: 'CPU', metric: 'own_path', intelligence: 100},
        CPU_RANDOM: {desc: 'Random', humanity: 'CPU', metric: 'own_path', order: 'random', intelligence: 100},
        CPU_CLOSED: {desc: 'Closed', humanity: 'CPU', metric: 'own_path', order: 'reverse', intelligence: 100},
        CPU_NICE: {desc: 'Nice', humanity: 'CPU', metric: 'other_paths', intelligence: 100}
    }
};