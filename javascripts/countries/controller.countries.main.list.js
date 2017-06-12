/**
* CountriesController
* @namespace oipa.countries
*/
(function () {
  'use strict';

  angular
    .module('oipa.countries')
    .controller('CountriesMainListController', CountriesMainListController);

  CountriesMainListController.$inject = ['$scope', 'TransactionAggregations', 'FilterSelection', 'templateBaseUrl'];

  /**
  * @namespace CountriesExploreController
  */
  function CountriesMainListController($scope, TransactionAggregations, FilterSelection, templateBaseUrl) {
    var vm = this;
    vm.filterSelection = FilterSelection;
    vm.countries = [];
    vm.totalCountries = 0;
    vm.order_by = 'recipient_country';
    vm.page = 1;
    vm.busy = false;
    vm.extraSelectionString = '';
    vm.templateBaseUrl = templateBaseUrl;
    vm.loading = true;
    vm.searchPage = false;
    vm.selectedCountryRelation = $scope.selectedCountryRelation;
    vm.unfilteredCountries = null;

    function activate() {
      // use predefined filters or the filter selection
      $scope.$watch("vm.filterSelection.selectionString", function (selectionString, oldString) {
        if(selectionString !== oldString){
          vm.loadCountries(selectionString);
        }
      }, true);

      $scope.$watch("searchValue", function (searchValue, oldSearchValue) {
        if(searchValue == undefined) {
          return;
        }
        if(searchValue !== oldSearchValue){
          searchValue == '' ? vm.extraSelectionString = '' : vm.extraSelectionString = '&q_field=recipient_country&q='+searchValue;
          vm.loadCountries();
          vm.loading = false;
          vm.searchPage = true;
        }
      }, true);

      if($scope.selectedCountryRelation != undefined){
        $scope.$watch('selectedCountryRelation', function (selectedCountryRelation) {
        	vm.selectedCountryRelation = selectedCountryRelation;
        	vm.updateCountries();
          }, true);
      }

      vm.loadCountries();
    }

    vm.updateCountries = function(){
    	if(!vm.unfilteredCountries){ return false; }

    	var countries = angular.copy(vm.unfilteredCountries);
    	var selectedCountryRelationMap = {};

  		for(var i = 0;i < vm.selectedCountryRelation.length;i++){
  		  selectedCountryRelationMap[vm.selectedCountryRelation[i]['name'].replace(/\s/g, '')] = true;
  		}

  		var results = countries.filter(function(country){
  			return selectedCountryRelationMap[partnerlanden[country.recipient_country.code]] !== undefined; 
  		});
  		vm.countries = results;
  		vm.totalCountries = vm.countries.length;
    }

    vm.toggleOrder = function(){
      vm.loadCountries(vm.filterSelection.selectionString);
    }

    vm.loadCountries = function(){
      vm.page = 1;
      TransactionAggregations.aggregation('recipient_country', 'activity_count,disbursement', vm.filterSelection.selectionString + vm.extraSelectionString, vm.order_by, 200, vm.page).then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        vm.unfilteredCountries = data.data.results;
        vm.updateCountries();
        vm.loading = false;
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data for country.block');
        vm.loading = false;
      }
    }

    activate();
  }
})();