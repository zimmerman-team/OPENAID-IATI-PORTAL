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
      {'id': 'sectors', 'name': 'Sectoren', 'count': -1},
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
      } else if(100 < vm.sector_id < 9999){
        vm.sector_digit = 3;
      } else {
        vm.sector_digit = 5;
      }
      findSector(vm.sector_id, sectorMapping.children);
      var sectors = listChildren([],vm.sector);
      for (var i = 0;i < sectors.length;i++){
        Sectors.selectedSectors.push({"sector_id":sectors[i].sector_id,"name":sectors[i].name});
      }
      FilterSelection.save();

      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
        vm.update(selectionString);
      }, true);
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