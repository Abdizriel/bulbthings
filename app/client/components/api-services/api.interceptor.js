'use strict';

angular
  .module('bulbthings')
  .factory('APIInterceptor', APIInterceptor);

APIInterceptor.$inject = ['$cookies'];

function APIInterceptor($cookies) {

  let interceptor = {};

  interceptor.request = request;

  return interceptor;

  function request (config) {
    config.headers['apikey'] = $cookies.get('bulbthings-apikey');
    return config;
  }

}
