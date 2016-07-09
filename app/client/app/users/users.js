'use strict';

angular.module('meanProcessStreetApp')
  .config(function($stateProvider) {
    $stateProvider.state('users', {
      url: '/users',
      template: '<users></users>'
    });
  });
