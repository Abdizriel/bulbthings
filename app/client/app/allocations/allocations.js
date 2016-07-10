'use strict';

angular.module('bulbthings')
  .config(function($stateProvider) {
    $stateProvider.state('allocations', {
      url: '/allocations',
      template: '<allocations></allocations>'
    });
  });
