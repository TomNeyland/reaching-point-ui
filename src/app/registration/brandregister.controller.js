'use strict';

angular.module('baseangular')

.controller('BrandCtrl', function($scope, $http, $state, Restangular) {

    $scope.user = {
        name: '',
        email: '',
        password: '',
        type: 'brand'

    };

    $scope.login = function() {

        Restangular.all('user').post($scope.user)
            .then(function(response) {
                console.log("Successful post ", response)
            }, //error handling below
                function(error) {
                    console.log("Post error = ", error)
            });
    };



});
