/**
* filterPanelSectors
* @namespace oipa.filters.directives
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .directive('filterSelectionDirective', filterSelectionDirective);

  filterSelectionDirective.$inject = ['templateBaseUrl'];

  /**
  * @namespace filterPanelSectors
  */
  function filterSelectionDirective(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.filters.directives.filterPanelSectors
    */
    var directive = {
      controller: 'SectorsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        collection: '='
      },
      templateUrl: templateBaseUrl + '/templates/filters/filter-panel-sectors.html'
    };

    return directive;
  }
})();