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

		var Filters = {};

		return Filters;
	}
})();