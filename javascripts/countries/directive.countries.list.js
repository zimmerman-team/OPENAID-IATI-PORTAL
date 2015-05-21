/**
* Collection
* @namespace oipa.countries
*/
(function () {
  'use strict';

  angular
    .module('oipa.countries')
    .directive('countryList', countryList);

  countryList.$inject = ['templateBaseUrl'];
  
  function countryList(templateBaseUrl) {

    var directive = {
      controller: 'CountriesListController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        hasToContain: '@',
      },
      templateUrl: templateBaseUrl + '/templates/countries/country-list.html'
    };

    return directive;
  }
})();