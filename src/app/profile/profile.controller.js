'use strict';

angular.module('baseangular')

.controller('ProfileCtrl', function($scope, $http) {

    $http.get('https://reaching-point.firebaseio.com/user.json')
        .success(function(data) {
            for (var key in data) {
                $scope.user = data[key];
                console.log("data acquired, $scope.user is ", $scope.user);
            }
        });
});
