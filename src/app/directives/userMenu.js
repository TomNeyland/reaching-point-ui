'use strict';

angular.module('baseangular')

.directive('menuToggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $('.dropdown-toggle').click(function(){
                $('.navbar-link-default').toggleClass('right open');
            })
        }
    }
});
