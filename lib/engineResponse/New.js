
module.exports = function(success, payload, message) {

    var engineResponse = {};

    engineResponse.success = success;
    engineResponse.payload = payload;
    engineResponse.message = message;

    return engineResponse;
};