/**
* RegionsVisualisationController
* @namespace oipa.regions
*/
(function () {
  'use strict';

  angular
    .module('oipa.regions')
    .controller('RegionsVisualisationController', RegionsVisualisationController);

  RegionsVisualisationController.$inject = ['$scope', 'FilterSelection', 'TransactionAggregations', 'templateBaseUrl', 'regionMapping'];

  /**
  * @namespace RegionsVisualisationController
  */
  function RegionsVisualisationController($scope, FilterSelection, TransactionAggregations, templateBaseUrl, regionMapping) {
    var vm = this;
    vm.filterSelection = FilterSelection;
    vm.selectionString = '';
    vm.visualisationData = '';
    vm.refreshVisualisation = false;
    vm.templateBaseUrl = templateBaseUrl;
    vm.submitSearch = '';
    vm.countCalls = 0;
    vm.countryValues = null;
    vm.regionValues = null;
    vm.totalRegions = 0;

    activate();

    function activate() {
      FilterSelection.reset();

      $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
          vm.selectionString = selectionString;
          vm.activateGeovis();

      }, true);
    }

    vm.activateGeovis = function(){

      TransactionAggregations.aggregation('recipient_country', 'disbursement', vm.selectionString, '', 400, 1).then(countrySuccessFn, errorFn);
      TransactionAggregations.aggregation('recipient_region', 'disbursement', vm.selectionString, '', 400, 1).then(regionSuccessFn, errorFn);


      function countrySuccessFn(data, status, headers, config){
        vm.countryValues = data.data.results;
        vm.preReformatVisualisationData(); 
      }

      function regionSuccessFn(data, status, headers, config){
        vm.regionValues = data.data.results;
        vm.preReformatVisualisationData(); 
      }
    }

    vm.preReformatVisualisationData = function(){
      vm.countCalls++;
      if(vm.countCalls > 1){
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
        '998': {'name': 'Worldwide', 'color': '#fffb8c'}
      };

      var regionHierarchy = regionMapping;
      var countryRegionMapping = {"AR":"489","BB":"389","BR":"489","CN":"789","CO":"489","KM":"289","AX":"889","IN":"689","ID":"789","KZ":"689","KI":"889","LS":"289","AD":"89","AQ":"998","AS":"889","AU":"889","AW":"389","BH":"589","BN":"789","BQ":"389","BV":"998","CA":"389","CC":"889","CW":"389","CX":"889","FO":"89","GF":"489","GG":"89","GI":"89","GL":"389","GP":"389","GU":"889","HK":"789","HM":"998","IE":"89","IM":"89","IO":"998","JE":"89","KY":"389","PF":"889","TF":"998","VA":"89","MV":"689","MH":"889","MU":"289","MX":"389","MS":"389","NR":"889","NU":"889","PW":"889","PS":"589","WS":"889","ST":"289","SC":"289","SH":"289","VC":"389","TL":"789","TO":"889","TV":"889","UA":"89","WF":"889","AN":"389","BL":"389","LI":"89","MC":"89","MF":"389","MO":"789","MP":"889","MQ":"389","MT":"89","NF":"889","NL":"89","PM":"389","PN":"889","PR":"389","RE":"289","RU":"998","SG":"789","SM":"89","SX":"389","TC":"389","TW":"789","UM":"998","US":"389","VG":"389","VI":"389","YT":"289","AI":"389","AG":"389","BI":"289","GN":"289","LB":"589","AL":"89","AZ":"689","KN":"389","LC":"389","AT":"89","BD":"689","BY":"89","BZ":"389","BJ":"289","BA":"89","BF":"289","TK":"889","BE":"89","BS":"389","BG":"89","GS":"489","BT":"689","FJ":"889","GA":"289","MN":"789","FK":"489","FR":"89","BW":"289","CL":"489","GE":"689","GH":"289","JO":"589","NG":"289","RS":"89","SR":"489","CH":"89","CR":"389","CU":"389","DO":"389","CZ":"89","DK":"89","EC":"489","ER":"289","ET":"289","AE":"589","ES":"89","FI":"89","AO":"289","AM":"689","BM":"389","LT":"89","LU":"89","EG":"189","SV":"389","GM":"289","GD":"389","PG":"889","VE":"489","SJ":"89","GQ":"289","GT":"389","GW":"289","GY":"489","GR":"89","LV":"89","BO":"489","CI":"289","HR":"89","HT":"389","HU":"89","IR":"589","IQ":"589","JM":"389","IL":"589","IS":"89","KG":"689","LA":"789","LR":"289","LY":"189","LK":"689","KR":"789","KW":"589","XK":"89","DZ":"189","CV":"289","DJ":"289","HN":"389","CY":"89","MK":"89","ML":"289","MD":"89","MM":"689","MG":"289","FM":"889","RO":"89","ME":"89","NI":"389","MW":"289","MY":"789","MR":"289","NA":"289","PE":"489","NP":"689","NE":"289","EH":"189","SK":"89","OM":"589","PK":"689","PA":"389","TM":"689","SI":"89","VU":"889","PY":"489","RW":"289","DE":"89","PT":"89","PL":"89","EE":"89","GB":"89","SN":"289","SB":"889","SD":"289","TD":"289","SY":"589","TJ":"689","TG":"289","TT":"389","TZ":"289","TN":"189","UG":"289","VN":"789","IT":"89","UY":"489","CM":"289","CG":"289","CK":"889","SO":"289","NZ":"889","KP":"789","MA":"189","JP":"789","ZW":"289","NO":"89","ZA":"289","ZM":"289","KH":"789","CF":"289","DM":"389","KE":"289","SL":"289","CD":"289","PH":"789","NC":"889","AF":"689","YE":"589","QA":"589","TR":"89","SA":"589","SZ":"289","TH":"789","UZ":"689","SE":"89","SS":"289","MZ":"289"}
      
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
      var countries = [];
      for (var i = 0, len = vm.countryValues.length; i < len; i++) {
        countries.push({
          'id':   vm.countryValues[i].recipient_country.code,
          'value': vm.countryValues[i].disbursement,
          'group': countryRegionMapping[vm.countryValues[i].recipient_country.code],
          'color': regionMapping[countryRegionMapping[vm.countryValues[i].recipient_country.code]].color,
          'name': vm.countryValues[i].recipient_country.name,
          'value2': 0
        });
      }

      // create list of regions
      var regions = [];
      for (var i = 0, len = vm.regionValues.length; i < len; i++) {
        regions.push({
          'id':   vm.regionValues[i].recipient_region.code,
          'value': vm.regionValues[i].disbursement,
          'name': vm.regionValues[i].recipient_region.name,
          'color': regionMapping[vm.regionValues[i].recipient_region.code].color,
          'value2': 0
        });
      }

      var data = {
        'mapping': regionHierarchy,
        'data': {
          'countries': countries,
          'regions': regions
        }
      }

      vm.totalRegions = countries.length + regions.length;
      
      return data;
    }

  }
})();