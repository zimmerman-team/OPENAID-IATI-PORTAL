/**
* Posts
* @namespace oipa.activityStatus
*/
(function () {
	'use strict';

	angular
		.module('oipa.activityStatus')
		.factory('ActivityStatus', ActivityStatus);

	ActivityStatus.$inject = ['$http', 'oipaUrl'];

	/**
	* @namespace ActivityStatus
	* @returns {Factory}
	*/
	function ActivityStatus($http, oipaUrl) {

		var activityStatuses = null;

		var ActivityStatus = {
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
        	if (this.activityStatuses == null){
	        	var data = {
				    "count": 6, 
				    "results": [
				        {
				            "code": "1", 
				            "name": "Pipeline/identification",
				        },
				        {
				            "code": "2", 
				            "name": "Implementation",
				        },
				        {
				            "code": "3", 
				            "name": "Completion",
				        },
				        {
				            "code": "4", 
				            "name": "Post-completion",
				        },
				        {
				            "code": "5", 
				            "name": "Cancelled",
				        },
				        {
				            "code": "6", 
				            "name": "Suspended",
				        }
				    ]
				};

				this.activityStatuses = data;
			}
			return this.activityStatuses;
        }

	}
})();