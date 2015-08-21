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
      {'id': 'samenvatting', 'name': 'Samenvatting', 'count': ''},
      {'id': 'activities', 'name': 'Projecten', 'count': '(1)'},
      {'id': 'sectors', 'name': 'Sectoren', 'count': '(4)'},
    ]

    function activate() {

      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
        vm.update(selectionString);
        FilterSelection.openedPanel = '';
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

      Aggregations.aggregation('recipient-region', 'iati-identifier', selectionString).then(function(data, status, headers, config){
        if(data.data.length == 0){vm.activityCount = 0 } else { vm.activityCount = data.data[0]['activity_count']};
      }, errorFn);

      Aggregations.aggregation('recipient-region', 'disbursement', selectionString).then(function(data, status, headers, config){
        if(data.data.length == 0){vm.totalBudget = 0 } else { vm.totalBudget = data.data[0]['total_disbursements']};
      }, errorFn);

      Aggregations.aggregation('transaction-receiver-org', 'iati-identifier', selectionString).then(function(data, status, headers, config){
        vm.organisationCount = data.data.length;
      }, errorFn);

      Aggregations.aggregation('reporting-org', 'iati-identifier', selectionString).then(function(data, status, headers, config){
        vm.donorCount = data.data.length;
      }, errorFn);

      Aggregations.aggregation('sector', 'iati-identifier', selectionString).then(function(data, status, headers, config){
        vm.sectorCount = data.data.length;
      }, errorFn);
    }

    activate();

  }
})();