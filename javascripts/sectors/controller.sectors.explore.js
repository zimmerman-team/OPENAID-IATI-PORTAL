/**
* SectorsController
* @namespace oipa.sectors.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.sectors')
    .controller('SectorsExploreController', SectorsExploreController);

  SectorsExploreController.$inject = ['$scope', 'FilterSelection', 'Aggregations'];

  /**
  * @namespace SectorsController
  */
  function SectorsExploreController($scope, FilterSelection, Aggregations) {
    var vm = this;
    vm.searchValue = '';
    vm.sectorSearchValue = '';
    vm.submitSearch = false;
    activate();

    function activate() {
      FilterSelection.reset();

      $scope.$watch('vm.submitSearch', function(submitSearch){
        if(submitSearch){
          vm.sectorSearchValue = vm.searchValue;
          vm.submitSearch = false;
        }
      }, true);

    }





  }
})();