/*
Objet de configuration portant les attributs
 */

var path = require('path')
  , baseDir = __dirname
  , config;

config = {
  env: 'development', //live, development
  listenPort: 3000,
  socket_timeout: 12000,                                // milli-seconds: default is 2 minutes
  baseDir: baseDir,

  controllersDir: path.join(baseDir, 'controllers'),
  apiDir: path.join(baseDir, 'api'),
  viewsDir: path.join(baseDir, 'views'),               // used by home.js
  staticDir: path.join(baseDir, 'static'),
  lessDir: path.join(baseDir, 'static', 'styles'),
  cssDir: path.join(baseDir, 'static', 'styles'),
  connectString : 'mongodb://localhost/app'
};

// On export pour pouvoir faire le require
module.exports = config;