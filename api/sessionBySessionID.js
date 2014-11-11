/**
 * Created by Training on 22/10/2014.
 */

var mongoose = require('mongoose');
var dbUtils = require('../dbUtils');
var config = require('../config');
var Session = require('../models/SessionSchema');

module.exports = function (req, res) {

    var sessionID = req.params.sessionID || null;
    if (sessionID) {
        console.log('Getting session by sessionID :' + sessionID);
        // Get session
        var session = {};
        Session.findOne(
            { 'sessionID' : sessionID },
            function (err, session) {
                if (err) {
                    console.error(err);
                    return res.status(404)        // HTTP status 404: NotFound
                        .send('Not found');
                } else {
                    return res.status(200)
                        .json(session);
                }
            });
    } else {
        return res.status(404)        // HTTP status 404: NotFound
            .send('Not found');
    }

};