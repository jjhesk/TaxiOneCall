/**
 * Created by hesk on 1/21/2015.
 */
var keystone = require('keystone'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    async = require('async'),
    User = keystone.list('User'),
    Call = keystone.list('Call'),
    tool = require('../../../lib/handler/checker'),
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
        local = {post: false, driver: false},
        localout = {status: 0, taxi_id: false, driver_name: false, taxi_license: "", caller: "", est_time: ""};

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
            var _id_ = local.post.driver;
            if (_id_ != "") {
                queries.get_driver_by_Id(local, _id_, next);
            } else next();
        }, function (next) {
            //update the value of status to taken
            if (local.post.dealstatus == "stage1") {
                localout.status = 1;
                if (local.driver) {
                    localout.taxi_id = local.driver._id.toString();
                    localout.driver_name = local.driver.name.first + " " + local.driver.name.last;
                    localout.taxi_license = local.driver.licenseID;
                    localout.caller = local.driver.cellPhone;
                    localout.est_time = local.post.estimate;
                    console.log('order is checked and the status is -stage1-');
                }
            }

            if (local.post.dealstatus == "stage2") {
                localout.status = 2;
                if (local.driver) {
                    localout.taxi_id = local.driver._id.toString();
                    localout.driver_name = local.driver.name.first + " " + local.driver.name.last;
                    localout.taxi_license = local.driver.licenseID;
                    localout.caller = local.driver.cellPhone;
                    localout.est_time = local.post.estimate;
                    console.log('order is checked and the status is -stage2-');
                }
            }
            next();
        }, function (next) {
            return res.apiResponse({
                success: true,
                timestamp: new Date().getTime(),
                holder: localout
            });
        }
    ], function (err) {
        if (err) {
            console.log('[api.app.check_order] - activated the list', err);
            console.log('------------------------------------------------------------');
            return res.apiResponse({
                success: false,
                timestamp: new Date().getTime(),
                message: (err && err.message ? err.message : false) || 'Sorry, there was an error from verifying your product, please try again.'
            });
        }
    });
    //res.json({list: Call.list})
    // }
}