/**
* Collection
* @namespace oipa.filters
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .directive('filterPanelRecipientRegions', filterPanelRecipientRegions);

  filterPanelRecipientRegions.$inject = ['templateBaseUrl'];

  /**
  * @namespace Collection
  */
  function filterPanelRecipientRegions(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.collections.Collection
    */
    var directive = {
      controller: 'RegionsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/filters/filter-panel-recipient-regions.html'
    };

    return directive;
  }
})();