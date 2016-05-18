(function () {
  'use strict';

  angular
    .module('oipa.countries')
    .directive('countryMainList', countryMainList);

  countryMainList.$inject = ['templateBaseUrl'];
  
  function countryMainList(templateBaseUrl) {

    var directive = {
      controller: 'CountriesMainListController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        searchValue: '=?',
        selectedCountryRelation: '=?'
      },
      templateUrl: templateBaseUrl + '/templates/countries/country-list.html'
    };

    return directive;
  }
})();