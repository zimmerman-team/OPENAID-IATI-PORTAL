/**
* subNavbar
* @namespace oipa.partials
*/
(function () {
  'use strict';

  angular
    .module('oipa.partials')
    .directive('subNavbar', subNavbar);

  subNavbar.$inject = ['templateBaseUrl'];

  function subNavbar(templateBaseUrl) {

    var directive = {
      controller: 'SubNavbarController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        'tabs': '=',
        'selectedTab': '=',
      },
      templateUrl: templateBaseUrl + '/templates/_partials/subnavbar/sub-navbar.html'
    };

    return directive;
  }
})();