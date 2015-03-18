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

		var Countries = {
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
            return $http.get(oipaUrl + '/countries?format=json&page_size=999&fields=code,name&fields[aggregations]=count');

        }


	    /**
	     * @name get
	     * @desc Get the Collections of a given user
	     * @param {string} filter_type The type to get filter options for
	     * @returns {Promise}
	     * @memberOf oipa.filters.services.Filters
	     */
	     function getCountry(code) {
	     	return $http.get('/api/countries/' + code + '?format=json');
	     }
	}
})();