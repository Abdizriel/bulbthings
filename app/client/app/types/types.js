'use strict';

angular.module('bulbthings')
  .config(function($stateProvider) {
    $stateProvider.state('types', {
      url: '/types',
      template: '<types></types>'
    });
  });
