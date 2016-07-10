'use strict';

(function() {

  /** Class representing a Users view. */
  class UsersController {

    /**
     * Create a Users view.
     * @param {Object} $scope - Application object.
     * @param {Object} socket - Websocket connection.
     * @param {Object} UserService - User API service.
     * @param {Object} toastr - Notification directive.
     */
    constructor($scope, socket, UserService, toastr) {
      this.toastr = toastr;
      this.socket = socket;
      this.UserService = UserService;
      this.usersAsyncData = [];
      this.usersData = [];
      this.updatingUser = false;
      this.user = {};
      this.userFields = [
        {
          key: 'firstName',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'firstName',
            label: 'First name',
            placeholder: 'Enter first name'
          },
          validation: {
            messages: {
              required: 'First name is required'
            }
          }
        }, {
          key: 'lastName',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'lastName',
            label: 'Last name',
            placeholder: 'Enter last name'
          }
        }, {
          key: 'email',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'email',
            label: 'Email address',
            placeholder: 'Enter email'
          }
        }
      ];

      $scope.$on('$destroy',() => {
        socket.unsyncUpdates('user');
      })
    }

    /**
     * On init get data from User service and synchronize updates
     * @function $onInit
     */
    $onInit() {
      this.UserService.getUsers()
        .then(response => {
          this.usersAsyncData = response;
          this.socket.syncUpdates('user', this.usersAsyncData);
        })
        .catch(this.handleFormErrors.bind(this));
    }

    /**
     * Remove user
     * @function removeUser
     * @param {string} id - User Id
     */
    removeUser(id) {
      this.UserService.deleteUser(id)
        .then(() => this.toastr.success('User was removed', 'Success'))
        .catch(this.handleFormErrors.bind(this));
    }

    /**
     * Setting form data with user data and flag it as update operation
     * @function startUpdate
     * @param {Object} data - User data
     */
    startUpdate(data) {
      this.updatingUser = true;
      this.user = data;
    }

    /**
     * Clear update flag, form data and mark it as untouched
     * @function cancelUpdate
     */
    cancelUpdate() {
      this.updatingUser = false;
      this.user = {};
      this.form.$setUntouched();
    }

    /**
     * Create user from form data
     * @function createUser
     */
    createUser() {
      this.UserService.createUser(this.user)
        .then(this.handleFormSuccess.bind(this, 'New user was added'))
        .catch(this.handleFormErrors.bind(this));
    }

    /**
     * Update user from form data
     * @function updateUser
     */
    updateUser() {
      this.UserService.updateUser(this.user)
        .then(this.handleFormSuccess.bind(this, 'User was updated'))
        .catch(this.handleFormErrors.bind(this));
    }

    /**
     * Decide what operation run create or update
     * @function onSubmit
     */
    onSubmit() {
      if(this.updatingUser){
        this.updateUser();
      } else {
        this.createUser();
      }
    }

    /**
     * Handle success operation of create/update
     * @function handleFormSuccess
     * @param {string} message - Success notification message
     */
    handleFormSuccess (message) {
      this.updatingUser = false;
      this.toastr.success(message, 'Success');
      this.user = {};
      this.form.$setUntouched();
    }

    /**
     * Handle error operation of User Service
     * @function handleFormSuccess
     * @param {Object} error - Operation errors
     */
    handleFormErrors (error) {
      const { errors } = error;
      errors.forEach(error => this.toastr.error(error.message, 'Error'));
    }

  }

  angular.module('bulbthings')
    .component('users', {
      templateUrl: 'app/users/users.html',
      controller: UsersController,
      controllerAs: 'vm'
    });
})();
