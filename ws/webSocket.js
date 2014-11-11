/**
 * Created by Training on 23/10/2014.
 */

'use strict';

var config = require('../config');

module.exports = function () {
    console.log('Init web socket');

    var WebSocketServer = require('ws').Server;
    var wss = new WebSocketServer({port: 3010});
    wss.on('connection', function(ws) {
        var id = setInterval(function() {
            ws.send(JSON.stringify(process.memoryUsage()), function() { /* ignore errors */ });
        }, 1000);
        console.log('started client interval');
        ws.on('close', function() {
            console.log('stopping client interval');
            clearInterval(id);
        });
    });

};