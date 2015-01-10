/**
 * Created by Hesk on 9/1/2015.
 */
var keystone = require('keystone'),
    tool = require('../../../lib/handler/checker'),
    async = require('async'),
    _ = require('underscore'),
    Call = keystone.list('Call'),
    utils = require('keystone-utils'),
    Types = keystone.Field.Types;
var getTypeChoice = function (Q) {
    var out = 'taxi-red';
    if (Q.type == 'taxi') {
        if (Q.destination) {
            out = 'taxi-red';
        }
    }
    return out;
}
var newCall = function (Q, next) {
    var datenow = Date.now();
    var callrecord = new Call.model({
        calltype: getTypeChoice(),
        callnumber: Q.phonenumber,
        calltime: datenow,
        dealstatus: 'public',
        destination: Q.destination,
        position: Q.gps
    });
    callrecord.save(function (err) {
        if (err) {
            console.log('[api.new.call]  - Error saving new call.', err);
            console.log('------------------------------------------------------------');
            return next({message: 'Sorry, there was an error processing your account, please try again.'});
        }
        console.log('[api.new.call]  - Saved new call registration.');
        console.log('------------------------------------------------------------');
    });
    return callrecord;
}
exports = module.exports = function (req, res) {

    var
        Q = {},
        local = {handle: false};

    async.series([
        function (next) {
            try {
                Q = tool.url_param_checker(req.query,
                    ['phonenumber', 'gps', 'type', 'destination']);
                next();
            } catch (e) {
                return next({message: e.message});
            }
        },
        function (next) {
            local.call = newCall(Q, next);
            next();
        },
        function (next) {
            return res.apiResponse({
                success: true,
                timestamp: new Date().getTime(),
                calldata: local.call
            });
        }
    ], function (err) {
        if (err) {
            console.log('[api.new.call]  - verify your call failed.', err);
            console.log('------------------------------------------------------------');

            return res.apiResponse({
                success: false,
                session: false,
                message: (err && err.message ? err.message : false) || 'Sorry, there was an error from verifying your license, please try again.'
            });
        }
    });
};