'use strict';

angular.module('baseangular', ['ngAnimate', 'ngCookies', 'ngSanitize', 'restangular', 'ui.router', 'ui.bootstrap', 'ngJoyRide', 'ngInputModified'])
  .config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {


      RestangularProvider.setBaseUrl('https://reaching-point-ui.firebaseio.com/');
      RestangularProvider.setRequestSuffix('.json');



    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('pickreg', {
          url: '/chooseaccount',
          templateUrl: 'app/chooseaccount/chooseaccount.html',
          controller: 'ChooseCtrl'
      })
      .state('brandregister', {
          url: '/brandregister',
          templateUrl: 'app/registration/brandregister.html',
          controller: 'BrandCtrl'
      })
      .state('influenceregister', {
          url: '/influenceregister',
          templateUrl: 'app/registration/influencer.html',
          controller: 'InfluenceRegisterCtrl'
      })
      .state('forgotpassword', {
          url: '/forgotpassword',
          templateUrl: 'app/passreset/passreset.html',
          controller: 'PassResetCtrl'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      })
          .state('home.dashboard', {
            url: '/dashboard',
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashCtrl'
          })
          .state('home.profile', {
            url: '/profile',
            templateUrl: 'app/profile/profile.html',
            controller: 'ProfileCtrl'
          })
          .state('home.profileEdit', {
              url: '/profileEdit',
              templateUrl: 'app/profile/profileEdit.html',
              controller: 'ProfileEditCtrl'
          })
          .state('home.campaigns', {
              url: '/campaigns',
              templateUrl: 'app/campaigns/campaigns.html',
              controller: 'CampaignsCtrl'
          })
          .state('home.influencers', {
              url: '/influencers',
              templateUrl: 'app/influencers/influencers.html',
              controller: 'InfluencersCtrl'
          })
          .state('home.analytics', {
              url: '/analytics',
              templateUrl: 'app/analytics/analytics.html',
              controller: 'AnalyticsCtrl'
          })
          .state('home.notifications', {
              url: '/notifications',
              templateUrl: 'app/notifications/notifications.html',
              controller: 'NotificationsCtrl'
          })
          .state('home.affiliates', {
              url: '/affiliates',
              templateUrl: 'app/affiliates/affiliates.html',
              controller: 'AffiliatesCtrl'
          })
          .state('home.addaccount', {
              url: '/addaccount',
              templateUrl: 'app/addaccount/addaccount.html',
              controller: 'AddaccountCtrl'
          })
          .state('home.settings', {
              url: '/settings',
              templateUrl: 'app/settings/settings.html',
              controller: 'SettingsCtrl'
          });

      //Access states in html via `ui-sref={stateName}`

    $urlRouterProvider.otherwise('/');
});
