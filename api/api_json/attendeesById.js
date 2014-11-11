/**
 * Created by Training on 22/10/2014.
 */
var file = './data/attendees.json';
var utils = require('../../utils');

module.exports = function (req, res) {
    console.log('attendeesById');
    var results = [];
    var sessionVTID = req.params.id || null;
    if (sessionVTID) {
        utils.readJSONFile(file, function (err, datas) {
            if (err) {
                throw err;
            }
            if (datas && datas.length > 0) {
                datas.forEach(function (data) {
                    if (data.sessionVTID && data.sessionVTID === sessionVTID) {
                     results[results.length]=data;
                    };
                });

                res.status(200)
                    .send(results);

            } else {
                // Not found !
                console.log('Not found !');
                res.status(404)        // HTTP status 404: NotFound
                    .send('Not found');
            }
        });
    }
}