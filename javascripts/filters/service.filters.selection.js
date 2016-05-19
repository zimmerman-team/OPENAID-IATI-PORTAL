/**
* Posts
* @namespace ncs.collections.services
*/
(function () {
	'use strict';

	angular
		.module('oipa.filters')
		.factory('FilterSelection', FilterSelection);

	FilterSelection.$inject = ['$http', 'reportingOrganisationId', 'Countries', 'Regions', 'Budget', 'Sectors', 'Transaction', 'receiverOrganisations', 'ActivityStatus', 'Search'];

	/**
	* @namespace Filters
	* @returns {Factory}
	*/
	function FilterSelection($http, reportingOrganisationId, Countries, Regions, Budget, Sectors, Transaction, receiverOrganisations, ActivityStatus, Search) {
		var m = this;
	    m.selectedCountries = Countries.selectedCountries;
	    m.selectedRegions = Regions.selectedRegions;
	    m.selectedSectors = Sectors.selectedSectors;
	    m.selectedreceiverOrganisations = receiverOrganisations.selectedreceiverOrganisations;
	    m.selectedActivityStatuses = ActivityStatus.selectedActivityStatuses;
	    m.selectedBudget = Budget.budget;
	    m.selectedTransactionYear = Transaction.year;
	    m.search = Search;
		
		m.selectionString = '';
		m.openPanel = '';
		m.openedPanel = '';

		m.sector_ids = ["11110","11120","11130","11182","11220","11230","11240","11320","11330","11420","11430","12110","12181","12182","12191","12220","12230","12240","12250","12261","12262","12263","12281","13010","13020","13030","13040","13081","14010","14015","14020","14021","14022","14030","14031","14032","14040","14050","14081","15110","15111","15114","15112","15113","15130","15150","15151","15152","15153","15160","15170","15210","15220","15230","15240","15250","15261","16010","16020","16030","16040","16050","16061","16062","16063","16064","21010","21020","21030","21040","21050","21061","21081","22010","22020","22030","22040","23010","23020","23030","23040","23050","23061","23062","23063","23064","23065","23066","23067","23068","23069","23070","23081","23082","24010","24020","24030","24040","24081","25010","25020","31110","31120","31130","31140","31150","31161","31162","31163","31164","31165","31166","31181","31182","31191","31192","31193","31194","31195","31210","31220","31261","31281","31282","31291","31310","31320","31381","31382","31391","32110","32120","32130","32140","32161","32162","32163","32164","32165","32166","32167","32168","32169","32170","32171","32172","32182","32210","32220","32261","32262","32263","32264","32265","32266","32267","32268","32310","33110","33120","33130","33140","33150","33181","33210","41010","41020","41030","41040","41050","41081","41082","43010","43030","43040","43050","43081","43082","51010","52010","53030","53040","60010","60020","60030","60040","60061","60062","60063","72010","72040","72050","73010","74010","91010","93010","99810","99820"];
		m.sector_count = 0;
		m.sector_filter = '';

		m.save = function(){
			m.updateSelectionString();
			FilterSelection.openedPanel = '';
		}

		m.getSectors = function(){

			var list = [];

			if(m.selectedSectors.length != m.sector_count){

				for(var i = 0; i < m.selectedSectors.length;i++){
					
					if(m.selectedSectors[i].sector.code.toString().length == 5){
						list.push(m.selectedSectors[i].sector.code);
					} else {
						var curid = m.selectedSectors[i].sector.code.toString();
						var curlength = curid.length;

						for (var y = 0;y < m.sector_ids.length;y++){
							if (m.sector_ids[y].slice(0, curlength) == curid){
								list.push(m.sector_ids[y]);
							}
						}
					}
				}

				m.sector_count = m.selectedSectors.length;
				
				if(m.sector_count > 0){
					m.sector_filter = '&sector=' + list.join(','); 
				} else {
					m.sector_filter = '';
				}
			}
			return m.sector_filter;
		}

		m.updateSelectionString = function(){
      		
			var selectList = [
				m.selectArrayToString('recipient_country', 'code', m.selectedCountries),
				m.selectArrayToString('recipient_region', 'code', m.selectedRegions),
				// m.selectArrayToString('sector', 'code', m.selectedSectors),
				// m.selectArrayToString('participating_organisations__organisation__code', 'name', m.selectedreceiverOrganisations),
				m.selectArrayToString('activity_status', 'code', m.selectedActivityStatuses),
			];

			selectList.push(m.getSectors());

			if(m.selectedreceiverOrganisations.length){
				var receiver_orgs = "&receiver_organisation_primary_name=" + m.selectedreceiverOrganisations.map(function(receiver_org) {
					return encodeURIComponent(receiver_org.code)
				}).join(',');
				selectList.push(receiver_orgs);
			}

			if(m.selectedBudget.on){
				selectList.push('&total_budget_gte='+m.selectedBudget.value[0]+'&total_budget_lte='+m.selectedBudget.value[1]);
			}

			if(m.selectedTransactionYear.on){
				selectList.push('&transaction_date_year='+m.selectedTransactionYear.value);
			}

			if(Search.searchString != ''){
				selectList.push('&q='+Search.searchString);
			}

			FilterSelection.selectionString = selectList.join('');
	    }

	    m.selectArrayToString = function(header, id_slug, arr){

			var headerName = '';
			var list = [];

			if(arr.length > 0){

				headerName = '&' + header + '=';
				for(var i = 0; i < arr.length; i++){
				    list.push(arr[i][header][id_slug]);
				}
			}

			return headerName + list.join(',');
	    }

	    m.removeAll = function(selectedArr){
	      selectedArr.splice(0, selectedArr.length); 
	    }

	    m.reset = function(pageName){

			if (typeof pageName === 'undefined') { pageName = ''; }

			if(pageName != 'country'){
				m.removeAll(m.selectedCountries);
			}
			if(pageName != 'region'){
				m.removeAll(m.selectedRegions);
			}
			if(pageName != 'sector'){
				m.removeAll(m.selectedSectors);
			}
			if(pageName != 'organisation'){
				m.removeAll(m.selectedreceiverOrganisations);
			}

			m.removeAll(m.selectedActivityStatuses);

			Search.searchString = '';
			Budget.toReset = true;
			Budget.budget.value = [100000,30000000];
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

	}
})();
