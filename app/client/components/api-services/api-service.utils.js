'use strict';

angular
  .module('bulbthings')
  .factory('APIUtilService', APIUtilService);

/**
 * Create a API Utility Service.
 * @function APIUtilService
 * @returns {Object} service - All API Utility services
 */
function APIUtilService() {
  // Service list
  let service = {};

  service.handleSuccess = handleSuccess;
  service.handleError = handleError;

  return service;

  /**
   * Handle Success BE request
   * @function handleSuccess
   * @param {Object} response - BE response
   * @returns {Promise}
   */
  function handleSuccess(response) {
    return Promise.resolve(response.data);
  }

  /**
   * Handle Error BE request
   * @function handleSuccess
   * @param {Object} error - BE error response
   * @returns {Promise}
   */
  function handleError(error) {
    let returnedError;

    if(error.data.errors) {
      returnedError = error.data.errors.map(item => {
        return {
          message: item.message,
          field: item.path
        }
      });
    } else {
      returnedError = [{
        message: error.data.message,
        field: error.data.path
      }]
    }
    return Promise.reject({ success: false, errors: returnedError });
  }

}
