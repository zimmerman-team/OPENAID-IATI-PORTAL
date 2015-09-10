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
            selectedActivityStatuses: m.selectedActivityStatuses
		};

		return ActivityStatus;
	}
})();