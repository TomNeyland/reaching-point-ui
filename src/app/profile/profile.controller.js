'use strict';

angular.module('baseangular')

.controller('ProfileCtrl', function($scope, $http, userFactory, $state, $timeout) {

    $scope.header = {image : null};

    // $scope.setHeaderImage = function(img){
    //     var retObj =  { 'background': 'url('+img+')'};
    //     console.log(retObj);
    //     return retObj
    // }

    var files = [];
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

    // Code taken from MatthewCrumley (http://stackoverflow.com/a/934925/298479)
// function getBase64Image(img) {
//     // Create an empty canvas element
//     var canvas = document.createElement("canvas");
//     canvas.width = img.width;
//     canvas.height = img.height;

//     // Copy the image contents to the canvas
//     var ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0);

//     // Get the data-URL formatted image
//     // Firefox supports PNG and JPEG. You could check img.src to guess the
//     // original format, but be aware the using "image/jpg" will re-encode the image.
//     var dataURL = canvas.toDataURL("image/png");

//     return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
// }



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


    $http.get('https://reaching-point.firebaseio.com/user.json')
        .success(function(data) {
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

});
