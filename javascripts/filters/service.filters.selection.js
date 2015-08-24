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
		m.toReset = false;
		m.openPanel = '';
		m.openedPanel = '';
		
		var FilterSelection = {
			toSave: m.toSave,
			toReset: m.toReset,
			selectionString: m.selectionString,
			openPanel: m.openPanel,
			openedPanel: m.openedPanel
		};

		return FilterSelection;

		////////////////////

		
		
	}
})();