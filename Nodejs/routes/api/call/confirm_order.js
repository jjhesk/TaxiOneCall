/**
 * Created by hesk on 1/21/2015.
 */
var keystone = require('keystone'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    async = require('async'),
    Call = keystone.list('Call'),
    tool = require('../../../lib/handler/checker')
    ;

exports = module.exports = function (req, res) {
    //if (req.user) {
    //  console.log('[token] - fname [' + req.user.name.first + '], lname [' + req.user.name.last + '], id [' + req.user.id + '].');
    // var jwtTokenSecret = keystone.get('jwtTokenSecret');
    // var expires = moment().add(7, 'days').valueOf();
    // var token = jwt.encode({iss: req.user.id, exp: expires}, jwtTokenSecret);
    // load the other posts

    var
        Q = {},
        local = {post: false};

    async.series([
        function (next) {
            try {
                Q = tool.url_param_checker(req.body, ['_call_id']);
                next();
            } catch (e) {
                return next({message: e.message});
            }
        },
        function (next) {
            var q = Call.model.findOne()
                .where('_id', Q._call_id)
                .exec(function (err, results) {
                    if (err) {
                        return next({message: err});
                    } else {
                        // update the value of status to taken
                        results.dealstatus = "stage2";
                        local.post = results;
                        return next();
                    }
                });
        },
        function (next) {
            local.post.save(function (err, doc) {
                if (err) {
                    return next({message: err.message});
                }
                if (doc) {
                    console.log('------------------------------------------------------------');
                    console.log('[api.app.confirm] - result ...', doc);
                    console.log('------------------------------------------------------------');
                    return next();
                }
            });
        },
        function (next) {
            return res.apiResponse({
                success: true,
                timestamp: new Date().getTime(),
                holder: local.post._doc
            });
        }

    ], function (err) {
        if (err) {
            console.log('------------------------------------------------------------');
            console.log('[api.app.confirm] - activated the list', err);
            console.log('------------------------------------------------------------');
            return res.apiResponse({
                success: false,
                timestamp: new Date().getTime(),
                message: (err && err.message ? err.message : false) || 'Sorry, there was an error from verifying your product, please try again.'
            });
        }
    });
}