(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .directive('filterPanelReceiverOrganisations', filterPanelReceiverOrganisations);

  filterPanelReceiverOrganisations.$inject = ['templateBaseUrl'];

  function filterPanelReceiverOrganisations(templateBaseUrl) {
    var directive = {
      controller: 'receiverOrganisationsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/filters/filter-panel-receiver-organisations.html'
    };

    return directive;
  }
})();