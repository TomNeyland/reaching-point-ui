'use strict';

angular.module('baseangular')

.controller('ProfileCtrl', function($scope, $http, userFactory) {

    $http.get('app/sampleJSON/user.JSON')
        .success(function(data){
            console.log("data acquired");
            $scope.user = data.user;
        })
        .error(function(error){
            console.log(error)
        });

    $scope.updateUser = function() {
        $http.post('app/sampleJSON/user.JSON', $scope.user)
            .success(function(data){
                console.log(data);
            })
            .error(function(error){
                console.log(error);
            })
    };

    $scope.cancelUser = function() {
        console.log($scope.user);
    };

});
