'use strict';

angular.module('baseangular')

.controller('HomeCtrl', function($scope, windowCheck, User, $rootScope, $state) {

    User.get()
        .then(function(data){
            for (var key in data) {
                $scope.user = data[key];
                return;
            }
        });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        // console.table(toState);
        console.table(fromState)
        // $scope.state = $state.current.name;
    })


    // console.log($state);


var $body = $('body');

    $(window).resize(function(){
        if (windowCheck.isMobile()) {
            $body.removeClass('contract');
        }
        if (!windowCheck.isMobile()) {
            $body.removeClass('offcanvas');
        }
        console.log('Yo');
    });

    $scope.toggle = function() {

        if (windowCheck.isMobile()) {
            $body.toggleClass('offcanvas');
            $body.removeClass('contract');
        } else {
            $body.toggleClass('contract');
            $body.removeClass('offcanvas');
        }

    };


    $scope.checkClasses = function() {
        if ($body.hasClass('contract')) {
            return true;
        }
        return false;
    };

});
