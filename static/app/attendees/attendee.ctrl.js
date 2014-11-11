(function () {
    'use strict';

    angular.module('myApp.attendeeCtrl', ['myApp.attendeesServices'])
        .controller('attendeeCtrl', ['$scope', '$location', '$routeParams', 'Attendee', 'AttendeesBySessionId',
            function ($scope, $location, $routeParams, Attendee, AttendeesBySessionId) {

                var sessionVTID = $routeParams.sessionVTID || undefined;
                var attendeeID = $routeParams.attendeeID || undefined;
                var _id = $routeParams._id || undefined;
                $scope.attendee = {};

                $scope.editMode = false;

                var currentLocation = $location.path().split('/')[1];
                if (currentLocation === 'newAttendee') $scope.editMode = false;
                if (currentLocation === 'editAttendee') $scope.editMode = true;

                var init = function () {
                    if (_id) $scope.attendee = Attendee.get({_id: _id});
                    else if (sessionVTID && attendeeID) $scope.attendee = AttendeesBySessionId.get({sessionVTID: sessionVTID, attendeeID: attendeeVTID});
                    else $scope.attendee = new Attendee();
                };

                // Got to attendee
                $scope.getAttendees = function (attendee) {
                    if (attendee.sessionVTID) {
                        $location.url('/session/' + attendee.sessionVTID + '/attendee');
                    } else {
                        $location.url('/attendee/');
                    }
                };

                // Got to attendees list for this session
                $scope.getSessions = function () {
                    $location.url('/session/');
                };

                $scope.saveAttendee = function (attendee) {
                    if (attendee._id && confirm('Please confirm')) {
                        attendee.$update({_id: attendee._id}, function (savedAttendee) {
                            $location.url('/attendee/' + savedAttendee._id);
                        });
                    } else {
                        attendee.$save(function (savedAttendee) {
                            $location.url('/attendee/' + savedAttendee._id);
                        });
                    }
                    // Refresh the number of Attendees
                    $scope.$parent.eventRefreshNBAttendees = true;
                };

                $scope.removeAttendee = function (attendee) {
                    if (confirm('Please confirm attendee ' + attendee.attendeeVTID + ' deletion.')) {
                        attendee.$remove({_id: attendee._id}, function (removedSession) {
                            $location.url('/attendee/');
                        });
                    }
                };

                // Validate is taken directly from the scope too
                $scope.cancel = function () {
                    init();
                };

                init();

            }]);

})();