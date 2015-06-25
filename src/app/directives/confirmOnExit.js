'use strict';

angular.module('baseangular')

.directive('confirmOnExit', function($state) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            // window.onbeforeunload = function() {
            //     if (!scope.profileForm.$dirty) {
            //         return "The form is dirty, do you want to stay on the page?";
            //     }
            // }
            // $('#banner-upload, #avatar-upload').change(function() {
            //     scope.checkChange = true;
            //     console.log('things changed')
            // })
            scope.$on('$stateChangeStart', function(event) {
                if (scope.profileForm.$dirty || scope.checkChange) {
                    if (confirm('The form has unsaved changes, press ok to stay on page!')) {
                        event.preventDefault();
                    } else {
                        scope.profileForm.$setPristine;
                        console.log('You canceled the page and reset the form');
                    }
                }
            });
        }
    }
})
