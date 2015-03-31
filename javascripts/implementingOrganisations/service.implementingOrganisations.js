
/**
* Posts
* @namespace oipa.implementingOrganisations
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
		this.selectedImplementingOrganisations = [];

		var ImplementingOrganisations = {
			selectedImplementingOrganisations: this.selectedImplementingOrganisations,
			all: all,
			get: get 
		};

		return ImplementingOrganisations;

		////////////////////

		/**
         * @name all
         * @desc Try to get all implementing organisations
         * @returns {Promise}
         * @memberOf oipa.implementingOrganisations
         */
        function all() {
            return $http.get(oipaUrl + '/organisations?format=json&page_size=999&fields=code,name&fields[aggregations]=count', { cache: true });
        }

	    /**
	     * @name get
	     * @desc Get a single organisation
	     * @param {string} id the id of the organisation
	     * @returns {Promise}
	     * @memberOf oipa.implementingOrganisations
	     */
	     function get(id) {
	     	return $http.get('/api/organisations/' + id + '?format=json', { cache: true });
	     }
	}
})();