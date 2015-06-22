'use strict';

angular.module('baseangular')

.factory('retrieveUser', function($http) {

    var obj = {};

    obj.get = function() {
        return $http.get('https://reaching-point.firebaseio.com/user.json')
    };

    obj.update = function() {
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


//      $scope.manipulated below is just a hack to bypass the hash value returned from the put request
        $http.put('https://reaching-point.firebaseio.com/user/' + $scope.manipulated + '.json', $scope.user)
            .success(function(data) {
                console.log("Put successfully");
                $state.go('home.profile');
            })
            .error(function(error) {
                console.log(error);
            })
    };

    return obj;
})
