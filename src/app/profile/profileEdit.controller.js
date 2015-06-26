'use strict';

angular.module('baseangular')

.controller('ProfileEditCtrl', function($scope, $rootScope, $http, userFactory, $timeout, $state, UserService, User, $location) {
    //Gives us access to $state in view
    $scope.$state = $state;

    User.get()
        .then(function(data) {
            for (var key in data) {
                    $scope.user = data[key];
                    $rootScope.manipulated = [key]
                    var interestdata = data[key].interests.length;
                    break;
                }
        });
    // limits the amount of checkboxes in interests
    // $scope.limit = 5;
    // $scope.checked = 0;
    //
    // $scope.checkChanged = function(interest){
    //     if(interest.selected) $scope.checked++;
    //     else $scope.checked--;
    // }

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

        var file = element.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(event) {

            if (element.id == "avatar-upload") {
                $timeout(function() {
                    $scope.avatar.image = event.target.result;
                });
            } else if (element.id == "banner-upload") {
                $timeout(function() {
                    $scope.header.image = event.target.result;
                });
            };
        };
    }


    //Get User object
    //REFACTOR THIS CODE TO USE THE API SERVICE
    //MOVE THIS TO THE USERFACTORY SO THE USER OBJECT IS ACCESSIBLE TO ALL CONTROLLERS

    function getUser() {
        console.log('getting user');
        User.get()
            .then(function(data) {
                //remove firebase hash
                for (var key in data) {
                    $scope.user = data[key];
                    $rootScope.manipulated = [key];
                    console.log("data acquired, $scope.user is ", $scope.user);
                    break;
                }

                //convert interest list into object for ng-checkboxes
                $scope.interests = [];
                angular.forEach($scope.info.interests, function(interest) {
                    var interestObj = {
                        name: interest,
                        selected: false
                    };
                    $scope.interests.push(interestObj);
                });

                //convert life stage list into object for ng-checkboxes
                $scope.lifeStage = [];
                angular.forEach($scope.info.lifeStage, function(stage) {
                    var lifeStageObj = {
                        name: stage,
                        selected: false
                    };
                    $scope.lifeStage.push(lifeStageObj);
                });

                //convert life stage list into object for ng-checkboxes
                $scope.ethnicity = [];
                angular.forEach($scope.info.ethnicity, function(ethnicity) {
                    var ethnicObj = {
                        name: ethnicity,
                        selected: false
                    };
                    $scope.ethnicity.push(ethnicObj);
                });

                //convert llanguages list into object for ng-checkboxes
                $scope.languages = [];
                angular.forEach($scope.info.tongues, function(tongue) {
                    var tongueObj = {
                        name: tongue,
                        selected: false
                    };
                    $scope.languages.push(tongueObj);
                })

                if ($scope.user) {
                    if ($scope.user.interests) {

                        angular.forEach($scope.interests, function(interest) {

                            angular.forEach($scope.user.interests, function(userInterest) {

                                if (userInterest === interest.name) {
                                    interest.selected = true;
                                }
                            });

                        });
                    }




                    if ($scope.user.demographics && $scope.user.demographics.lifeStage) {

                        angular.forEach($scope.lifeStage, function(stage) {

                            angular.forEach($scope.user.demographics.lifeStage, function(userStage) {

                                if (userStage === stage.name) {
                                    stage.selected = true;
                                }
                            });
                        });
                    };


                    if ($scope.user.demographics && $scope.user.demographics.ethnicity) {

                        angular.forEach($scope.ethnicity, function(ethnicity) {
                            angular.forEach($scope.user.demographics.ethnicity, function(userEthnicity) {
                                if (userEthnicity === ethnicity.name) {
                                    ethnicity.selected = true;
                                }
                            });
                        });
                    }

                    if ($scope.user.demographics && $scope.user.demographics.languages) {

                        angular.forEach($scope.languages, function(tongue) {
                            angular.forEach($scope.user.demographics.languages, function(userTongues) {
                                if (userTongues === tongue.name) {
                                    tongue.selected = true;
                                }
                            });
                        });
                    };
                }

            }, //error handler
            function(error) {
                console.log(error);
            });


    }


    $scope.countInterests = function() {
        $scope.countArray = [];
        angular.forEach($scope.interests, function(item) {
            if (item.selected) {
                $scope.countArray.push(item);
            };
        });
    };

    $scope.countLifeStage = function() {
        $scope.countArrayLife = [];
        angular.forEach($scope.lifeStage, function(item) {
            if (item.selected) {
                $scope.countArrayLife.push(item);
            };
        });
    };

    $scope.countEthnicity = function() {
        $scope.countArrayE = [];
        angular.forEach($scope.ethnicity, function(item) {
            if (item.selected) {
                $scope.countArrayE.push(item);
            };
        });
    };

    $scope.countLanguages = function() {
        $scope.countArrayLang = [];
        angular.forEach($scope.languages, function(item) {
            if (item.selected) {
                $scope.countArrayLang.push(item);
            };
        });
    };


    $scope.updateUser = function() {

        var newUserInterests = [];
        angular.forEach($scope.interests, function(interest) {
            if (interest.selected) {
                newUserInterests.push(interest.name);
            }
        });
        $scope.user.interests = newUserInterests;

        var newUserLifeStage = [];
        angular.forEach($scope.lifeStage, function(stage) {
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

        if ($scope.avatar.image) {
            $scope.user.avatar = $scope.avatar.image;
        }

        if ($scope.header.image) {
            $scope.user.header_image = $scope.header.image;
        }

        console.log("return from put request: ", $scope.user);


        $http.put('https://reaching-point.firebaseio.com/user/' + $rootScope.manipulated + '.json', $scope.user)
            .success(function(data) {
                console.log("Put successfully");
                //Unsustainable if more scopes get injected
                $scope.$parent.user.avatar = $scope.avatar.image;
                //Unsustainable if more scopes get injected

                $scope.profileForm.$setPristine();
                $scope.checkChange = false;
                $state.go('home.profile');
            })
            .error(function(error) {
                console.log(error);
            })
    };


    init();


});
