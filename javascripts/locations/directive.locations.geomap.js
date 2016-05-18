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
        mapDropdown: '@',
        mapLegend: '@',
        mapHeight: '@',
        geoView: '=?',
        selectedCountryRelation: '='
      },
      templateUrl: templateBaseUrl + '/templates/locations/locations-geomap.html'
    };

    return directive;
  }
})();