(function () {
  'use strict';

  angular
    .module('oipa.activities')
    .directive('activitiesGeomap', activitiesGeomap);

  activitiesGeomap.$inject = ['templateBaseUrl'];

  function activitiesGeomap(templateBaseUrl) {

    var directive = {
      controller: 'LocationsPolygonGeoMapController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        activity: '='
      },
      templateUrl: templateBaseUrl + '/templates/activities/activities-geomap.html'
    };

    return directive;
  }
})();