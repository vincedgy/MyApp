/**
 * Created by Training on 22/10/2014.
 */

var mongoose = require('mongoose');
var dbUtils = require('../dbUtils');
var config = require('../config');
var Attendee = require('../models/AttendeeSchema');

module.exports = function (req, res) {

    var attendeeId = req.params.id || null;
    if (attendeeId) {
        console.log('Getting attendee :' + attendeeId);
       var attendee = {};
        Attendee.findOne(
            { '_id' : attendeeId },
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