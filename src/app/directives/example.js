angular.module('baseangular')

.directive('example', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.click(function(){
                alert("hey yall");
            });
        }
    }

})
