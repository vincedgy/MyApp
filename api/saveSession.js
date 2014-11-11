/**
 * Created by Training on 22/10/2014.
 */

var dbUtils = require('../dbUtils');
var config = require('../config');
var Session = require('../models/SessionSchema');

module.exports = function (req, res) {
    var session = req.body || null;
    if (session) {
        //var db = dbUtils.open();
        // Creation
        if (! session._id) {
            var newSession = new Session();
            newSession.sessionID = session.sessionID || 'new';
            newSession.code = session.code;
            newSession.company = session.company;
            newSession.duration = session.duration;
            newSession.room = session.room;
            newSession.site = session.site;
            newSession.startDate = session.startDate;
            newSession.title = session.title;
            newSession.trainer = session.trainer;
            newSession.type = session.type;
            newSession.save(function(err) {
                "use strict";
                if (err) {
                    console.error(err);
                    return res.status(500)        // HTTP status 500
                        .send('Impossible to save session');
                } else return res.status(200).send(newSession);
            });
        }
        // Update
        else {
            Session.findById(session._id, function(err, existingSession) {
                if (err) return handleError(err);
                existingSession.sessionID = session.sessionID;
                existingSession.code = session.code;
                existingSession.company = session.company;
                existingSession.duration = session.duration;
                existingSession.room = session.room;
                existingSession.site = session.site;
                existingSession.startDate = session.startDate;
                existingSession.title = session.title;
                existingSession.trainer = session.trainer;
                existingSession.type = session.type;
                existingSession.save(function(err) {
                    if (err) {
                        console.error(err);
                        return res.status(500)        // HTTP status 500
                            .send('Impossible to save session');
                    } else res.status(200).send(existingSession);
                })
            });
        }
    } else {
        return res.status(500)        // HTTP status 500
            .send('Impossible to save session');
    }
};