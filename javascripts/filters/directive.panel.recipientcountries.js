/**
* filterPanelRecipientCountries
* @namespace oipa.filters
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .directive('filterPanelRecipientCountries', filterPanelRecipientCountries);

  filterPanelRecipientCountries.$inject = ['templateBaseUrl'];

  /**
  * @namespace Oipa.filters
  */
  function filterPanelRecipientCountries(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.filters.filterPanelRecipientCountries
    */
    var directive = {
      controller: 'CountriesController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/filters/filter-panel-recipient-countries.html'
    };

    return directive;
  }
})();