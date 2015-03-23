/**
* bubbleChart
* @namespace oipa.bubbleChart
*/
(function () {
  'use strict';

  angular
    .module('oipa.bubbleChart')
    .controller('BubbleChartController', BubbleChartController);

  BubbleChartController.$inject = ['oipaUrl', 'BubbleChart'];

  /**
  * @namespace bubbleChart
  */
  function BubbleChartController(oipaUrl) {
    var vm = this;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.bubbleChart.BubbleChartController
    */
    function activate() {


    }


  }
})();