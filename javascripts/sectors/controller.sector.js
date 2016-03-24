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
      {'id': 'samenvatting', 'name': 'Summary', 'count': -1},
      {'id': 'activities', 'name': 'Projects', 'count': -1},
      {'id': 'countries', 'name': 'Countries', 'count': -1},
      {'id': 'regions', 'name': 'Regions', 'count': -1},
      {'id': 'implementing-organisations', 'name': 'Organisations', 'count': -1},
      {'id': 'sectors', 'name': 'Sectors', 'count': -1},
    ]

    // to do , make this smarter
    function findSector(needle, haystack){
      for(var i = 0; i < haystack.length; i++){
        if(haystack[i].sector_id == needle){
          vm.sector = haystack[i];
          break;
        }
        if(haystack[i].hasOwnProperty('children')){
          findSector(needle, haystack[i].children);
        }
      }
    }

    function listChildren(arr, sector){
      if(sector.hasOwnProperty('children')){
        for(var i = 0; i < sector.children.length; i++){
          if(parseInt(sector.children[i].sector_id) > 9999){
            arr.push(sector.children[i]);  
          }
          if(sector.children[i].hasOwnProperty('children')){
            arr = listChildren(arr, sector.children[i]);
          }
        }
      }
      return arr;
    }

    function activate() {

      if(vm.sector_id < 100){
        vm.sector_digit = 2;
      } else if(100 < vm.sector_id && vm.sector_id < 9999){
        vm.sector_digit = 3;
      } else {
        vm.sector_digit = 5;
      }
      findSector(vm.sector_id, sectorMapping.children);

      if (vm.sector) { 
        
        Sectors.selectedSectors.push({'sector': {"code":vm.sector.sector_id,"name":vm.sector.name}});
  
        FilterSelection.save();

        $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
          vm.update(selectionString);
        }, true);
        vm.pageUrl = encodeURIComponent(vm.pageUrlDecoded);
        vm.shareDescription = encodeURIComponent('View the aid projects of the RVO on ' + vm.pageUrlDecoded);
      }
    }

    vm.update = function(selectionString){

      if (selectionString.indexOf("sector") < 0){ return false;}

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