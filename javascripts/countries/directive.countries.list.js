/**
* Collection
* @namespace oipa.countries
*/
(function () {
  'use strict';

  angular
    .module('oipa.countries')
    .directive('countriesListDirective', countriesListDirective);

  countriesListDirective.$inject = ['templateBaseUrl'];

  /**
  * @namespace Collection
  */
  function countriesListDirective(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.countries.countriesListDirective
    */
    var directive = {
      controller: 'CountriesController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/countries/country-list.html'
    };

    return directive;
  }
})();