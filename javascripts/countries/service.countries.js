/**
* Posts
* @namespace ncs.collections.services
*/
(function () {
	'use strict';

	angular
		.module('oipa.countries')
		.factory('Countries', Countries);

	Countries.$inject = ['$http', 'oipaUrl'];

	/**
	* @namespace Filters
	* @returns {Factory}
	*/
	function Countries($http, oipaUrl) {
		var m = this;
		m.selectedCountries = [];

		var Countries = {
			selectedCountries: m.selectedCountries,
			all: all,
			getCountry: getCountry
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
            return $http.get(oipaUrl + '/countries?format=json&page_size=999&fields=code,name,location&fields[aggregations]=count', { cache: true });
        }


	    /**
	     * @name get
	     * @desc Get the Collections of a given user
	     * @param {string} filter_type The type to get filter options for
	     * @returns {Promise}
	     * @memberOf oipa.filters.services.Filters
	     */
	     function getCountry(code) {
	     	return $http.get(oipaUrl + '/countries/' + code + '?format=json&fields=code,name&fields[aggregations]=count,disbursement,commitment', { cache: true });
	     }
	}
})();