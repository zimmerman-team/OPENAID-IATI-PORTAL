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
            var url = oipaUrl + '/aggregate/?format=json&group_by=recipient-country&aggregation_key=iati-identifier';
            if(reportingOrganisationId){
                url += '&reporting_organisation__in=' + reportingOrganisationId;
            }
            return $http.get(url, { cache: true });
        }

	    function getCountry(code) {
	     	return $http.get(oipaUrl + '/countries/' + code + '?format=json&fields=code,name&fields[aggregations]=count,disbursement,commitment', { cache: true });
	    }

	    function getActivities(code){
            var url = oipaUrl + '/country-activities/?format=json&countries__in='+code+'&page_size=999&fields=code,name,location&fields[aggregations]=count';
            if(reportingOrganisationId){
                url += '&reporting_organisation__in=' + reportingOrganisationId;
            }
            return $http.get(url, { cache: true });
	    }
	}
})();