'use strict';

angular.module('baseangular', ['ngAnimate', 'ngCookies', 'ngSanitize', 'restangular', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      })
      .state('Hamster', {
        url: '/Hamster',
        templateUrl: 'app/hamster/hamster.html',
        controller: 'HmstrCtrl'
      })
      .state('Mouse', {
        url: '/Mouse',
        templateUrl: 'app/mouse/mouse.html',
        controller: 'MouseCtrl'
      });

      //Access states in html via `ui-sref={stateName}`

    $urlRouterProvider.otherwise('/');
  })
;
