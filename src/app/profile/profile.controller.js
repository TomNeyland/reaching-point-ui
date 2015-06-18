'use strict';

angular.module('baseangular')

.controller('ProfileCtrl', function($scope, $http, userFactory, $state) {



    $http.get('https://reaching-point.firebaseio.com/user.json')
        .success(function(data){
            console.log("data acquired", data);
            for (var key in data) {
                // console.log(data[key]);
                $scope.user = data[key];
            }
        })
        .error(function(error){
            console.log(error)
        });

    $scope.updateUser = function() {
        $http.post('https://reaching-point.firebaseio.com/user.json', $scope.user)
            .success(function(data){
                console.log(data);
                $state.go('home.profile');
            })
            .error(function(error){
                console.log(error);
            })
    };

    $scope.cancelUser = function() {
        console.log($scope.user);
    };

});
