'use strict';

angular.module('baseangular')

.directive('randomColor', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {


            var classArray = ['default', 'primary', 'success', 'info', 'warning', 'danger'];

            function randomClass(min, max) {
            return Math.round(Math.random() * max - min);
            // var i;
            // for(i=0;i<6;i++){
            // var classArray = ['default', 'primary', 'success', 'info', 'warning', 'danger'];
            // var randomPosition = Math.floor(Math.random() * classArray.length);
            // var selected = classArray.splice(randomPosition,1);
            // }
            }

            element.addClass('label-' + classArray[randomClass(0, classArray.length)])


// not finished down here
            // for (var i = 0; i < classArray.length; i++) {
            //     element.addClass('lable-' + classArray[i])
            // }


//             var classArray = ['default', 'primary', 'success', 'info', 'warning', 'danger'];
//
//             function randomClass(min, max) {
//                 // return Math.round(Math.random() * max - min - .1);
//
//                 var x = document.getElementsByClassName("label");
//
//                for(var i = 0; i < slides.length; i++)
//                 {
//                    Distribute(slides.item(i));
//                 }
//
//             }
//
//             element.addClass('label-' + classArray[randomClass(0, classArray.length - 1)])
//
//
// // not finished down here
//             // for (var i = 0; i < classArray.length; i++) {
//             //     element.addClass('lable-' + classArray[i])
//             // }
//

        }
    }
})
