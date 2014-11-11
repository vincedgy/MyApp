/**
 * Created by Training on 23/10/2014.
 */

'use strict';

var mongoose = require('mongoose');

// Attaching Schema
var attendeeSchema = mongoose.Schema({
    attendeeVTID: String,
    company: String,
    directPhn: String,
    email: String,
    firstName: String,
    lastName: String,
    sessionVTID: String,
    standardPhn: String,
    title: String
});
var Attendee = mongoose.model('Attendees', attendeeSchema);

module.exports = Attendee;
