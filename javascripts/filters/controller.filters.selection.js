/**
* FiltersSelectionController
* @namespace oipa.filters.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .controller('FiltersSelectionController', FiltersSelectionController);

  FiltersSelectionController.$inject = ['$scope', 'FilterSelection', 'Countries', 'Regions', 'Budget', 'Sectors', 'Transaction', 'ImplementingOrganisations', 'ActivityStatus', 'Search'];

  function FiltersSelectionController($scope, FilterSelection, Countries, Regions, Budget, Sectors, Transaction, ImplementingOrganisations, ActivityStatus, Search) {
    var vm = this;
    vm.selectedCountries = Countries.selectedCountries;
    vm.selectedRegions = Regions.selectedRegions;
    vm.selectedSectors = Sectors.selectedSectors;
    vm.selectedImplementingOrganisations = ImplementingOrganisations.selectedImplementingOrganisations;
    vm.selectedActivityStatuses = ActivityStatus.selectedActivityStatuses;
    vm.selectedBudget = Budget.budget;
    vm.selectedTransactionYear = Transaction.year;
    vm.filterSelection = FilterSelection;
    vm.search = Search;

    vm.removeFilter = function(selectedArr, item_name, item_id) {
      for (var i = 0; i < selectedArr.length;i++){
        if(selectedArr[i][item_name] == item_id){
          selectedArr.splice(i, 1);
          break;
        }
      }
      FilterSelection.save();
    }

    vm.removeAll = function(selectedArr){
      FilterSelection.removeAll(selectedArr);
    }

    vm.removeBudgetFilter = function(){
      vm.selectedBudget.on = true;
      vm.selectedBudget.value = [0,2000000000];
      FilterSelection.save();
      Budget.toReset = true;
    }

    vm.removeTransactionYearFilter = function(){
      vm.selectedTransactionYear.on = false;
      vm.selectedTransactionYear.year = 2015;
      FilterSelection.save();
      Transaction.toReset = true;
    }

    

    vm.removeSearch = function(){
      Search.searchString = '';
      FilterSelection.save();
    }

  }
})();