'use strict';

(function() {

  class UsersController {
    constructor($scope, socket, UserService) {
      this.socket = socket
      this.UserService = UserService;
      this.usersData = [];
      this.updatingUser = true;
      this.user = {};
      this.userFields = [
        {
          key: 'firstName',
          type: 'input',
          templateOptions: {
            type: 'firstName',
            label: 'First name',
            placeholder: 'Enter first name'
          }
        }, {
          key: 'lastName',
          type: 'input',
          templateOptions: {
            type: 'lastName',
            label: 'Last name',
            placeholder: 'Enter last name'
          }
        }, {
          key: 'email',
          type: 'input',
          templateOptions: {
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
          this.usersData = response;
          this.socket.syncUpdates('user', this.usersData);
        })
        .catch(err => console.error(err));
    }

    removeUser(id) {
      this.UserService.deleteUser(id)
        .then(response => {
          this.usersData = response;
        })
        .catch(err => console.error(err));
    }

    updateUser(data) {
      this.updatingUser = true;
      this.user = data;
    }

    submitForm() {
      this.usersData.push(this.user);
      this.user = {};
    }

  }

  angular.module('meanProcessStreetApp')
    .component('users', {
      templateUrl: 'app/users/users.html',
      controller: UsersController,
      controllerAs: 'vm'
    });
})();
