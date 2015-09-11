/**
* RegionsVisualisationController
* @namespace oipa.regions
*/
(function () {
  'use strict';

  angular
    .module('oipa.regions')
    .controller('RegionsVisualisationController', RegionsVisualisationController);

  RegionsVisualisationController.$inject = ['$scope', 'FilterSelection', 'Aggregations', 'templateBaseUrl', 'regionMapping'];

  /**
  * @namespace RegionsVisualisationController
  */
  function RegionsVisualisationController($scope, FilterSelection, Aggregations, templateBaseUrl, regionMapping) {
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
      Aggregations.aggregation('location_countries', 'location_disbursement', vm.selectionString + '&not_in_recipientcountries=true').then(indirectCountrySuccessFn, errorFn);

      // indirect region disbursements
      Aggregations.aggregation('recipient-region', 'disbursement', vm.selectionString + '&in_locations=true').then(indirectRegionSuccessFn, errorFn);

      // direct region disbursements
      Aggregations.aggregation('recipient-region', 'disbursement', vm.selectionString + '&not_in_locations=true').then(directRegionSuccessFn, errorFn);


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
        var data = vm.reformatVisualisationData();
        vm.visualisationData = angular.copy(data);
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
        '998': {'name': 'Worldwide', 'color': '#e8e35b'}
      };

      var regionHierarchy = regionMapping;

      regionHierarchy = {
       "name": "regions",
       "children": [
        {
         "name": "Africa",
         "id": "298",
         "color": "#5598B5",
         "children": [
          {
           "name": "North of Sahara",
           "id": "189",
           "color": "#5598B5"
          },
          {
            "id": "289",
           "name": "South of Sahara",
           "color": "#A6E4F4"
          }
         ]
        },
        {
         "name": "America",
         "id": "498",
         "color": "#00BA96",
         "children": [
          {
           "name": "West indies",
           "id": "380",
           "color": "#14EFC5"
          },
          {
           "name": "North and Central America",
           "id": "389",
           "color": "#C2FFF3"
          },
          {
           "name": "South America",
           "id": "489",
           "color": "#C2FFF3"
          }
         ]
        },
        {
         "name": "Asia",
         "id": "798",
         "color": "#4A671E",
         "children": [
          {
           "name": "Middle East",
           "id": "589",
           "color": "#8DB746"
          },
          {
            "name": "Far East Asia",
            "id": "789",
            "color": "#EDFFC5"
          },
          {
           "name": "South and Central Asia",
           "id": "619",
           "color": "#C1F460",
           "children": [
            {
             "name": "Central Asia",
             "id": "689",
             "color": "#ABDD1F"
            },
            {
             "name": "South Asia",
             "id": "679",
             "color": "#EDFFC5"
            }
           ]
          }
         ]
        },
        {
         "name": "Europe",
         "id": "89",
         "color": "#F6A000",
        },
        {
         "name": "Oceania",
         "id": "889",
         "color": "#EDFFC5",
        },
        {
         "name": "Worldwide",
         "id": "998",
         "color": "#e8e35b",
        }
       ],
      };

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
      for (var i = 0, len = vm.directRegionValues.length; i < len; i++) {

        regions[vm.directRegionValues[i].region_id] = {
          'id':   vm.directRegionValues[i].region_id,
          'value': vm.directRegionValues[i].total_disbursements,
          'name': vm.directRegionValues[i].name,
          'color': regionMapping[vm.directRegionValues[i].region_id].color,
          'value2': 0,
        };
      }

      for (var i = 0, len = vm.indirectRegionValues.length; i < len; i++) {

        if(regions[vm.indirectRegionValues[i].region_id] == undefined){

          regions[vm.indirectRegionValues[i].region_id] = {
            'id':   vm.indirectRegionValues[i].region_id,
            'value': 0,
            'name': vm.indirectRegionValues[i].name,
            'value2': vm.indirectRegionValues[i].total_disbursements,
          };

        } else {
          regions[vm.indirectRegionValues[i].region_id].value2 = vm.indirectRegionValues[i].total_disbursements;
        }
      }

      var region_arr = [];
      for (var region in regions) {
        if(region != 'undefined'){
          region_arr.push(regions[region]);
        }
      }

      var data = {
        'mapping': regionHierarchy,
        'data': {
          'countries': country_arr,
          'regions': region_arr
        }
      }
      
      return data;
    }

  }
})();