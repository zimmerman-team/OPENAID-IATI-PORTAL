
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
            var url = oipaUrl + '/activity-aggregate-any/?format=json&group_by=participating-org&aggregation_key=iati-identifier';
            if(reportingOrganisationId){
                url += '&reporting_organisation__in=' + reportingOrganisationId;
            }
            return $http.get(url, { cache: true });    
        }

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
	}
})();