/**
* FiltersSelectionController
* @namespace oipa.filters.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .controller('FiltersSelectionController', FiltersSelectionController);

  FiltersSelectionController.$inject = ['$scope', 'FilterSelection', 'Countries', 'Regions', 'Budget', 'Sectors', 'ImplementingOrganisations', 'ActivityStatus', 'Search'];

  /**
  * @namespace FiltersController
  */
  function FiltersSelectionController($scope, FilterSelection, Countries, Regions, Budget, Sectors, ImplementingOrganisations, ActivityStatus, Search) {
    var vm = this;
    vm.selectedCountries = Countries.selectedCountries;
    vm.selectedRegions = Regions.selectedRegions;
    vm.selectedSectors = Sectors.selectedSectors;
    vm.selectedImplementingOrganisations = ImplementingOrganisations.selectedImplementingOrganisations;
    vm.selectedActivityStatuses = ActivityStatus.selectedActivityStatuses;
    vm.selectedBudget = Budget.budget;
    vm.filterSelection = FilterSelection;

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.filters.controllers.FiltersController
    */
    function activate() {

      $scope.$watch("vm.filterSelection.toSave", function (toSave) {

        if(toSave){
          // update
          FilterSelection.openedPanel = '';
          vm.updateSelectionString();
          FilterSelection.toSave = false;
        }
      }, true);

      $scope.$watch("vm.filterSelection.toReset", function (toReset) {

        if(toReset){
          // update
          vm.resetSelection();
          FilterSelection.toReset = false;
        }
      }, true);

    }

    vm.updateSelectionString = function(){
      
      var selectList = [
        vm.selectArrayToString('countries', 'country_id', vm.selectedCountries),
        vm.selectArrayToString('regions', 'region_id', vm.selectedRegions),
        vm.selectArrayToString('sectors', 'sector_id', vm.selectedSectors),
        vm.selectArrayToString('participating_organisations__organisation__code', 'organisation_id', vm.selectedImplementingOrganisations),
        vm.selectArrayToString('activity_status', 'code', vm.selectedActivityStatuses),
      ];

      if(vm.selectedBudget.on){
        selectList.push('&total_budget__gt='+vm.selectedBudget.value[0]+'&total_budget__lt='+vm.selectedBudget.value[1]);
      }

      if(Search.searchString != ''){
        selectList.push('&query='+Search.searchString);
      }

      FilterSelection.selectionString = selectList.join('');
      
    }

    vm.selectArrayToString = function(header, id_slug, arr){

      var headerName = '';
      var list = [];

      if(arr.length > 0){
        headerName = '&' + header + '__in=';
        for(var i = 0; i < arr.length; i++){
            list.push(arr[i][id_slug]);
        }
      }

      return headerName + list.join(',');
    }

    vm.removeFilter = function(selectedArr, item_id) {
      for (var i = 0; i < selectedArr.length;i++){
        if(selectedArr[i].code == item_id){
          selectedArr.splice(i, 1);
          break;
        }
      }
      FilterSelection.toSave = true;
    }

    vm.removeAll = function(selectedArr){
      selectedArr.splice(0, selectedArr.length); 
    }

    vm.resetSelection = function(){

      vm.removeAll(vm.selectedCountries);
      vm.removeAll(vm.selectedRegions);
      vm.removeAll(vm.selectedSectors);
      vm.removeAll(vm.selectedImplementingOrganisations);
      vm.removeAll(vm.selectedActivityStatuses);

      Search.searchString = '';
      Budget.toReset = true;
      Budget.budget.budgetValue = [100000,300000];
      Budget.budget.on = false;
      FilterSelection.toSave = true;
    }

    activate();
  }
})();