(function () {
  'use strict';

  angular
    .module('oipa.geovis')
    .directive('geoVisualisation', geoVisualisation);

  geoVisualisation.$inject = ['templateBaseUrl'];

  function geoVisualisation(templateBaseUrl) {

    var directive = {
      controller: 'GeovisController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        formattedData: '=',
        refreshVisualisation: '='
      },
      templateUrl: templateBaseUrl + '/templates/_charts/geovis/geovis.html'
    };

    return directive;
  }
})();
