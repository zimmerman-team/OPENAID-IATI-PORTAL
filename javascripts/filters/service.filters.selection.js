/**
* Posts
* @namespace ncs.collections.services
*/
(function () {
	'use strict';

	angular
		.module('oipa.filters')
		.factory('FilterSelection', FilterSelection);

	FilterSelection.$inject = ['$http', 'reportingOrganisationId'];

	/**
	* @namespace Filters
	* @returns {Factory}
	*/
	function FilterSelection($http, reportingOrganisationId) {
		var m = this;
		
		m.selectionString = '';

		var FilterSelection = {
			selectionString: m.selectionString,
			selectionToString: selectionToString
		};

		return FilterSelection;

		////////////////////


	    /**
	     * @name selectionToString
	     * @desc Take the array of filter types + selected items and make a string out of it
	     */
	    function selectionToString(filters){
	    	
	    }
	}
})();