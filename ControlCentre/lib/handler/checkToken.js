/**
 * Created by hesk on 1/21/2015.
 */
var keystone = require('keystone'),
    async = require('async'),
    jwt = require('jwt-simple'),
    jwtTokenSecret = keystone.get('jwtTokenSecret');

var checkToken = function(token) {
    var user;
    if (token) {
        try {
            var decoded = jwt.decode(token.token, jwtTokenSecret);
            if (decoded.exp > Date.now() && decoded.iss == token.user._id) {
                user = token.user;
            }
        }
        catch (err) { }
    }

    return user;
};

exports = module.exports = checkToken;