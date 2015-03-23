(function () {
	'use strict';

	angular
		.module('oipa.explore')
		.controller('ExploreController', ExploreController);

	ExploreController.$inject = ['Filters'];

	function ExploreController(Filters){
		var vm = this;
		vm.hasOpenFilters = function(){
			return Filters.isOpenedHeader(null);
		}
	}


})();