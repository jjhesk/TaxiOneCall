/**
 * Created by hesk on 1/21/2015.
 */
var keystone = require('keystone'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    async = require('async'),
    User = keystone.list('User'),
    ObjectId = require('mongoose').Types.ObjectId,
    tool = require('../../../lib/handler/checker')
    ;
var new_driver = function (Q, next) {
    var datenow = Date.now();
    var res_names = Q.name.split(" ");
    var driver_person = new User.model({
        'name.first': res_names[1],
        'name.last': res_names[0],
        email: Q.email,
        password: Q.pass,
        cellPhone: Q.cellphone,
        licenseID: Q.licenseplate,
        isAdmin: false,
        roles: new ObjectId("54afa3233537d6c12e412ef0")
    });
    driver_person.save(function (err) {
        if (err) {
            console.log('[api.new.driver]  - Error saving new driver.', err);
            console.log('------------------------------------------------------------');
            return next({message: 'Sorry, there was an error processing your account, please try again.'});
        }
        console.log('[api.new.driver]  - Saved new call registration.');
        console.log('------------------------------------------------------------');
    });
    return driver_person;
};
exports = module.exports = function (req, res) {
    // token
    //if (req.user) {
    //  console.log('[token] - fname [' + req.user.name.first + '], lname [' + req.user.name.last + '], id [' + req.user.id + '].');
    // var jwtTokenSecret = keystone.get('jwtTokenSecret');
    // var expires = moment().add(7, 'days').valueOf();
    //    var token = jwt.encode({iss: req.user.id, exp: expires}, jwtTokenSecret);
    // load the other posts

    var
        Q = {},
        local = {new_driver: false};

    async.series([
        function (next) {
            try {
                Q = tool.url_param_checker(req.body, [
                    'autotype',
                    'email',
                    'pass',
                    'licenseplate',
                    'name',
                    'cellphone'
                ]);
                next();
            } catch (e) {
                return next({message: e.message});
            }
        },
        function (next) {
            var queryd = User.model.find({
                $or: [
                    {'cellPhone': Q.cellphone},
                    {'email': Q.email}
                ]
                /*,
                $and:[
                    {'cellPhone': Q.cellphone},
                    {'email': Q.email}
                ]*/
            }).exec(function (err, results) {
                if (err) {
                    return next({message: err});
                } else {
                    if (results.length === 0) {
                        //not found
                        console.log('[api.new.driver] - No existing user data that is conflicted..');
                        return next();
                    } else {
                        console.log('[api.new.driver] - show results', results);
                        return next({message: "Your cannot register with this account. exist account data"});
                    }
                }
            });
        },
        function (next) {
            local.new_driver = new_driver(Q, next);
            next();
        },
        function (next) {
            return res.apiResponse({
                success: true,
                timestamp: new Date().getTime(),
                holder: local.new_driver
            });
        }
    ], function (err) {
        if (err) {
            console.log('------------------------------------------');
            console.log('[api.new.driver] - activated the list', err);
            console.log('------------------------------------------');
            return res.apiResponse({
                success: false,
                timestamp: new Date().getTime(),
                message: (err && err.message ? err.message : false) || 'Sorry, there was an error from verifying your product, please try again.'
            });
        }
    });
}