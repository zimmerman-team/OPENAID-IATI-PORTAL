/**
* Countries
* @namespace oipa.countries.directives
*/
(function () {
  'use strict';

  angular
    .module('oipa.implementingOrganisations')
    .directive('implementingOrganisationList', implementingOrganisationList);

  implementingOrganisationList.$inject = ['templateBaseUrl'];

  /**
  * @namespace Collection
  */
  function implementingOrganisationList(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.implementingOrganisations.implementingOrganisationList
    */
    var directive = {
      controller: 'ImplementingOrganisationsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/implementingOrganisations/organisation-list.html'
    };

    return directive;
  }
})();