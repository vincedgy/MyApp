(function () {
    'use strict';

    angular.module('myApp.addAttendeesCtrl', ['myApp.SessionSrv', 'myApp.attendeesServices'])
        .controller('addAttendeesCtrl', ['$scope', '$location', '$routeParams', 'SessionSrv', 'Attendee', 'AttendeesBySessionId', 'config',
            function ($scope, $location, $routeParams, SessionSrv, Attendee, AttendeesBySessionId, config) {

                var sessionID = $routeParams._id || undefined;
                $scope.session = {};

                $scope.available = [];
                $scope.selected = [];
                $scope.attendeesOfSession = [];
                $scope.attendeesAvailable = [];

                var init = function () {
                    if (sessionID) {
                        SessionSrv.get({_id: sessionID}, function (session) {
                            $scope.session = session;
                            $scope.attendeesOfSession = AttendeesBySessionId.query({'sessionVTID': session.sessionID}) || [];
                            $scope.attendeesAvailable = Attendee.query() || [];
                        });
                    }
                };

                $scope.moveItem = function (item, from, to) {
                    console.log('Move item   Item: ' + item + ' From:: ' + from + ' To:: ' + to);
                    //Here from is returned as blank and to as undefined

                    var idx = from.indexOf(item);
                    if (idx != -1) {
                        from.splice(idx, 1);
                        to.push(item);
                    }
                };
                $scope.moveAll = function (from, to) {

                    console.log('Move all  From:: ' + from + ' To:: ' + to);
                    //Here from is returned as blank and to as undefined

                    angular.forEach(from, function (item) {
                        to.push(item);
                    });
                    from.length = 0;
                };


                $scope.save = function (session) {
                    alert('TBD');
                };


                // Initialize controller
                init();
            }]);
})();