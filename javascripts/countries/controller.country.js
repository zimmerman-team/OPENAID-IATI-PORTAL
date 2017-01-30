/**
* CountryController
* @namespace oipa.countries
*/
(function () {
  'use strict';

  angular
    .module('oipa.countries')
    .controller('CountryController', CountryController);

  CountryController.$inject = ['$scope', 'Countries', 'templateBaseUrl', '$stateParams', 'FilterSelection', 'TransactionAggregations', 'Aggregations'];

  function CountryController($scope, Countries, templateBaseUrl, $stateParams, FilterSelection, TransactionAggregations, Aggregations) {
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
      {'id': 'receiver-organisations', 'name': 'Organisations', 'count': -1},
    ]

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
        Countries.selectedCountries.push({'count': 0, 'recipient_country': {'code':vm.country.code,'name':vm.country.name}});
        FilterSelection.save();
        vm.loading = false;
      }
    }

    function errorFn(data, status, headers, config) {
      console.log("getting country failed");
      vm.loading = false;
    }

    vm.update = function(selectionString){
      if (selectionString.indexOf("recipient_country") < 0){ return false;}
      
      TransactionAggregations.aggregation('recipient_country', 'disbursement,expenditure,incoming_fund', selectionString).then(function(data, status, headers, config){

        for(var i = 0;i < data.data.results.length;i++){
          if(data.data.results[i].recipient_country.code == vm.country_id){
            vm.aggregated_transactions = data.data.results[i];
          }
        }
      }, errorFn);

      TransactionAggregations.aggregation('transaction_date_year', 'disbursement', selectionString, 'transaction_date_year').then(function(data, status, headers, config){
        vm.disbursements_by_year = data.data.results;
        vm.disbursements_total = 0;
        for (var i = vm.disbursements_by_year.length - 1; i >= 0; i--) {
          vm.disbursements_total += vm.disbursements_by_year[i].disbursement;
        };
      }, errorFn);

      TransactionAggregations.aggregation('transaction_date_year', 'commitment', selectionString, 'transaction_date_year').then(function(data, status, headers, config){
        vm.commitments_by_year = data.data.results;
        vm.commitments_total = 0;
        for (var i = vm.commitments_by_year.length - 1; i >= 0; i--) {
          vm.commitments_total += vm.commitments_by_year[i].commitment;
        };
      }, errorFn);

      Aggregations.aggregation('budget_period_end_year', 'value', selectionString, 'budget_period_end_year').then(function(data, status, headers, config){
        vm.budget_by_year = data.data.results;
        vm.budget_total = 0;
        for (var i = vm.budget_by_year.length - 1; i >= 0; i--) {
          vm.budget_total += vm.budget_by_year[i].value;
        };
      }, errorFn);

    }

    activate();
  }
})();