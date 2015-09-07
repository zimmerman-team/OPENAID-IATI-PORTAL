/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.sectors')
    .controller('SectorController', SectorController);

  SectorController.$inject = ['$scope', 'Sectors', 'templateBaseUrl', '$stateParams', 'FilterSelection', 'Aggregations'];

  /**
  * @namespace CountriesController
  */
  function SectorController($scope, Sectors, templateBaseUrl, $stateParams, FilterSelection, Aggregations) {
    var vm = this;
    vm.sector = null;
    vm.sector_id = $stateParams.sector_id;
    vm.filterSelection = FilterSelection;
    vm.selectedTab = 'samenvatting';

    vm.tabs = [
      {'id': 'samenvatting', 'name': 'Samenvatting', 'count': -1},
      {'id': 'activities', 'name': 'Projecten', 'count': -1},
      {'id': 'countries', 'name': 'Landen', 'count': -1},
      {'id': 'regions', 'name': 'Regio\'s', 'count': -1},
      {'id': 'implementing-organisations', 'name': 'Organisaties', 'count': -1},
    ]

    function activate() {

      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
        vm.update(selectionString);
      }, true);

      // for each active country, get the results
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