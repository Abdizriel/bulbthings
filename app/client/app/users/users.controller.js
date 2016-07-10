'use strict';

(function() {

  class UsersController {

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

    $onInit() {
      this.UserService.getUsers()
        .then(response => {
          this.usersAsyncData = response;
          this.socket.syncUpdates('user', this.usersAsyncData);
        })
        .catch(err => console.error(err));
    }

    removeUser(id) {
      this.UserService.deleteUser(id)
        .then(() => {
          this.toastr.success('User was removed', 'Success');
        })
        .catch(this.handleFormErrors.bind(this));
    }

    startUpdate(data) {
      this.updatingUser = true;
      this.user = data;
    }

    cancelUpdate() {
      this.updatingUser = false;
      this.user = {};
      this.form.$setUntouched();
    }

    createUser() {
      this.UserService.createUser(this.user)
        .then(this.handleFormSuccess.bind(this, 'New user was added'))
        .catch(this.handleFormErrors.bind(this));
    }

    updateUser() {
      let userCopy = Object.assign({}, this.user);

      this.UserService.updateUser(userCopy)
        .then(this.handleFormSuccess.bind(this, 'User was updated'))
        .catch(this.handleFormErrors.bind(this));
    }

    onSubmit() {
      if(this.updatingUser){
        this.updateUser();
      } else {
        this.createUser();
      }
    }

    handleFormSuccess (message) {
      this.updatingUser = false;
      this.toastr.success(message, 'Success');
      this.user = {};
      this.form.$setUntouched();
    }

    handleFormErrors (error) {
      const { errors } = error;
      errors.forEach(error => this.toastr.error(error.message, 'Error'));
    }

  }

  angular.module('meanProcessStreetApp')
    .component('users', {
      templateUrl: 'app/users/users.html',
      controller: UsersController,
      controllerAs: 'vm'
    });
})();
