/**
* FiltersSelectionController
* @namespace oipa.filters.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .controller('FiltersSelectionController', FiltersSelectionController);

  FiltersSelectionController.$inject = ['$scope', 'FilterSelection', 'Countries', 'Regions', 'Budget', 'Sectors', 'ImplementingOrganisations'];

  /**
  * @namespace FiltersController
  */
  function FiltersSelectionController($scope, FilterSelection, Countries, Regions, Budget, Sectors, ImplementingOrganisations) {
    var vm = this;
    vm.selectedCountries = Countries.selectedCountries;
    vm.selectedRegions = Regions.selectedRegions;
    vm.selectedSectors = Sectors.selectedSectors;
    vm.selectedImplementingOrganisations = ImplementingOrganisations.selectedImplementingOrganisations;
    vm.filterSelection = FilterSelection;

    // vm.selectedActivityDate = ActivityDate.selectedActivityDates;
    // vm.selectedBudget = Budget.budget;
    // vm.selectedPolicyMarkers = PolicyMarkers.selectedPolicyMarkers;
    // vm.selectedActivityStatus = ActivityStatus.selectedActivityStatus;
    // vm.selectedDocuments = DocumentLink.selectedDocumentLinks;

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.filters.controllers.FiltersController
    */
    function activate() {

      $scope.$watch("vm.filterSelection.toSave", function (toSave) {

        if(toSave){
          // update
          vm.updateSelectionString();
          FilterSelection.toSave = false;
        }
      }, true);

    }

    vm.updateSelectionString = function(){
    
      var selectList = [
        vm.selectArrayToString('countries', vm.selectedCountries),
        vm.selectArrayToString('regions', vm.selectedRegions),
        vm.selectArrayToString('sectors', vm.selectedSectors),
        vm.selectArrayToString('implementingOrganisations', vm.selectedImplementingOrganisations),
      ];

      FilterSelection.selectionString = selectList.join('');
    }

    vm.selectArrayToString = function(header, arr){

      var headerName = '';
      var list = [];

      if(arr.length > 0){
        headerName = '&' + header + '__in=';
        for(var i = 0; i < arr.length; i++){
            list.push(arr[i].id);
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
    }

    activate();
  }
})();