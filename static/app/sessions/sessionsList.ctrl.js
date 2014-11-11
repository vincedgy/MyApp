(function () {
    'use strict';

    /* controllers */

    var sessionsListCtrl =
        angular.module('myApp.sessionsListCtrl', ['myApp.SessionSrv'])
            .controller('sessionsListCtrl', ['$scope', '$location', 'SessionSrv', function ($scope, $location, SessionSrv) {

                $scope.sessions = [];

                $scope.listSessionsGrid = {
                    enableSorting: true,
                    enableRowSelection: true,
                    multiSelect: false,
                    modifierKeysToMultiSelect: false,
                    noUnselect: true,
                    enableRowHeaderSelection: false,
                    columnDefs: [

                        { field: "title", width : '25%'}
                        ,{ field: "sessionID", displayName: "Session ID", width : '12%'}
                        ,{ field: "code", width : '10%'}
                        ,{ field: "duration", width : '10%'}
                        ,{ field: "startDate", width : '12%'}
                        //,{ field: "type" }
                        //,{ field: "trainer"}
                        ,{ field: "site", width : '15%'}
                        //,{ field: "room"}
                        //,{ field: "company"}

                    ]
                };
                $scope.listSessionsGrid.onRegisterApi = function (gridApi) {
                    //set gridApi on scope
                    $scope.gridApi = gridApi;
                    gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                        var session = row.entity;
                        $scope.select(session);
                    });
                };

                var init = function () {
//                    $scope.listSessionsGrid.data = SessionSrv.query() || [];
                    $scope.sessions = SessionSrv.query() || [];
                    $scope.$parent.eventRefreshNBSession = true;
                };


                // Validate is taken directly from the scope too
                $scope.select = function (session) {
                    if (session._id) {
                        $location.url('/session/' + session._id);
                    }
                };

                // Validate is taken directly from the scope too
                $scope.newSession = function () {
                    $location.url('/newSession/');
                };

                // Init controller
                init();
            }]);

})
();