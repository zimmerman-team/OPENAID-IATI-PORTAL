/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.implementingOrganisations')
    .controller('ImplementingOrganisationController', ImplementingOrganisationController);

  ImplementingOrganisationController.$inject = ['$scope', 'ImplementingOrganisations', 'templateBaseUrl', '$stateParams', 'FilterSelection', 'Aggregations'];

  /**
  * @namespace CountriesController
  */
  function ImplementingOrganisationController($scope, ImplementingOrganisations, templateBaseUrl, $stateParams, FilterSelection, Aggregations) {
    var vm = this;
    vm.organisation = null;
    vm.organisation_id = $stateParams.organisation_id;
    vm.openedPanel = '';
    vm.showSelection = false;
    vm.partnerType = '';
    vm.activityCount = '';
    vm.sectorCount = '';
    vm.countryCount = '';
    vm.donorCount = '';
    vm.totalBudget = '';
    vm.dashboard = 'charts'; // options: charts, list, sectors, landen
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
      ImplementingOrganisations.get(vm.organisation_id).then(successFn, errorFn);
      ImplementingOrganisations.selectedImplementingOrganisations = [{"organisation_id":vm.organisation_id}];
      FilterSelection.toSave = true;

      function successFn(data, status, headers, config) {
        vm.organisation = data.data;
      }

      function errorFn(data, status, headers, config) {
        console.log("getting country failed");
      }
    }

    function errorFn(data, status, headers, config) {
      console.log("getting country failed");
    }

    vm.update = function(selectionString){
      console.log(selectionString);
      if (selectionString.indexOf("participating_organisations__organisation__code__in") < 0){ return false;}

      Aggregations.aggregation('transaction-receiver-org', 'iati-identifier', selectionString).then(function(data, status, headers, config){
        vm.activityCount = data.data[0]['activity_count'];
      }, errorFn);

      Aggregations.aggregation('transaction-receiver-org', 'disbursement', selectionString).then(function(data, status, headers, config){
        vm.totalBudget = data.data[0]['total_disbursements'];
      }, errorFn);

      Aggregations.aggregation('recipient-country', 'iati-identifier', selectionString).then(function(data, status, headers, config){
        vm.countryCount = data.data.length;
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