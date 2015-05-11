/**
* Posts
* @namespace oipa.filters
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