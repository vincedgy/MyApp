(function () {
    'use strict';


    /* controllers */

    var attendeesController = angular.module('myApp.attendeesController', ['myApp.attendeesServices']);


    /**
     * Attendees
     */
    attendeesController.controller('attendeeCtrl', ['$scope', '$location', '$routeParams', 'Attendees', function ($scope, $location, $routeParams, Attendees) {
        $scope.sessionID = $routeParams.sessionID || '';
        $scope.attendeeID = $routeParams.attendeeID || '';
        $scope.attendee = Attendees.getAttendeeByID($scope.sessionID, $scope.attendeeID);

        // Got to attendees list for this session
        $scope.getAttendees = function () {
            if ($scope.sessionID) {
                $location.url('/session/' + $scope.sessionID + '/attendees');
            }
        };

        // Got to attendees list for this session
        $scope.getSessions = function () {
            $location.url('/session/');
        };


    }]);

    attendeesController.controller('attendeesListCtrl', ['$scope', '$location', '$routeParams', 'Attendees', function ($scope, $location, $routeParams, Attendees) {
        $scope.sessionID = $routeParams.sessionID || '';
        $scope.attendees = Attendees.getAttendees($scope.sessionID) || [];

        $scope.listAttendeesGrid = {
            enableSorting: true,
            enableRowSelection: true,
            multiSelect: false,
            modifierKeysToMultiSelect: false,
            noUnselect: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {   name: 'name',
                    displayName: 'Attendee (click for details)',
                    cellTemplate: '<span>{{row.entity.title}}&nbsp;{{row.entity.firstName}}&nbsp;{{row.entity.lastName}}</span>', 'width': '50%'}
            ]
        };
        $scope.listAttendeesGrid.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                var attendee = row.entity;
                $scope.select(attendee);
            });
        };


        var init = function () {
            $scope.listAttendeesGrid.data = $scope.attendees = Attendees.getAttendees($scope.sessionID) || [];
        };

        $scope.refresh = function () {
            $scope.attendees = [];
            init();
        };

        // Validate is taken directly from the scope too
        $scope.select = function (attendee) {
            if (attendee.attendeeVTID && attendee.sessionVTID) {
                $location.url('/session/' + attendee.sessionVTID + '/attendees/' + attendee.attendeeVTID);
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