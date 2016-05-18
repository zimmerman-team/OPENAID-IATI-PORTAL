/**
* Countries
* @namespace oipa.countries.directives
*/
(function () {
  'use strict';

  angular
    .module('oipa.receiverOrganisations')
    .directive('receiverOrganisationList', receiverOrganisationList);

  receiverOrganisationList.$inject = ['templateBaseUrl'];

  /**
  * @namespace Collection
  */
  function receiverOrganisationList(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.receiverOrganisations.receiverOrganisationList
    */
    var directive = {
      controller: 'receiverOrganisationsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/receiverOrganisations/organisation-list.html'
    };

    return directive;
  }
})();