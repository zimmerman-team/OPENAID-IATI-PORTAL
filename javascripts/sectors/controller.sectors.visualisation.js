/**
* SectorsVisualisationController
* @namespace oipa.sectors
*/
(function () {
  'use strict';

  angular
    .module('oipa.sectors')
    .controller('SectorsVisualisationController', SectorsVisualisationController);

  SectorsVisualisationController.$inject = ['$scope', 'FilterSelection', 'Aggregations', 'sectorMapping'];

  /**
  * @namespace SectorsVisualisationController
  */
  function SectorsVisualisationController($scope, FilterSelection, Aggregations, sectorMapping) {
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
      Aggregations.aggregation('sector', 'count,disbursement', vm.selectionString).then(successFn, errorFn);

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
        sector5[data[i].sector.code] = {'disbursement':data[i].disbursement, 'count': data[i].count};
      }

      var mapping = angular.copy(sectorMapping);

      function loopChildren(arr){
        for (var i = 0;i < arr.length;i++){
          if(arr[i].hasOwnProperty('children')){
            loopChildren(arr[i].children);
          } else{
            if(sector5[arr[i].sector_id] != undefined){
              arr[i].disbursement = sector5[arr[i].sector_id].disbursement;
              arr[i].count = sector5[arr[i].sector_id].count;
            } else {
              arr[i].disbursement = 0;
              arr[i].count = 0;
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