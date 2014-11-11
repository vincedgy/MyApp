/**
 * Created by Training on 22/10/2014.
 */

var mongoose = require('mongoose');
var dbUtils = require('../dbUtils');
var config = require('../config');
var Session = require('../models/AttendeeSchema');

module.exports = function (req, res) {

    var sessionVTID = req.params.id || null;
    var attendeeVTID = req.params.attId || null;
    if (sessionVTID && attendeeVTID) {
        console.log('Getting attendees ' + attendeeVTID + ' of session ' + sessionVTID);
        //var db = dbUtils.open();
        // Get attendee
        var attendee = {};
        Session.findOne(
            {   'sessionVTID' : sessionVTID,
                'attendeeVTID' : attendeeVTID },
            function (err, attendee) {
                if (err) {
                    console.error(err);
                    return res.status(404)        // HTTP status 404: NotFound
                        .send('Not found');
                } else {
                    return res.status(200)
                        .json(attendee);
                }
            });
    } else {
        return res.status(404)        // HTTP status 404: NotFound
            .send('Not found');
    }

};