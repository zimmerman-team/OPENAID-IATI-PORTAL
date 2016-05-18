/**
* Countries
* @namespace oipa.countries
*/
(function () {
  'use strict';

  angular
    .module('oipa.receiverOrganisations')
    .directive('receiverOrganisationsExploreBlock', receiverOrganisationsExploreBlock);

  receiverOrganisationsExploreBlock.$inject = ['templateBaseUrl'];

  /**
  * @namespace Collection
  */
  function receiverOrganisationsExploreBlock(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.countries.countryPage
    */
    var directive = {
      controller: 'receiverOrganisationsExploreController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/receiverOrganisations/receiver-organisations-explore-block.html'
    };

    return directive;
  }
})();