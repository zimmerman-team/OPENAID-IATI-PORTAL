/**
* CountryController
* @namespace oipa.countries
*/
(function () {
  'use strict';

  angular
    .module('oipa.countries')
    .controller('CountryController', CountryController);

  CountryController.$inject = ['$scope', 'Countries', 'templateBaseUrl', '$stateParams', 'FilterSelection', 'Aggregations'];

  /**
  * @namespace CountryController
  */
  function CountryController($scope, Countries, templateBaseUrl, $stateParams, FilterSelection, Aggregations) {
    var vm = this;
    vm.country = null;
    vm.country_id = $stateParams.country_id;
    vm.partnerType = '';
    vm.filterSelection = FilterSelection;
    vm.selectedTab = 'samenvatting';

    vm.tabs = [
      {'id': 'samenvatting', 'name': 'Samenvatting', 'count': -1},
      {'id': 'activities', 'name': 'Projecten', 'count': -1},
      {'id': 'sectors', 'name': 'Sectoren', 'count': -1},
      {'id': 'implementing-organisations', 'name': 'Organisaties', 'count': -1},
    ]


    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.countries.controllers.CountryController
    */
    function activate() {

      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
        vm.update(selectionString);
      }, true);

      // for each active country, get the results
      Countries.getCountry(vm.country_id).then(successFn, errorFn);
      
      if(partnerlanden[vm.country_id] !== undefined){
        vm.partnerType = partnerlanden[vm.country_id]; 
      } else {
        vm.partnerType = 'Overige';
      }

      function successFn(data, status, headers, config) {
        vm.country = data.data;
        Countries.selectedCountries.push({'country_id':vm.country.code,'name':vm.country.name});
        FilterSelection.toSave = true;
      }
    }

    function errorFn(data, status, headers, config) {
      console.log("getting country failed");
    }

    vm.update = function(selectionString){
      if (selectionString.indexOf("countries__in") < 0){ return false;}

      Aggregations.aggregation('recipient-country', 'iati-identifier', selectionString).then(function(data, status, headers, config){
        if(data.data.length == 0){vm.activityCount = 0 } else { vm.activityCount = data.data[0]['activity_count']};
      }, errorFn);

      Aggregations.aggregation('recipient-country', 'disbursement', selectionString).then(function(data, status, headers, config){
        if(data.data.length == 0){vm.totalBudget = 0 } else { vm.totalBudget = data.data[0]['total_disbursements']};
      }, errorFn);

      Aggregations.aggregation('transaction__receiver-org', 'iati-identifier', selectionString).then(function(data, status, headers, config){
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