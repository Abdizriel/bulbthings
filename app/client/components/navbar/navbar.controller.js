'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }, {
    'title': 'Users',
    'state': 'users'
  }, {
    'title': 'Assets',
    'state': 'assets'
  }, {
    'title': 'Asset Types',
    'state': 'asset-types'
  }, {
    'title': 'Allocations',
    'state': 'allocations'
  }];

  isCollapsed = true;
}


angular.module('meanProcessStreetApp')
  .controller('NavbarController', NavbarController);
