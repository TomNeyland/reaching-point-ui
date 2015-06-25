'use strict';

angular.module('baseangular')

.controller('InfluenceRegisterCtrl', function($scope, $http, $state, Restangular) {
console.log($state)
	$scope.user = {
        name: '',
        email: '',
        password: '',
        type: 'influencer',
		created: moment(new Date).format('l'),
		lastLoggedIn: moment(new Date).format('l'),
		socialNetworks: [
			{
				twitter: {
					username: '',
					followers: '',
					profile-pic: ''
				}
			},
			{
				facebook: {
					username: '',
					followers: '',
					profile-pic: ''
				}
			},
			{
				linkedIn: {
					username: '',
					followers: '',
					profile-pic: ''
				}
			},
			{
				google-plus: {
					username: '',
					followers: '',
					profile-pic: ''
				}
			}
		]

    };

    $scope.login = function() {

		Restangular.all('user').post($scope.user)
            .then(function(response) {
                console.log("Successful post ", response);
				$state.go('home.dashboard');
            }, //error handling below
                function(error) {
                    console.log("Post error = ", error)
            });
	};

});
