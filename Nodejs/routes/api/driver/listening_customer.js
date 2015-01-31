/**
 * Created by hesk on 1/25/2015.
 */
var keystone = require('keystone'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    async = require('async'),
    tool = require('../../../lib/handler/checker'),
    queries = require('../../../lib/handler/queries')
    ;
exports = module.exports = function (req, res) {
    var Q = {},
        local = {post: false, driver: false, customer_res: 0};
    async.series([
        function (next) {
            try {
                Q = tool.url_param_checker(req.body, ['_call_id', 'driver_num']);
                next();
            } catch (e) {
                return next({message: e.message});
            }
        },
        function (next) {
            queries.get_driver_by_phone(local, Q.driver_num, next);
        },
        function (next) {
            queries.get_call_post_by_Id(local, Q._call_id, next);
        },
        function (next) {
            if (local.post.dealstatus == "stage3") {
                local.customer_res = 1;
            }else if (local.post.dealstatus == "removed_c") {
                local.customer_res = 2;
            }
            console.log("::curent status::" + local.post.dealstatus);
            next();
        },
        function (next) {
            return res.apiResponse({
                success: true,
                timestamp: new Date().getTime(),
                holder: local.customer_res
            });
        }

    ], function (err) {
        if (err) {
            console.log('[api.app.release] - activated the list', err);
            console.log('------------------------------------------------------------');
            return res.apiResponse({
                success: false,
                timestamp: new Date().getTime(),
                message: (err && err.message ? err.message : false) || 'Sorry, there was an error from verifying your product, please try again.'
            });
        }
    });
}