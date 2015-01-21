/**
 * Created by hesk on 1/21/2015.
 */
/**
 * Created by hesk on 1/21/2015.
 */
var keystone = require('keystone'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    async = require('async'),
    Call = keystone.list('Call')
    ;

exports = module.exports = function (req, res) {

    //if (req.user) {
    //  console.log('[token] - fname [' + req.user.name.first + '], lname [' + req.user.name.last + '], id [' + req.user.id + '].');

    var jwtTokenSecret = keystone.get('jwtTokenSecret');
    var expires = moment().add(7, 'days').valueOf();

    //    var token = jwt.encode({iss: req.user.id, exp: expires}, jwtTokenSecret);

    // load the other posts
    var dataholder = {
        posts: false
    };

    async.series([
        function (next) {
            //  try {
            var q = Call.model.find().where('dealstatus', 'public').sort('-calltime').limit('4');
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