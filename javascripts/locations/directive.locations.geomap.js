(function () {
  'use strict';

  angular
    .module('oipa.locations')
    .directive('locationsGeoMap', locationsGeoMap);

  locationsGeoMap.$inject = ['templateBaseUrl','$http'];

  function locationsGeoMap(templateBaseUrl) {

    var directive = {
      controller: 'LocationsGeoMapController',
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
        axisLabelDistance: '@',
        legend: '@',
        geoView: '=?'
      },
      templateUrl: templateBaseUrl + '/templates/locations/locations-geomap.html'
    };

    return directive;
  }
})();