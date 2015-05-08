/**
* filterPanelSectors
* @namespace oipa.filters.directives
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .directive('filterSelectionBox', filterSelectionBox);

  filterSelectionBox.$inject = ['templateBaseUrl'];

  /**
  * @namespace filterPanelSectors
  */
  function filterSelectionBox(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.filters.directives.filterPanelSectors
    */
    var directive = {
      controller: 'FiltersSelectionController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/filters/filter-selection-box.html'
    };

    return directive;
  }
})();