/**
* Collection
* @namespace oipa.bubbleChart
*/
(function () {
  'use strict';

  angular
    .module('oipa.bubbleChart')
    .directive('bubbleChart', bubbleChart);

  bubbleChart.$inject = ['templateBaseUrl'];

  /**
  * @namespace Collection
  */
  function bubbleChart(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf oipa.countries.countriesListDirective
    */
    var directive = {
      controller: 'BubbleChartController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        collection: '='
      },
      templateUrl: templateBaseUrl + '/templates/bubbleChart/bubble-chart.html'
    };

    return directive;
  }
})();