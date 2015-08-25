/**
* Regions
* @namespace oipa.regions
*/
(function () {
  'use strict';

  angular
    .module('oipa.regions')
    .directive('regionList', regionList);

  regionList.$inject = ['templateBaseUrl'];
  
  function regionList(templateBaseUrl) {

    var directive = {
      controller: 'RegionListController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        hasToContain: '@',
        count: '=?',
        searchValue: '=?',
        shown: '=?'
      },
      templateUrl: templateBaseUrl + '/templates/regions/region-list.html'
    };

    return directive;
  }
})();