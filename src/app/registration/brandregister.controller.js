'use strict';

angular.module('baseangular')

.controller('BrandCtrl', function($scope, $http, $state) {

    $scope.user = {
        name: '',
        email: '',
        password: ''
    };

    $scope.login = function() {

        $http.post('https://reaching-point.firebaseio.com/user.json', $scope.user)
            .success(function(data){

                console.log("posted successfully");
                $state.go('home.dashboard')
            })
            .error(function(error){
                console.log(error, "you suck");
            })
    }



});
