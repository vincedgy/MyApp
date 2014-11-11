(function () {
    'use strict';

    var directives = angular.module('myApp.directives', []);

    directives.directive('sessionTitle', function () {
        return {
            restrict: 'EA',
            template: 'Session [{{session.sessionID}}] : <b>{{session.title}}</b>'
        }
    });

    directives.directive('attendeeTitle', function () {
        return {
            restrict: 'EA',
            template: '{{attendee.title}}&nbsp;{{attendee.firstName}}&nbsp;<b>{{attendee.lastName}}</b>'
        }
    });
})();