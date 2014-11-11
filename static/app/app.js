/**
 * Created by Training on 21/10/2014.
 */

(function () {

    'user strict';

    /* configurations */

    angular.module('myApp', [
        'ngRoute'
        , 'ngAnimate'
        , 'ngSanitize'
        , 'ngToast'
        , 'ngplus'
        , 'ui.bootstrap'
        , 'ngResource'
        , 'myApp.controllers'
        , 'myApp.attendeesListCtrl', 'myApp.attendeeCtrl'
        , 'myApp.sessionsListCtrl', 'myApp.sessionCtrl'
        , 'myApp.SessionSrv', 'myApp.attendeesServices'
        , 'myApp.directives'
        , 'myApp.filters'
        //, 'ui.grid', 'ui.grid.selection'
    ])

    // Global config constants for Application
    .constant('config',
        {

            'ver': '0.1.0',
            'partial_dir': 'partials',
            'dirs': {
                'base': 'app/',
                'api': {
                    'prefix' : '/api'
                    // Session API
                    ,'sessions': '/session'
                    ,'session': '/session/:_id'
                    ,'newSession': '/newSession'
                    ,'editSession': '/editSession/:_id'

                    // Attendee API
                    ,'attendees': '/attendee'
                    ,'attendee': '/attendee/:_id'
                    ,'attendeesBySession': '/session/:sessionVTID/attendee'
                    ,'newAttendee': '/newAttendee'
                    ,'editAttendee': '/editAttendee/:_id'
                },
                'views': {
                    'partials': 'partials/',
                    'layout': 'layout/',
                    'sessions': 'sessions/',
                    'attendees': 'attendees/'
                }}
        })

    // ngToast general config
    .config(['ngToastProvider', function (ngToast) {
        ngToast.configure({
            verticalPosition: 'middle',
            horizontalPosition: 'center',
            timeout: 2000,
            dismissOnTimeout : true
        });
    }])

    // route configurations
    .config(['$routeProvider', 'config', function ($routeProvider, config) {
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
            when(config.dirs.api.sessions, {
                templateUrl: config.dirs.base + config.dirs.views.sessions + 'list.html',
                controller: 'sessionsListCtrl'
            }).
            when(config.dirs.api.newSession, {
                templateUrl: config.dirs.base + config.dirs.views.sessions + 'new.html',
                controller: 'sessionCtrl'
            }).
            when(config.dirs.api.editSession, {
                templateUrl: config.dirs.base + config.dirs.views.sessions + 'new.html',
                controller: 'sessionCtrl'
            }).
            when(config.dirs.api.session, {
                templateUrl: config.dirs.base + config.dirs.views.sessions + 'details.html',
                controller: 'sessionCtrl'
            }).
            // Attendees routes
            when(config.dirs.api.attendees, {
                templateUrl: config.dirs.base + config.dirs.views.attendees + 'list.html',
                controller: 'attendeesListCtrl'
            }).
            when(config.dirs.api.attendee, {
                templateUrl: config.dirs.base + config.dirs.views.attendees + 'details.html',
                controller: 'attendeeCtrl'
            }).
            when(config.dirs.api.attendeesBySession, {
                templateUrl: config.dirs.base + config.dirs.views.attendees + 'list.html',
                controller: 'attendeesListCtrl'
            }).
            when(config.dirs.api.newAttendee, {
                templateUrl: config.dirs.base + config.dirs.views.attendees + 'new.html',
                controller: 'attendeeCtrl'
            }).
            when(config.dirs.api.editAttendee, {
                templateUrl: config.dirs.base + config.dirs.views.attendees + 'new.html',
                controller: 'attendeeCtrl'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }]);

})();