'use strict';

(function() {

  /** Class representing a Assets view. */
  class AssetsController {

    /**
     * Create a Assets view.
     * @param {Object} $scope - Application object.
     * @param {Object} socket - Websocket connection.
     * @param {Object} AssetService - Asset API service.
     * @param {Object} TypeService - Asset Type API service.
     * @param {Object} toastr - Notification directive.
     */
    constructor($scope, socket, AssetService, TypeService, toastr) {
      this.toastr = toastr;
      this.socket = socket;
      this.AssetService = AssetService;
      this.TypeService = TypeService;
      this.typesData = [];
      this.formatedTypes = {};
      this.assetsAsyncData = [];
      this.assetsData = [];
      this.updatingAsset = false;
      this.incorrectParametersFormat = false;
      this.asset = {};
      // Set Formly Form Fields
      this.assetFields = [
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'name',
            label: 'Asset Name',
            placeholder: 'Enter asset name'
          },
          validation: {
            messages: {
              required: 'Asset name is required'
            }
          }
        }, {
          key: 'TypeId',
          type: 'select',
          templateOptions:{
            label: 'Asset Type',
            options: [],
            valueProp: '_id',
            labelProp: 'name',
            required: true,
            placeholder: 'Select asset type from List'
          },
          controller: ($scope, TypeService) => {
            TypeService.getTypes()
              .then(data => {
                $scope.options.templateOptions.options = data;
                return data;
              });
          }
        }, {
          key: 'parameters',
          type: 'textarea',
          templateOptions: {
            required: true,
            type: 'parameters',
            label: 'Parameters',
            placeholder: 'Enter JSON object with parameters'
          }
        }
      ];

      $scope.$on('$destroy',() => {
        socket.unsyncUpdates('asset');
      })
    }

    /**
     * On init get data from Asset service and synchronize updates
     * @function $onInit
     */
    $onInit() {
      this.syncAssets()
        .then(() => this.syncTypes())
        .catch(this.handleFormErrors.bind(this));
    }

    /**
     * Synchronize Asset database in real time
     * @function syncAssets
     */
    syncAssets() {
      return this.AssetService.getAssets()
        .then(response => {
          this.assetsAsyncData = response;
          this.socket.syncUpdates('asset', this.assetsAsyncData);
        })
    }

    /**
     * Synchronize Asset Types database in real time
     * @function syncTypes
     */
    syncTypes() {
      return this.TypeService.getTypes()
        .then(response => {
          this.typesData = response;
          this.socket.syncUpdates('type', this.typesData, this.formatTypesData());
        })
    }

    /**
     * Format Asset Types data to nice format for view
     * @function formatTypesData
     */
    formatTypesData() {
      this.typesData.map(type => {
        this.formatedTypes[type._id] = type.name;
      });
    }

    /**
     * Remove asset
     * @function removeAsset
     * @param {string} id - Asset Id
     */
    removeAsset(id) {
      this.AssetService.deleteAsset(id)
        .then(() => this.toastr.success('Asset was removed', 'Success'))
        .catch(this.handleFormErrors.bind(this));
    }

    /**
     * Setting form data with asset data and flag it as update operation
     * @function startUpdate
     * @param {Object} data - Asset data
     */
    startUpdate(data) {
      this.updatingAsset = true;
      this.asset = data;
      this.asset.parameters = JSON.stringify(data.parameters);
    }

    /**
     * Clear update flag, form data and mark it as untouched
     * @function cancelUpdate
     */
    cancelUpdate() {
      this.updatingAsset = false;
      this.asset = {};
      this.form.$setUntouched();
    }

    /**
     * Create asset from form data
     * @function createAsset
     */
    createAsset() {
      this.incorrectParametersFormat = false;
      this.asset.parameters = this.getParameters();
      if(this.incorrectParametersFormat) return;

      this.AssetService.createAsset(this.asset)
        .then(this.handleFormSuccess.bind(this, 'New asset was added'))
        .catch(this.handleFormErrors.bind(this));
    }

    /**
     * Update asset from form data
     * @function updateAsset
     */
    updateAsset() {
      this.incorrectParametersFormat = false;
      this.asset.parameters = this.getParameters();
      if(this.incorrectParametersFormat) return;

      this.AssetService.updateAsset(this.asset)
        .then(this.handleFormSuccess.bind(this, 'Asset was updated'))
        .catch(this.handleFormErrors.bind(this));
    }

    /**
     * Parse attributes to Array
     * @function getAttributes
     * @returns {Array} attrs - Parsed attributes
     */
    getParameters() {
      try {
        return JSON.parse(this.asset.parameters);
      }
      catch(err) {
        this.toastr.error('Wrong JSON format', 'Success');
        this.incorrectParametersFormat = true;
        this.asset.parameters = JSON.stringify('{}');
      }
    }

    /**
     * Decide what operation run create or update
     * @function onSubmit
     */
    onSubmit() {
      if(this.updatingAsset){
        this.updateAsset();
      } else {
        this.createAsset();
      }
    }

    /**
     * Handle success operation of create/update
     * @function handleFormSuccess
     * @param {string} message - Success notification message
     */
    handleFormSuccess (message) {
      this.updatingAsset = false;
      this.toastr.success(message, 'Success');
      this.asset = {};
      this.form.$setUntouched();
    }

    /**
     * Handle error operation of Asset Service
     * @function handleFormSuccess
     * @param {Object} error - Operation errors
     */
    handleFormErrors (error) {
      const { errors } = error;
      this.asset.parameters = JSON.stringify(this.asset.parameters);
      errors.forEach(error => this.toastr.error(error.message, 'Error'));
    }

  }

  angular.module('bulbthings')
    .component('assets', {
      templateUrl: 'app/assets/assets.html',
      controller: AssetsController,
      controllerAs: 'vm'
    });
})();
