/**
 * Created by Training on 22/10/2014.
 */

module.exports = function(express,config, app) {

    var router  = express.Router()
        , path  = require('path');

    console.log('Configuring ROUTER...');


// route middleware that will happen on every request
    router.use(function (req, res, next) {
        // log each request to the console
        console.log(req.method, req.url);
        // continue doing what we were doing and go to the route
        next();
    });

// HOME PAGE
    router.get('/', require(path.join(config.controllersDir, '/home.js')));

// Login PAGE
    router.get('/login', require(path.join(config.controllersDir, '/login.js')));

// about page route (http://localhost:8080/about)
//    router.get('/about', function (req, res) {
//        res.send('im the about page!');
//    });

    // route middleware to validate :session
//    router.param('id', function (req, res, next, id) {
//        console.log('Doing session id validation on ' + id);
//        req.id = id;
//        // go to the next thing
//        next();
//    });

//    router.param('attId', function (req, res, next, attId) {
//        console.log('Doing attendee param validation on ' + attId);
//        req.attId = attId;
//        // go to the next thing
//        next();
//    });

    /** API **/
    router.get('/api/session',
        require(path.join(config.apiDir, 'sessions.js')));
    router.get('/api/session/:id',
        require(path.join(config.apiDir, 'sessionById.js')));
    router.get('/api/session/:id/attendees',
        require(path.join(config.apiDir, 'attendeesById.js')));
    router.get('/api/session/:id/attendees/:attId',
        require(path.join(config.apiDir, 'attendeesByAttId.js')));
    router.post('/api/session',
        require(path.join(config.apiDir, 'saveSession.js')));
    router.put('/api/session/:id',
        require(path.join(config.apiDir, 'saveSession.js')));
    router.delete('/api/session/:id',
        require(path.join(config.apiDir, 'deleteSession.js')));

    router.get('*', function(req, res, next) {
        var err = new Error();
        err.status = 404;
        next(err);
    });

    app.use('/', router);

};
