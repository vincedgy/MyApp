(function () {
    'use strict';

    angular.module('myApp.sessionCtrl', ['myApp.SessionSrv'])
            .controller('sessionCtrl', ['$scope', '$location', '$routeParams', 'SessionSrv', 'config', function ($scope, $location, $routeParams, SessionSrv, config) {

                var passedId = $routeParams._id || '';

                $scope.session = {};
                $scope.isValid = false;
                $scope.editMode = false;

                var currentLocation = $location.path().split('/')[1];
                if (currentLocation === 'newSession') $scope.editMode = false;
                if (currentLocation === 'editSession') $scope.editMode = true;

                var init = function () {
                    if (! passedId) $scope.session = new SessionSrv();
                    else            $scope.session = SessionSrv.get({_id: passedId});
                    $scope.isValid = $scope.session ? true : false;
                };

                // Got to attendees list for this session
                $scope.getAttendeesBySession = function (session) {
                    $location.url('/session/' + session.sessionID + '/attendee');
                };

                $scope.saveSession = function (session) {
                    if (session.id && confirm('Please confirm')) {
                        session.$update({_id: session._id}, function(savedSession) {
                            $location.url('/session/'+savedSession._id);
                        });
                    } else {
                        session.$save(function(savedSession) {
                            $location.url('/session/'+savedSession._id);
                        });
                    }
                    // Refresh the number of session
                    $scope.$parent.eventRefreshNBSession = true;
                };

                $scope.removeSession = function (session) {
                    if (confirm('Please confirm session ' + session.sessionID + ' deletion.')) {
                        session.$remove({_id: session._id}, function(removedSession) {
                            $location.url('/session/');
                        });
                    }
                };


                $scope.getSessions = function() {
                    return $location.url('/session/');
                };

                // Validate is taken directly from the scope too
                $scope.cancel = function () {
                    init();
                };

                // Initialize controller
                init();
            }]);
})();