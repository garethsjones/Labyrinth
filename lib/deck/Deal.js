
module.exports = function(deck){

    if (deck.length === 0) {
        throw new Error('No cards left in deck');
    }

    return deck.pop();
};