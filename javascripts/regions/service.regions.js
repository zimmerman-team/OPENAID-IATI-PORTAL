/**
* Posts
* @namespace ncs.collections.services
*/
(function () {
	'use strict';

	angular
		.module('oipa.regions')
		.factory('Regions', Regions);

	Regions.$inject = ['$http', 'oipaUrl'];

	/**
	* @namespace Filters
	* @returns {Factory}
	*/
	function Regions($http, oipaUrl) {
		var m = this;
		m.selectedRegions = [];
		
		var Regions = {
			selectedRegions: m.selectedRegions,
			all: all,
			get: get
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
            return $http.get(oipaUrl + '/regions?format=json&page_size=999&fields=code,name&fields[aggregations]=count', { cache: true });

        }


	    /**
	     * @name get
	     * @desc Get the Collections of a given user
	     * @param {string} filter_type The type to get filter options for
	     * @returns {Promise}
	     * @memberOf oipa.filters.services.Filters
	     */
	     function get(id) {
	     	return $http.get('/api/regions/' + id + '?format=json', { cache: true });
	     }
	}
})();