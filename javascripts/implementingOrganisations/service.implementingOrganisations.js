
/**
* Posts
* @namespace ncs.collections.services
*/
(function () {
	'use strict';

	angular
		.module('oipa.implementingOrganisations')
		.factory('ImplementingOrganisations', ImplementingOrganisations);

	ImplementingOrganisations.$inject = ['$http', 'oipaUrl'];

	/**
	* @namespace Filters
	* @returns {Factory}
	*/
	function ImplementingOrganisations($http, oipaUrl) {

		var ImplementingOrganisations = {
			all: all 
		};

		return ImplementingOrganisations;

		////////////////////

		/**
         * @name all
         * @desc Try to get all countries
         * @returns {Promise}
         * @memberOf oipa.countries.services.Countries
         */
        function all() {
            return $http.get(oipaUrl + '/organisations?format=json&page_size=999&fields=code,name&fields[aggregations]=count');
        }

	    /**
	     * @name get
	     * @desc Get the Collections of a given user
	     * @param {string} filter_type The type to get filter options for
	     * @returns {Promise}
	     * @memberOf oipa.filters.services.Filters
	     */
	     function get(id) {
	     	return $http.get('/api/countries/' + id + '?format=json');
	     }
	}
})();