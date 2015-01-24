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
    //    var token = jwt.encode({iss: req.user.id, exp: expires}, jwtTokenSecret);
    // load the other posts

    var
        Q = {},
        local = {status: false, taxi_id: false, taxi_license: "", caller: ""};

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
                        //update the value of status to taken
                        if (results.dealstatus == "stage1") {
                            local.status = true;
                            console.log('order is checked and the status is -stage1-');
                        }
                        return next();
                    }
                });
        },
        function (next) {
            return res.apiResponse({
                success: true,
                timestamp: new Date().getTime(),
                holder: local
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