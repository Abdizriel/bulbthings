'use strict';

(function() {

  /** Class representing a Types view. */
  class TypesController {

    /**
     * Create a Types view.
     * @param {Object} $scope - Application object.
     * @param {Object} socket - Websocket connection.
     * @param {Object} TypeService - Type API service.
     * @param {Object} toastr - Notification directive.
     */
    constructor($scope, socket, TypeService, toastr) {
      this.toastr = toastr;
      this.socket = socket;
      this.TypeService = TypeService;
      this.incorrectTypeAttributes = false;
      this.typesAsyncData = [];
      this.typesData = [];
      this.updatingType = false;
      this.type = {};
      this.typeFields = [
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'name',
            label: 'Asset Type Name',
            placeholder: 'Enter asset type name'
          },
          validation: {
            messages: {
              required: 'Asset type name is required'
            }
          }
        }, {
          key: 'attrs',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'attrs',
            label: 'Attributes',
            placeholder: 'Enter attributes separated by comma'
          }
        }
      ];

      $scope.$on('$destroy',() => {
        socket.unsyncUpdates('type');
      })
    }

    /**
     * On init get data from Type service and synchronize updates
     * @function $onInit
     */
    $onInit() {
      this.TypeService.getTypes()
        .then(response => {
          this.typesAsyncData = response;
          this.socket.syncUpdates('type', this.typesAsyncData);
        })
        .catch(this.handleFormErrors.bind(this));
    }

    /**
     * Remove type
     * @function removeType
     * @param {string} id - Type Id
     */
    removeType(id) {
      this.TypeService.deleteType(id)
        .then(() => this.toastr.success('Type was removed', 'Success'))
        .catch(this.handleFormErrors.bind(this));
    }

    /**
     * Setting form data with type data and flag it as update operation
     * @function startUpdate
     * @param {Object} data - Type data
     */
    startUpdate(data) {
      this.updatingType = true;
      this.type = data;
    }

    /**
     * Clear update flag, form data and mark it as untouched
     * @function cancelUpdate
     */
    cancelUpdate() {
      this.updatingType = false;
      this.type = {};
      this.form.$setUntouched();
    }

    /**
     * Create type from form data
     * @function createType
     */
    createType() {
      this.incorrectTypeAttributes = false;
      this.type.attrs = this.getAttributes();

      if(this.incorrectTypeAttributes) {
        this.toastr.error('Attributes must be separated by comma without spaces', 'Error');
        return;
      }

      this.TypeService.createType(this.type)
        .then(this.handleFormSuccess.bind(this, 'New type was added'))
        .catch(this.handleFormErrors.bind(this));
    }

    /**
     * Update type from form data
     * @function updateType
     */
    updateType() {
      this.incorrectTypeAttributes = false;
      // Since we can just change name and do not touch attributes
      // this is safety check to not touch existing array of attributes
      if(!Array.isArray(this.type.attrs)) {
        this.type.attrs = this.getAttributes();
      }

      if(this.incorrectTypeAttributes) {
        this.toastr.error('Attributes must be separated by comma without spaces', 'Error');
        return;
      }

      this.TypeService.updateType(this.type)
        .then(this.handleFormSuccess.bind(this, 'Type was updated'))
        .catch(this.handleFormErrors.bind(this));
    }

    /**
     * Parse attributes to Array
     * @function getAttributes
     * @returns {Array} attrs - Parsed attributes
     */
    getAttributes() {
      if(/^[a-zA-Z0-9-,]*$/.test(this.type.attrs) == false) {
        this.incorrectTypeAttributes = true;
        return;
      }

      let attrs = this.type.attrs.split(',');
      attrs = attrs.map(attribute => attribute.trim());
      return attrs;
    }

    /**
     * Decide what operation run create or update
     * @function onSubmit
     */
    onSubmit() {
      if(this.updatingType){
        this.updateType();
      } else {
        this.createType();
      }
    }

    /**
     * Handle success operation of create/update
     * @function handleFormSuccess
     * @param {string} message - Success notification message
     */
    handleFormSuccess (message) {
      this.updatingType = false;
      this.toastr.success(message, 'Success');
      this.type = {};
      this.form.$setUntouched();
    }

    /**
     * Handle error operation of Type Service
     * @function handleFormSuccess
     * @param {Object} error - Operation errors
     */
    handleFormErrors (error) {
      const { errors } = error;
      errors.forEach(error => this.toastr.error(error.message, 'Error'));
    }

  }

  angular.module('bulbthings')
    .component('types', {
      templateUrl: 'app/types/types.html',
      controller: TypesController,
      controllerAs: 'vm'
    });
})();
