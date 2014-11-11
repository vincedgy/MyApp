/**
 * Created by Training on 22/10/2014.
 */

var dbUtils = require('../dbUtils');
var config = require('../config');
var Attendee = require('../models/AttendeeSchema');

module.exports = function (req, res) {
   var attendeeId = req.params.id || null;
    if (attendeeId) {
        console.log('Deleting attendee :' + attendeeId);
        //var db = dbUtils.open();
        Attendee.findOne(
            { '_id': attendeeId },
            function (err, attendee) {
                if (err) return res.status(404).send('Not found');
                else attendee.remove(function (err) {
                    if (err) return res.status(500);
                    else {
                        console.log('Attendee removed');
                        return res.status(200).send('Attendee deleted');
                    }
                })
            });
    }

};