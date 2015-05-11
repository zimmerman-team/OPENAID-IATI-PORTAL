/**
* Collection
* @namespace oipa.filters
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .directive('filterPanelBudget', filterPanelBudget);

  filterPanelBudget.$inject = ['templateBaseUrl'];

  /**
  * @namespace Collection
  */
  function filterPanelBudget(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.collections.Collection
    */
    var directive = {
      controller: 'BudgetController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/filters/filter-panel-budget.html'
    };

    return directive;
  }
})();