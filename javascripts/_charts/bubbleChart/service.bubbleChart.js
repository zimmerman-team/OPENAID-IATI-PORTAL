/**
* BubbleChart
* @namespace oipa.bubbleChart
*/
(function () {
    'use strict';

    angular
        .module('oipa.bubbleChart')
        .factory('BubbleChart', BubbleChart);

    BubbleChart.$inject = ['$http', 'oipaUrl'];

    /**
    * @namespace BubbleChart
    * @returns {Factory}
    */
    function BubbleChart($http, oipaUrl) {

        // the bubble chart needs a unique identifier, this is done by a simple count in the service
        this.bubbleChartCount = 0;

        var BubbleChart = {
            bubbleChartCount: this.bubbleChartCount,
            get: get,
            aggregation: aggregation
        };

        return BubbleChart;


        ////////////////////


        /**
         * @name get
         * @desc Get the data of the aggregation
         * @param {string} url The URL of which the data should be returned
         * @returns {Promise}
         * @memberOf oipa.bubbleChart.BubbleChart
         */
        function get(url) {
           return $http.get(url, { cache: true });
        }

        /**
         * @name aggregation
         * @desc Get the aggregations
         * @param {string} group_by Group by the 
         * @returns {url}
         * @memberOf oipa.bubbleChart.BubbleChart
         */
        function aggregation(group_by, aggregation_key, filters){
            return oipaUrl + '/aggregate/?format=json&reporting_organisation__in=NL-1&group_by='+group_by+group_field+'&aggregation_key='+aggregation_key+filters;
        }

    }
})();


