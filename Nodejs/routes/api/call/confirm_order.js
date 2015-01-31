/**
 * Created by hesk on 1/21/2015.
 */
var keystone = require('keystone'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    async = require('async'),
    Call = keystone.list('Call'),
    tool = require('../../../lib/handler/checker'),
    queries = require('../../../lib/handler/queries')
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
        }, function (next) {
            queries.get_call_post_by_Id(local, Q._call_id, next);
        }, function (next) {
            queries.update_call_status(local.post, "stage3", next);

        },
        function (next) {
            console.log("[api.app.confirm] - reveal:", local.post._doc);
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