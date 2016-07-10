'use strict';

(function() {

  /** Class representing a Footer Directive controller. */
  class FooterController {

    /**
     * Create a Footer logic.
     * @param {Object} $cookies - Cookie service.
     */
    constructor($cookies) {
      this.$cookies = $cookies;
    }

    /**
     * Allow access to API data.
     * @function allowAccess
     */
    allowAccess() {
      console.log('Valid API key was provided');
      this.$cookies.put('bulbthings-apikey', '778b6b01-68ba-4156-970e-fd4fdb18c7dd');
    }

    /**
     * Deny access to API data.
     * @function denyAccess
     */
    denyAccess() {
      console.log('Invalid API key was provided');
      this.$cookies.put('bulbthings-apikey', 'invalid-api-key');
    }

  }

  angular.module('bulbthings')
    .controller('FooterController', FooterController);

})();
