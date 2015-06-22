'use strict';

angular.module('baseangular')

.directive('randomColor', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

            var classArray = ['default', 'primary', 'success', 'info', 'warning', 'danger'];

            function randomClass(min, max) {
                return Math.round(Math.random() * max - min);
            }

            element.addClass('label-' + classArray[randomClass(0, classArray.length - 1)])


// not finished down here
            // for (var i = 0; i < classArray.length; i++) {
            //     element.addClass('lable-' + classArray[i])
            // }

        }
    }
})
