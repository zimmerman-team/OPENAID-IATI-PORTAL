/**
* Sectors
* @namespace oipa.receiverOrganisations
*/
(function () {
  'use strict';

  angular
    .module('oipa.receiverOrganisations')
    .directive('receiverOrganisationsList', receiverOrganisationsList);

  receiverOrganisationsList.$inject = ['templateBaseUrl'];

  /**
  * @namespace Sectors
  */
  function receiverOrganisationsList(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.sectors.sectorsList
    */
    var directive = {
      controller: 'receiverOrganisationsListController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        hasToContain: '@',
        count: '=?',
        searchValue: '=?',
        shown: '=?'
      },
      templateUrl: templateBaseUrl + '/templates/receiverOrganisations/receiver-organisations-list.html'
    };

    return directive;
  }
})();