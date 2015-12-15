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
    vm.indirectDisbursements = '';

    vm.tabs = [
      {'id': 'samenvatting', 'name': 'Summary', 'count': -1},
      {'id': 'activities', 'name': 'Projects', 'count': -1},
      {'id': 'sectors', 'name': 'Sectors', 'count': -1},
      {'id': 'implementing-organisations', 'name': 'Organisations', 'count': -1},
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
        vm.partnerType = 'Other';
      }

      function successFn(data, status, headers, config) {
        vm.country = data.data;
        Countries.selectedCountries.push({'country_id':vm.country.code,'name':vm.country.name});
        FilterSelection.save();
      }
    }

    function errorFn(data, status, headers, config) {
      console.log("getting country failed");
    }

    vm.update = function(selectionString){
      if (selectionString.indexOf("countries__in") < 0){ return false;}
      
      Aggregations.aggregation('location_countries', 'location_disbursement', FilterSelection.selectionString).then(indirectCountrySuccessFn, errorFn);

      function indirectCountrySuccessFn(data, status, headers, config){

        if(data.data.results.length > 0){
          vm.indirectDisbursements = data.data.results[0].total_value;
        }
      }

      Aggregations.aggregation('transaction__transaction-date_year', 'disbursement', selectionString).then(function(data, status, headers, config){
        vm.disbursements_by_year = data.data.results;
        vm.disbursements_total = 0;
        for (var i = vm.disbursements_by_year.length - 1; i >= 0; i--) {
          vm.disbursements_total += vm.disbursements_by_year[i].total_disbursements;
        };
      }, errorFn);

      Aggregations.aggregation('transaction__transaction-date_year', 'commitment', selectionString).then(function(data, status, headers, config){
        vm.commitments_by_year = data.data.results;
        vm.commitments_total = 0;
        for (var i = vm.commitments_by_year.length - 1; i >= 0; i--) {
          vm.commitments_total += vm.commitments_by_year[i].total_commitments;
        };
      }, errorFn);

      Aggregations.aggregation('budget__period_start_year', 'budget__value', selectionString).then(function(data, status, headers, config){
        vm.budget_by_year = data.data.results;
        vm.budget_total = 0;
        for (var i = vm.budget_by_year.length - 1; i >= 0; i--) {
          vm.budget_total += vm.budget_by_year[i].budget__value;
        };
      }, errorFn);

    }

    activate();

  }
})();