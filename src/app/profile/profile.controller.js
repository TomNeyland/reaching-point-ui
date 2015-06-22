'use strict';

angular.module('baseangular')

.controller('ProfileCtrl', function($scope, $http, retrieveUser) {

    retrieveUser.get()
        .success(function(data) {
            for (var key in data) {
                $scope.user = data[key];
                console.log("data acquired, $scope.user is ", $scope.user);
            }
        });
});
