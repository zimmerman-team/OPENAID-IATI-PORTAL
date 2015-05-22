(function () {
	'use strict';

	angular
		.module('oipa.explore')
		.controller('ExploreController', ExploreController);

	ExploreController.$inject = ['$sce', '$scope', 'Filters', 'FilterSelection'];

	function ExploreController($sce, $scope, Filters, FilterSelection){
		var vm = this;
		vm.dashboard = 'charts'; // options: charts, geomap, list
		vm.openedPanel = ''; // panels: 
		vm.showSelection = false;
		vm.filterSelection = FilterSelection;
		vm.selectionString = '';

		vm.buttonTexts = {
			'recipient_countries': {'text': 'Lorem Ipsum', hoverShow: false},
			'recipient_regions': {'text': 'Lorem Ipsum', hoverShow: false},

		};
		vm.currentHoverText = '';


		activate();

	    function activate() {
	    	$scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
		    	vm.selectionString = selectionString;
		    	vm.openedPanel = '';
		    }, true);
	    }

	   	vm.hoverIn = function(id){
	      vm.buttonTexts[id].hoverShow = true;
	      vm.currentHoverText =  $sce.trustAsHtml(vm.buttonTexts[id].text);
	    };

	    vm.hoverOut = function(id){
	        vm.buttonTexts[id].hoverShow = false;
	    };

	    vm.setDashboard = function(id){
	    	vm.dashboard = id;
	    	vm.openedPanel = '';
	    	vm.showSelection = false;
	    }

		vm.hasOpenFilters = function(){
			return vm.openedPanel.length;
		}

		vm.isOpenedHeader = function(slug){
	    	return vm.openedPanel == slug;
	    }

	    vm.setOpenedHeader = function(slug){
	    	vm.openedPanel = slug;
	    	vm.showSelection = false;
	    }

	    vm.toggleOpenPanel = function(slug){
			if(vm.isOpenedHeader(slug)){
				vm.openedPanel = '';
				vm.saveFilters();
			} else {
				vm.setOpenedHeader(slug);
			}
	    }

	    vm.toggleSelection = function(){
	    	vm.showSelection = !vm.showSelection;
	    	vm.openedPanel = '';
	    }

	    vm.resetFilters = function(){
	    	FilterSelection.toReset = true;
	    }

		vm.saveFilters = function(){
	    	FilterSelection.toSave = true;
	    	vm.openedPanel = '';
	  	}

	  	vm.showDownload = function(){
	  		console.log("TO DO; show download options");
	  	}

	  	vm.share = function(medium){
	  		console.log("TO DO; open "+medium+" share url in new window");
	  	}
	}

})();