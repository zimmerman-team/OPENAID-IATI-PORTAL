/**
* Countries
* @namespace oipa.countries
*/
(function () {
  'use strict';

  angular
    .module('oipa.implementingOrganisations')
    .directive('implementingOrganisationsExploreBlock', implementingOrganisationsExploreBlock);

  implementingOrganisationsExploreBlock.$inject = ['templateBaseUrl'];

  /**
  * @namespace Collection
  */
  function implementingOrganisationsExploreBlock(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.countries.countryPage
    */
    var directive = {
      controller: 'ImplementingOrganisationsExploreController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/implementingOrganisations/implementing-organisations-explore-block.html'
    };

    return directive;
  }
})();