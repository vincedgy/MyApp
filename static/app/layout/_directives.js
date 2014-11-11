(function () {
    'use strict';

    angular.module('myApp.directives', [])

    .directive('sessionTitle', function () {
        return {
            restrict: 'EA',
            template: 'Session [{{session.sessionID}}] : <b>{{session.title}}</b>'
        }
    })

    .directive('attendeeTitle', function () {
        return {
            restrict: 'EA',
            template: '{{attendee.title}}&nbsp;{{attendee.firstName}}&nbsp;<b>{{attendee.lastName}}</b>'
        }
    });
})();