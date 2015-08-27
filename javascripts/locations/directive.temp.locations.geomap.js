(function () {
  'use strict';

  angular
    .module('oipa.locations')
    .directive('tempLocationsGeoMap', tempLocationsGeoMap);

  tempLocationsGeoMap.$inject = ['templateBaseUrl','$http'];

  function tempLocationsGeoMap(templateBaseUrl) {

    var directive = {
      controller: 'TempLocationsGeoMapController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        mapLegend: '@',
        mapHeight: '@',
        mapDropdown: '@',
        geoView: '=?',
        exactLocation: '=?',
      },
      templateUrl: templateBaseUrl + '/templates/locations/locations-geomap.html'
    };

    return directive;
  }
})();