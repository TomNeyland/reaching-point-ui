angular.module('baseangular')

.directive('bannerUpload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.click(function(){
                console.log("hey yall");
                $('#banner-upload').click();
            });
        }
    }

})
