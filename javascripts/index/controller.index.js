(function () {
	'use strict';

	angular
		.module('oipa.index')
		.controller('IndexController', IndexController);

	IndexController.$inject = ['Filters'];

	function IndexController(Filters){
		var vm = this;
		vm.hasOpenFilters = function(){
			return Filters.isOpenedHeader(null);
		}
	}


})();