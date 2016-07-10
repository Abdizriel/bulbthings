'use strict';

angular.module('bulbthings')
  .config(function($stateProvider) {
    $stateProvider.state('assets', {
      url: '/assets',
      template: '<assets></assets>'
    });
  });
