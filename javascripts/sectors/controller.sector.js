/**
* CountriesController
* @namespace oipa.countries.controllers
*/
var sectorLayoutTest = null;
(function () {
  'use strict';

  angular
    .module('oipa.sectors')
    .controller('SectorController', SectorController);

  SectorController.$inject = ['$scope', 'Sectors', 'templateBaseUrl', '$stateParams', 'FilterSelection', 'Aggregations', 'sectorMapping'];

  /**
  * @namespace CountriesController
  */
  function SectorController($scope, Sectors, templateBaseUrl, $stateParams, FilterSelection, Aggregations, sectorMapping) {
    var vm = this;
    vm.sector = null;
    vm.sector_id = parseInt($stateParams.sector_id);
    vm.sector_digit = 0;
    vm.filterSelection = FilterSelection;
    vm.selectedTab = 'samenvatting';

    vm.tabs = [
      {'id': 'samenvatting', 'name': 'Samenvatting', 'count': -1},
      {'id': 'activities', 'name': 'Projecten', 'count': -1},
      {'id': 'countries', 'name': 'Landen', 'count': -1},
      {'id': 'regions', 'name': 'Regio\'s', 'count': -1},
      {'id': 'implementing-organisations', 'name': 'Organisaties', 'count': -1},
    ]

    // to do , make this smarter
    function findSector(needle, haystack){
      
    }

    function listChildren(sector){
      // if()
    }

    function activate() {

      if(vm.sector_id < 100){
        vm.sector_digit = 2;
      } else if(100 < vm.sector_id < 9999){
        vm.sector_digit = 3;
      } else {
        vm.sector_digit = 5;
      }

      sector = findSector(vm.sector_id, sectorMapping.children);
      sectors = listChildren(sector);



      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
        vm.update(selectionString);
      }, true);

      // for each active sector, get the results
      Sectors.get(vm.sector_id).then(successFn, errorFn);

      function successFn(data, status, headers, config) {
        vm.sector = data.data;
        Sectors.selectedSectors.push({"sector_id":vm.sector.code,"name":vm.sector.name});
        FilterSelection.save();
      }
    }

    function errorFn(data, status, headers, config) {
      console.log("getting sectors failed");
    }

    vm.update = function(selectionString){

      if (selectionString.indexOf("sectors__in") < 0){ return false;}

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