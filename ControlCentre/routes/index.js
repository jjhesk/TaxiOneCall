/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var _ = require('underscore'),
    keystone = require('keystone'),
    middleware = require('./middleware'),
    importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
    views: importRoutes('./views'),
    download: importRoutes('./download')
};

var api = {
    token: importRoutes('./api/').token,
    call: importRoutes('./api/call'),
    driver: importRoutes('./api/driver'),
    account: importRoutes('./api/me')
};

// Setup Route Bindings
exports = module.exports = function (app) {
    // Views
    app.get('/', routes.views.index);
    // app.get('/register/machine/', routes.views.blog);
    // app.get('/blog/post/:post', routes.views.post);
    // app.get('/ticket/:tid', routes.views.ticket);
    // app.get('/gallery', routes.views.gallery);
    //  app.all('/contact', routes.views.contact);
    app.all('/api/*', keystone.middleware.api);
    //  app.get('/download/users', routes.download.users);

    // jwt token authentication for socket.io traffic
    app.all('/api/token*', middleware.requireUser);
    app.all('/api/token', api.token);

    app.all('/api/call/new', api.call.new);
    app.all('/api/call/confirm', api.call.confirm_order);
    app.all('/api/call/check', api.call.check_order);
    app.all('/api/call/report', api.call.report);
    app.all('/api/call/status', api.call.status);

    app.all('/api/driver/list', api.driver.mylist);
    app.all('/api/driver/inquiry', api.driver.inquiry);
    app.all('/api/driver/login', api.account.login);
    app.all('/api/driver/new', api.account.newdriver);
    app.all('/api/driver/deal', api.driver.deal);
    app.all('/api/driver/prompt_customer', api.driver.listening_customer);
    app.all('/api/driver/release', api.driver.release_order);
    // app.all('/api/me/register', routes.api.register); dsfsdf
    // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
    // app.get('/protected', middleware.requireUser, routes.views.protected);

};
