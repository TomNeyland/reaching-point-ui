'use strict';

angular.module('baseangular')

.controller('InfluenceRegisterCtrl', function($scope, $http, $state) {

	$scope.user = {
        name: '',
        email: '',
        password: '',
        type: 'influencer'

    };

    $scope.login = function() {

        $http.post('https://reaching-point-ui.firebaseio.com/user.json', $scope.user)
            .success(function(data){

                console.log("posted successfully");
                $state.go('home.dashboard')
            })
            .error(function(error){
                console.log(error, "you suck");
            })
    }

});
