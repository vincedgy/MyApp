(function () {
    'use strict';

    angular.module('myApp.attendeesListCtrl', ['myApp.attendeesServices'])
        .controller('attendeesListCtrl', ['$scope', '$location', '$routeParams', 'AttendeesBySessionId', 'Attendee', 'SessionBySessionId',
            function ($scope, $location, $routeParams, AttendeesBySessionId, Attendee, SessionBySessionId) {

                $scope.sessionVTID = $routeParams.sessionVTID || undefined;
                $scope.session = {};
                $scope.attendees = [];

                var init = function () {
                    if ($scope.sessionVTID) {
                        $scope.attendees = AttendeesBySessionId.query({'sessionVTID': $scope.sessionVTID}) || [];
                        $scope.session = SessionBySessionId.get({'sessionID': $scope.sessionVTID}) || {};
                    } else {
                        $scope.attendees = Attendee.query() || [];
                    }
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

                // Validate is taken directly from the scope too
                $scope.newAttendee = function () {
                    $location.url('/newAttendee/');
                };

                // Validate is taken directly from the scope too
                $scope.addAttendee = function (id) {
                    $location.url('/session/' + id + '/addAttendees');
                };
                // Init controller
                init();
            }]);

})();