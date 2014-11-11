(function () {
    'use strict';

    angular.module('myApp.attendeesListCtrl', ['myApp.attendeesServices'])
        .controller('attendeesListCtrl', ['$scope', '$location', '$routeParams', 'AttendeesBySessionId', 'Attendee',
            function ($scope, $location, $routeParams, AttendeesBySessionId, Attendee) {

            var sessionVTID = $routeParams.sessionVTID || undefined;

            $scope.attendees = [];

            var init = function () {
                if ( sessionVTID ) $scope.attendees = AttendeesBySessionId.query({'sessionVTID':sessionVTID}) || [];
                else $scope.attendees = Attendee.query() || [];
            };

            $scope.refresh = function () {
                init();
            };

            $scope.select = function (attendee) {
                if (attendee._id) {
                    $location.url('/attendee/' + attendee._id);
                }
            };

            // Got to attendees list for this session
            $scope.gotoSessions = function () {
                $location.url('/session/');
            };

            // Init controller
            init();
        }]);

})();