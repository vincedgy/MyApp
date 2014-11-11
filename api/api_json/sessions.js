/**
 * Created by Training on 22/10/2014.
 */
var file = './data/sessions.json';
var utils = require('../../utils');

module.exports = function (req, res) {
    console.log('sessions');
    utils.readJSONFile(file, function (err, datas) {
        if (err) {
            throw err;
        }
        if (datas && datas.length > 0) {
            res.status(200)
                .send(datas);
        } else {
            // Not found !
            console.log('Not found !');
            res.status(404)        // HTTP status 404: NotFound
                .send('Not found');
        }
    });
};