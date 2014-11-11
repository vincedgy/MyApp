/**
 * Created by Training on 22/10/2014.
 */

var mongoose = require('mongoose');
var dbUtils = require('../dbUtils');
var config = require('../config');
var Session = require('../models/AttendeeSchema');

module.exports = function (req, res) {

    var sessionId = req.params.id || null;
    if (sessionId) {
        console.log('Getting attendees of session ' + sessionId);
        //var db = dbUtils.open();
        // Get attendees
        var attendees = [];
        Session.find(
            { 'sessionVTID' : sessionId },
            function (err, attendees) {
                if (err) {
                    console.error(err);
                    return res.status(404)        // HTTP status 404: NotFound
                        .send('Not found');
                } else {
                    return res.status(200)
                        .json(attendees);
                }
            });
    } else {
        return res.status(404)        // HTTP status 404: NotFound
            .send('Not found');
    }

};