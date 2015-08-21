/**
* topNavBar
* @namespace oipa.partials
*/
(function () {
  'use strict';

  angular
    .module('oipa.partials')
    .directive('topNavbar', topNavbar);

  topNavbar.$inject = ['templateBaseUrl'];

  function topNavbar(templateBaseUrl) {

    var directive = {
      controller: 'TopNavbarController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        'views': '=',
        'searchValue': '=',
        'submitSearch': '='
      },
      templateUrl: templateBaseUrl + '/templates/_partials/topnavbar/top-navbar.html'
    };

    return directive;
  }
})();