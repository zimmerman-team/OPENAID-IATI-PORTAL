(function () {
  'use strict';

  angular
    .module('oipa.charts')
    .directive('oipaLineChart', oipaLineChart);

  oipaLineChart.$inject = ['templateBaseUrl','$http'];

  function oipaLineChart(templateBaseUrl) {

    var directive = {
      controller: 'OipaLineChartController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        aggregationFilters: '@',
        groupBy: '@',
        groupById: '@',
        aggregationKey: '@',
        chartXAxis: '@',
        chartYAxis: '@',
        chartType: '@',
        axisLabelDistance: '@'
      },
      templateUrl: templateBaseUrl + '/templates/charts/oipa-line-chart.html'
    };

    return directive;
  }
})();