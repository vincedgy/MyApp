(function () {

    'use strict';

    var SessionSrv = angular.module('myApp.SessionSrv', [])
        .factory('SessionSrv', ['$resource', 'config', function ($resource, config) {
            return $resource(config.dirs.api.session + ':_id', {_id: '@id'},
                {
                    update: {method: 'PUT', params: {_id: '@id'}},
                    remove: {method: 'DELETE', params: {_id: '@id'}}
                });
        }
        ])
})
();