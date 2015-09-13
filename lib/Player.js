

module.exports = {
    new: require('./player/New'),
    assignCard: require('./player/AssignCard'),
    PLAYER_TYPE_NONE: {humanity: 'none'},
    PLAYER_TYPE_HUMAN: {humanity: 'human'},
    PLAYER_TYPE_CPU_OPEN: {humanity: 'robot', metric: 'own_path'},
    PLAYER_TYPE_CPU_CLOSED: {humanity: 'robot', metric: 'own_path', order: 'reverse'},
    PLAYER_TYPE_CPU_RANDOM: {humanity: 'robot', metric: 'own_path', order: 'random'},
    PLAYER_TYPE_CPU_AGGRESSIVE: {humanity: 'robot', metric: 'other_paths', order: 'reverse'},
    PLAYER_TYPE_CPU_NICE: {humanity: 'robot', metric: 'other_paths'}
};