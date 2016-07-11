'use strict';

angular
  .module('bulbthings')
  .factory('AllocationService', AllocationService);

AllocationService.$inject = ['$http', 'APIUtilService'];

/**
 * Create a Allocation API Service.
 * @function AllocationService
 * @param {Object} $http - Angular service that facilitates communication with the remote HTTP.
 * @param {Object} APIUtilService - API Utility services
 * @returns {Object} service - All API Allocation services
 */
function AllocationService($http, APIUtilService) {

  // Service base url
  const urlBase = '/api/allocations';
  const { handleSuccess, handleError } = APIUtilService;

  // Service list
  let service = {};

  service.getAllocations = getAllocations;
  service.filter = filter;
  service.createAllocation = createAllocation;
  service.updateAllocation = updateAllocation;
  service.deleteAllocation = deleteAllocation;

  return service;

  /**
   * Gets all allocations from BE.
   * @function getAllocations
   * @returns {Promise}
   */
  function getAllocations () {
    return $http.get(urlBase)
      .then(handleSuccess)
      .catch(handleError);
  }

  function filter (filters) {
    const userFilter = filters.UserId ? `UserId=${filters.UserId}` : '';
    const assetFilter = filters.AssetId ? `AssetId=${filters.AssetId}` : '';
    const allocatedFilter = `allocated=${filters.allocated}`;
    return $http.get(`${urlBase}?${userFilter}&${assetFilter}&${allocatedFilter}`)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send new allocation data to BE.
   * @function getAllocation
   * @param {Object} allocation - New allocation data
   * @returns {Promise}
   */
  function createAllocation (allocation) {
    console.log(allocation.allocatedFrom.toUTCString());
    return $http.post(urlBase, allocation)
      .then(handleSuccess)
      .catch(handleError);
  }
  /**
   * Send updated allocation data to BE.
   * @function getAllocation
   * @param {Object} allocation - Updated allocation data
   * @returns {Promise}
   */
  function updateAllocation (allocation) {
    return $http.put(urlBase + '/' + allocation._id, allocation)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send delete allocation request by id to BE.
   * @function DeleteAllocation
   * @param {String} id - Allocation ID
   * @returns {Promise}
   */
  function deleteAllocation (id) {
    return $http.delete(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

}
