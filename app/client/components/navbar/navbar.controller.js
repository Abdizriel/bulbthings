'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Users',
    'state': 'users'
  }, {
    'title': 'Assets',
    'state': 'assets'
  }, {
    'title': 'Asset Types',
    'state': 'types'
  }, {
    'title': 'Allocations',
    'state': 'allocations'
  }];

  isCollapsed = true;
}


angular.module('bulbthings')
  .controller('NavbarController', NavbarController);
