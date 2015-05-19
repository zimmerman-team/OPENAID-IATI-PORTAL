(function () {
	'use strict';

	angular
		.module('oipa.explore')
		.controller('ExploreController', ExploreController);

	ExploreController.$inject = ['$scope', 'Filters'];

	function ExploreController($scope, Filters){
		var vm = this;
		vm.dashboard = 'geomap'; // options: charts, geomap, list
		vm.openedPanel = ''; // panels: 

		activate();

	    function activate() {
	    	
	    }

	    vm.setDashboard = function(id){
	    	vm.dashboard = id;
	    }

		vm.hasOpenFilters = function(){
			return vm.openedPanel.length;
		}

		vm.isOpenedHeader = function(slug){
	    	return vm.openedPanel == slug;
	    }

	    vm.setOpenedHeader = function(slug){
	    	vm.openedPanel = slug;
	    }

	    vm.toggleOpenPanel = function(slug){
			if(vm.isOpenedHeader(slug)){
				vm.setOpenedHeader('');  
			} else {
				vm.setOpenedHeader(slug);
			}
	    }



	    $scope.resetFilters = function(){
	    	console.log('resetFilters');
	    }

		vm.saveFilters = function(){
			console.log('saveFilters');
	      // logic to save the filters
	      // FilterSelection.toSave = true;
	      vm.openedPanel = '';
	  	}
	}

})();