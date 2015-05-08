/**
* Filters
* @namespace oipa.filters
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .directive('filterPanelImplementingOrganisations', filterPanelImplementingOrganisations);

  filterPanelImplementingOrganisations.$inject = ['templateBaseUrl'];

  /**
  * @namespace Filters
  */
  function filterPanelImplementingOrganisations(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.filters.filterPanelImplementingOrganisations
    */
    var directive = {
      controller: 'ImplementingOrganisationsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/filters/filter-panel-implementing-organisations.html'
    };

    return directive;
  }
})();