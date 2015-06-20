/**
 * @class fileSelect
 *
 */
'use strict';
angular.module('baseangular')

.directive('fileSelect', function ($timeout) {
  return {
    restrict: 'A',
    scope: {
      fileSelect: '&'
    },
    transclude: true,
    templateUrl: 'views/templates/file_select_template.html',
    link: function (scope, element, attrs) {

      var el = element.find('input')[0];

      scope.getFile = function (event) {

        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }

        if (el.fireEvent) {
          (el.fireEvent('onclick'));
        } else {
          var evObj = document.createEvent('Events');
          evObj.initEvent('click', true, false);
          $timeout(function () {
            el.dispatchEvent(evObj);
          });
        }
      };

      scope.setFiles = function (element) {

        scope.$apply(function (scope) {

          // Turn the FileList object into an Array
          scope.files = [];
          for (var i = 0; i < element.files.length; i++) {
            scope.files.push(element.files[i]);
          }

          scope.fileSelect({files: scope.files});

        });
      };
    }
  }
});
