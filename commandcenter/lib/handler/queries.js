/**
 * Created by hesk on 1/25/2015.
 */
var keystone = require('keystone'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    async = require('async'),
    Call = keystone.list('Call'),
    Token = keystone.list('Tokenized'),
    Complain = keystone.list('Complain'),
    User = keystone.list('User'),
    ObjectIdAction = require('mongoose').Types.ObjectId,
    tool = require('./checker')
    ;
var getuser_by_phonenumber = function (local, driver_num, next) {
        var queryd = User.model.findOne()
            .where('cellPhone', driver_num)
            .exec(function (err, user) {
                if (err) {
                    return next({message: err.message});
                }
                if (!user || user.length == 0)
                    return next({message: "driver not found"});

                // console.log(user);
                local.driver = user;
                return next();

            });
    },
    getuser_driver_by_Id = function (local, object_Id, next) {
        var qq = User.model
            .findOne({'_id': object_Id})
            .exec(function (err, user) {
                if (err) {
                    return next({message: err.message});
                }
                console.log('[api.app.getdriver] - ', user);
                if (user) {
                    local.driver = user;
                    return next();
                }
                return next();
            });
    },
    getCall = function (local, callId, next) {
        var q = Call.model.findOne()
            .where('_id', callId)
            .exec(function (err, result) {
                if (err) {
                    return next({message: err});
                } else {

                    if (!result)
                        return next({message: "call post not found"});
                    local.post = result;
                    return next();
                }
            });
    },
    updateCallPost = function (post, newStatus, next) {
        //update the value of status to taken
        var date_now = Date.now();
        if (newStatus == "public") {
            post.driver = null;
        }
        post.dealstatus = newStatus;
        post.dealstatus_time = date_now;
        post.save(function (err, docUpdated) {
            if (err) {
                return next({message: err.message});
            }
            if (docUpdated) {
                console.log('------------------------------------------------------------');
                console.log('[api.app.update] - saved ..', docUpdated);
                console.log('------------------------------------------------------------');
                return next();
            }
        });
    },
    updateCallTimeEstimation = function (timeEst, post, next) {
        var date_now = Date.now();
        post.estimate = timeEst;
        post.dealstatus_time = date_now;
        post.save(function (err, docUpdated) {
            if (err) {
                return next({message: err.message});
            }
            if (docUpdated) {
                console.log('------------------------------------------------------------');
                console.log('[api.app.update] - saved ..', docUpdated);
                console.log('------------------------------------------------------------');
                return next();
            }
        });
    },
    submissionIssueReport = function (local, Q_content, next) {
      //  var driver_id = new ObjectIdAction(local.driver._id.toString());
      //  var call_id = new ObjectIdAction(local.post._id.toString());
        var datenow = Date.now();
        // console.log('[api.new.call] - get Q.', Q);
        var complain_post = new Complain.model({
            driver: local.driver._id,
            callId: local.post._id,
            issueContent: Q_content,
            reportTime: datenow,
            status: 'new'
        });
        complain_post.save(function (err) {
            if (err) {
                console.log('[api.new.complain]  - Error saving new call.', err);
                console.log('------------------------------------------------------------');
                return next({message: 'Sorry, there was an error processing your account, please try again.'});
            }
            console.log('[api.new.complain]  - Saved new call registration.');
            console.log('------------------------------------------------------------');
            local.complain_post = complain_post;
            return next();
        });
    }, validatetoken = function (token, local, next) {
        var q = Token.model.findOne()
            .where('token', token)
            .exec(function (err, result) {
                if (err) {
                    return next({message: err});
                }
                if (!result)
                    return next({message: "invalid token"});

                local.user = result.user;
                return next();

            });
    }, createnewtoken = function (local_object, next) {
        /**
         * issue a new token for the user in here.
         *   var local = {token: false, expires: false, user: false}
         * @type {a.data.model}
         */
        console.log('[api.new.token] - start process method.');
        var new_issued_token = tool.genkey(24);
        /* if (token_input == "" || !token_input)
         token_input = tool.genkey(24);*/
        console.log('[api.new.token] - generated new_issued_token:', new_issued_token);
        var tokenp = new Token.model({
            token: new_issued_token,
            // user: new ObjectIdAction(user_id),
            user: local_object.user,
            expire: moment().add(7, 'days').valueOf(),
            object: 'login'
        });

        console.log('[api.new.token] - token object is formed');
        tokenp.save(function (err) {
            if (err) {
                console.log('[api.new.token] - Error saving new token.', err);
                console.log('------------------------------------------------------------');
                return next({message: 'Sorry, there was an error processing your account, please try again.'});
            }
            console.log('[api.new.token] - Saved new token.');
            console.log('------------------------------------------------------------');
            local_object.token = new_issued_token;
            return next();
        });
    };
exports.get_driver_by_Id = getuser_driver_by_Id;
exports.get_driver_by_phone = getuser_by_phonenumber;
exports.get_call_post_by_Id = getCall;
exports.update_call_status = updateCallPost;
exports.update_call_estimation = updateCallTimeEstimation;
exports.report_new_issue = submissionIssueReport;
exports.issue_token = createnewtoken;
exports.validate_token = validatetoken;