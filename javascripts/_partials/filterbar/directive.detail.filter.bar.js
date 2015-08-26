/**
* topNavBar
* @namespace oipa.partials
*/
(function () {
  'use strict';

  angular
    .module('oipa.partials')
    .directive('detailFilterBar', detailFilterBar);

  detailFilterBar.$inject = ['templateBaseUrl'];

  function detailFilterBar(templateBaseUrl) {

    var directive = {
      controller: 'FiltersController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        'currentPage': '@',
        'activityId': '=?'
      },
      templateUrl: templateBaseUrl + '/templates/_partials/filterbar/detail-filter-bar.html'
    };

    return directive;
  }
})();