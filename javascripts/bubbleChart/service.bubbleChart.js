/**
* Posts
* @namespace ncs.collections.services
*/
(function () {
	'use strict';

	angular
		.module('oipa.bubbleChart')
		.factory('BubbleChart', BubbleChart);

	BubbleChart.$inject = ['$http', 'oipaUrl'];

	/**
	* @namespace Filters
	* @returns {Factory}
	*/
	function BubbleChart($http, oipaUrl) {
		var m = this;
		m.chart = new ZzBubbleChart();
		m.chart_year = null;

		var BubbleChart = {
			loadData: loadData,
			update: update
		};

		return BubbleChart;



		////////////////////

		function update(year){
			m.chart_year = year;
			m.chart.update_year(year, 200);
		}

		/**
         * @name all
         * @desc Try to get all countries
         * @returns {Promise}
         * @memberOf oipa.countries.services.Countries
         */
        function loadData(year, url) {
            return $http.get(url, { cache: true })
            .then(succesFn, errorFn);

            function succesFn(data, status, headers, config){
		        m.chart.update(m.chart_year, data.data.results);
			}

            function errorFn(data, status, headers, config){
            	m.chart.update(m.chart_year, []);
			}
        }
	}
})();