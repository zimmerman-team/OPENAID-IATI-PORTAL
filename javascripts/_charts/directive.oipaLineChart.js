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
        aggregationFilters: '=',
        hasToContain: '@',
        groupBy: '=',
        groupById: '=',
        groupByName: '@',
        aggregationKey: '@',
        aggregationKeyId: '@',
        chartXAxis: '@',
        chartYAxis: '@',
        chartType: '@',
        chartYAxisLabelDistance: '@',
        mapping: '@',
        colorRange: '@',
        leftMargin: '@',
        chartYAxisEuroFormat: '@',
        chartXAxisEuroFormat: '@',
        chartXAxisStaggerLabels: '@',
      },
      templateUrl: templateBaseUrl + '/templates/_charts/oipa-line-chart.html'
    };

    return directive;
  }
})();