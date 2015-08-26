/**
* SectorsVisualisationController
* @namespace oipa.sectors
*/
(function () {
  'use strict';

  angular
    .module('oipa.sectors')
    .controller('SectorsVisualisationController', SectorsVisualisationController);

  SectorsVisualisationController.$inject = ['$scope', 'FilterSelection', 'Aggregations'];

  /**
  * @namespace SectorsVisualisationController
  */
  function SectorsVisualisationController($scope, FilterSelection, Aggregations) {
    var vm = this;
    vm.filterSelection = FilterSelection;
    vm.selectionString = '';
    vm.sunburstData = '';
    vm.refreshSunburst = false;
    vm.searchValue = '';
    vm.submitSearch = false;

    activate();

    function activate() {
      FilterSelection.toReset = true;
      FilterSelection.selectionString = '';

      $scope.$watch('vm.submitSearch', function(submitSearch){
        if(submitSearch){
          // to do: UPDATE SUNBURST DATA WITH SEARCHVALUE
          vm.submitSearch = false;
        }
      }, true);

      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
          vm.selectionString = selectionString;
      }, true);

      setTimeout(function(){ FilterSelection.toReset = true; }, 100);
    }

    vm.activateSunburst = function(){
      Aggregations.aggregation('sector', 'disbursement', '').then(successFn, errorFn);

      function successFn(data, status, headers, config) {
        vm.reformatSunburstData(data.data.results);
      }

      function errorFn(data, status, headers, config) {
        console.log("getting sectors failed");
      }
    }

    vm.reformatSunburstData = function(data){

      var sector2dMapping = {
        '11': {'name': 'Onderwijs', 'color': '#c00726'},
        '12': {'name': 'Gezondheid', 'color': '#4fa30e'},
        '13': {'name': 'Bevolkingsbeleid en reproductieve gezondheid', 'color': '#f73300'},
        '14': {'name': 'Water en sanitatie', 'color': '#40bce7'},
        '15': {'name': 'Bestuur en mensenrechten', 'color': '#d80069'},
        '16': {'name': 'Andere sociale infrastructuur en diensten', 'color': '#f76800'},
        '2': {'name': 'Economische sectoren', 'color': '#9f0943'},
        '3': {'name': 'Productieve sectoren', 'color': '#f8a200'},
        '4': {'name': 'Multi sector', 'color': '#f8c700'},
        '7': {'name': 'Humanitaire hulp', 'color': '#2364a3'},
        '9': {'name': 'Overige hulp', 'color': '#20456d'}
      };

      var sector3dMapping = {
        '111': 'Education, level unspecified',
        '112': 'Basic education',
        '113': 'Secondary education',
        '114': 'Post-secondary education',
        '121': 'Health, general',
        '122': 'Basic health',
        '130': 'POPULATION POLICIES / PROGRAMMES AND REPRODUCTIVE HEALTH',
        '140': 'WATER AND SANITATION',
        '151': 'Government and civil society, general',
        '152': 'Conflict prevention and resolution, peace and security',
        '160': 'OTHER SOCIAL INFRASTRUCTURE AND SERVICES',
        '210': 'TRANSPORT AND STORAGE',
        '220': 'COMMUNICATION',
        '230': 'ENERGY GENERATION AND SUPPLY',
        '240': 'BANKING AND FINANCIAL SERVICES',
        '250': 'BUSINESS AND OTHER SERVICES',
        '311': 'AGRICULTURE',
        '312': 'FORESTRY',
        '313': 'FISHING',
        '321': 'INDUSTRY',
        '322': 'MINERAL RESOURCES AND MINING',
        '323': 'CONSTRUCTION',
        '331': 'TRADE POLICY AND REGULATIONS AND TRADE-RELATED ADJUSTMENT',
        '332': 'TOURISM',
        '410': 'General environmental protection',
        '430': 'Other multisector',
        '510': 'General budget support',
        '520': 'Developmental food aid/Food security assistance',
        '530': 'Other commodity assistance',
        '600': 'ACTION RELATING TO DEBT',
        '720': 'Emergency Response',
        '730': 'Reconstruction relief and rehabilitation',
        '740': 'Disaster prevention and preparedness',
        '910': 'ADMINISTRATIVE COSTS OF DONORS',
        '920': 'SUPPORT TO NON- GOVERNMENTAL ORGANISATIONS (NGOs)',
        '930': 'REFUGEES IN DONOR COUNTRIES',
        '998': 'UNALLOCATED/ UNSPECIFIED'
      };

      var tempData = {};

      for(var i = 0; i < data.length;i++){
        if(sector2dMapping[data[i].sector_id.toString().substring(0,2)] != undefined){
          var sector2 = {
            'id': data[i].sector_id.toString().substring(0,2),
            'name': sector2dMapping[data[i].sector_id.toString().substring(0,2)]['name'],
            'color': sector2dMapping[data[i].sector_id.toString().substring(0,2)]['color'],
            'children': {}
          }  
        } else if(sector2dMapping[data[i].sector_id.toString().substring(0,1)] != undefined) {
          var sector2 = {
            'id': data[i].sector_id.toString().substring(0,1),
            'name': sector2dMapping[data[i].sector_id.toString().substring(0,1)]['name'],
            'color': sector2dMapping[data[i].sector_id.toString().substring(0,1)]['color'],
            'children': {}
          }  
        } else {
          var sector2 = {
            'id': '9',
            'name': sector2dMapping['9']['name'],
            'color': sector2dMapping['9']['color'],
            'children': {}
          }  
        }

        var sector3 = {
          'id': data[i].sector_id.toString().substring(0,3),
          'name': sector3dMapping[data[i].sector_id.toString().substring(0,3)],
          'children': {}
        }

        if(tempData[sector2.id] == undefined){
          tempData[sector2.id] = sector2;
        }

        if(tempData[sector2.id]['children'][sector3.id] == undefined){
          tempData[sector2.id]['children'][sector3.id] = sector3;
        }

        tempData[sector2.id]['children'][sector3.id]['children'][data[i].sector_id.toString()] = data[i];
      }

      var formattedData = {
        'name': 'Alle uitgaven',
        'color': 'transparent',
        'children': []
      }

      for(var i in tempData){

        var childrenY = [];
        for(var y in tempData[i]['children']){

          var childrenZ = [];
          for(var z in tempData[i]['children'][y]['children']){
            childrenZ.push(tempData[i]['children'][y]['children'][z]);
          }
          tempData[i]['children'][y]['children'] = childrenZ;
          childrenY.push(tempData[i]['children'][y]);
        }
        tempData[i]['children'] = childrenY;

        formattedData.children.push(tempData[i]);
      }

      vm.sunburstData = formattedData;
      vm.refreshSunburst = true;
    }


  }
})();