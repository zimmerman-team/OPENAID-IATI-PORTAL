(function () {
  'use strict';

  angular
    .module('oipa.charts')
    .directive('financialsLineChart', financialsLineChart);

  financialsLineChart.$inject = ['templateBaseUrl','$http'];

  function financialsLineChart(templateBaseUrl) {

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