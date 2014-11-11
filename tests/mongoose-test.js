/**
 * Created by Training on 23/10/2014.
 */

'use strict';

var mongoose = require('mongoose');

var mongoose_test = function() {

    var connectString='mongodb://localhost/app';

    console.log('Connecting to MongoDB @' + connectString);
    mongoose.connect(connectString);
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function callback() {
        console.log('Connected to MongoDB @' + connectString);

        // Attaching Schema
        var sessionSchema = mongoose.Schema ({
            code: String,
            company: String,
            duration: String,
            room: String,
            sessionID: String,
            site: String,
            startDate: String,
            title: String,
            trainer: String,
            type: String
        });
        var Session = mongoose.model('Sessions', sessionSchema);


        // Get sessions
        var sessions = [];
        Session.find(function(err, sessions) {
            if (err) return console.error(err);
            var i = 0;
            console.log('[');
            sessions.forEach(function(session) {
                if (i>1) console.log(session + ',');
                else console.log(session);
            });
            console.log(']');

        });


        // Another model
        var stuffModel = mongoose.Schema ({
            value: String
        });
        var Stuff = mongoose.model('Stuff', stuffModel);

        // Create
        var stuff = new Stuff({value:1});
        stuff.save(function (err) {
            if (err) console.error('Can\'t save ' + stuff);
            console.log('Saving a new stuff');

        });

        // Retrieve
        var stuff2={};
        Stuff.find({value: /^1/}, function(err, data){
            if (err) console.error('Can\'t retrieve stuff');
            stuff2=data;
            console.log('Retrieving stuff' + stuff2);
        });


    });

}();
