'use strict';

angular.module('baseangular')

.directive('avatarUpdate', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.click(function() {
                console.log("clicked on avatar-update");
                $('#avatar-update').click();
            })
        }
    }


})
