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
            getStatuses: getStatuses
		};

		function getStatuses(statuses) {

            var url = oipaUrl + '/activities/aggregations/?format=json&group_by=activity_status&aggregations=count';
            if(reportingOrganisationId){
                url += '&reporting_organisation__in=' + reportingOrganisationId;
            }
            url += '&activity_status=' + statuses;
            return $http.get(url, { cache: true });
        }

		return ActivityStatus;
	}
})();