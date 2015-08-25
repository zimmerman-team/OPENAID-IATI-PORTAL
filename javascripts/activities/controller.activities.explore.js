(function () {
  'use strict';

  angular
    .module('oipa.activities')
    .controller('ActivitiesExploreController', ActivitiesExploreController);

  ActivitiesExploreController.$inject = ['$scope', 'FilterSelection', 'Search'];

  function ActivitiesExploreController($scope, FilterSelection, Search){
    var vm = this;
    vm.searchValue = '';
    vm.submitSearch = false;

    activate();

    function activate(){

      FilterSelection.toReset = true;
      FilterSelection.selectionString = '';

      $scope.$watch('vm.submitSearch', function(submitSearch){
        if(submitSearch){
          Search.searchString = vm.searchValue;
          FilterSelection.toSave = true;
          vm.submitSearch = false;
        }
        
      }, true);
    }
    

  }

})();
