'use strict';

angular.module('baseangular')

.directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if (event.which === 13) {
        scope.$apply(function () {
          scope.$eval(attrs.onEnter);
        });

        event.preventDefault();
      }
    });
  };
})

.directive('onEnter', function () {
  return function (scope, elm, attr) {
    elm.bind('keypress', function (e) {
      if (e.keyCode === 13) {
        scope.$apply(attr.onEnter);
      }
    });
  };
})

.directive('onKeyPress', function () {

  return {
    restrict: 'A',
    scope: {
      dataModel: '=',
      onKeyPress: '&'
    },
    replace: true,
    template: '<input data-ng-model="dataModel">',
    link: function (scope, element, attrs) {
      element.bind('keypress', function (e) {
        if (e.keyCode === 13) {
          scope.$apply(attr.onEnter);
        }
        if (validate(event)) {
          scope.onKeyPress({e: e});
        }
      });

      // Only allows integers
      function validate (evt) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]/;
        if (regex.test(key)) {
          return true;
        } else {
          if (theEvent.preventDefault) {
            theEvent.preventDefault();
          }
          theEvent.returnValue = false;
          return false
        }
      }
    }
  }
})

.directive('onEsc', function () {
  return function (scope, elm, attr) {
    elm.bind('keydown', function (e) {
      if (e.keyCode === 27) {
        scope.$apply(attr.onEsc);
      }
    });
  };
});
