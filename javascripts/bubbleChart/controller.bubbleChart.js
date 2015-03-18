/**
* bubbleChart
* @namespace oipa.bubbleChart
*/
(function () {
  'use strict';

  angular
    .module('oipa.bubbleChart')
    .controller('BubbleChartController', BubbleChartController);

  BubbleChartController.$inject = ['oipaUrl'];

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
  		root = typeof exports !== "undefined" && exports !== null ? exports : this;
		  $(function() {

			  var scatter_plot = new BubbleChart();

		  	d3.json(oipaUrl + "/v3/activity-aggregate-any/?format=json&reporting_organisation__in=NL-1&group_by=recipient-country&aggregation_key=disbursement", function(csv) {
			    scatter_plot.set_data(csv);
			    scatter_plot.start();
				  scatter_plot.display_group_all();
			  });
        
		  });
    }


  }
})();