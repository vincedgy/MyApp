/**
 * Created by Training on 22/10/2014.
 */

'use strict';

var mongoose = require('mongoose');

var dbConnection = function () {
    var db = null;
    var options = {
        db: { native_parser: true },
        "auto_reconnect": true,
        server: { poolSize: 5 },
        replset: { rs_name: '' },
        user: '',
        pass: ''
    };

    // Openning connection to db Method
    this.open = function (config, next) {
        if (!config) return next(new Error('Need a valid configuration'));

        if (!db && config.connectString) {
            console.log('Connecting to MongoDB @' + config.connectString);
            mongoose.connect(config.connectString, options);
            db = mongoose.connection;

            mongoose.connection.on('error', function (err) {
                console.error.bind(console, 'Connection error:' + err);
                if (typeof next === 'function') return next(null, err);
            });

            mongoose.connection.once('connected', function () {
                console.log('Now connected to ' + config.connectString);
            });

            mongoose.connection.once('disconnected', function () {
                console.log('Now disconnected from ' + config.connectString);
            });

            mongoose.connection.once('open', function () {
                console.log('Connection is now opened...');
            });

            mongoose.connection.once('close', function () {
                console.log('Connection is now closed from event.');
            });

        } else {
            console.info('Already connected to MongoDB @' + config.connectString);
        }
        // Return
        if (typeof next === 'function') return next(db);
    };

    // Closing method
    this.close = function (next) {
        console.log('Closing db connection....');
        mongoose.disconnect();
        mongoose.connection.close(function () {
            db = null;
        });
        if (typeof next === 'function') return next();
    }
};

// Exports and open the databaseConnection
module.exports = new dbConnection();
