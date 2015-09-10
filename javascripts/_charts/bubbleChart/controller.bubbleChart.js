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

    vm.useData = $scope.useData;
    vm.groupBy = $scope.groupBy;
    vm.groupField = $scope.groupField;
    vm.aggregationKey = $scope.aggregationKey;
    vm.useTimeSlider = $scope.timeSlider;
    vm.detailUrl = $scope.detailUrl;
    
    vm.currentYear = 0;
    vm.needReformat = $scope.reformatData;

    // visualisation settings
    vm.boxWidth = $scope.boxWidth;
    vm.boxHeight = $scope.boxHeight;
    vm.minRange = $scope.minRange;
    vm.maxRange = $scope.maxRange;
    vm.range = [vm.minRange, vm.maxRange];
    vm.colorMapUrl = $scope.countryTypes;
    
    vm.colorData = null;
    $scope.colorData = null;

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.bubbleChart.BubbleChartController
    */
    function activate() {

      vm.chart_id = "bubble-chart-" + BubbleChart.bubbleChartCount;
      BubbleChart.bubbleChartCount++;
      vm.chart = new ZzBubbleChart(vm.chart_id, vm.boxWidth, vm.boxHeight, vm.range);
      
      if (vm.useData > 0){

        $scope.$watch("useData", function (newValue) {
          vm.update($scope.formattedData);
        }, true);

      } else {
        $scope.service = timeSlider;
        $scope.$watch("service.year", function (newValue) {
          vm.currentYear = newValue;
          vm.changeYear(newValue);
        }, true);

        if(typeof vm.groupField == 'undefined'){
          vm.groupField = '';
        }
      }
    }

    vm.update = function(formattedData){
      if(formattedData.length > 0){
        vm.chart.update(vm.currentYear, formattedData);
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
      return BubbleChart.aggregation(vm.groupBy, vm.aggregationKey, vm.filters);
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

      data = data.data;
      
      var dataFromOipa = {'results':[]};
      var countries = {};
      for(var i = 0; i < data.length;i++){
        var country  = data[i]['name'];
        var iso =  data[i]['country_id'];
        var year =  data[i]['transaction_date_year'];
        var aggregation = data[i]['total_disbursements'];
        if(countries[iso] == undefined){
          countries[iso] = {
            'code':iso,
            'name':country,
            'detail_url':vm.detailUrl,
            'aggregations':{year:aggregation}};
        } else{
          countries[iso]['aggregations'][year] = aggregation;
        }
      }

      var dataFromOipa = {'results':[]};
      var formattedData = [];
      
      for (var code in countries){
        formattedData.push({
          'code':code, 
          'name': countries[code]['name'],
          'detail_url':vm.detailUrl, 
          'aggregations':  countries[code]['aggregations']});
      }
      return formattedData;
    }

    // load the color data
    vm.loadColorData = function(url){
      
      if(url !== undefined){
        $http.get(url).
        success(function(data, status, headers, config) {
          $scope.colorData  = data;
          var keys = {};
        });
      }
    }

    vm.mapColorToCountry = function(){
      
      return function(code){
        var colors =  {
          'Aid relation': "#FFDFBF",
          'Transition relation': "#FF7F00", 
          'EXIT relation': "#DDD", 
          'Trade relation': "#999"};
        if($scope.colorData[code] != null){
          return colors[$scope.colorData[code]];
        } else{
          return '#444';
        }
      }
    }

    vm.changeColors = function(values, range){
      vm.chart.fill_color = d3.scale.ordinal().domain(values).range(range);
    }
    
    vm.setColorFunction = function(){
      if(vm.sourceUrl.indexOf('3.json') != -1){
        vm.chart.fill_color = vm.mapColorToCountry();
      } else{
        vm.chart.fill_color = d3.scale.ordinal().domain([100000, 200000, 300000, 500000, 1000000, 2000000]).range(["#FFDFBF", "#FFC688", "#FF7F00", "#DDD", "#000", "#000"]);
      }
    }


    vm.loadColorData( vm.colorMapUrl);
    activate();
  }
})();