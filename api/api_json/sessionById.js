/**
 * Created by Training on 22/10/2014.
 */
var file = './data/sessions.json';
var utils = require('../../utils');

module.exports = function (req, res) {
    console.log('sessionById');
    var sessionId = req.params.id || null;
    if (sessionId) {
        utils.readJSONFile(file, function (err, datas) {
            if (err) {
                throw err;
            }
            if (datas && datas.length > 0) {
                datas.forEach(function (data) {
                    if (data.sessionID && data.sessionID === sessionId) {
                        return res.status(200)
                            .send(data);

                    }
                });
            } else {
                // Not found !
                console.log('Not found !');
                return res.status(404)        // HTTP status 404: NotFound
                    .send('Not found');
            }
        });
    }
}