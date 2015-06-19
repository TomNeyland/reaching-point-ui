'use strict';

angular.module('baseangular')

.controller('ProfileCtrl', function($scope, $http, userFactory, $state, $timeout) {

    $scope.header = {image : null};
    $scope.avatar = {image : null};

    $scope.fileNameChanged = function(element) {

       var file=element.files[0];

       var reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function(event) {

          $timeout(function(){
            $scope.header.image = event.target.result;
          });
          console.log('$scope.headerImage',$scope.header.image)
          // $scope.setHeaderImage($scope.headerImage);
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
          console.log('$scope.headerImage',$scope.avatar.image)
          // $scope.setHeaderImage($scope.headerImage);
        };
    }



    $scope.startJoyRide = false;

    $scope.config = [{
            type: "title",
            heading: "Welcome to Reaching Point!",
            text: 'Let us show you how to get started!'

        }, {
            type: "element",
            selector: "#editProfile",
            heading: "Edit your profile",
            text: "The first thing you should do is edit your profile!",
            placement: "left",
            scroll: false
        }, {
            type: "location_change",
            path: "/profileEdit"
        }

    ];

    $scope.continueJoyRide = false;

    $scope.config2 = [{
            type: "title",
            heading: "Welcome to Reaching Point!",
            text: 'Let us show you how to get started!'

        }, {
            type: "element",
            selector: "#editProfile",
            heading: "Edit your profile",
            text: "The first thing you should do is edit your profile!",
            placement: "left",
            scroll: false
        }, {
            type: "location_change",
            path: "/profileEdit"
        }

    ];

    $scope.info = userFactory;


    $http.get('https://reaching-point-ui.firebaseio.com/user.json')
        .success(function(data) {
            console.log("data acquired", data);
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
        .error(function(error) {
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

        $scope.user.avatar = $scope.avatar.image;
        $scope.user.header_image = $scope.header.image;

        console.log("return from put request: ", $scope.user);



        $http.put('https://reaching-point-ui.firebaseio.com/user/' + $scope.manipulated + '.json', $scope.user)
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

});
