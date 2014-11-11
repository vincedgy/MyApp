var config = require('../config')
    , path = require('path');

module.exports = function (req, res) {
    console.log('Opening the home page !');
    res.render(path.join(config.viewsDir, 'index'));
};