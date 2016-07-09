'use strict';

angular.module('meanProcessStreetApp', ['meanProcessStreetApp.constants', 'ngCookies', 'ngResource',
    'ngSanitize', 'ui.router', 'ui.bootstrap', 'smart-table', 'formly', 'formlyBootstrap',
    'btford.socket-io'])
  .config(function($urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $httpProvider.interceptors.push('APIInterceptor');
    $locationProvider.html5Mode(true);
  });
