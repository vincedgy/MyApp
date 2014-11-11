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

    // Get all sessions
    router.get('/api/session',require(path.join(config.apiDir, 'sessions.js')));
    // Get one session
    router.get('/api/session/:id',require(path.join(config.apiDir, 'sessionById.js')));
    // Get one session by sessionID
    router.get('/api/sessionBSI/:sessionID',require(path.join(config.apiDir, 'sessionBySessionID.js')));

    // Create one session
    router.post('/api/session',require(path.join(config.apiDir, 'saveSession.js')));
    // Save one existing session
    router.put('/api/session/:id',require(path.join(config.apiDir, 'saveSession.js')));
    // Delete one existing session
    router.delete('/api/session/:id',require(path.join(config.apiDir, 'deleteSession.js')));

    // Get all attendees
    router.get('/api/attendee',require(path.join(config.apiDir, 'attendees.js')));
    // Get all attendees of one session
    router.get('/api/session/:id/attendee',require(path.join(config.apiDir, 'attendeesBySessionId.js')));
    // Get one attendee of one session
    router.get('/api/session/:id/attendee/:attId',require(path.join(config.apiDir, 'attendeesByAttId.js')));
    // Get one attendee
    router.get('/api/attendee/:id',require(path.join(config.apiDir, 'attendeeById.js')));
    // Create one attendee
    router.post('/api/attendee',require(path.join(config.apiDir, 'saveAttendee.js')));
    // Save one existing attendee
    router.put('/api/attendee/:id',require(path.join(config.apiDir, 'saveAttendee.js')));
    // Delete one existing attendee
    router.delete('/api/attendee/:id',require(path.join(config.apiDir, 'deleteAttendee.js')));

    router.get('*', function(req, res, next) {
        var err = new Error();
        err.status = 404;
        next(err);
    });

    app.use('/', router);

};
