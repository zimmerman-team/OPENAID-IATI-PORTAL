(function () {
	'use strict';

	angular
		.module('oipa.explore')
		.controller('ExploreController', ExploreController);

	ExploreController.$inject = ['$scope', 'Filters'];

	function ExploreController($scope, Filters){
		var vm = this;
		vm.dashboard = 'charts'; // options: charts, geomap, list

		activate();

	    function activate() {
	    	
	    }

	    vm.setDashboard = function(id){
	    	vm.dashboard = id;
	    }

		$scope.hasOpenFilters = function(){
			return Filters.isOpenedHeader(null);
		}

		$scope.isOpenedHeader = function(slug){
	    	return Filters.isOpenedHeader(slug);
	    }

	    $scope.setOpenedHeader = function(slug){
	    	Filters.setOpenedHeader(slug);
	    }



	    $scope.resetFilters = function(){
	      
	    }

	    $scope.saveFilters = function(){
	      // logic to save the filters
	      // FilterSelection.toSave = true;
	      Filters.setOpenedHeader(null);
	    }

	    $scope.cancelFilters = function(){
	      // vm.resetFilters();
	      Filters.setOpenedHeader(null);
	    }
	}

})();