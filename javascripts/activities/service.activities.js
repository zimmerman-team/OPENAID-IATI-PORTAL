/**
* Posts
* @namespace oipa.activities
*/
(function () {
    'use strict';

    angular
        .module('oipa.activities')
        .factory('Activities', Activities);

    Activities.$inject = ['$http', 'oipaUrl'];

    /**
    * @namespace Activities
    * @returns {Factory}
    */
    function Activities($http, oipaUrl) {
        var m = this;

        var Activities = {
            all: all,
            get: get,
            aggregation: aggregation
        };

        return Activities;



        ////////////////////


        /**
         * @name all
         * @desc Try to get all countries
         * @returns {Promise}
         * @memberOf oipa.countries.services.Countries
         */
        function all() {
            return $http.get(oipaUrl + '/activities?format=json&page_size=999&fields=iati-identifier,name', { cache: true });
        }

        /**
         * @name get
         * @desc Get the Collections of a given user
         * @param {string} filter_type The type to get filter options for
         * @returns {Promise}
         * @memberOf oipa.filters.services.Filters
         */
        function get(code) {
            return $http.get(oipaUrl + '/activities/' + code + '?format=json&fields=iati-identifier,name&fields[aggregations]=count,disbursement,commitment', { cache: true });
        }


        function aggregation(group_by, group_field, aggregation_key){
            if (group_field !== ''){
                group_field = '&group_field=' + group_field;
            }
            return $http.get(oipaUrl + '/v3/activity-aggregate-any/?format=json&reporting_organisation=NL-1&group_by='+group_by+group_field+'&aggregation_key='+aggregation_key);
        }
    }
})();