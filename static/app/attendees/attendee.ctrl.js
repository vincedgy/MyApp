(function () {
    'use strict';

    angular.module('myApp.attendeeCtrl', ['myApp.attendeesServices'])
        .controller('attendeeCtrl', ['$scope', '$location', '$routeParams', 'Attendee', 'AttendeesBySessionId',
            function ($scope, $location, $routeParams, Attendee, AttendeesBySessionId) {

            var sessionVTID = $routeParams.sessionVTID || undefined;
            var attendeeID = $routeParams.attendeeID || undefined;
            var _id = $routeParams._id || undefined;
            $scope.attendee = {};

            var init = function () {
                if (_id) $scope.attendee = Attendee.get({_id:_id});
                else if ( sessionVTID && attendeeID ) $scope.attendee = AttendeesBySessionId.get({sessionVTID:sessionVTID,attendeeID:sessionVTID});
            };

            // Got to attendees list for this session
            $scope.getAttendees = function () {
                if ($scope.sessionID) {
                    $location.url('/session/' + sessionVTID + '/attendees');
                }
            };

            // Got to attendees list for this session
            $scope.getSessions = function () {
                $location.url('/session/');
            };


            init();

        }]);

})();