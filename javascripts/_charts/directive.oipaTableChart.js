(function () {
  'use strict';

  angular
    .module('oipa.charts')
    .directive('oipaTableChart', oipaTableChart);

  oipaTableChart.$inject = ['templateBaseUrl','$http'];

  function oipaTableChart(templateBaseUrl) {

    var directive = {
      controller: 'OipaTableChartController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        aggregationFilters: '=',
        groupBy: '=',
        groupById: '=',
        aggregationKey: '=',
        aggregationExtraSelect: '=',
        aggregationExtraSelectIn: '=',
        refreshData: '=',
        shownIds: '=',
        topFive: '=',
        activityStatus: '=',
        transactionYear: '=',
        groupSref: '='
      },
      templateUrl: templateBaseUrl + '/templates/_charts/oipa-table-chart.html'
    };

    return directive;
  }
})();