/**
 * Created by Hesk on 9/1/2015.
 */
var keystone = require('keystone'),
    async = require('async'),
    crypto = require('crypto'),
    hkmcheck = require('hkm-simple-vercheck').hkmverchecker,
    _ = require('underscore');
/**
 * using this to check the input parameters
 * @param Query
 * @param checkArr
 * @returns {*}
 */
exports.url_param_checker = function (Query, checkArr) {
    _.each(checkArr, function (paramname) {
        if (!Query[paramname]) throw Error(paramname + " is missing.");
    });
    return Query;
}
/**
 * to generate the key value
 * @param length
 * @returns {*}
 */
exports.genkey = function (length) {
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    if (length === -1) {
        return crypto.createHash('sha1').update(current_date + random + "2").digest('hex');
    } else {
        return crypto.createHash('sha1').update(current_date + random + "2").digest('hex').substr(0, length);
    }
}

exports.check_version = function (declared_version, lastest_version) {
    var checker = new hkmcheck(declared_version, lastest_version);
    return {
        message: checker.getMessage(),
        version: checker.getVersionFinal()
    }
}