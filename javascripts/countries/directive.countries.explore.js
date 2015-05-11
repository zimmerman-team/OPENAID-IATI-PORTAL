/**
* Countries
* @namespace oipa.countries
*/
(function () {
  'use strict';

  angular
    .module('oipa.countries')
    .directive('countriesExploreBlock', countriesExploreBlock);

  countriesExploreBlock.$inject = ['templateBaseUrl'];

  /**
  * @namespace Collection
  */
  function countriesExploreBlock(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.countries.countryPage
    */
    var directive = {
      controller: 'CountriesExploreController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/countries/countries-explore-block.html'
    };

    return directive;
  }
})();