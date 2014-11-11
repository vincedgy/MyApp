/**
 * Created by Vincent on 23/10/2014.
 */
module.exports = (function() {
    "use strict";
    var clc = require("cli-color");

    var mapping = {
        log: clc.blue,
        info: clc.magenta,
        warn: clc.yellow,
        error: clc.red
    };

    if ( !Date.prototype.toTimeStamp ) {
        ( function() {

            function pad(number) {
                if ( number < 10 ) {
                    return '0' + number;
                }
                return number;
            }

            Date.prototype.toTimeStamp = function() {
                return this.getUTCFullYear() +
                    '-' + pad( this.getUTCMonth() + 1 ) +
                    '-' + pad( this.getUTCDate() ) +
                    ' ' + pad( this.getUTCHours() ) +
                    ':' + pad( this.getUTCMinutes() ) +
                    ':' + pad( this.getUTCSeconds() ) +
                    '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5);
            };
        }() );
    }

    ["log", "info", "warn", "error"].forEach(function(method) {
        var oldMethod = console[method].bind(console);
        console[method] = function() {
            oldMethod.apply(
                console,
                [mapping[method](new Date().toTimeStamp() + ' ' + method.toUpperCase() + ':')]
                    .concat(arguments)
            );
        };
    });
})();