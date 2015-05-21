/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.countries')
    .controller('CountryController', CountryController);

  CountryController.$inject = ['Countries', 'templateBaseUrl', '$stateParams', 'FilterSelection', 'Aggregations'];

  /**
  * @namespace CountriesController
  */
  function CountryController(Countries, templateBaseUrl, $stateParams, FilterSelection, Aggregations) {
    var vm = this;
    vm.country = null;
    vm.country_id = $stateParams.country_id;
    vm.openedPanel = '';
    vm.showSelection = false;
    vm.partnerType = '';
    vm.activityCount = '';
    vm.sectorCount = '';
    vm.organisationCount = '';
    vm.donorCount = '';
    vm.totalBudget = '';
    vm.dashboard = 'charts'; // options: charts, list, sectors, organisaties

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
      // for each active country, get the results
      Countries.getCountry(vm.country_id).then(successFn, errorFn);
      Countries.selectedCountries = [{"country_id":vm.country_id}];
      
      Aggregations.aggregation('recipient-country', 'iati-identifier', '&countries__in='+vm.country_id).then(function(data, status, headers, config){
        vm.activityCount = data.data[0]['activity_count'];
      }, errorFn);

      Aggregations.aggregation('recipient-country', 'disbursement', '&countries__in='+vm.country_id).then(function(data, status, headers, config){
        vm.totalBudget = data.data[0]['total_disbursements'];
      }, errorFn);

      Aggregations.aggregation('participating-org', 'iati-identifier', '&countries__in='+vm.country_id).then(function(data, status, headers, config){
        vm.organisationCount = data.data.length;
      }, errorFn);

      Aggregations.aggregation('reporting-org', 'iati-identifier', '&countries__in='+vm.country_id).then(function(data, status, headers, config){
        vm.donorCount = data.data.length;
      }, errorFn);

      Aggregations.aggregation('sector', 'iati-identifier', '&countries__in='+vm.country_id).then(function(data, status, headers, config){
        vm.sectorCount = data.data.length;
      }, errorFn);


      FilterSelection.toSave = true;


      if(partnerlanden[vm.country_id] !== undefined){
        vm.partnerType = partnerlanden[vm.country_id]; 
      } else {
        vm.partnerType = 'Overige';
      }

      function aggregationSuccesFn(data, status, headers, config){
        console.log(data);
      }


      function successFn(data, status, headers, config) {
        vm.country = data.data;
      }

      function errorFn(data, status, headers, config) {
        console.log("getting country failed");
      }
    }

    activate();

  }
})();