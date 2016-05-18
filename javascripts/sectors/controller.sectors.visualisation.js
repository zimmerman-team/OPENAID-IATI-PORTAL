/**
* SectorsVisualisationController
* @namespace oipa.sectors
*/
(function () {
  'use strict';

  angular
    .module('oipa.sectors')
    .controller('SectorsVisualisationController', SectorsVisualisationController);

  SectorsVisualisationController.$inject = ['$scope', 'FilterSelection', 'TransactionAggregations', 'sectorMapping'];

  /**
  * @namespace SectorsVisualisationController
  */
  function SectorsVisualisationController($scope, FilterSelection, TransactionAggregations, sectorMapping) {
    var vm = this;
    vm.filterSelection = FilterSelection;
    vm.selectionString = '';
    vm.sunburstData = '';
    vm.refreshSunburst = false;
    vm.searchValue = '';
    vm.submitSearch = false;

    activate();

    function activate() {
      FilterSelection.reset();

      $scope.$watch('vm.submitSearch', function(submitSearch){
        if(submitSearch){
          vm.submitSearch = false;
        }
      }, true);

      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
          vm.selectionString = selectionString;
          vm.activateSunburst();
      }, true);

    }

    vm.activateSunburst = function(){
      TransactionAggregations.aggregation('sector', 'activity_count,disbursement', vm.selectionString).then(successFn, errorFn);

      function successFn(data, status, headers, config) {
        vm.reformatSunburstData(data.data.results);
      }

      function errorFn(data, status, headers, config) {
        console.log("getting sectors failed");
      }
    }

    vm.reformatSunburstData = function(data){

      var sector5 = {};
      for(var i = 0;i < data.length;i++){
        sector5[data[i].sector.code] = {'disbursement':data[i].disbursement, 'activity_count': data[i].activity_count};
      }

      var mapping = angular.copy(sectorMapping);

      function loopChildren(arr){
        for (var i = 0;i < arr.length;i++){
          if(arr[i].hasOwnProperty('children')){
            loopChildren(arr[i].children);
          } else{
            if(sector5[arr[i].sector_id] != undefined){
              arr[i].disbursement = sector5[arr[i].sector_id].disbursement;
              arr[i].activity_count = sector5[arr[i].sector_id].activity_count;
            } else {
              arr[i].disbursement = 0;
              arr[i].activity_count = 0;
            }
          }
        }
      }

      loopChildren(mapping.children);
      vm.sunburstData = angular.copy(mapping);
      vm.refreshSunburst = true;
    }

  }
})();