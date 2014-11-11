/**
 * Created by Training on 22/10/2014.
 */

var dbUtils = require('../dbUtils');
var config = require('../config');
var Session = require('../models/SessionSchema');

module.exports = function (req, res) {
   var sessionId = req.params.id || null;
    if (sessionId) {
        console.log('Deleting session :' + sessionId);
        //var db = dbUtils.open();
        Session.findOne(
            { '_id': sessionId },
            function (err, session) {
                if (err) return res.status(404).send('Not found');
                else session.remove(function (err) {
                    if (err) return res.status(500);
                    else {
                        console.log('Session removed');
                        return res.status(200).send('Session deleted');
                    }
                })
            });
    }

};