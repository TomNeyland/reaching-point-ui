'use strict';

angular.module('baseangular')

.factory('windowCheck', function() {
    var factory = { };

    factory.isMobile = function() {
        if (window.innerWidth < 768) {
            return true;
        }
        return false;
    }

    return factory;

});
