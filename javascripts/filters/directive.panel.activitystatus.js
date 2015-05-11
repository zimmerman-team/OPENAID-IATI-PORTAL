/**
* filterPanelActivityStatus
* @namespace oipa.filters
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .directive('filterPanelActivityStatus', filterPanelActivityStatus);

  filterPanelActivityStatus.$inject = ['templateBaseUrl'];

  /**
  * @namespace filterPanelActivityStatus
  */
  function filterPanelActivityStatus(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.filters.filterPanelActivityStatus
    */
    var directive = {
      controller: 'ActivityStatusController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/filters/filter-panel-activity-status.html'
    };

    return directive;
  }
})();