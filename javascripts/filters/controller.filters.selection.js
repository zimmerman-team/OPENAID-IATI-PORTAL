/**
* FiltersSelectionController
* @namespace oipa.filters.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .controller('FiltersSelectionController', FiltersSelectionController);

  FiltersSelectionController.$inject = ['$scope', '$state', '$stateParams', '$location', 'FilterSelection', 'Countries', 'Regions', 'Budget', 'Sectors', 'Transaction', 'receiverOrganisations', 'ActivityStatus', 'Search'];

  function FiltersSelectionController($scope, $state, $stateParams, $location, FilterSelection, Countries, Regions, Budget, Sectors, Transaction, receiverOrganisations, ActivityStatus, Search) {
    var vm = this;
    vm.selectedCountries = Countries.selectedCountries;
    vm.selectedRegions = Regions.selectedRegions;
    vm.selectedSectors = Sectors.selectedSectors;
    vm.selectedreceiverOrganisations = receiverOrganisations.selectedreceiverOrganisations;
    vm.selectedActivityStatuses = ActivityStatus.selectedActivityStatuses;
    vm.selectedBudget = Budget.budget;
    vm.selectedTransactionYear = Transaction.year;
    vm.filterSelection = FilterSelection;
    vm.search = Search;
    vm.currentPage = null;
    vm.state = $state;
    vm.filterCount = 0;

    vm.updateFilterCount = function(){
      var count = 0;
      if(vm.currentPage != 'country'){ count += vm.selectedCountries.length; }
      if(vm.currentPage != 'region'){ count += vm.selectedRegions.length; }
      if(vm.currentPage != 'sector'){ count += vm.selectedSectors.length; }
      if(vm.currentPage != 'organisation'){ count += vm.selectedreceiverOrganisations.length; }
      count += vm.selectedActivityStatuses.length;
      count += vm.search.searchString.length;
      if(vm.selectedBudget.on){ count += 1; }
      if(vm.selectedTransactionYear.on){ count += 1; }
      if(count != vm.filterCount){ vm.filterCount = count; }
    }

    function activate(){

      vm.parametersToSelection();

      $scope.$watch('vm.state.current.name', function(name){
        if(name){
          vm.currentPage = name;
        }
      }, true);

      $scope.$watch('vm.filterSelection.selectionString', function(selectionString){
        if(!selectionString.length){
          if(vm.filterCount != 0){
            vm.filterCount = 0;
          }
        } else {
          vm.updateFilterCount();
        }

        // update url string
        vm.selectionToParameters();

      }, true);
    }

    vm.selectionToParameters = function(){

      var path = $state.current.url.split('?')[0];
      var selectionString = vm.filterSelection.selectionString;

      if(path.indexOf(':') !== -1){

        var detail_pages = ['country_id', 'region_id', 'activity_id','organisation_id', 'sector_id'];
        for(var i = 0;i < detail_pages.length;i++){
          if(path.indexOf(detail_pages[i]) !== -1){

            // we are at a detail page with name detail_pages[i]
            // remove sector filter from selection string

            var detail_mapping = {
              'country_id': 'recipient_country',
              'region_id': 'recipient_region',
              'activity_id': 'activity',
              'organisation_id': 'receiver_organisation_primary_name',
              'sector_id': 'sector'
            }

            var single_filter_key = detail_mapping[detail_pages[i]];
          
            selectionString = _.map(selectionString.split('&'), function(single_filter){ 
              if(single_filter.length){
                var single_filter_splitted = single_filter.split('=');
                if(single_filter_splitted[0] == single_filter_key){
                  return '';
                }
              }

              return single_filter; 
            });

            selectionString.splice(0, 1);
            selectionString = selectionString.join('&');
            break;
          }
        }
      }

      if(selectionString.length){
        $location.search('filters', selectionString);
      } else {
        $location.search('filters',null);
      }
    }

    vm.parametersToSelection = function(){
      // parametersToSelection
      //
      // description: 

      // get parameters
      var filters = decodeURIComponent($stateParams.filters);

      var filter_headers = filters.split('&');

      var filter_obj = {};

      for(var i = 0;i < filter_headers.length;i++){
        var name_value = filter_headers[i].split('=');
        filter_obj[name_value[0]] = name_value[1];
      }

      // add to filters under the right header (with the wrong name)
      if(filter_obj['recipient_country'] != undefined && vm.selectedCountries.length == 0){
        Countries.getCountries(filter_obj['recipient_country']).then(function(data, status, headers, config){

          for(var i = 0;i < data.data.results.length; i++){
            vm.selectedCountries.push(data.data.results[i]);
          }
          vm.filterSelection.save();
        }, errorFn);
      }

      // add to filters under the right header (with the wrong name)
      if(filter_obj['recipient_region'] != undefined && vm.selectedRegions.length == 0){
        Regions.getRegions(filter_obj['recipient_region']).then(function(data, status, headers, config){

          for(var i = 0;i < data.data.results.length; i++){
            vm.selectedRegions.push(data.data.results[i]);
          }
          vm.filterSelection.save();
        }, errorFn);
      }

      // add to filters under the right header (with the wrong name)
      if(filter_obj['sector'] != undefined && vm.selectedSectors.length == 0){
        Sectors.getSectors(filter_obj['sector']).then(function(data, status, headers, config){

          for(var i = 0;i < data.data.results.length; i++){
            vm.selectedSectors.push(data.data.results[i]);
          }
          vm.filterSelection.save();
        }, errorFn);
      }

      // add to filters under the right header (with the wrong name)
      if(filter_obj['activity_status'] != undefined){
        ActivityStatus.getStatuses(filter_obj['activity_status']).then(function(data, status, headers, config){

          for(var i = 0;i < data.data.results.length; i++){
            vm.selectedActivityStatuses.push(data.data.results[i]);
          }
          vm.filterSelection.save();
        }, errorFn);
      }
      
      // add to filters under the right header (with the wrong name)
      if(filter_obj['receiver_organisation_primary_name'] != undefined  && vm.selectedreceiverOrganisations.length == 0){
        var participating_organisation_names = filter_obj['receiver_organisation_primary_name'].split(',');

        for(var i = 0;i < participating_organisation_names.length; i++){
          vm.selectedreceiverOrganisations.push({'receiver_org': participating_organisation_names[i]}); 
        }
      }

      // transaction year filter
      if(filter_obj['transaction_date_year'] != undefined){
        vm.selectedTransactionYear.on = true;
        vm.selectedTransactionYear.value = filter_obj['transaction_date_year'];
      }

      // search filter
      if(filter_obj['q'] != undefined){
        vm.search.searchString = filter_obj['q'];
      }

      if(filter_obj['total_budget_gte'] != undefined && filter_obj['total_budget_lte'] != undefined){

        Budget.budget.on = true;
        Budget.budget.value = [filter_obj['total_budget_gte'], filter_obj['total_budget_lte']];
      }

      vm.filterSelection.save();
    }

    vm.removeFilter = function(selectedArr, name, item_id) {

      for (var i = 0; i < selectedArr.length;i++){
        // org filter, ugly if 
        if(typeof selectedArr[i][name] != 'undefined') {
          if(selectedArr[i][name].code == item_id){
            selectedArr.splice(i, 1);
            break;
          }
        }
        else if(selectedArr[i].name == item_id){
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
      vm.selectedBudget.on = false;
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

    activate();
  }
})();