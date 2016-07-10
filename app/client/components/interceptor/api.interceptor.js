'use strict';

angular
  .module('bulbthings')
  .factory('APIInterceptor', APIInterceptor);

function APIInterceptor() {

  return {
    request: config => {
      config.headers['apikey'] = '778b6b01-68ba-4156-970e-fd4fdb18c7dd';
      return config;
    }
  };

}
