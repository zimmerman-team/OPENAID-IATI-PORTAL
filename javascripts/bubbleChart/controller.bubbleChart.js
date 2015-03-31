/**
* bubbleChart
* @namespace oipa.bubbleChart
*/
(function () {
  'use strict';

  angular
    .module('oipa.bubbleChart')
    .controller('BubbleChartController', BubbleChartController);

  BubbleChartController.$inject = ['$http', '$scope', 'BubbleChart', 'timeSlider'];

  /**
  * @namespace bubbleChart
  */
  function BubbleChartController($http, $scope, BubbleChart, timeSlider) {
    var vm = this;
    vm.chart = null;
    vm.chart_id = null;
    vm.initialized = false;


    vm.endpoint = $scope.endpoint;
    vm.groupBy = $scope.groupBy;
    vm.groupField = $scope.groupField;
    vm.aggregationKey = $scope.aggregationKey;
    vm.useTimeSlider = $scope.timeSlider;
    vm.watchSourceUrl = $scope.watchSourceUrl;

    //vm.sourceUrl TEMP
    vm.sourceUrl = $scope.sourceUrl;
    vm.currentYear = 0;
    vm.needReformat = $scope.reformatData;

    // visualisation settings
    vm.boxWidth = $scope.boxWidth;
    vm.boxHeight = $scope.boxHeight;
    vm.minRange = $scope.minRange;
    vm.maxRange = $scope.maxRange;
    vm.range = [vm.minRange, vm.maxRange];

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.bubbleChart.BubbleChartController
    */
    function activate() {
      vm.chart_id = "bubble-chart-" + BubbleChart.bubbleChartCount;
      BubbleChart.bubbleChartCount++;
      vm.chart = new ZzBubbleChart(vm.chart_id, vm.boxWidth, vm.boxHeight, vm.range);
      
      if(typeof vm.groupField == 'undefined'){
        vm.groupField = '';
      }

      if(typeof vm.sourceUrl == 'undefined'){
        vm.sourceUrl = vm.createUrl();
      }

      vm.loadData(vm.currentYear, vm.sourceUrl);
      vm.initialized = true;
      if(vm.useTimeSlider == 'true'){
        $scope.service = timeSlider;

        // watch the timeSlider
        $scope.$watch("service.year", function (newValue) {
          vm.currentYear = newValue;
          vm.changeYear(newValue);
        }, true);

        if(vm.watchSourceUrl){
          $scope.$watch("sourceUrl", function (newValue) {
            vm.sourceUrl = $scope.sourceUrl;
            vm.loadData(vm.currentYear, vm.sourceUrl);
          }, true);
        }

      }
    }

    vm.setOptions = function(group_by, aggregation_key){
        vm.group_by = group_by;
        vm.aggregation_key = aggregation_key;
    }

    vm.changeYear = function(year){

      if(!vm.initialized){
        vm.loadData(year, vm.sourceUrl);
        vm.initialized = true;
      } else {
        vm.chart.update_year(year, 200);
      }
    }

    vm.createUrl = function(){
      return BubbleChart.aggregation(vm.endpoint, vm.groupBy, vm.groupField, vm.aggregationKey);
    }

    vm.loadData = function(year, url) {
      return BubbleChart.get(url)
        .then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        var formattedData = null;
        if(vm.needReformat == 'true'){
          formattedData = vm.reformatData(data);
        } else {
          vm.currentYear = 2014;
          formattedData = data.data.results;
        }

        vm.chart.update(vm.currentYear, formattedData);
      }

      function errorFn(data, status, headers, config){
          vm.chart.update(vm.currentYear, []);
      }
    }

    vm.reformatData = function(data){
      // data is in v3 style, reformat to new API (TEMP)
      // TO DO: dont make use of v3 API

      var formattedData = [];
      // no year is used, put everything under year 0
      data = data.data;
      for(var i = 0; i < data.length;i++){
        if(data[i].group_field != null){
          formattedData.push({code:data[i].group_field, name: data[i].group_field, aggregations: {'0': data[i].aggregation_field}});
        }
      }

      return formattedData;
    }

    vm.changeColors = function(values, range){
      vm.chart.fill_color = d3.scale.ordinal().domain(values).range(range);
    }

    activate();

  }
})();