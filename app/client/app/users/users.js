'use strict';

angular.module('bulbthings')
  .config(function($stateProvider) {
    $stateProvider.state('users', {
      url: '/users',
      template: '<users></users>'
    });
  });
