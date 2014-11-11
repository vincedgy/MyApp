/**
 * Created by Training on 23/10/2014.
 */

'use strict';

var mongoose = require('mongoose');

// Attaching Schema
var sessionSchema = mongoose.Schema({
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

module.exports = Session;
