'use strict';

angular
  .module('bulbthings')
  .factory('TypeService', TypeService);

TypeService.$inject = ['$http'];

function TypeService($http) {
  const urlBase = '/api/types';
  let service = {};

  service.getTypes = getTypes;
  service.getType = getType;
  service.createType = createType;
  service.updateType = updateType;
  service.deleteType = deleteType;

  return service;

  function getTypes () {
    return $http.get(urlBase)
      .then(handleSuccess)
      .catch(handleError);
  }

  function getType (id) {
    return $http.get(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

  function createType (type) {
    return $http.post(urlBase, type)
      .then(handleSuccess)
      .catch(handleError);
  }

  function updateType (type) {
    return $http.put(urlBase + '/' + type._id, type)
      .then(handleSuccess)
      .catch(handleError);
  }

  function deleteType (id) {
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
