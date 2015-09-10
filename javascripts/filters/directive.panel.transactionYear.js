/**
* Collection
* @namespace oipa.filters
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .directive('filterPanelTransactionYear', filterPanelTransactionYear);

  filterPanelTransactionYear.$inject = ['templateBaseUrl'];

  /**
  * @namespace Collection
  */
  function filterPanelTransactionYear(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.collections.Collection
    */
    var directive = {
      controller: 'TransactionYearController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/filters/filter-panel-transaction-year.html'
    };

    return directive;
  }
})();