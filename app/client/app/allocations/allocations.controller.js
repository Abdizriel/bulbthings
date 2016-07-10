'use strict';

(function() {

  /** Class representing a Allocations view. */
  class AllocationsController {

    /**
     * Create a Allocations view.
     * @param {Object} $scope - Application object.
     * @param {Object} socket - Websocket connection.
     * @param {Object} AllocationService - Allocation API service.
     * @param {Object} toastr - Notification directive.
     */
    constructor($scope, socket, AllocationService, toastr) {
      this.toastr = toastr;
      this.socket = socket;
      this.AllocationService = AllocationService;
      this.allocationsAsyncData = [];
      this.allocationsData = [];
      this.updatingAllocation = false;
      this.allocation = {};
      this.allocationFields = [
        {
          key: 'name',
          allocation: 'input',
          templateOptions: {
            required: true,
            allocation: 'name',
            label: 'Asset Allocation Name',
            placeholder: 'Enter asset allocation name'
          },
          validation: {
            messages: {
              required: 'Asset allocation name is required'
            }
          }
        }, {
          key: 'attrs',
          allocation: 'input',
          templateOptions: {
            required: true,
            allocation: 'attrs',
            label: 'Attributes',
            placeholder: 'Enter attributes separated by comma'
          }
        }
      ];

      $scope.$on('$destroy',() => {
        socket.unsyncUpdates('allocation');
      })
    }

    /**
     * On init get data from Allocation service and synchronize updates
     * @function $onInit
     */
    $onInit() {
      this.AllocationService.getAllocations()
        .then(response => {
          this.allocationsAsyncData = response;
          this.socket.syncUpdates('allocation', this.allocationsAsyncData);
        })
        .catch(this.handleFormErrors.bind(this));
    }

    /**
     * Remove allocation
     * @function removeAllocation
     * @param {string} id - Allocation Id
     */
    removeAllocation(id) {
      this.AllocationService.deleteAllocation(id)
        .then(() => this.toastr.success('Allocation was removed', 'Success'))
        .catch(this.handleFormErrors.bind(this));
    }

    /**
     * Setting form data with allocation data and flag it as update operation
     * @function startUpdate
     * @param {Object} data - Allocation data
     */
    startUpdate(data) {
      this.updatingAllocation = true;
      this.allocation = data;
    }

    /**
     * Clear update flag, form data and mark it as untouched
     * @function cancelUpdate
     */
    cancelUpdate() {
      this.updatingAllocation = false;
      this.allocation = {};
      this.form.$setUntouched();
    }

    /**
     * Create allocation from form data
     * @function createAllocation
     */
    createAllocation() {
      this.allocation.attrs = this.getAttributes();

      this.AllocationService.createAllocation(this.allocation)
        .then(this.handleFormSuccess.bind(this, 'New allocation was added'))
        .catch(this.handleFormErrors.bind(this));
    }

    /**
     * Update allocation from form data
     * @function updateAllocation
     */
    updateAllocation() {
      // Since we can just change name and do not touch attributes
      // this is safety check to not touch existing array of attributes
      if(!Array.isArray(this.allocation.attrs)) {
        this.allocation.attrs = this.getAttributes();
      }

      this.AllocationService.updateAllocation(this.allocation)
        .then(this.handleFormSuccess.bind(this, 'Allocation was updated'))
        .catch(this.handleFormErrors.bind(this));
    }

    /**
     * Parse attributes to Array
     * @function getAttributes
     * @returns {Array} attrs - Parsed attributes
     */
    getAttributes() {
      let attrs = this.allocation.attrs.split(',');
      attrs.map(attribute => attribute.trim());
      return attrs;
    }

    /**
     * Decide what operation run create or update
     * @function onSubmit
     */
    onSubmit() {
      if(this.updatingAllocation){
        this.updateAllocation();
      } else {
        this.createAllocation();
      }
    }

    /**
     * Handle success operation of create/update
     * @function handleFormSuccess
     * @param {string} message - Success notification message
     */
    handleFormSuccess (message) {
      this.updatingAllocation = false;
      this.toastr.success(message, 'Success');
      this.allocation = {};
      this.form.$setUntouched();
    }

    /**
     * Handle error operation of Allocation Service
     * @function handleFormSuccess
     * @param {Object} error - Operation errors
     */
    handleFormErrors (error) {
      const { errors } = error;
      errors.forEach(error => this.toastr.error(error.message, 'Error'));
    }

  }

  angular.module('bulbthings')
    .component('allocations', {
      templateUrl: 'app/allocations/allocations.html',
      controller: AllocationsController,
      controllerAs: 'vm'
    });
})();
