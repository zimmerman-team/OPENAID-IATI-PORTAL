/**
* Posts
* @namespace oipa.sectors.services
*/
(function () {
	'use strict';

	angular
		.module('oipa.sectors.services')
		.factory('Sectors', Sectors);

	Sectors.$inject = ['$http', 'oipaUrl'];

	/**
	* @namespace Sectors
	* @returns {Factory}
	*/
	function Sectors($http, oipaUrl) {

		var Sectors = {
			all: all 
		};

		return Sectors;

		////////////////////

		/**
         * @name all
         * @desc Try to get all sectors
         * @returns {Promise}
         * @memberOf oipa.sectors.services.Sectors
         */
        function all() {
            return $http.get(oipaUrl + '/sectors?format=json&page_size=999&fields=code,name&fields[aggregations]=count');
        }

	    /**
	     * @name get
	     * @desc Get a specific sector
	     * @param {string} filter_type The type to get filter options for
	     * @returns {Promise}
	     * @memberOf oipa.sectors.services.Sectors
	     */
	     function get(id) {
	     	return $http.get('/api/sectors/' + id + '?format=json');
	     }
	}
})();