// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var restyStone = require("resty-stone")(keystone);
// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

    'name': 'HkmInvention',
    'brand': 'HKM',

    'less': 'public',
    'static': 'public',
    'favicon': 'public/favicon.ico',
    'views': 'templates/views',
    'view engine': 'jade',

    'emails': 'templates/emails',

    'session': true,
    'auth': true,
    'user model': 'User',
    'cookie secret': '4yA`pC]_G=x?r.M%252*fn}i.$=aGsZE~{r~xX-dt!pQ;pOIcUZ(23i9+S79BA$g',
    'auto update': true
    //'jwtTokenSecret': '234Ufs(99#@@#*&@9F9855456460V'
});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
    _: require('underscore'),
    env: keystone.get('env'),
    utils: keystone.utils,
    editable: keystone.content.editable
});
// Load your project's Routes
keystone.set('routes', require('./routes'));
// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

keystone.set('email locals', {
    logo_src: '/images/logo-email.gif',
    logo_width: 194,
    logo_height: 76,
    theme: {
        email_bg: '#f9f9f9',
        link_color: '#2697de',
        buttons: {
            color: '#fff',
            background_color: '#2697de',
            border_color: '#1a7cb7'
        }
    }
});


keystone.set('cors allow origin', true);
// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.

keystone.set('email rules', [
    {
        find: '/images/',
        replace: (keystone.get('env') == 'production') ? 'http://async777.com/images/' : 'http://localhost:3000/images/'
    },
    {
        find: '/keystone/',
        replace: (keystone.get('env') == 'production') ? 'http://async777.com/keystone/' : 'http://localhost:3000/keystone/'
    }
]);

// Load your project's email test routes
//keystone.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
    'users': 'users',
    'calls': 'calls',
    'autos': 'autos'
});

keystone.set('resty api base address', "/api");
keystone.set('resty meta location', "./models");
keystone.set('resty token header', "api-token");

keystone.set('jwtTokenSecret', '234Ufs(99#@@#*&@9F9855456460V'); // put in something hard to guess

// Start Keystone to connect to your database and initialise the web server
//restyStone.start();

keystone.start({
    // http:
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

        socketio.on('connection', function (socket) {
            // console.log(socket);
            socket.on('connect', function (token) {
                console.log(token);
            });
            socket.on('add user', function (usernamr) {
                console.log("order number is now on this now");
                console.log(usernamr);
                console.log("add user connected");
            });
            socket.on('ordered', function (number) {
                //the number
                console.log("order number is now on this now");
                console.log(number);
            });
            socket.on('connected', function (token) {
                console.log(token);
                console.log("connected connected");
            });
            socket.on('disconnect', function (token) {
                console.log(token);
                console.log("disconnect disconnect");
            });
            //socket.emit('ordered', "hi");
        });
    },
    // https:
    onHttpsServerCreated: function () {
        keystone.app.server = keystone.httpsServer;
        keystone.app.io();
        var io = keystone.app.io;
        // Setup your routes here. 'listen' is called right after this function returns.
        io.route('ready', function (req) {
            req.io.emit('talk', {message: 'io event from an io route on the server'})
        });
    }
});

//keystone.start();