(function () {
  'use strict';

  angular
    .module('oipa.explore')
    .directive('exploreGeoMap', exploreGeoMap);

  exploreGeoMap.$inject = ['templateBaseUrl','$http'];

  function exploreGeoMap(templateBaseUrl) {

    var directive = {
      controller: 'ExploreGeoMapController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        aggregationFilters: '@',
        groupBy: '@',
        groupById: '@',
        aggregationKey: '@',
        aggregationKeyId: '@',
        chartXAxis: '@',
        chartYAxis: '@',
        chartType: '@',
        axisLabelDistance: '@'
      },
      templateUrl: templateBaseUrl + '/templates/explore/map-visualisatie.html'
    };

    return directive;
  }
})();