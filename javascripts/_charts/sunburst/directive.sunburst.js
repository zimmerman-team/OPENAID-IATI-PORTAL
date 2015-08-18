(function () {
  'use strict';

  angular
    .module('oipa.sunburst')
    .directive('sunburst', sunburst);

  sunburst.$inject = ['templateBaseUrl'];

  function sunburst(templateBaseUrl) {

    var directive = {
      controller: 'SunburstController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        formattedData: '=',
        refreshSunburst: '='
      },
      templateUrl: templateBaseUrl + '/templates/_charts/sunburst/sunburst.html'
    };

    return directive;
  }
})();
