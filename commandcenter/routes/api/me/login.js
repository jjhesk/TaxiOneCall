/**
 * Created by hesk on 1/26/2015.
 */
/**
 * Created by hesk on 12/16/14.
 */
var keystone = require('keystone'),
    request = require('request'),
    _ = require('underscore'),
    User = keystone.list('User'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    queries = require('../../../lib/handler/queries'),
    tool = require('../../../lib/handler/checker'),
    async = require('async');

var tokenize = function (local, user) {
        console.log('[token] - fname [' + user.name.first + '], lname [' + user.name.last + '], id [' + user.id + '].');
        var jwtTokenSecret = keystone.get('jwtTokenSecret');
        local.token = jwt.encode({iss: user.id, exp: expires}, jwtTokenSecret);
        local.expires = moment().add(7, 'days').valueOf();
        local.user = user.toJSON();
    },
// Function to check if a user already exists for this profile id (and sign them in)
    checkExisting = function (next) {
        if (local.existingUser) return checkAuth();
        console.log('[auth.confirm] - Searching for existing users via [' + local.authUser.type + '] profile id...');
        console.log('------------------------------------------------------------');

        var query = User.model.findOne();
        query.where('services.' + local.authUser.type + '.profileId', local.authUser.profileId);
        query.exec(function (err, user) {
            if (err) {
                console.log('[auth.confirm] - Error finding existing user via profile id.', err);
                console.log('------------------------------------------------------------');
                return next({message: 'Sorry, there was an error processing your information, please try again.'});
            }
            if (user) {
                console.log('[auth.confirm] - Found existing user via [' + local.authUser.type + '] profile id...');
                console.log('------------------------------------------------------------');
                local.existingUser = user;
                return doSignIn();
            }
            return next();
        });

    };


exports = module.exports = function (req, res) {
    var local = {token: false, expires: false, user: false}, Q = {}, loctemp = {driver: false};
    async.series([
        function (next) {
            Q = tool.url_param_checker(req.body, ['login', 'pass']);
            console.log('[auth.confirm] - local.', local);
            next();
        },
        function (next) {
            queries.get_driver_by_phone(loctemp, Q.login, next);
        },
        function (next) {
            // if (req.user) return next();
            var onSuccess = function (user) {
                    // console.log('[auth.confirm] - Successfully signed in request.', req.cookies.target);
                    console.log('[auth.confirm] - Successfully signed in object.', user);
                    console.log('------------------------------------------------------------');
                    // return res.redirect(req.cookies.target || '/me');
                    //tokenize(local, user);
                    local.user = loctemp.driver._id;
                    local.email = loctemp.driver.email;
                    queries.issue_token(local, next);
                },
                onFail = function (err) {
                    console.log('[auth.confirm] - Failed signing in.', err);
                    console.log('------------------------------------------------------------');
                    return next({message: 'Sorry, there was an issue signing you in, please try again.'})
                    // return res.redirect('/signin');
                };
            keystone.session.signin({email: loctemp.driver.email, password: Q.pass}, req, res, onSuccess, onFail);
        },
        function (next) {
            var finaloutput = {
                success: true,
                timestamp: new Date().getTime(),
                holder: local
            };
            console.log('[auth.confirm] - final output : ', finaloutput);
            return res.apiResponse(finaloutput);
        }

    ], function (err) {
        if (err) {
            console.log('------------------------------------------');
            console.log('[api.new.login] - activated the list', err);
            console.log('------------------------------------------');
            return res.apiResponse({
                success: false,
                timestamp: new Date().getTime(),
                message: (err && err.message ? err.message : false) || 'Sorry, there was an error from verifying your product, please try again.'
            });
        }
    });

    /*  view.on('init', function (next) {
     return checkExisting(next);
     });

     view.on('post', {action: 'confirm.details'}, function (next) {
     if (!local.form['name.first'] || !local.form['name.last'] || !local.form.email) {
     req.flash('error', 'Please enter a name & email.');
     return next();
     }
     return checkAuth();
     });

     view.render('auth/confirm');*/
    // Set existing user if already logged in

}