/**
* Posts
* @namespace oipa.activityStatus
*/
(function () {
	'use strict';

	angular
		.module('oipa.activityStatus')
		.factory('ActivityStatus', ActivityStatus);

	ActivityStatus.$inject = ['$http', 'oipaUrl', 'reportingOrganisationId'];

	/**
	* @namespace ActivityStatus
	* @returns {Factory}
	*/
	function ActivityStatus($http, oipaUrl, reportingOrganisationId) {

        var m = this;
        m.selectedActivityStatuses = [];

		var ActivityStatus = {
            selectedActivityStatuses: m.selectedActivityStatuses,
			all: all 
		};

		return ActivityStatus;

		////////////////////

		/**
         * @name all
         * @desc Try to get all activity statuses
         * @returns {Promise}
         * @memberOf oipa.activityStatus.activityStatus
         */
        function all() {
        	var url = oipaUrl + '/aggregate/?format=json&group_by=activity-status&aggregation_key=iati-identifier';
            if(reportingOrganisationId){
                url += '&reporting_organisation__in=' + reportingOrganisationId;
            }
            return $http.get(url, { cache: true });
        }

	}
})();