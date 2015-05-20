/**
* Posts
* @namespace oipa.activities
*/
(function () {
    'use strict';

    angular
        .module('oipa.activities')
        .factory('Activities', Activities);

    Activities.$inject = ['$http', 'oipaUrl', 'reportingOrganisationId'];

    /**
    * @namespace Activities
    * @returns {Factory}
    */
    function Activities($http, oipaUrl, reportingOrganisationId) {
        var m = this;

        var Activities = {
            all: all,
            get: get,
            list: list
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
            var url = oipaUrl + '/activities?format=json&page_size=10&fields=iati-identifier,name'
            if(reportingOrganisationId){
                url += '&reporting_organisation__in=' + reportingOrganisationId
            }
            return $http.get(url, { cache: true });
        }

        function list(filters, limit, order_by, offset){
            var url = oipaUrl + '/activity-list/?format=json'

            if(reportingOrganisationId){
                url += '&reporting_organisation__in=' + reportingOrganisationId
            }
            if(filters !== undefined){
                url += filters;
            }
            if(order_by !== undefined){
                url += '&order_by=' + order_by;
            }
            if(offset !== undefined){
                url += '&offset=' + offset;
            }
            if(limit !== undefined){
                url += '&limit=' + limit;
            }

            return $http.get(url, { cache: true });
        }

        /**
         * @name get
         * @desc Get the Collections of a given user
         * @param {string} filter_type The type to get filter options for
         * @returns {Promise}
         * @memberOf oipa.filters.services.Filters
         */
        function get(code) {
            return $http.get(oipaUrl + '/activity-list/' + code + '/?format=json', { cache: true });
        }
    }
})();