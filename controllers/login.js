var config = require('../config')
    , path = require('path');

module.exports = function (req, res) {
    console.log('Opening the login page !');
    res.render(path.join(config.viewsDir, 'login'));
};