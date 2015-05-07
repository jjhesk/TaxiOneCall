/**
 * Created by hesk on 1/10/2015.
 */
/**
 * Created by hesk on 1/21/2015.
 */
var keystone = require('keystone'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    async = require('async'),
    Call = keystone.list('Call'),
    queries = require('../../../lib/handler/queries'),
    tool = require('../../../lib/handler/checker')
    ;

exports = module.exports = function (req, res) {
    //if (req.user) {
    //  console.log('[token] - fname [' + req.user.name.first + '], lname [' + req.user.name.last + '], id [' + req.user.id + '].');
    //    var token = jwt.encode({iss: req.user.id, exp: expires}, jwtTokenSecret);
    // load the other posts
    var dataholder = {
        posts: false,
        user: false
    }, Q = {};
    async.series([
        function (next) {
            try {
                Q = tool.url_param_checker(req.query, ['token']);
                next();
            } catch (e) {
                return next({message: e.message});
            }
        },
        function (next) {
            queries.validate_token(Q.token, dataholder, next);
        },
        function (next) {
            //  try {

            var exp = moment().subtract(9, 'h').valueOf(),
                q = Call.model
                    /*.find({
                    'dealstatus': 'public',
                    'calltime': {$lt: exp}
                })*/
                    .find()
                    .where('dealstatus', 'public')
                 /*   .where('calltime').gt()*/
                    .sort('-calltime').limit('1000');
            //  .populate('calltype')
            q.exec(function (err, results) {
                dataholder.posts = results;
                if (err) {
                    return next({message: err});
                } else {
                    return next();
                }
            });

            // } catch (e) {
            //     return next({message: e.message});
            // }
        },
        function (next) {
            return res.apiResponse({
                success: true,
                timestamp: new Date().getTime(),
                holder: dataholder.posts
            });
        }

    ], function (err) {
        if (err) {
            console.log('[api.app.activeList] - actived the list', err);
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