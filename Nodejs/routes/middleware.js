/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore'),
    querystring = require('querystring'),
    keystone = require('keystone');


/**
 Initialises the standard view locals

 The included layout depends on the navLinks array to generate
 the navigation in the header, you may wish to change this array
 or replace it with your own templates / logic.
 */

exports.initLocals = function (req, res, next) {
    var locals = res.locals;
    locals.navLinks = [
        {label: 'Home', key: 'home', href: '/'},
        {label: 'Contact', key: 'contact', href: '/contact'}
    ];
    locals.user = req.user;
    next();
};


/**
 Fetches and clears the flashMessages before a view is rendered
 */

exports.flashMessages = function (req, res, next) {

    var flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error')
    };

    res.locals.messages = _.any(flashMessages, function (msgs) {
        return msgs.length;
    }) ? flashMessages : false;

    next();
};

/**
 Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
    if (!req.user) {
        req.flash('error', 'Please sign in to access this page.');
        res.redirect('/keystone/signin');
    } else {
        next();
    }
};

/**
 socket IO
 **/
/*
exports.socketiostream = {


    // http:
    onHttpServerCreated: function () {
        keystone.app.server = keystone.httpServer;
        keystone.app.io();

        // Setup your routes here. 'listen' is called right after this function returns.
        keystone.app.io.route('ready', function (req) {
            req.io.emit('talk', {message: 'io event from an io route on the server'})
        });
    },


    // https:
    onHttpsServerCreated: function () {
        keystone.app.server = keystone.httpsServer;
        keystone.app.io();

        // Setup your routes here. 'listen' is called right after this function returns.
        keystone.app.io.route('ready', function (req) {
            req.io.emit('talk', {message: 'io event from an io route on the server'})
        });
    },


    onHttpServerCreated: function () {
// Instantiate an express.io app object, tack it on to keystone
        keystone.socketioapp = require('express.io')();
// The 'server' property is used internally by express.io as the express http or https object, so copy it from keystone
        keystone.socketioapp.server = keystone.httpServer;
// Since the http(s) object has already been created by keystone just before this callback, we call express.io's socket.io instantiator rather than creating another server with: keystone.socketioapp.http().io(); This allows socket.io to use the same port as keystone.
        keystone.socketioapp.io();
        var socketio = keystone.socketioapp.io;
        keystone.set('socketio', socketio);
        var port = keystone.get('port');
// 'listen' will share the port with keystone
        keystone.socketioapp.server.listen(port ? port : 3000);
        socketio.set('heartbeat timeout', 20);
        socketio.set('heartbeat interval', 10);
        socketio.enable('heartbeats');

        var checkToken = require('./lib/handler/checkToken');
        socketio.on('connection', function (socket) {
            socket.on('connected', function (token) {
                var user = checkToken(token);
                if (typeof user == 'object') {
                    socket.user = user;
                }
            });
        });
    }
}*/