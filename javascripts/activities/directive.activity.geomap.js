(function () {
  'use strict';

  angular
    .module('oipa.activities')
    .directive('activityGeomap', activityGeomap);

  activityGeomap.$inject = ['templateBaseUrl'];

  function activityGeomap(templateBaseUrl) {

    var directive = {
      controller: 'ActivityGeoMapController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        activity: '='
      },
      templateUrl: templateBaseUrl + '/templates/activities/activity-geomap.html'
    };

    return directive;
  }
})();