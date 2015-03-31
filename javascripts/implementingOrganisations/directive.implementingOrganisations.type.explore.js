/**
* Countries
* @namespace oipa.countries
*/
(function () {
  'use strict';

  angular
    .module('oipa.implementingOrganisations')
    .directive('implementingOrganisationsTypeExploreBlock', implementingOrganisationsTypeExploreBlock);

  implementingOrganisationsTypeExploreBlock.$inject = ['templateBaseUrl'];

  /**
  * @namespace Collection
  */
  function implementingOrganisationsTypeExploreBlock(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.countries.countryPage
    */
    var directive = {
      controller: 'ImplementingOrganisationsTypeExploreController',
      controllerAs: 'vm',
      restrict: 'E',
      templateUrl: templateBaseUrl + '/templates/implementingOrganisations/implementing-organisations-type-explore-block.html'
    };

    return directive;
  }
})();