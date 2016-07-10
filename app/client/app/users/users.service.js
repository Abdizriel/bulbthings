'use strict';

angular
  .module('bulbthings')
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
      .catch(handleError);
  }

  function getUser (id) {
    return $http.get(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

  function createUser (user) {
    return $http.post(urlBase, user)
      .then(handleSuccess)
      .catch(handleError);
  }

  function updateUser (user) {
    return $http.put(urlBase + '/' + user._id, user)
      .then(handleSuccess)
      .catch(handleError);
  }

  function deleteUser (id) {
    return $http.delete(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

  function handleSuccess(res) {
    return Promise.resolve(res.data);
  }

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
