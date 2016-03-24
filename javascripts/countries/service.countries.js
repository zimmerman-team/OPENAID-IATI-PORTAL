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
			getCountry: getCountry,
			getCountries: getCountries
		};

		return Countries;

	    function getCountry(code) {
	     	return $http.get(oipaUrl + '/countries/' + code + '/?format=json', { cache: true });
	    }

	    function getCountries(countries) {

            var url = oipaUrl + '/activities/aggregations/?format=json&group_by=recipient_country&aggregations=count';
            if(reportingOrganisationId){
                url += '&reporting_organisation__in=' + reportingOrganisationId;
            }
            url += '&recipient_country=' + countries;
            return $http.get(url, { cache: true });
        }


	}

})();