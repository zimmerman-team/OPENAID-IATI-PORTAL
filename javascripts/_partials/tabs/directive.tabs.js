/**
* Tabs
* @namespace oipa.tabs
*/
(function () {
  'use strict';

  angular
    .module('oipa.tabs')
    .directive('tabsPartial', tabsPartial);

  tabsPartial.$inject = ['templateBaseUrl'];

  /**
  * @namespace Tabs
  */
  function tabsPartial(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.tabs.tabsPartial
    */
    var directive = {
      controller: 'TabsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/_partials/tabs/tabs.html'
    };

    return directive;
  }
})();