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
          .state('home.dashboard', {
            url: '/home/dashboard',
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashCtrl'
          })
          .state('home.profile', {
            url: '/home/profile',
            templateUrl: 'app/profile/profile.html',
            controller: 'ProfileCtrl'
          });

      //Access states in html via `ui-sref={stateName}`

    $urlRouterProvider.otherwise('/');
  })
;
