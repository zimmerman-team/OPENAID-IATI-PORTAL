/**
* Posts
* @namespace ncs.collections.services
*/
(function () {
	'use strict';

	angular
		.module('oipa.regions')
		.factory('Regions', Regions);

	Regions.$inject = ['$http', 'oipaUrl', 'reportingOrganisationId'];

	/**
	* @namespace Filters
	* @returns {Factory}
	*/
	function Regions($http, oipaUrl, reportingOrganisationId) {
		var m = this;
		m.selectedRegions = [];
		
		var Regions = {
			selectedRegions: m.selectedRegions,
			all: all,
			get: get,
		};

		return Regions;


		////////////////////

		/**
         * @name all
         * @desc Try to get all countries
         * @returns {Promise}
         * @memberOf oipa.countries.services.Countries
         */
        function all() {

        	var url = oipaUrl + '/aggregate/?format=json&group_by=recipient-region&aggregation_key=iati-identifier';
	        if(reportingOrganisationId){
	            url += '&reporting_organisation__in=' + reportingOrganisationId;
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
	     function get(id) {
	     	return $http.get(oipaUrl + '/regions/' + id + '/?format=json', { cache: true });
	     }
	}
})();