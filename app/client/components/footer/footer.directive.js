'use strict';

angular.module('bulbthings')
  .directive('footer', function() {
    return {
      templateUrl: 'components/footer/footer.html',
      restrict: 'E',
      controller: 'FooterController',
      controllerAs: 'vm',
      link: function(scope, element) {
        element.addClass('footer');
      }
    };
  });
