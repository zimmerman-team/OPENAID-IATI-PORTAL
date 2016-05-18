
/**
* Posts
* @namespace oipa.receiverOrganisations
*/
(function () {
	'use strict';

	angular
		.module('oipa.receiverOrganisations')
		.factory('receiverOrganisations', receiverOrganisations);

	receiverOrganisations.$inject = ['$http', 'oipaUrl', 'reportingOrganisationId'];

	/**
	* @namespace Filters
	* @returns {Factory}
	*/
	function receiverOrganisations($http, oipaUrl, reportingOrganisationId) {
		this.selectedreceiverOrganisations = [];

		var receiverOrganisations = {
			selectedreceiverOrganisations: this.selectedreceiverOrganisations,
			get: get,
			getActivities: getActivities
		};

		return receiverOrganisations;

		////////////////////

	    /**
	     * @name get
	     * @desc Get a single organisation
	     * @param {string} id the id of the organisation
	     * @returns {Promise}
	     * @memberOf oipa.receiverOrganisations
	     */
	     function get(id) {
	     	return $http.get(oipaUrl + '/organisations/' + id + '/?format=json', { cache: true });
	     }

		 function getActivities(id) {
	     	return $http.get(oipaUrl + '/activities/?format=json&receiver_organisation_primary_name=' + id , { cache: true });

		 }
	}
})();
