/**
 * Created by Vincent on 08/11/2014.
 */

// From http://expressjs.com/guide/error-handling.html

module.exports = {
    // the more generic logErrors may write request and error information to stderr
    logError: function (err, req, res, next) {
        console.error(req.method, req.url, err.stack);
        next(err);
    },

    // notFoundHandler for 404
    notFoundHandler: function (err, req, res, next) {
        if (err.status === 404) {
            res.status(404).render('error', { error : { message: 'Page [' + req.url + '] not found !', stack : err.stack }});
        } else {
            next(err);
        }
    },

    // clientErrorHandler is defined as the following (note that the error is explicitly passed along to the next)
    clientErrorHandler: function (err, req, res, next) {
        if (req.xhr) {
            res.status(500).render('error', { error : { message: 'Internal Error from Ajax call : ' + req.xhr, stack : err.stack }});
        } else {
            next(err);
        }
    },

    // errorHandler "catch-all" implementation
    errorHandler: function (err, req, res, next) {
        res.status(500).render('error', { error : { message: 'Internal Error', stack : err.stack }});
        next(err);
    }

};
