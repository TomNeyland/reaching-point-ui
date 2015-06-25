'use strict';

angular.module('baseangular')

.controller('BrandCtrl', function($scope, $http, $state, Restangular) {

    $scope.user = {
        name: '',
        email: '',
        password: '',
        type: 'brand',
        created: moment(new Date).format('l'),
        lastLoggedIn: moment(new Date).format('l'),
        socialNetworks: [
			{
				twitter: {
					username: '',
					followers: '',
					profilePic: ''
				}
			},
			{
				facebook: {
					username: '',
					followers: '',
					profilePic: ''
				}
			},
			{
				linkedIn: {
					username: '',
					followers: '',
					profilePic: ''
				}
			},
			{
				googlePlus: {
					username: '',
					followers: '',
					profilePic: ''
				}
			}
		]
    };

    $scope.login = function() {

        Restangular.all('user').post($scope.user)
            .then(function(response) {
                console.log("Successful post ", response)
                $state.go('home.dashboard')
            }, //error handling below
                function(error) {
                    console.log("Post error = ", error)
            });
    };



});
