'use strict';

angular.module('baseangular')

.directive('avatarUpload', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.click(function() {
                console.log("clicked on avatar-upload");
                $('#avatar-upload').click();
            })
        }
    }
})
