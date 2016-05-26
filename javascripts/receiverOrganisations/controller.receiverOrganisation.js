/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.receiverOrganisations')
    .controller('receiverOrganisationController', receiverOrganisationController);

  receiverOrganisationController.$inject = ['$scope', '$stateParams', 'receiverOrganisations', 'FilterSelection', 'Aggregations', 'TransactionAggregations'];

  /**
  * @namespace CountriesController
  */
  function receiverOrganisationController($scope, $stateParams, receiverOrganisations, FilterSelection, Aggregations, TransactionAggregations) {
    var vm = this;
    vm.organisation = null;
    vm.organisation_id = $stateParams.organisation_id;
    vm.filterSelection = FilterSelection;
    vm.selectionString = '';
    vm.selectedTab = 'samenvatting';

    vm.tabs = [
      {'id': 'samenvatting', 'name': 'Summary', 'count': -1},
      {'id': 'activities', 'name': 'Projects', 'count': -1},
      {'id': 'sectors', 'name': 'Sectors', 'count': -1},
      {'id': 'countries', 'name': 'Countries', 'count': -1},
      {'id': 'regions', 'name': 'Regions', 'count': -1},
    ]

    activate();

    function activate() {
      receiverOrganisations.selectedreceiverOrganisations.push({'code': vm.organisation_id, 'name': vm.organisation_id, 'receiver_org': vm.organisation_id});
      vm.filterSelection.save();
      
      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
        vm.update(selectionString);
      }, true);

      
      

      // receiverOrganisations.get(vm.organisation_id).then(successFn, errorFn);

      // function successFn(data, status, headers, config) {

      //   vm.organisation = data.data;
      //   receiverOrganisations.selectedreceiverOrganisations[0] = ;
      //   vm.filterSelection.save();
        
      //   // setTimeout(function(){ vm.update(vm.filterSelection.selectionString); }, 3000);
      // }
    }

    function errorFn(data, status, headers, config) {
      console.log("getting receiving organisation failed");
    }

    vm.update = function(selectionString){

      if (selectionString.indexOf("receiver_organisation_primary_name") < 0) return false;

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

      Aggregations.aggregation('budget_year', 'budget', selectionString, 'budget_year').then(function(data, status, headers, config){
        vm.budget_by_year = data.data.results;
        vm.budget_total = 0;
        for (var i = vm.budget_by_year.length - 1; i >= 0; i--) {
          vm.budget_total += vm.budget_by_year[i].budget;
        };
      }, errorFn);

    }
  }
})();