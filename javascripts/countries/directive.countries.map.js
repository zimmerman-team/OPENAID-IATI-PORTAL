/**
* Collection
* @namespace oipa.countries
*/
(function () {
  'use strict';

  angular
    .module('oipa.countries')
    .directive('countriesMap', countriesMap);

  countriesMap.$inject = ['templateBaseUrl'];

  /**
  * @namespace Collection
  */
  function countriesMap(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.countries.countriesListDirective
    */
    var directive = {
      controller: 'CountriesMapController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/countries/countries-map.html'
    };

    return directive;
  }
})();