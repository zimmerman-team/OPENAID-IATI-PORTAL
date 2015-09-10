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
    vm.filterSelection = FilterSelection;
    vm.selectedTab = 'samenvatting';

    vm.tabs = [
      {'id': 'samenvatting', 'name': 'Samenvatting', 'count': -1},
      {'id': 'activities', 'name': 'Projecten', 'count': -1},
      {'id': 'sectors', 'name': 'Sectoren', 'count': -1},
      {'id': 'implementing-organisations', 'name': 'Organisaties', 'count': -1},
    ]

    function activate() {
      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
        vm.update(selectionString);
      }, true);

      Regions.get(vm.region_id).then(successFn, errorFn);
      
      function successFn(data, status, headers, config) {
        vm.region = data.data;
        Regions.selectedRegions.push({'region_id':vm.region.code,'name':vm.region.name});
        FilterSelection.save();
      }
    }

    function errorFn(data, status, headers, config) {
      console.log("getting region failed");
    }

    vm.update = function(selectionString){
      if (selectionString.indexOf("regions__in") < 0){ return false;}

      Aggregations.aggregation('transaction__transaction-date_year', 'disbursement', selectionString).then(function(data, status, headers, config){
        vm.disbursements_by_year = data.data.results;
      }, errorFn);

      Aggregations.aggregation('transaction__transaction-date_year', 'commitment', selectionString).then(function(data, status, headers, config){
        vm.commitments_by_year = data.data.results;
      }, errorFn);

      Aggregations.aggregation('budget__period_start_year', 'budget__value', selectionString).then(function(data, status, headers, config){
        vm.budget_by_year = data.data.results;
      }, errorFn);
    }

    activate();

  }
})();