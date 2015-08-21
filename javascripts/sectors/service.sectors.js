/**
* Posts
* @namespace oipa.sectors.services
*/
(function () {
	'use strict';

	angular
		.module('oipa.sectors')
		.factory('Sectors', Sectors);

	Sectors.$inject = ['$http', 'oipaUrl', 'reportingOrganisationId'];

	/**
	* @namespace Sectors
	* @returns {Factory}
	*/
	function Sectors($http, oipaUrl, reportingOrganisationId) {
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
        function all() {

            var url = oipaUrl + '/aggregate/?format=json&group_by=sector&aggregation_key=iati-identifier';
            if(reportingOrganisationId){
                url += '&reporting_organisation__in=' + reportingOrganisationId;
            }
            return $http.get(url, { cache: true });
        }

	    /**
	     * @name get
	     * @desc Get a specific sector
	     * @param {string} filter_type The type to get filter options for
	     * @returns {Promise}
	     * @memberOf oipa.sectors.services.Sectors
	     */
	     function get(id) {
	     	return $http.get(oipaUrl + '/sectors/' + id + '/?format=json', { cache: true });
	     }
	}
})();