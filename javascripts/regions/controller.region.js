/**
* RegionController
* @namespace oipa.regions
*/
(function () {
  'use strict';

  angular
    .module('oipa.regions')
    .controller('RegionController', RegionController);

  RegionController.$inject = ['$scope', '$stateParams', 'Regions', 'FilterSelection', 'Aggregations'];


  function RegionController($scope, $stateParams, Regions, FilterSelection, Aggregations) {
    var vm = this;
    vm.region = null;
    vm.region_id = $stateParams.region_id;

    vm.partnerType = '';
    vm.activityCount = '';
    vm.sectorCount = '';
    vm.organisationCount = '';
    vm.donorCount = '';
    vm.totalBudget = '';
    vm.filterSelection = FilterSelection;
    vm.selectedTab = 'samenvatting';

    vm.tabs = [
      {'id': 'samenvatting', 'name': 'Samenvatting', 'count': -1},
      {'id': 'activities', 'name': 'Projecten', 'count': -1},
      {'id': 'sectors', 'name': 'Sectoren', 'count': -1},
    ]

    function activate() {

      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
        vm.update(selectionString);
      }, true);

      Regions.get(vm.region_id).then(successFn, errorFn);
      
      function successFn(data, status, headers, config) {
        vm.region = data.data;
        Regions.selectedRegions.push({'region_id':vm.region.code,'name':vm.region.name});
        FilterSelection.toSave = true;
      }
    }

    function errorFn(data, status, headers, config) {
      console.log("getting region failed");
    }

    vm.update = function(selectionString){
      if (selectionString.indexOf("regions__in") < 0){ return false;}


    }

    activate();

  }
})();