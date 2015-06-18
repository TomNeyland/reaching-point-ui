'use strict';

angular.module('baseangular')

.controller('ProfileCtrl', function($scope, $http, userFactory, $state) {

    $scope.info = userFactory;


    $http.get('https://reaching-point.firebaseio.com/user.json')
        .success(function(data){
            console.log("data acquired", data);
            for (var key in data) {
                // console.log(data[key]);
                $scope.user = data[key];
            }

            $scope.interests = [];
            angular.forEach($scope.info.interests, function(interest) {
                var interestObj = {
                    name: interest,
                    selected: false
                };
                angular.forEach($scope.user.interests, function(userInterest) {
                    if (userInterest === interest) {
                        interestObj.selected = true;
                    }
                });
                $scope.interests.push(interestObj);
            });
        })
        .error(function(error){
            console.log(error)
        });


    $scope.updateUser = function() {

        var newUserInterests = [];
        angular.forEach($scope.interests, function(interest) {
            if (interest.selected) {
                newUserInterests.push(interest.name);
            }
        });
        $scope.user.interests = newUserInterests;
        console.log($scope.user);

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
