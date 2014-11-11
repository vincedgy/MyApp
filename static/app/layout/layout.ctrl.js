(function () {
    'use strict';

    /* controllers */
    var controllers = angular.module('myApp.controllers', []);

    // headerCtrl
    controllers.controller('headerCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.currentLocation = null;
        $scope.isActive = function (viewLocation) {
            if (!$scope.currentLocation) {
                $scope.currentLocation = $location;
            }
            var simpleLocation = $scope.currentLocation.path().split('/')[1] || '';
            return simpleLocation.toLowerCase().indexOf(viewLocation) >= 0;
        }

    }]);

    // footerCtrl
    controllers.controller('footerCtrl', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
        $rootScope.$on('$locationChangeSuccess', function (event) {
            $scope.actualLocation = $location.path();
        })
    }]);

    // mainCtrl
    controllers.controller('mainCtrl', ['$scope', 'ngToast', 'SessionSrv', function ($scope, ngToast, SessionSrv) {
        $scope.helloMessage = 'Hello World !';
        $scope.message = 'Please welcome to session management';
        // TEST
        ngToast.create({
                'content': '<strong>Hello folks !</strong>This is TrainU.'
                , 'dismissButton': false
                , 'class': 'info' // warning, danger, success
            }
        );

        // Nb Sessions
        $scope.nbSessions = 0;
        $scope.eventRefreshNBSession = false;
        $scope.$watch('eventRefreshNBSession', function() {
            if ($scope.eventRefreshNBSession) {
                SessionSrv.query().$promise.then(function (data) {
                    $scope.nbSessions = data.length;
                });
            }
            $scope.eventRefreshNBSession = false;
        });
        $scope.eventRefreshNBSession = true;

    }]);

    // helloCtrl
    controllers.controller('helloCtrl', ['$scope', function ($scope) {
        $scope.helloMessage = 'Hello World !';
    }]);

})();