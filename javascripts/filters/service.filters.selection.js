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
		m.toSave = false;
		
		var FilterSelection = {
			toSave: m.toSave,
			selectionString: m.selectionString
		};

		return FilterSelection;

		////////////////////

		
		
	}
})();