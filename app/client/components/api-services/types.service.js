'use strict';

angular
  .module('bulbthings')
  .factory('TypeService', TypeService);

TypeService.$inject = ['$http', 'APIUtilService'];

/**
 * Create a Type API Service.
 * @function TypeService
 * @param {Object} $http - Angular service that facilitates communication with the remote HTTP.
 * @param {Object} APIUtilService - API Utility services
 * @returns {Object} service - All API Type services
 */
function TypeService($http, APIUtilService) {

  // Service base url
  const urlBase = '/api/types';
  const { handleSuccess, handleError } = APIUtilService;

  // Service list
  let service = {};

  service.getTypes = getTypes;
  service.getType = getType;
  service.createType = createType;
  service.updateType = updateType;
  service.deleteType = deleteType;

  return service;

  /**
   * Gets all types from BE.
   * @function getTypes
   * @returns {Promise}
   */
  function getTypes () {
    return $http.get(urlBase)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Get single type by id from BE.
   * @function getType
   * @param {String} id - Type ID
   * @returns {Promise}
   */
  function getType (id) {
    return $http.get(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send new type data to BE.
   * @function getType
   * @param {Object} type - New type data
   * @returns {Promise}
   */
  function createType (type) {
    return $http.post(urlBase, type)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send updated type data to BE.
   * @function getType
   * @param {Object} type - Updated type data
   * @returns {Promise}
   */
  function updateType (type) {
    return $http.put(urlBase + '/' + type._id, type)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send delete type request by id to BE.
   * @function DeleteType
   * @param {String} id - Type ID
   * @returns {Promise}
   */
  function deleteType (id) {
    return $http.delete(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

}
