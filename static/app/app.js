/**
 * Created by Training on 21/10/2014.
 */

(function () {

    'user strict';

    /* configurations */

    var myApp = angular.module('myApp', [
        'ngRoute'
        //, 'ngAnimate'
        , 'ngSanitize'
        , 'ngToast'
        , 'ngplus'
        //, 'ui.bootstrap'
        , 'ngResource'
        , 'myApp.controllers'
        , 'myApp.attendeesController'
        , 'myApp.sessionsListCtrl', 'myApp.sessionCtrl'
        , 'myApp.SessionSrv', 'myApp.attendeesServices'
        , 'myApp.directives'
        , 'myApp.filters'
        //, 'ui.grid', 'ui.grid.selection'
    ]);

// Global config constants for Application
    myApp.constant('config',
        {

            'ver': '0.1.0',
            'partial_dir': 'partials',
            'dirs': {
                'base': 'app/',
                'api': {
                    'session': '/api/session/',
                    'attendee': '/api/attendee/'
                },
                'views': {
                    'partials': 'partials/',
                    'layout': 'layout/',
                    'sessions': 'sessions/',
                    'attendees': 'attendees/'
                }}
        });

    // ngToast general config
    myApp.config(['ngToastProvider', function (ngToast) {
        ngToast.configure({
            verticalPosition: 'middle',
            horizontalPosition: 'center',
            timeout: 2000,
            dismissOnTimeout : true
        });
    }]);


    // route configurations
    myApp.config(['$routeProvider', 'config', function ($routeProvider, config) {
        $routeProvider.
            when('/home', {
                templateUrl: config.dirs.base + config.dirs.views.partials + 'welcome.html',
                controller: 'helloCtrl'
            }).
            when('/contact', {
                templateUrl: config.dirs.base + config.dirs.views.partials + 'contact.html',
                controller: 'helloCtrl'
            }).
            when('/about', {
                templateUrl: config.dirs.base + config.dirs.views.partials + 'about.html',
                controller: 'helloCtrl'
            }).
            when('/session', {
                templateUrl: config.dirs.base + config.dirs.views.sessions + 'list.html',
                controller: 'sessionsListCtrl'
            }).
            when('/newSession', {
                templateUrl: config.dirs.base + config.dirs.views.sessions + 'new.html',
                controller: 'sessionCtrl'
            }).
            when('/editSession/:_id', {
                templateUrl: config.dirs.base + config.dirs.views.sessions + 'new.html',
                controller: 'sessionCtrl'
            }).
            when('/session/:_id', {
                templateUrl: config.dirs.base + config.dirs.views.sessions + 'details.html',
                controller: 'sessionCtrl'
            }).
            when('/session/:sessionID/attendees', {
                templateUrl: config.dirs.base + config.dirs.views.attendees + 'list.html',
                controller: 'attendeesListCtrl'
            }).
            when('/session/:sessionID/attendees/:attendeeID', {
                templateUrl: config.dirs.base + config.dirs.views.attendees + 'details.html',
                controller: 'attendeeCtrl'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }]);

})();