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
            });

                $scope.ethnicity = [];
                angular.forEach($scope.info.ethnicity, function(ethnicity) {
                    var ethnicObj = {
                        name: ethnicity,
                        selected: false
                    };
                    angular.forEach($scope.user.demographics.ethnicity, function(userEthnicity) {
                        if(userEthnicity === ethnicity) {
                            ethnicObj.selected = true;
                        }
                    });
                    $scope.ethnicity.push(ethnicObj);
                });

            $scope.languages = [];
            angular.forEach($scope.info.tongues, function(tongue) {
                var tongueObj = {
                    name: tongue,
                    selected: false
                };
                angular.forEach($scope.user.demographics.languages, function(userTongues) {
                    if(userTongues === tongue) {
                        tongueObj.selected = true;
                    }
                });
                $scope.languages.push(tongueObj);
            })


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

        var newUserEthnicity = [];
        angular.forEach($scope.ethnicity, function(ethnicity) {
            if (ethnicity.selected) {
                newUserEthnicity.push(ethnicity.name);
            }
        });
        $scope.user.demographics.ethnicity = newUserEthnicity;

        var newUserLanguage = [];
        angular.forEach($scope.languages, function(tongue) {
            if (tongue.selected) {
                newUserLanguage.push(tongue.name);
            }
        });
        $scope.user.demographics.languages = newUserLanguage;



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
