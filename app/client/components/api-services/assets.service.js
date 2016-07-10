'use strict';

angular
  .module('bulbthings')
  .factory('AssetService', AssetService);

AssetService.$inject = ['$http', 'APIUtilService'];

/**
 * Create a Asset API Service.
 * @function AssetService
 * @param {Object} $http - Angular service that facilitates communication with the remote HTTP.
 * @param {Object} APIUtilService - API Utility services
 * @returns {Object} service - All API Asset services
 */
function AssetService($http, APIUtilService) {

  // Service base url
  const urlBase = '/api/assets';
  const { handleSuccess, handleError } = APIUtilService;

  // Service list
  let service = {};

  service.getAssets = getAssets;
  service.getAsset = getAsset;
  service.createAsset = createAsset;
  service.updateAsset = updateAsset;
  service.deleteAsset = deleteAsset;

  return service;

  /**
   * Gets all assets from BE.
   * @function getAssets
   * @returns {Promise}
   */
  function getAssets () {
    return $http.get(urlBase)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Get single asset by id from BE.
   * @function getAsset
   * @param {String} id - Asset ID
   * @returns {Promise}
   */
  function getAsset (id) {
    return $http.get(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send new asset data to BE.
   * @function getAsset
   * @param {Object} asset - New asset data
   * @returns {Promise}
   */
  function createAsset (asset) {
    return $http.post(urlBase, asset)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send updated asset data to BE.
   * @function getAsset
   * @param {Object} asset - Updated asset data
   * @returns {Promise}
   */
  function updateAsset (asset) {
    return $http.put(urlBase + '/' + asset._id, asset)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send delete asset request by id to BE.
   * @function DeleteAsset
   * @param {String} id - Asset ID
   * @returns {Promise}
   */
  function deleteAsset (id) {
    return $http.delete(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

}
