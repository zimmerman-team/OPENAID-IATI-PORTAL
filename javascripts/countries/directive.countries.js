/**
* Countries
* @namespace oipa.countries.directives
*/
(function () {
  'use strict';

  angular
    .module('oipa.countries')
    .directive('countryPage', countryPage);

  countryPage.$inject = ['templateBaseUrl'];

  /**
  * @namespace Collection
  */
  function countryPage(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.countries.countryPage
    */
    var directive = {
      controller: 'CountriesController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/countries/country-info.html'
    };

    return directive;
  }
})();