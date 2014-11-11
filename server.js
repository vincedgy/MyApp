/*
 =========================================================================================================
 app.js

 for express 4
 =========================================================================================================
 */
(function () {
    'use strict';

    var express = require('express')
        , favicon = require('express-favicon')
        , compress = require('compression')
        , fileServer = require('serve-static')
        , cors = require('cors')
        , path = require('path')
        , ejs = require('ejs')
    //, swig              = require('swig')
        , bodyParser = require('body-parser')
        , methodOverride = require('method-override')
        , morgan = require('morgan')
        , config = require('./config')              // local module => config.js in current folder
        , app_package = require('./package')        //
    //, webSocket = require('./ws/webSocket')()   //
        , siteTitle
        , lessMiddleware = require('less-middleware')
        ;


    // EXPRESS 4 is loaded
    // =============================================================================
    console.log('Creating & configuring the server...');
    var app = express();

    // SETTINGS
    // =============================================================================
    // Default values if the config files is void !
    config.listenPort       = config.listenPort     || 8080;
    config.env              = config.env            || 'development';
    config.viewsDir         = config.viewsDir       || path.join(config.baseDir, 'views');
    config.lessDir          = config.lessDir        || path.join(config.baseDir, 'styles');
    config.cssDir           = config.cssDir         || path.join(config.baseDir, 'static', 'styles');
    config.staticDir        = config.staticDir      || path.join(config.baseDir, 'static');
    config.apiDir           = config.apiDir         || path.join(config.baseDir, 'api');
    config.controllersDir   = config.controllersDir || path.join(config.baseDir, 'controllers');

    // Logger
    var accessLogStream = {};
    if ('development' == config.env) {
        console.log('\x1b[31m' + '=== Development environment ===' + '\x1b[37m');
        accessLogStream = require('fs').createWriteStream(__dirname + '/debug.log', {flags: 'a'});
        app.use(morgan('combined', {stream: accessLogStream}));

    } else {
        console.log('\x1b[32m' + '*** Live environment ***' + '\x1b[37m');
        accessLogStream = require('fs').createWriteStream(__dirname + '/logout.log', {flags: 'a'});
        app.use(morgan('tiny', {stream: accessLogStream}));
    }

    // Get name and version from package.json file
    siteTitle = app_package.name + ' ' + app_package.version;
    app.set('title', siteTitle);
    app.set('config', config);
    app.locals.strftime = require('strftime');

    // Favicon
    app.use(favicon(path.join(config.staticDir, 'img', 'favicon.ico')));

    // Settings for serving views
    // =============================================================================
    app.use(compress());       // Use compress
    app.use(cors());           // enable ALL CORS requests

    // configure app to use bodyParser()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // method-override => @see https://github.com/expressjs/method-override
    // this will let us get the data from a POST
    app.use(methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));

    // VIEW ENGINE
    // =============================================================================
    app.set('views', config.viewsDir);

    app.engine('ejs', ejs.renderFile);
    app.set('view engine', 'ejs');

    //app.engine('swig', swig.renderFile);
    //app.set('view engine', 'swig');


    // LESS configuration
    // ==============================================================================
    app.use(
        lessMiddleware(config.baseDir,
            {
                compiler: {
                    compress: 'auto',
                    sourceMap: true,
                    yuicompress: true
                },
                parser: {

                },
                dest: 'static',
                once: false,
                debug: true,
                force: true
            }));

    // STATIC
    // ==============================================================================
    // Support static file content
    // Consider 'st' module for caching: https://github.com/isaacs/st
    app.use(fileServer(config.staticDir)); // was app.use(express.static(config.staticDir));

    // ROUTES
    // =============================================================================

    require('./routes')(express, config, app);

    // ===============================================================================
    // Handling Errors
    //
    // /!\ It needs to be the very last "app.use" declared /!\
    // ===============================================================================
    var errorhandler = require('errorhandler'),
        specErrorHandlers = require('./errorHandlers');
    app.use(specErrorHandlers.logError);
    app.use(specErrorHandlers.notFoundHandler);
    app.use(specErrorHandlers.clientErrorHandler);
    app.use(specErrorHandlers.errorHandler);
    app.use(errorhandler());

    // Open Connection to MongoDB
    // =============================================================================
    var dbUtils = require('./dbUtils');
    var dbReturned = undefined;
    dbUtils.open(config, function (db, err) {
        if (err) return err;
        // Get db object return for ErrorHandling
        dbReturned = db;
        dbReturned.on('error', function (err) {
            console.error(err);
        });
        dbReturned.on('close', function (err) {
            console.log('Closing from close event !')
        });


        // HTTP Server
        // =============================================================================
        // Creating HTTP server from http module and launches the server
        app.listen(config.listenPort, function (err) {
            if (err) new Error('Impossible to launch the server listener');
            console.log('\x1b[47m');
            console.log('Web server listening on TCP port : ' + config.listenPort);
            console.log('\x1b[0m');
            console.log('\x1b[34;42m' + '>>>> Server ' + siteTitle + ' is ready <<<<', '\x1b[37;40m');
        });
    });

    /*
     ===============================================================
     Closing function
     ===============================================================
     */
    var cleanup = function () {
        console.log('\x1b[37;41m');
        console.log('### ========================================= ###');
        console.log('###                                           ###');
        console.log('###            STOPPING SERVER                ###');
        console.log('###                                           ###');
        console.log('### ========================================= ###');
        console.log('\x1b[37;40m');
        console.log('\x1b[0m');
        dbUtils.close();
        console.log('Killing process PID ' + process.pid);
        process.kill(process.pid);
        process.exit(0);
    };
    process.on('SIGQUIT', cleanup);
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    process.on('SIGUSR2', cleanup);
    console.log('\x1b[0m');
})();