'use strict';

angular.module('bulbthings', ['bulbthings.constants', 'ngCookies', 'ngResource',
    'ngSanitize', 'ui.router', 'ui.bootstrap', 'smart-table', 'formly', 'formlyBootstrap',
    'btford.socket-io', 'toastr'])
  .config(function($urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/users');
    $httpProvider.interceptors.push('APIInterceptor');
    $locationProvider.html5Mode(true);
  });
