'use strict';

angular.module('baseangular')

.factory('userFactory', function() {

        var user = {
        name: '',
        location: '',
        bio: '',
        interests: [],
        demographics:{
            lifeStage: [],
            income: '',
            education: '',
            ethnicity: [],
            language: []
        }
    };

    return user;

});
