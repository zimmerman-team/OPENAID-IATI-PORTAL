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
    vm.openedPanel = '';
    vm.showSelection = false;
    vm.partnerType = '';
    vm.activityCount = '';
    vm.countryCount = '';
    vm.organisationCount = '';
    vm.donorCount = '';
    vm.totalBudget = '';
    vm.dashboard = 'charts'; // options: charts, list, sectors, organisaties
    vm.filterSelection = FilterSelection;


    vm.hasOpenFilters = function(){
      return vm.openedPanel.length;
    }

    vm.isOpenedHeader = function(slug){
      return vm.openedPanel == slug;
    }

    vm.setOpenedHeader = function(slug){
      vm.openedPanel = slug;
      vm.showSelection = false;
    }

    vm.toggleOpenPanel = function(slug){
      if(vm.isOpenedHeader(slug)){
        vm.openedPanel = '';
        vm.saveFilters();
      } else {
        vm.setOpenedHeader(slug);
      }
    }

    vm.toggleSelection = function(){
      vm.showSelection = !vm.showSelection;
      vm.openedPanel = '';
    }

    vm.resetFilters = function(){
      FilterSelection.toReset = true;
    }

    vm.saveFilters = function(){
      FilterSelection.toSave = true;
      vm.openedPanel = '';
    }

    vm.showDownload = function(){
      console.log("TO DO; show download options");
    }

    vm.share = function(medium){
      console.log("TO DO; open "+medium+" share url in new window");
    }


    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.countries.controllers.CountryController
    */
    function activate() {

      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
        vm.update(selectionString);
        vm.openedPanel = '';
      }, true);

      // for each active country, get the results
      Sectors.get(vm.sector_id).then(successFn, errorFn);
      Sectors.selectedSectors = [{"sector_id":vm.sector_id}];
      FilterSelection.toSave = true;

      function successFn(data, status, headers, config) {
        vm.sector = data.data;
      }

      function errorFn(data, status, headers, config) {
        console.log("getting country failed");
      }
    }

    function errorFn(data, status, headers, config) {
      console.log("getting country failed");
    }

    vm.update = function(selectionString){

      if (selectionString.indexOf("sectors__in") < 0){ return false;}

      Aggregations.aggregation('sector', 'iati-identifier', selectionString).then(function(data, status, headers, config){
        vm.activityCount = data.data[0]['activity_count'];
      }, errorFn);

      Aggregations.aggregation('sector', 'disbursement', selectionString).then(function(data, status, headers, config){
        vm.totalBudget = data.data[0]['total_disbursements'];
      }, errorFn);

      Aggregations.aggregation('transaction-receiver-org', 'iati-identifier', selectionString).then(function(data, status, headers, config){
        vm.organisationCount = data.data.length;
      }, errorFn);

      Aggregations.aggregation('reporting-org', 'iati-identifier', selectionString).then(function(data, status, headers, config){
        vm.donorCount = data.data.length;
      }, errorFn);

      Aggregations.aggregation('recipient-country', 'iati-identifier', selectionString).then(function(data, status, headers, config){
        vm.countryCount = data.data.length;
      }, errorFn);
    }

    activate();

  }
})();