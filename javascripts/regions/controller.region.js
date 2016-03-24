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
      {'id': 'samenvatting', 'name': 'Summary', 'count': -1},
      {'id': 'activities', 'name': 'Projects', 'count': -1},
      {'id': 'sectors', 'name': 'Sectors', 'count': -1},
      {'id': 'implementing-organisations', 'name': 'Organisations', 'count': -1},
    ]

    function activate() {
      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
        vm.update(selectionString);
      }, true);

      Regions.getRegion(vm.region_id).then(successFn, errorFn);

      function successFn(data, status, headers, config) {
        vm.region = data.data;
        Regions.selectedRegions.push({'count': 0, 'recipient_region': {'code':vm.region.code,'name':vm.region.name}});
        FilterSelection.save();
      }
    }

    vm.update = function(selectionString){
      if (selectionString.indexOf("recipient_region") < 0){ return false;}

      Aggregations.aggregation('transaction_date_year', 'disbursement', selectionString, 'year').then(function(data, status, headers, config){
        vm.disbursements_by_year = data.data.results;
        vm.disbursements_total = 0;
        for (var i = vm.disbursements_by_year.length - 1; i >= 0; i--) {
          vm.disbursements_total += vm.disbursements_by_year[i].disbursement;
        };
      }, errorFn);

      Aggregations.aggregation('transaction_date_year', 'commitment', selectionString, 'year').then(function(data, status, headers, config){
        vm.commitments_by_year = data.data.results;
        vm.commitments_total = 0;
        for (var i = vm.commitments_by_year.length - 1; i >= 0; i--) {
          vm.commitments_total += vm.commitments_by_year[i].commitment;
        };
      }, errorFn);

      Aggregations.aggregation('budget_per_year', 'budget', selectionString, 'year').then(function(data, status, headers, config){
        vm.budget_by_year = data.data.results;
        vm.budget_total = 0;
        for (var i = vm.budget_by_year.length - 1; i >= 0; i--) {
          vm.budget_total += vm.budget_by_year[i].budget;
        };
      }, errorFn);
    }


    activate();

  }
})();