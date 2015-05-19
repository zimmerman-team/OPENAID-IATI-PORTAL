(function () {
	'use strict';

	angular
		.module('oipa.explore')
		.controller('ExploreController', ExploreController);

	ExploreController.$inject = ['$scope', 'Filters'];

	function ExploreController($scope, Filters){
		var vm = this;
		vm.dashboard = 'geomap'; // options: charts, geomap, list

		activate();


	    function activate() {
	    	
	    }

	    vm.setDashboard = function(id){
	    	vm.dashboard = id;
	    }

		$scope.hasOpenFilters = function(){
			return Filters.isOpenedHeader(null);
		}
	}

})();