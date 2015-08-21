/**
* Posts
* @namespace oipa.activities
*/
(function () {
    'use strict';

    angular
        .module('oipa.policyMarkers')
        .factory('PolicyMarkers', PolicyMarkers);

    PolicyMarkers.$inject = ['$http', 'oipaUrl'];

    /**
    * @namespace Activities
    * @returns {Factory}
    */
    function PolicyMarkers($http, oipaUrl) {
        var m = this;

        var PolicyMarkers = {
            all: all,
            aggregation: aggregation
        };

        return PolicyMarkers;


        ////////////////////


        /**
         * @name all
         * @desc Try to get all countries
         * @returns {Promise}
         * @memberOf oipa.countries.services.Countries
         */
        function all() {
            return $http.get(oipaUrl + '/policy-markers?format=json&page_size=999&fields=code,name', { cache: true });
        }


        function aggregation(group_by, group_field, aggregation_key){
            if (group_field !== ''){
                group_field = '&group_field=' + group_field;
            }
            return $http.get(oipaUrl + '/aggregate/?format=json&reporting_organisation=NL-1&group_by='+group_by+group_field+'&aggregation_key='+aggregation_key);
        }
    }
})();