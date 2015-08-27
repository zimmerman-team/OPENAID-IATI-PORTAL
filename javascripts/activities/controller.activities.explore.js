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

      FilterSelection.reset();

      $scope.$watch('vm.submitSearch', function(submitSearch){
        if(submitSearch){
          Search.searchString = vm.searchValue;
          FilterSelection.save();
          vm.submitSearch = false;
        }
        
      }, true);
    }
    

  }

})();
