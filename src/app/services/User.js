'use strict';

angular.module('baseangular')

.factory('User', function($http, $rootScope, ApiService) {


// THERE ARE 2 FIREBASES FOR TESTING PURPOSES
// https://reaching-point.firebaseio.com/user.json
// https://reaching-point-ui.firebaseio.com/user.json

    console.log('ApiService',ApiService);


    var obj = {};

    // obj.get = function() {
    //     return $http.get('https://reaching-point-ui.firebaseio.com/user.json')
    // };

    obj.get = function () {

        // Http Request config object
          var httpConfig = {
            url: '/user.json'
          };
          return ApiService.get(httpConfig);
          // .success(function (response) {
          //   return response;
          // })
          // .error(function (response) {
          //   console.log(error);
          // });
    }

    obj.update = function() {
        console.log("return from put request: ", $scope.user);

//      $scope.manipulated below is just a hack to bypass the hash value returned from the put request to firebase
        $http.put('https://reaching-point-ui.firebaseio.com/user/' + $rootScope.manipulated + '.json', $scope.user)
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
