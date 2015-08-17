/**
* CountriesVisualisationController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.countries')
    .controller('CountriesVisualisationController', CountriesVisualisationController);

  CountriesVisualisationController.$inject = ['$scope', 'FilterSelection', 'Aggregations', 'templateBaseUrl'];

  /**
  * @namespace CountriesVisualisationController
  */
  function CountriesVisualisationController($scope, FilterSelection, Aggregations, templateBaseUrl) {
    var vm = this;
    vm.filterSelection = FilterSelection;
    vm.selectionString = '';
    vm.visualisationData = '';
    vm.refreshVisualisation = false;
    vm.templateBaseUrl = templateBaseUrl;

    activate();

    function activate() {
      Aggregations.aggregation('recipient-country', 'disbursement', '').then(successFn, errorFn);

      function successFn(data, status, headers, config) {
        vm.visualisationData = vm.reformatVisualisationData(data.data);
        vm.refreshVisualisation = true;
      }

      function errorFn(data, status, headers, config) {
        console.log("getting countries failed");
      }
    }

    vm.reformatVisualisationData = function(data){

      var regionMapping = {
        '89':  {'name': 'Europe', 'color': '#00BA96'},
        '298': {'name': 'Africa', 'color': '#7B7031'},
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
        '998': {'name': 'Developing countries', 'color': '#F6A000'},
      };

      var regionHierarchy = {
       "name": "regions",
       "children": [
        {
         "name": "Africa",
         "id": "298",
         "color": "#7B7031",
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
         "color": "#7B7031",
        },
        {
         "name": "Oceania",
         "id": "889",
         "color": "#EDFFC5",
        }
       ],
      };

      var testData = ['89','298','189','289','498','380','389','489','798','589','619','689','679','789','889','998'];

      for(var i = 0;i < data.length;i++){
        var index = Math.round(Math.random() * 15);
        data[i]['region_id'] = testData[index];
        data[i]['color'] = regionMapping[testData[index]]['color'];
      }

      data = {
        'mapping': regionHierarchy,
        'data': data
      }

      return data;
    }

  }
})();