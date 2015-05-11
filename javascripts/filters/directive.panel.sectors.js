/**
* filterPanelSectors
* @namespace oipa.filters
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .directive('filterPanelSectors', filterPanelSectors);

  filterPanelSectors.$inject = ['templateBaseUrl'];

  /**
  * @namespace filterPanelSectors
  */
  function filterPanelSectors(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.filters.filterPanelSectors
    */
    var directive = {
      controller: 'SectorsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/filters/filter-panel-sectors.html'
    };

    return directive;
  }
})();