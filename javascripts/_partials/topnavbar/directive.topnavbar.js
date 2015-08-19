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

  /**
  * @namespace topNavBar
  */
  function topNavbar(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.partials
    */
    var directive = {
      controller: 'TopNavbarController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        'views': '=',
        'searchValue': '=',
      },
      templateUrl: templateBaseUrl + '/templates/_partials/topnavbar/top-navbar.html'
    };

    return directive;
  }
})();