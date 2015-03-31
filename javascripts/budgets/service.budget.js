/**
* Posts
* @namespace ncs.collections.services
*/
(function () {
	'use strict';

	angular
		.module('oipa.budget')
		.factory('Budget', Budget);

	Budget.$inject = ['$http'];

	/**
	* @namespace Filters
	* @returns {Factory}
	*/
	function Budget($http) {
		var m = this;
		m.budget = {
	      min: 0,
	      max: 50000000
	    };
		

		var Budget = {
			all: all 
		};

		return Budget;



		////////////////////


		/**
         * @name all
         * @desc Try to get all countries
         * @returns {Promise}
         * @memberOf oipa.countries.services.Countries
         */
        function all() {
        	return m.budget;
        }
	}
})();