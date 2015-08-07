(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .directive('filterWrapper', filterWrapper);

  filterWrapper.$inject = ['templateBaseUrl'];

  function filterWrapper(templateBaseUrl) {

    var directive = {
      controller: 'FiltersController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: templateBaseUrl + '/templates/filters/filter-bar.html'
    };

    return directive;
  }
})();