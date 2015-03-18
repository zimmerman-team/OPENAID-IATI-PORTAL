/**
* Posts
* @namespace ncs.collections.services
*/
(function () {
	'use strict';

	angular
		.module('oipa.filters')
		.factory('Filters', Filters);

	Filters.$inject = [];

	/**
	* @namespace Filters
	* @returns {Factory}
	*/
	function Filters() {

		// placed in factory because we need to access it from main scope
		var m = this;
		m.openedHeader = null;

		var Filters = {
			getOpenedHeader: getOpenedHeader,
			setOpenedHeader: setOpenedHeader,
			isOpenedHeader: isOpenedHeader
		};

		return Filters;

		////////////////////
		function getOpenedHeader(){
			return m.openedHeader;
		}

		function setOpenedHeader(slug){
			m.openedHeader = slug;
		}

		function isOpenedHeader(slug){
			return m.openedHeader === slug ? true : false;
		}

	}
})();