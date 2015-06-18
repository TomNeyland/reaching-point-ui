'use strict';

angular.module('baseangular')

.controller('BrandCtrl', function($scope, $http) {

    $scope.user = {
        name: null,
        email: null,
        password: null,
        location: null,
        bio: null,
        interests: [],
        demographics: {
            lifeStage: [],
            income: null,
            education: null,
            ethnicity: null,
            language: null
        }
    };

    $scope.login = function() {

        $http.post('https://reaching-point.firebaseio.com/user.json')
            .success(function(data){
                console.log("posted successfully");
            })
            .error(function(error){
                console.log(error, "you suck");
            })
    }



});
