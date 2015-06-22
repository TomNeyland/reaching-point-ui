'use strict';

angular.module('baseangular')

.directive('hoverActive', function() {

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.hover(function(){
                $(this).toggleClass('active');
            })
        }
    }

})
