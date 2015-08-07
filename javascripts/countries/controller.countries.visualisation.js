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
        vm.reformatVisualisationData(data.data);
      }

      function errorFn(data, status, headers, config) {
        console.log("getting countries failed");
      }
    }

    vm.reformatVisualisationData = function(data){

      var regionMapping = {
        '89': {'name': 'Europe', 'color': '#00BA96'},
        '298': {'name': 'Africa', 'color': '#00FFCE'},
        '189': {'name': 'North of Sahara', 'color': '#4A671E', 'parent': '298'},
        '289': {'name': 'South of Sahara', 'color': '#29ABE2', 'parent': '298'},
        '498': {'name': 'America', 'color': '#663C20'},
        '380': {'name': 'West Indies', 'color': '#F6A000', 'parent': '498'},
        '389': {'name': 'North and Central America', 'color': '#AD7979', 'parent': '498'},
        '489': {'name': 'South America', 'color': '#D00A10', 'parent': '498'},
        '798': {'name': 'Asia', 'color': '#7AC943'},
        '589': {'name': 'Middle East', 'color': '#E5E5E5', 'parent': '798'},
        '619': {'name': 'South and Central Asia', 'color': '#003ABA', 'parent': '798'},
        '689': {'name': 'Central Asia', 'color': '#003ABA', 'parent': '619'},
        '679': {'name': 'South Asia', 'color': '#003ABA', 'parent': '619'},
        '789': {'name': 'Far East Asia', 'color': '#003ABA', 'parent': '798'},
        '889': {'name': 'Oceania', 'color': '#003ABA'},
        '998': {'name': 'Developing countries', 'color': '#003ABA'},
      };

      //vm.sunburstData = formattedData;
      //vm.refreshSunburst = true;
    }

  }
})();