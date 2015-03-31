(function () {
	'use strict';

	angular
		.module('oipa.explore')
		.controller('ExploreController', ExploreController);

	ExploreController.$inject = ['$scope', 'Filters'];

	function ExploreController($scope, Filters){
		var vm = this;

		activate();

	    function activate() {
	      
	    }

		$scope.hasOpenFilters = function(){
			return Filters.isOpenedHeader(null);
		}
	}

})();