(function () {
  'use strict';

  angular
    .module('oipa.activities')
    .directive('activitiesGeomap', activitiesGeomap);

  activitiesGeomap.$inject = ['templateBaseUrl'];

  function activitiesGeomap(templateBaseUrl) {

    var directive = {
      controller: 'TempLocationsGeoMapController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        activity: '='
      },
      templateUrl: templateBaseUrl + '/templates/activities/activities-temp-geomap.html'
    };

    return directive;
  }
})();