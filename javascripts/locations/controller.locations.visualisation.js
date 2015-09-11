/**
* LocationsVisualisationController
* @namespace oipa.locations
*/
(function () {
  'use strict';

  angular
    .module('oipa.locations')
    .controller('LocationsVisualisationController', LocationsVisualisationController);

  LocationsVisualisationController.$inject = ['$scope', 'FilterSelection', 'Aggregations', 'templateBaseUrl', 'regionMapping'];

  /**
  * @namespace LocationsVisualisationController
  */
  function LocationsVisualisationController($scope, FilterSelection, Aggregations, templateBaseUrl, regionMapping) {
    var vm = this;
    vm.filterSelection = FilterSelection;
    vm.selectionString = '';
    vm.visualisationData = '';
    vm.refreshVisualisation = false;
    vm.templateBaseUrl = templateBaseUrl;
    vm.submitSearch = '';
    vm.countCalls = 0;
    vm.directCountryValues = null;
    vm.indirectCountryValues = null;
    vm.indirectRegionValues = null;
    vm.directRegionValues = null;

    activate();

    function activate() {
      FilterSelection.reset();

      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
          vm.selectionString = selectionString;
          vm.activateGeovis();

      }, true);
    }

    vm.activateGeovis = function(){

      // direct country disbursements
      Aggregations.aggregation('recipient-country', 'disbursement', vm.selectionString + '&extra_select=country_region_id').then(countrySuccessFn, errorFn);

      // indirect country disbursements
      Aggregations.aggregation('location_countries', 'location_disbursement', vm.selectionString).then(indirectCountrySuccessFn, errorFn);

      // direct region disbursements
      Aggregations.aggregation('recipient-region', 'disbursement', vm.selectionString + '&not_in_locations=true').then(indirectRegionSuccessFn, errorFn);

      // indirect region disbursements
      Aggregations.aggregation('recipient-region', 'disbursement', vm.selectionString + '&in_locations=true').then(directRegionSuccessFn, errorFn);


      function countrySuccessFn(data, status, headers, config){
        vm.directCountryValues = data.data.results;
        vm.preReformatVisualisationData(); 
      }

      function indirectCountrySuccessFn(data, status, headers, config){
        vm.indirectCountryValues = data.data.results;
        vm.preReformatVisualisationData(); 
      }

      function indirectRegionSuccessFn(data, status, headers, config){
        vm.indirectRegionValues = data.data.results;
        vm.preReformatVisualisationData(); 
      }

      function directRegionSuccessFn(data, status, headers, config){
        vm.directRegionValues = data.data.results;
        vm.preReformatVisualisationData(); 
      }

      function errorFn(data, status, headers, config) {
        console.log("getting countries failed");
      }
    }

    vm.preReformatVisualisationData = function(){
      vm.countCalls++;
      if(vm.countCalls > 3){
        vm.visualisationData = vm.reformatVisualisationData();
        vm.refreshVisualisation = true;
        vm.countCalls = 0;
      }
    }

    vm.reformatVisualisationData = function(){

      var regionMapping = {
        '89':  {'name': 'Europe', 'color': '#F6A000'},
        '298': {'name': 'Africa', 'color': '#5598B5'},
        '189': {'name': 'North of Sahara', 'color': '#5598B5', 'parent': '298'},
        '289': {'name': 'South of Sahara', 'color': '#A6E4F4', 'parent': '298'},
        '498': {'name': 'America', 'color': '#00BA96'},
        '380': {'name': 'West Indies', 'color': '#14EFC5', 'parent': '498'},
        '389': {'name': 'North and Central America', 'color': '#C2FFF3', 'parent': '498'},
        '489': {'name': 'South America', 'color': '#C2FFF3', 'parent': '498'},
        '798': {'name': 'Asia', 'color': '#4A671E'},
        '589': {'name': 'Middle East', 'color': '#8DB746', 'parent': '798'},
        '619': {'name': 'South and Central Asia', 'color': '#C1F460', 'parent': '798'},
        '689': {'name': 'Central Asia', 'color': '#ABDD1F', 'parent': '619'},
        '679': {'name': 'South Asia', 'color': '#EDFFC5', 'parent': '619'},
        '789': {'name': 'Far East Asia', 'color': '#EDFFC5', 'parent': '798'},
        '889': {'name': 'Oceania', 'color': '#EDFFC5'},
      };

      var regionHierarchy = regionMapping;


      var icountries = 0;
      var iregions = 0;


      // create list of countries
      var countries = {};
      for (var i = 0, len = vm.directCountryValues.length; i < len; i++) {

        countries[vm.directCountryValues[i].country_id] = {
          'id':   vm.directCountryValues[i].country_id,
          'value': vm.directCountryValues[i].total_disbursements,
          'group': vm.directCountryValues[i].region_id,
          'color': regionMapping[vm.directCountryValues[i].region_id].color,
          'name': vm.directCountryValues[i].name,
          'value2': 0
        };
      }

      for (var i = 0, len = vm.indirectCountryValues.length; i < len; i++) {
        icountries += vm.indirectCountryValues[i].total_value;
        if(countries[vm.indirectCountryValues[i].loc_country_id] == undefined){

          countries[vm.indirectCountryValues[i].country_id] = {
            'id':   vm.indirectCountryValues[i].country_id,
            'value': 0,
            'value2': vm.indirectCountryValues[i].total_value,
            'group': vm.indirectCountryValues[i].region_id,
            'color': regionMapping[vm.indirectCountryValues[i].region_id].color,
            'name': vm.indirectCountryValues[i].name
          };

        } else {
          countries[vm.indirectCountryValues[i].loc_country_id].value2 = vm.indirectCountryValues[i].total_value;
        }
      }

      var country_arr = [];

      for (var country in countries) {
        if(country != 'undefined'){
          country_arr.push(countries[country]);
        }
      }

      // create list of regions
      var regions = {};
      for (var i = 0, len = vm.indirectRegionValues.length; i < len; i++) {
        regions[vm.indirectRegionValues[i].region_id] = {
          'id':   vm.indirectRegionValues[i].region_id,
          'value': vm.indirectRegionValues[i].total_disbursements,
          'name': vm.indirectRegionValues[i].name,
          'value2': 0,
        };
      }

      for (var i = 0, len = vm.directRegionValues.length; i < len; i++) {
        iregions += vm.directRegionValues[i].total_disbursements;
        if(regions[vm.directRegionValues[i].region_id] == undefined){

          regions[vm.directRegionValues[i].region_id] = {
            'id':   vm.directRegionValues[i].region_id,
            'value': 0,
            'name': vm.directRegionValues[i].name,
            'value2': vm.directRegionValues[i].total_disbursements,
          };

        } else {
          regions[vm.directRegionValues[i].region_id].value2 = vm.directRegionValues[i].total_value;
        }
      }

      console.log(icountries);
      console.log(iregions);

      

      var data = {
        'mapping': regionHierarchy,
        'data': {
          'countries': country_arr,
          'regions': regions
        }
      }
      
      return data;
    }

  }
})();