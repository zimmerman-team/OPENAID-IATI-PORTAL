/**
* bubbleChart
* @namespace oipa.bubbleChart
*/
(function () {
  'use strict';

  angular
    .module('oipa.bubbleChart')
    .directive('bubbleChart', bubbleChart);

  bubbleChart.$inject = ['templateBaseUrl'];

  /**
  * @namespace bubbleChart
  */
  function bubbleChart(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.bubbleChart
    */
    var directive = {
      controller: 'BubbleChartController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        useData: '=',
        formattedData: '=',
        endpoint: '@',
        groupBy: '@',
        groupField: '@',
        aggregationKey: '@',
        timeSlider: '@',
        sourceUrl: '@',
        countryTypes: '@',
        reformatData: '@',
        boxWidth: '@',
        boxHeight: '@',
        minRange: '@',
        maxRange: '@',
        watchSourceUrl: '@',
        detailUrl: '@'
      },
      templateUrl: templateBaseUrl + '/templates/_charts/bubbleChart/bubble-chart.html'
    };

    return directive;
  }
})();