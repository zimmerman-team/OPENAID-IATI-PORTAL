/**
* Sectors
* @namespace oipa.implementingOrganisations
*/
(function () {
  'use strict';

  angular
    .module('oipa.implementingOrganisations')
    .directive('implementingOrganisationsList', implementingOrganisationsList);

  implementingOrganisationsList.$inject = ['templateBaseUrl'];

  /**
  * @namespace Sectors
  */
  function implementingOrganisationsList(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.sectors.sectorsList
    */
    var directive = {
      controller: 'ImplementingOrganisationsListController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        hasToContain: '@',
        count: '=?',
        searchValue: '=?',
        shown: '=?'
      },
      templateUrl: templateBaseUrl + '/templates/implementingOrganisations/implementing-organisations-list.html'
    };

    return directive;
  }
})();