(function () {
  'use strict';

  angular
    .module('oipa.charts')
    .directive('FinancialsLineChart', FinancialsLineChart);

  FinancialsLineChart.$inject = ['templateBaseUrl','$http'];

  function FinancialsLineChart(templateBaseUrl) {

    var directive = {
      controller: 'FinancialsLineChartController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        'hasToContain': '@'
      },
      templateUrl: templateBaseUrl + '/templates/_charts/financials-line-chart.html'
    };

    return directive;
  }
})();