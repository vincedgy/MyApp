/**
 * Created by Training on 22/10/2014.
 */

var mongoose = require('mongoose');
var dbUtils = require('../dbUtils');
var config = require('../config');
var Session = require('../models/SessionSchema');

module.exports = function (req, res) {
    //var db = dbUtils.open();
    console.log('Getting sessions.');
    // Get sessions
    var sessions = [];
    Session.find(function (err, sessions) {
        if (err) {
            console.error(err);
            return res.status(404)        // HTTP status 404: NotFound
                .send('Not found');
        } else {
            return res.status(200)
                .json(sessions);
        }
    });
};