'use strict';

angular
  .module('bulbthings')
  .factory('AssetService', AssetService);

AssetService.$inject = ['$http'];

function AssetService($http) {
  const urlBase = '/api/assets';
  let service = {};

  service.getAssets = getAssets;
  service.getAsset = getAsset;
  service.createAsset = createAsset;
  service.updateAsset = updateAsset;
  service.deleteAsset = deleteAsset;

  return service;

  function getAssets () {
    return $http.get(urlBase)
      .then(handleSuccess)
      .catch(handleError);
  }

  function getAsset (id) {
    return $http.get(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

  function createAsset (asset) {
    return $http.post(urlBase, asset)
      .then(handleSuccess)
      .catch(handleError);
  }

  function updateAsset (asset) {
    return $http.put(urlBase + '/' + asset._id, asset)
      .then(handleSuccess)
      .catch(handleError);
  }

  function deleteAsset (id) {
    return $http.delete(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

  function handleSuccess(res) {
    return Promise.resolve(res.data);
  }

  function handleError(error) {
    let returnedError;

    if (error.data.errors) {
      returnedError = error.data.errors.map(item => {
        return {
          message: item.message
        }
      });

    } else if(!error.data.message) {
      returnedError = [{
        message: error.data
      }]
    } else {
      returnedError = [{
        message: error.data.message
      }]
    }
    return Promise.reject({ success: false, errors: returnedError });
  }

}
