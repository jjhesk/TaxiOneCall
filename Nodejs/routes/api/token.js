/**
 * Created by hesk on 1/21/2015.
 */
var keystone = require('keystone'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    async = require('async');

exports = module.exports = function(req, res) {
    if (req.user) {
        console.log('[token] - fname [' + req.user.name.first + '], lname [' + req.user.name.last + '], id [' + req.user.id + '].');
        var jwtTokenSecret = keystone.get('jwtTokenSecret');
        var expires = moment().add(7, 'days').valueOf();
        var token = jwt.encode({ iss: req.user.id, exp: expires }, jwtTokenSecret);
        res.json({ token : token, expires: expires, user: req.user.toJSON()	});
    }
}