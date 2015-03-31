/**
* Posts
* @namespace oipa.sectors.services
*/
(function () {
	'use strict';

	angular
		.module('oipa.sectors')
		.factory('Sectors', Sectors);

	Sectors.$inject = ['$http', 'oipaUrl'];

	/**
	* @namespace Sectors
	* @returns {Factory}
	*/
	function Sectors($http, oipaUrl) {
		this.selectedSectors = [];
		var Sectors = {
			selectedSectors: this.selectedSectors,
			all: all,
			get: get
		};

		return Sectors;

		////////////////////

		/**
         * @name all
         * @desc Try to get all sectors
         * @returns {Promise}
         * @memberOf oipa.sectors.services.Sectors
         */
        function all(filters) {
        	if (!filters){
        		filters = '';
        	}
            return $http.get(oipaUrl + '/sectors?format=json&page_size=999&fields=code,name&fields[aggregations]=count' + filters, { cache: true });
        }

	    /**
	     * @name get
	     * @desc Get a specific sector
	     * @param {string} filter_type The type to get filter options for
	     * @returns {Promise}
	     * @memberOf oipa.sectors.services.Sectors
	     */
	     function get(id) {
	     	return $http.get('/api/sectors/' + id + '?format=json', { cache: true });
	     }
	}
})();