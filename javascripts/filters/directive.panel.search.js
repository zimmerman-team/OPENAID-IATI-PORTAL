(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .directive('filterPanelSearch', filterPanelSearch);

  filterPanelSearch.$inject = ['templateBaseUrl'];

  function filterPanelSearch(templateBaseUrl) {

    var directive = {
      controller: 'SearchPanelController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        
      },
      templateUrl: templateBaseUrl + '/templates/filters/filter-panel-search.html'
    };

    return directive;
  }
})();