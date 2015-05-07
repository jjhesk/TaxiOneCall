/**
 * Created by hesk on 1/24/2015.
 */
/**
 * Created by hesk on 1/21/2015.
 */
var keystone = require('keystone'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    async = require('async'),
    tool = require('../../../lib/handler/checker'),
    ObjectId = require('mongoose').Types.ObjectId,
    queries = require('../../../lib/handler/queries')
    ;

exports = module.exports = function (req, res) {
    //if (req.user) {
    //  console.log('[token] - fname [' + req.user.name.first + '], lname [' + req.user.name.last + '], id [' + req.user.id + '].');
    // var jwtTokenSecret = keystone.get('jwtTokenSecret');
    // var expires = moment().add(7, 'days').valueOf();
    //    var token = jwt.encode({iss: req.user.id, exp: expires}, jwtTokenSecret);
    // load the other posts

    var
        Q = {},
        local = {post: false, driver: false};

    async.series([
        function (next) {
            try {
                Q = tool.url_param_checker(req.body, ['_call_id', 'driver_num']);
                next();
            } catch (e) {
                return next({message: e.message});
            }
        }, function (next) {
            console.log('[api.app.inquiry]  - by user by phone number ..', Q.driver_num);
            queries.get_driver_by_phone(local, Q.driver_num, next);
        },
        function (next) {
            console.log('[api.app.inquiry]  - by user by caller ID ..', Q._call_id);
            queries.get_call_post_by_Id(local, Q._call_id, next);
        },
        function (next) {

            //update the value of status to taken
            //console.log(local.post.driver);
            if (local.post.driver != null) {
                console.log('---This order is currently taken---');
                return next({message: "This order is currently taken."});
            }
            local.post.dealstatus = "stage1";
            //   local.post.driver = new ObjectId(local.driver._id);
            local.post.driver = local.driver._id;
            //console.log('the new driver order', local.driver._id);
            local.post.save(function (err, doc) {
                if (err) {
                    return next({message: err.message});
                }
                if (doc) {
                    console.log('------------------------------------------------------------');
                    console.log('[api.app.inquiry]  - saved ..', doc);
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
            console.log('[api.app.inquiry] - activated the list', err);
            console.log('------------------------------------------------------------');
            return res.apiResponse({
                success: false,
                timestamp: new Date().getTime(),
                message: (err && err.message ? err.message : false) || 'Sorry, there was an error from verifying your product, please try again.'
            });
        }
    });
}