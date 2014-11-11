/**
 * Created by Training on 22/10/2014.
 */


var utils = {
    readJSONFile : function(filename, callback) {
        require("fs").readFile(filename, function (err, data) {
            if (err) {
                callback(err);
                return;
            }
            try {
                callback(null, JSON.parse(data));
            } catch (exception) {
                callback(exception);
            }
        });
    }
};

// On export pour pouvoir faire le require
module.exports = utils ;
