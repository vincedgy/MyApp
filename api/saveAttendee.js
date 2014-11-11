/**
 * Created by Training on 22/10/2014.
 */

var dbUtils = require('../dbUtils');
var config = require('../config');
var Attendee = require('../models/AttendeeSchema');

module.exports = function (req, res) {
    var attendee = req.body || null;
    if (attendee) {
        // Creation
        if (! attendee._id) {
            var newAttendee = new Attendee();

            newAttendee.attendeeVTID = attendee.attendeeVTID || '';
            newAttendee.company = attendee.company || '';
            newAttendee.directPhn = attendee.directPhn || '';
            newAttendee.email = attendee.email || '';
            newAttendee.firstName = attendee.firstName || '';
            newAttendee.lastName = attendee.lastName || '';
            newAttendee.sessionVTID = attendee.sessionVTID || '';
            newAttendee.standardPhn = attendee.standardPhn || '';
            newAttendee.title = attendee.title || '';
            newAttendee.save(function(err) {
                "use strict";
                if (err) {
                    console.error(err);
                    return res.status(500)        // HTTP status 500
                        .send('Impossible to save attendee');
                } else return res.status(200).send(newAttendee);
            });
        }
        // Update
        else {
            Attendee.findById(attendee._id, function(err, existingAttendee) {
                if (err) return handleError(err);
                existingAttendee.attendeeVTID = attendee.attendeeVTID || '';
                existingAttendee.company = attendee.company || '';
                existingAttendee.directPhn = attendee.directPhn || '';
                existingAttendee.email = attendee.email || '';
                existingAttendee.firstName = attendee.firstName || '';
                existingAttendee.lastName = attendee.lastName || '';
                existingAttendee.sessionVTID = attendee.sessionVTID || '';
                existingAttendee.standardPhn = attendee.standardPhn || '';
                existingAttendee.title = attendee.title || '';
                existingAttendee.save(function(err) {
                    if (err) {
                        console.error(err);
                        return res.status(500)        // HTTP status 500
                            .send('Impossible to save attendee');
                    } else res.status(200).send(existingAttendee);
                })
            });
        }
    } else {
        return res.status(500)        // HTTP status 500
            .send('Impossible to save attendee');
    }
};