'use strict';

angular.module('baseangular')

.controller('ProfileCtrl', function($scope, $http, userFactory, $state) {

    $scope.info = userFactory;


    $http.get('https://reaching-point.firebaseio.com/user.json')
        .success(function(data){
            console.log("data acquired");
            for (var key in data) {
                // console.log(data[key]);
                $scope.user = data[key];
                $scope.manipulated = [key];
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

            $scope.lifeStage = [];
            angular.forEach($scope.info.lifeStage, function(stage) {
                var lifeStageObj = {
                    name: stage,
                    selected: false
                };

                angular.forEach($scope.user.demographics.lifeStage, function(userStage) {
                    if(userStage === stage) {
                        lifeStageObj.selected = true;
                    }
                });
                $scope.lifeStage.push(lifeStageObj);

                // console.log($scope.lifeStage);
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

        var newUserLifeStage = [];
        angular.forEach($scope.lifeStage, function(stage){
            if (stage.selected) {
                newUserLifeStage.push(stage.name);
            }
        });
        $scope.user.demographics.lifeStage = newUserLifeStage;

        console.log("return from put request: ", $scope.user);



        $http.put('https://reaching-point.firebaseio.com/user/' + $scope.manipulated + '.json', $scope.user)
            .success(function(data){
                console.log("Put successfully");
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
