'use strict';

angular.module('baseangular')

.controller('ProfileEditCtrl', function($scope, $http, userFactory, $timeout, $state, UserService) {

    function init(){

        $scope.info = userFactory;
        $scope.startJoyRide = false;

        getUser();

        $scope.header = {};
        $scope.avatar = {};

        //get user
        //check if user has profile imgs
        //if no image, show default
        //if image, show image

    }

    $scope.fileNameChanged = function(element) {

       var file=element.files[0];

       var reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function(event) {

          $timeout(function(){
            $scope.header.image = event.target.result;
          });
        };
    }

    $scope.fileNameChanged2 = function(element) {

       var file=element.files[0];

       var reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function(event) {

          $timeout(function(){
            $scope.avatar.image = event.target.result;
          });
        };
    }


    //Get User object 
    //REFACTOR THIS CODE TO USE THE API SERVICE
    //MOVE THIS TO THE USERFACTORY SO THE USER OBJECT IS ACCESSIBLE TO ALL CONTROLLERS

    function getUser(){
        console.log('getting user');
        $http.get('https://reaching-point.firebaseio.com/user.json')
        .success(function(data) {
            
            //remove firebase hash
            for (var key in data) {
                $scope.user = data[key];
                console.log("data acquired, $scope.user is ", $scope.user);
                $scope.manipulated = [key];
            }

            //convert interest list into object for ng-checkboxes
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

            //convert life stage list into object for ng-checkboxes
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

            //convert life stage list into object for ng-checkboxes
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

            //convert llanguages list into object for ng-checkboxes
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
        .error(function(error) {
            console.log(error)
        });

    }

    

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

        if($scope.avatar.image){
            $scope.user.avatar = $scope.avatar.image;
        }

        if($scope.header.image){
            $scope.user.header_image = $scope.header.image;    
        }

        

        console.log("return from put request: ", $scope.user);



        $http.put('https://reaching-point.firebaseio.com/user/' + $scope.manipulated + '.json', $scope.user)
            .success(function(data) {
                console.log("Put successfully");
                $state.go('home.profile');
            })
            .error(function(error) {
                console.log(error);
            })
    };

    $scope.cancelUser = function() {
        console.log($scope.user);
    };

    init();


});
