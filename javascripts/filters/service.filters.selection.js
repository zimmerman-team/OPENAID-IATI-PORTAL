/**
* Posts
* @namespace ncs.collections.services
*/
(function () {
	'use strict';

	angular
		.module('oipa.filters')
		.factory('FilterSelection', FilterSelection);

	FilterSelection.$inject = ['$http'];

	/**
	* @namespace Filters
	* @returns {Factory}
	*/
	function FilterSelection($http) {
		var m = this;
		m.filterSelection = [];

		var FilterSelection = {
			get: get 
		};

		return FilterSelection;

		////////////////////

		function add(item){
			m.push(item);
		}

		function delete(item){
			
		}

	    function get() {
	   		return m.filterSelection;
	    }
	}
})();