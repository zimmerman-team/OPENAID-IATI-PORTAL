(function () {
  'use strict';

  angular
    .module('oipa.charts')
    .directive('oipaTotalFiguresChart', oipaTotalFiguresChart);

  oipaTotalFiguresChart.$inject = ['templateBaseUrl','$http'];

  function oipaTotalFiguresChart(templateBaseUrl) {

    var directive = {
      controller: 'OipaTotalFiguresChartController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        aggregationFilters: '=',
      },
      templateUrl: templateBaseUrl + '/templates/_charts/oipa-total-figures-chart.html'
    };

    return directive;
  }
})();