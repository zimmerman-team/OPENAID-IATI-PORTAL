/**
* Posts
* @namespace ncs.collections.services
*/
(function () {
	'use strict';

	angular
		.module('oipa.countries')
		.factory('Countries', Countries);

	Countries.$inject = ['$http', 'oipaUrl', 'reportingOrganisationId'];

	/**
	* @namespace Filters
	* @returns {Factory}
	*/
	function Countries($http, oipaUrl, reportingOrganisationId) {
		var m = this;
		m.selectedCountries = [];

		var Countries = {
			selectedCountries: m.selectedCountries,
			all: all,
			getCountry: getCountry,
			getActivities: getActivities
		};

		return Countries;


		////////////////////


		/**
         * @name all
         * @desc Try to get all countries
         * @returns {Promise}
         * @memberOf oipa.countries.services.Countries
         */
        function all() {
            var url = oipaUrl + '/activity-aggregate-any/?format=json&group_by=recipient-country&aggregation_key=iati-identifier';
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
	    function getCountry(code) {
<<<<<<< HEAD
	     	return $http.get(oipaUrl + '/countries/' + code + '?format=json&fields=code,name&fields[aggregations]=count,disbursement,commitment', { cache: true });
	    }

	    function getActivities(code){
	    	return $http.get(oipaUrl + '/v3/activities/?format=json&reporting_organisation__in=NL-1&countries='+code, { cache: true });
=======
            var url = oipaUrl + '/country-activities/?format=json&countries__in='+code+'&page_size=999&fields=code,name,location&fields[aggregations]=count';
            if(reportingOrganisationId){
                url += '&reporting_organisation__in=' + reportingOrganisationId;
            }
            return $http.get(url, { cache: true });
>>>>>>> 9193658b5ca824f13c154d181b6bcd25200fc13c
	    }
	}
})();