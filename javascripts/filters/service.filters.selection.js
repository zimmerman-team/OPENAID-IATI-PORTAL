/**
* Posts
* @namespace ncs.collections.services
*/
(function () {
	'use strict';

	angular
		.module('oipa.filters')
		.factory('FilterSelection', FilterSelection);

	FilterSelection.$inject = ['$http', 'reportingOrganisationId', 'Countries', 'Regions', 'Budget', 'Sectors', 'Transaction', 'ImplementingOrganisations', 'ActivityStatus', 'Search'];

	/**
	* @namespace Filters
	* @returns {Factory}
	*/
	function FilterSelection($http, reportingOrganisationId, Countries, Regions, Budget, Sectors, Transaction, ImplementingOrganisations, ActivityStatus, Search) {
		var m = this;
	    m.selectedCountries = Countries.selectedCountries;
	    m.selectedRegions = Regions.selectedRegions;
	    m.selectedSectors = Sectors.selectedSectors;
	    m.selectedImplementingOrganisations = ImplementingOrganisations.selectedImplementingOrganisations;
	    m.selectedActivityStatuses = ActivityStatus.selectedActivityStatuses;
	    m.selectedBudget = Budget.budget;
	    m.selectedTransactionYear = Transaction.year;
	    m.search = Search;
		
		m.selectionString = '';
		m.openPanel = '';
		m.openedPanel = '';

		m.save = function(){
			m.updateSelectionString();
			FilterSelection.openedPanel = '';
		}

		m.updateSelectionString = function(){
      		
	      var selectList = [
	        m.selectArrayToString('countries', 'country_id', m.selectedCountries),
	        m.selectArrayToString('regions', 'region_id', m.selectedRegions),
	        m.selectArrayToString('sectors', 'sector_id', m.selectedSectors),
	        m.selectArrayToString('participating_organisations__organisation__code', 'organisation_id', m.selectedImplementingOrganisations),
	        m.selectArrayToString('activity_status', 'code', m.selectedActivityStatuses),
	      ];

	      if(m.selectedBudget.on){
	        selectList.push('&total_budget__gt='+m.selectedBudget.value[0]+'&total_budget__lt='+m.selectedBudget.value[1]);
	      }

	      if(m.selectedTransactionYear.on){
	        selectList.push('&transactions__transaction_date__gte='+m.selectedTransactionYear.value+'-01-01&transactions__transaction_date__lte='+m.selectedTransactionYear.value+'-12-31');
	      }

	      if(Search.searchString != ''){
	        selectList.push('&query='+Search.searchString);
	      }

	      FilterSelection.selectionString = selectList.join('');
	    }

	    m.selectArrayToString = function(header, id_slug, arr){

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

	    m.removeAll = function(selectedArr){
	      selectedArr.splice(0, selectedArr.length); 
	    }

	    m.reset = function(){

	      m.removeAll(m.selectedCountries);
	      m.removeAll(m.selectedRegions);
	      m.removeAll(m.selectedSectors);
	      m.removeAll(m.selectedImplementingOrganisations);
	      m.removeAll(m.selectedActivityStatuses);

	      Search.searchString = '';
	      Budget.toReset = true;
	      Budget.budget.budgetValue = [100000,300000];
	      Budget.budget.on = false;

	      Transaction.toReset = true;
	      Transaction.year.value = 2015;
	      Transaction.year.on = false;

	      m.save();
	    }
		
		var FilterSelection = {
			save: m.save,
			reset: m.reset,
			selectionString: m.selectionString,
			openPanel: m.openPanel,
			openedPanel: m.openedPanel
		};

		return FilterSelection;

		////////////////////

		

		
		
	}
})();