
/**
* Posts
* @namespace oipa.implementingOrganisations
*/
(function () {
	'use strict';

	angular
		.module('oipa.implementingOrganisations')
		.factory('ImplementingOrganisations', ImplementingOrganisations);

	ImplementingOrganisations.$inject = ['$http', 'oipaUrl', 'reportingOrganisationId'];

	/**
	* @namespace Filters
	* @returns {Factory}
	*/
	function ImplementingOrganisations($http, oipaUrl, reportingOrganisationId) {
		this.selectedImplementingOrganisations = [];

		var ImplementingOrganisations = {
			selectedImplementingOrganisations: this.selectedImplementingOrganisations,
			get: get,
			getActivities: getActivities
		};

		return ImplementingOrganisations;

		////////////////////

	    /**
	     * @name get
	     * @desc Get a single organisation
	     * @param {string} id the id of the organisation
	     * @returns {Promise}
	     * @memberOf oipa.implementingOrganisations
	     */
	     function get(id) {
	     	return $http.get(oipaUrl + '/organisations/' + id + '/?format=json', { cache: true });
	     }

		 function getActivities(id) {
	     	return $http.get(oipaUrl + '/activities/?format=json&participating_organisation_name=' + id , { cache: true });

		 }
	}
})();
