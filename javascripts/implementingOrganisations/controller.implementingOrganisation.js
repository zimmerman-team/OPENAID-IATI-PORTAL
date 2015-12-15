/**
* CountriesController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.implementingOrganisations')
    .controller('ImplementingOrganisationController', ImplementingOrganisationController);

  ImplementingOrganisationController.$inject = ['$scope', '$stateParams', 'ImplementingOrganisations', 'FilterSelection', 'Aggregations'];

  /**
  * @namespace CountriesController
  */
  function ImplementingOrganisationController($scope, $stateParams, ImplementingOrganisations, FilterSelection, Aggregations) {
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
      ImplementingOrganisations.selectedImplementingOrganisations.push({'organisation_id': vm.organisation_id, 'name': ''});

      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
        vm.update(selectionString);
      }, true);

      ImplementingOrganisations.get(vm.organisation_id).then(successFn, errorFn);

      function successFn(data, status, headers, config) {

        vm.organisation = data.data;
        ImplementingOrganisations.selectedImplementingOrganisations[0] = {'organisation_id':vm.organisation.code,'name':vm.organisation.name};
        vm.filterSelection.save();
        // setTimeout(function(){ vm.update(vm.filterSelection.selectionString); }, 3000);
      }

    }

    function errorFn(data, status, headers, config) {
      console.log("getting country failed");
    }

    vm.update = function(selectionString){

      if (selectionString.indexOf("participating_organisations__organisation__code__in") < 0) return false;

      Aggregations.aggregation('transaction__transaction-date_year', 'disbursement', selectionString).then(function(data, status, headers, config){
        vm.disbursements_by_year = data.data.results;
        vm.disbursements_total = 0;
        for (var key in vm.disbursements_by_year) {
          if (vm.disbursements_by_year.hasOwnProperty(key)) {
            vm.disbursements_total += vm.disbursements_by_year[key].total_disbursements;
          }
        };
      }, errorFn);

      Aggregations.aggregation('transaction__transaction-date_year', 'commitment', selectionString).then(function(data, status, headers, config){
        vm.commitments_by_year = data.data.results;
        vm.commitments_total = 0;
        for (var key in vm.commitments_by_year) {
          if (vm.commitments_by_year.hasOwnProperty(key)) {
            vm.commitments_total += vm.commitments_by_year[key].total_commitments;
          }
        };
      }, errorFn);

      Aggregations.aggregation('budget__period_start_year', 'budget__value', selectionString).then(function(data, status, headers, config){
        vm.budget_by_year = data.data.results;
        vm.budget_total = 0;
        for (var key in vm.budget_by_year) {
          if (vm.budget_by_year.hasOwnProperty(key)) {
            vm.budget_total += vm.budget_by_year[key].budget__value;
          }
        };
      }, errorFn);

    }

    

  }
})();