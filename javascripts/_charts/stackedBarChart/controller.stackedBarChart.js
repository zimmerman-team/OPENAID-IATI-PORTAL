/**
* GenderChartController
* @namespace oipa.countries.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.stackedBarChart')
    .controller('StackedBarChartController', StackedBarChartController);

  StackedBarChartController.$inject = ['$scope', 'timeSlider', 'Aggregations'];

  /**
  * @namespace ActivitiesController
  */
  function StackedBarChartController($scope, timeSlider, Aggregations) {

    $scope.options = {
        chart: {
            type: 'multiBarHorizontalChart',
            height: 450,
            x: function(d){return d.label;},
            y: function(d){return d.value;},
            showControls: false,
            stacked: true,
            grouped: false,
            showValues: true,
            transitionDuration: 500,
            multibar: {
              stacked: true
            },
            xAxis: {
                showMaxMin: false
            },
            yAxis: {
                axisLabel: 'Expenditure',
                tickFormat: function(d){
                    return d3.format(',.0f')(d);
                }
            }
        },
    };

    $scope.data = [];

    var vm = this;
    vm.groupBy = $scope.groupBy;
    vm.aggregationKey = $scope.aggregationKey;
    vm.useTimeSlider = $scope.timeSlider;
    vm.aggregationFilters = $scope.aggregationFilters;
    vm.series = ['not targeted','significant objective','principal objective'];
    vm.colorPalette = ['#d62728', '#1f77b4', '#333'];
    vm.cachedData = [];
    vm.currentYear = 0;

    vm.setOptions = function(groupBy, aggregationKey, aggregationFilters){
        vm.groupBy = groupBy;
        vm.aggregationKey = aggregationKey;
        vm.aggregationFilters = aggregationFilters;
    }
    
    vm.changeYear = function(year){
      if(vm.cachedData[year]){
        $scope.data = vm.cachedData[year];
      }
    }

    vm.loadData = function(){
      Aggregations.aggregation(vm.groupBy, vm.aggregationKey, vm.aggregationFilters).then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        vm.cachedData = vm.reformatData(data.data);
        vm.changeYear(vm.currentYear);
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data for controller.stackedBarChart');
      }
    }

    function activate() {

      vm.loadData();

      if(vm.useTimeSlider){

        $scope.service = timeSlider;

        $scope.$watch("service.year", function (newValue) {
          vm.changeYear(newValue);
          vm.currentYear = newValue;
        }, true);
      } else {
        vm.changeYear(0);
      }
    }
    activate();


    vm.reformatData = function(data){

      //first sum to top categrories
      var name_labels = {
        '11':'Education',
        '12':'Healthcare',
        '13':'Population policy',
        '14':'Water and sanitation',
        '15':'Government and human rights',
        '16':'Other social infrastructure and services',
        '21':'Transportation and storage',
        '22':'Communication',
        '23':'Energy generation and supply',
        '24':'Economic sectors',
        '25':'25 ? BUSINESS AND OTHER SERVICES',
        '31':'AGRICULTURE',
        '32':'INDUSTRY',
        '33':'TRADE POLICY AND REGULATIONS AND TRADE-RELATED ADJUSTMENT',
        '41':'General environmental protection',
        '43':'Other multisector',
        '51':'General budget support',
        '52':'Developmental food aid/Food security assistance',
        '53':'Other commodity assistance',
        '60':'ACTION RELATING TO DEBT',
        '72':'Emergency Response',
        '73':'Reconstruction relief and rehabilitation',
        '74':'Disaster prevention and preparedness',
        '91':'ADMINISTRATIVE COSTS OF DONORS',
        '92':'SUPPORT TO NON- GOVERNMENTAL ORGANISATIONS (NGOs)',
        '93':'REFUGEES IN DONOR COUNTRIES',
        '99':'UNALLOCATED/ UNSPECIFIED'
      }

      var summed_data = {};
      for(var i = 0; i < data.length; i++) {
          if(summed_data[data[i]['transaction_date_year']] == undefined){
            summed_data[data[i]['transaction_date_year']] = {};
          } 
          var label_translated = name_labels[(data[i]['sector_id']+'').substring(0,2)]; 
          if(summed_data[data[i]['transaction_date_year']][label_translated] == undefined){
            summed_data[data[i]['transaction_date_year']][label_translated] = {'name':label_translated,"significance":{0:0,1:0,2:0}}
          }
          summed_data[data[i]['transaction_date_year']][label_translated]['significance'][data[i]['policy_significance_id']] += data[i]['total_disbursements'];
      }

      //reformat data
      var formattedData = {};

      for (var key in summed_data){

        data = [];

        for(var i = 0; i < 3;i++){
          var significance_data = {
            "key": vm.series[i],
            "color": vm.colorPalette[i],
            "values": []
          }

          for (var inner_key in summed_data[key]){
            

            significance_data['values'].push({
              "label" : inner_key,
              "value" : summed_data[key][inner_key]['significance'][i]
            });
          }
          data.push(significance_data);
        }

        formattedData[key] = data;
      }

      return formattedData;  
    }
  }
})();