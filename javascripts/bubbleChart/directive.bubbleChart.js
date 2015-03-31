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
        endpoint: '@',
        groupBy: '@',
        groupField: '@',
        aggregationKey: '@',
        timeSlider: '@',
        sourceUrl: '@',
        reformatData: '@',
        boxWidth: '@',
        boxHeight: '@',
        minRange: '@',
        maxRange: '@',
        watchSourceUrl: '@'
      },
      templateUrl: templateBaseUrl + '/templates/bubbleChart/bubble-chart.html'
    };

    return directive;
  }
})();