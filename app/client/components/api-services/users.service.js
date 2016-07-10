'use strict';


angular
  .module('bulbthings')
  .factory('UserService', UserService);

UserService.$inject = ['$http', 'APIUtilService'];

/**
 * Create a User API Service.
 * @function UserService
 * @param {Object} $http - Angular service that facilitates communication with the remote HTTP
 * @param {Object} APIUtilService - API Utility services
 * @returns {Object} service - All API User services
 */
function UserService($http, APIUtilService) {

  // Service base url
  const urlBase = '/api/users';
  const { handleSuccess, handleError } = APIUtilService;

  // Service list
  let service = {};

  service.getUsers = getUsers;
  service.getUser = getUser;
  service.createUser = createUser;
  service.updateUser = updateUser;
  service.deleteUser = deleteUser;

  return service;

  /**
   * Gets all users from BE.
   * @function getUsers
   * @returns {Promise}
   */
  function getUsers () {
    return $http.get(urlBase)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Get single user by id from BE.
   * @function getUser
   * @param {String} id - User ID
   * @returns {Promise}
   */
  function getUser (id) {
    return $http.get(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send new user data to BE.
   * @function getUser
   * @param {Object} user - New user data
   * @returns {Promise}
   */
  function createUser (user) {
    return $http.post(urlBase, user)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send updated user data to BE.
   * @function getUser
   * @param {Object} user - Updated user data
   * @returns {Promise}
   */
  function updateUser (user) {
    return $http.put(urlBase + '/' + user._id, user)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send delete user request by id to BE.
   * @function DeleteUser
   * @param {String} id - User ID
   * @returns {Promise}
   */
  function deleteUser (id) {
    return $http.delete(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

}
