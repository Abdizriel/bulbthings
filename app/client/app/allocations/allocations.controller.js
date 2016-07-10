'use strict';

(function() {

  /** Class representing a Allocations view. */
  class AllocationsController {

    /**
     * Create a Allocations view.
     * @param {Object} $scope - Application object.
     * @param {Object} socket - Websocket connection.
     * @param {Object} AllocationService - Allocation API service.
     * @param {Object} UserService - User API service.
     * @param {Object} AssetService - Asset API service.
     * @param {Object} toastr - Notification directive.
     */
    constructor($scope, socket, AllocationService, AssetService, UserService, toastr) {
      this.toastr = toastr;
      this.socket = socket;
      this.AllocationService = AllocationService;
      this.AssetService = AssetService;
      this.UserService = UserService;
      this.allocationsAsyncData = [];
      this.allocationsData = [];
      this.assetsData = [];
      this.formattedAssets = {};
      this.usersData = [];
      this.formattedUsers = {};
      this.updatingAllocation = false;
      this.allocation = {};
      this.allocationFields = [
        {
          key: 'UserId',
          type: 'select',
          templateOptions:{
            label: 'User',
            options: [],
            valueProp: 'id',
            labelProp: 'name',
            required: true,
            placeholder: 'Select user from List'
          },
          controller: ($scope, UserService) => {
            UserService.getUsers()
              .then(data => {
                const options = data.map(user => {
                  return {
                    id: user._id,
                    name: `${user.firstName} ${user.lastName}`
                  };
                });
                $scope.options.templateOptions.options = options;
                return options;
              });
          }
        }, {
          key: 'AssetId',
          type: 'select',
          templateOptions:{
            label: 'Asset',
            options: [],
            valueProp: '_id',
            labelProp: 'name',
            required: true,
            placeholder: 'Select asset from List'
          },
          controller: ($scope, AssetService) => {
            AssetService.getAssets()
              .then(data => {
                $scope.options.templateOptions.options = data;
                return data;
              });
          }
        }, {
          key: 'allocatedFrom',
          type: 'datepicker',
          templateOptions: {
            label: 'From',
            type: 'text',
            datepickerPopup: 'dd-MMMM-yyyy'
          }
        }, {
          key: 'allocatedTo',
          type: 'datepicker',
          templateOptions: {
            label: 'To',
            type: 'text',
            datepickerPopup: 'dd-MMMM-yyyy'
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
      this.syncAllocations()
        .then(() => this.syncUsers())
        .then(() => this.syncAssets())
        .catch(this.handleFormErrors.bind(this));
    }

    /**
     * Synchronize Allocation database in real time
     * @function syncAllocations
     */
    syncAllocations() {
      return this.AllocationService.getAllocations()
        .then(response => {
          this.allocationsAsyncData = response;
          this.socket.syncUpdates('allocation', this.allocationsAsyncData);
        })
    }

    /**
     * Synchronize Asset database in real time
     * @function syncAssets
     */
    syncAssets() {
      return this.AssetService.getAssets()
        .then(response => {
          this.assetsData = response;
          this.socket.syncUpdates('asset', this.assetsData, this.formatAssetsData());
        })
    }

    /**
     * Format Asset Types data to nice format for view
     * @function formatTypesData
     */
    formatAssetsData() {
      this.assetsData.map(asset => {
        this.formattedAssets[asset._id] = asset.name;
      });
    }

    /**
     * Synchronize User database in real time
     * @function syncUsers
     */
    syncUsers() {
      return this.UserService.getUsers()
        .then(response => {
          this.usersData = response;
          this.socket.syncUpdates('user', this.usersData, this.formatUsersData());
        })
    }

    /**
     * Format User Types data to nice format for view
     * @function formatTypesData
     */
    formatUsersData() {
      this.usersData.map(user => {
        this.formattedUsers[user._id] = `${user.firstName} ${user.lastName}`;
      });
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
      this.allocation.allocatedFrom = new Date(data.allocatedFrom);
      this.allocation.allocatedTo = new Date(data.allocatedTo);
      console.log(data);

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
      this.AllocationService.createAllocation(this.allocation)
        .then(this.handleFormSuccess.bind(this, 'New allocation was added'))
        .catch(this.handleFormErrors.bind(this));
    }

    /**
     * Update allocation from form data
     * @function updateAllocation
     */
    updateAllocation() {
      this.AllocationService.updateAllocation(this.allocation)
        .then(this.handleFormSuccess.bind(this, 'Allocation was updated'))
        .catch(this.handleFormErrors.bind(this));
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
