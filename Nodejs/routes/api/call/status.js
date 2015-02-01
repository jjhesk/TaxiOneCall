/**
 * Created by hesk on 1/26/2015.
 */
/**
 * Created by hesk on 1/21/2015.
 */
var keystone = require('keystone'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    async = require('async'),
    tool = require('../../../lib/handler/checker'),
    queries = require('../../../lib/handler/queries')
    ;

exports = module.exports = function (req, res) {

    var
        Q = {},
        local = {post: false, driver: false, complain_post: false};

    async.series([
        function (next) {
            try {
                Q = tool.url_param_checker(req.body, ['_callId', 'new_status']);
                next();
            } catch (e) {
                return next({message: e.message});
            }
        }, function (next) {
            queries.get_call_post_by_Id(local, Q._callId, next);
        }, function (next) {
            queries.update_call_status(local.post, Q.new_status, next);
        }, function (next) {
            return res.apiResponse({
                success: true,
                timestamp: new Date().getTime(),
                holder: local.post._doc
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