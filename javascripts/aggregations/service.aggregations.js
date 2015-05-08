/**
* Aggregations
* @namespace oipa.aggregations
*/
(function () {
    'use strict';

    angular
        .module('oipa.aggregations')
        .factory('Aggregations', Aggregations);

    Aggregations.$inject = ['$http', 'oipaUrl', 'reportingOrganisationId'];

    /**
    * @namespace Aggregations
    * @returns {Factory}
    */
    function Aggregations($http, oipaUrl, reportingOrganisationId) {

        var Aggregations = {
            aggregation: aggregation
        };

        return Aggregations;

        function aggregation(group_by, aggregation_key, filters, order_by, limit){

            var url = oipaUrl + '/activity-aggregate-any/?format=json&group_by='+group_by+'&aggregation_key='+aggregation_key
            if(reportingOrganisationId){
                url += '&reporting_organisation__in=' + reportingOrganisationId
            }
            if(filters !== undefined){
                url += filters;
            }
            if(order_by !== undefined){
                url += '&order_by=' + order_by;
            }
            if(limit !== undefined){
                url += '&limit=' + limit;
            }

            return $http.get(url, { cache: true });
        }
    }
})();