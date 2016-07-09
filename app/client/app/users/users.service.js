'use strict';

angular
  .module('meanProcessStreetApp')
  .factory('UserService', UserService);

UserService.$inject = ['$http'];

function UserService($http) {
  const urlBase = '/api/users';
  let service = {};

  service.getUsers = getUsers;
  service.getUser = getUser;
  service.createUser = createUser;
  service.updateUser = updateUser;
  service.deleteUser = deleteUser;

  return service;

  function getUsers () {
    return $http.get(urlBase)
      .then(handleSuccess)
      .catch(handleError('Error getting all users'));
  }

  function getUser (id) {
    return $http.get(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError('Error getting user by id'));
  }

  function createUser (user) {
    return $http.post(urlBase, user)
      .then(handleSuccess)
      .catch(handleError('Error creating user'));
  }

  function updateUser (user) {
    return $http.put(urlBase + '/' + user._id, user)
      .then(handleSuccess)
      .catch(handleError('Error updating user'));
  }

  function deleteUser (id) {
    return  $http.delete(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError('Error deleting user'));
  }

  function handleSuccess(res) {
    return Promise.resolve(res.data);
  }

  function handleError(error) {
    return function () {
      return Promise.reject({ success: false, message: error });
    };
  }

}
