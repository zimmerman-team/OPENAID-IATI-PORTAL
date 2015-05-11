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
    vm.detailUrl = $scope.detailUrl;
    

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
    vm.colorMapUrl = $scope.countryTypes;
    
    
    vm.colorData = null;

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.bubbleChart.BubbleChartController
    */
    function activate() {
      vm.chart_id = "bubble-chart-" + BubbleChart.bubbleChartCount;
      BubbleChart.bubbleChartCount++;
      vm.chart = new ZzBubbleChart(vm.chart_id, vm.boxWidth, vm.boxHeight, vm.range);
      vm.needReformat = 'true';
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
            vm.detailUrl = $scope.detailUrl;
            //console.log(vm.detailUrl);
            vm.loadData(vm.currentYear, vm.sourceUrl);
            vm.setColorFunction();
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
      console.log('in load data');
      console.log(vm.detailUrl);
      return BubbleChart.get(url)
        .then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        console.log('in ducces fn');
        console.log(vm.needReformat);
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
      // TO DO: still av3 api , hard to do in new api for now
      data = data.data;
      console.log('data loaded');
      
      var dataFromOipa = {'results':[]};
      var countries = {};
      for(var i = 0; i < data.length;i++){
        var country  = data[i]['group_field1'];
        var iso =  data[i]['group_field'];
        var year =  data[i]['group_field2'];
        var aggregation = data[i]['aggregation_field'];
        if(countries[iso] == undefined){
          countries[iso] = {'code':iso,'name':country,'detail_url':vm.detailUrl,'aggregations':{year:aggregation}};

        }
        else{
          countries[iso]['aggregations'][year] = aggregation;
        }

      }
      var formattedData = [];
      // no year is used, put everything under year 0
      /**
      for(var i = 0; i < data.length;i++){
        if(data[i].group_field != null){
          formattedData.push({code:data[i].group_field, name: data[i].group_field, aggregations: {'0': data[i].aggregation_field}});
        }
      }
      **/
      for (var code in countries){
        formattedData.push({'code':code, 'name': countries[code]['name'],'detail_url':vm.detailUrl, 'aggregations':  countries[code]['aggregations']});
      }
      return formattedData;
    }

    //load the color data
    $scope.colorData = null
    vm.loadColorData = function(url){
      console.log('url = '+url);
       
      $http.get(url).
      success(function(data, status, headers, config) {
        $scope.colorData  = data;
        var keys = {};
      }).
      error(function(data, status, headers, config) {
        console.log('data not found')
      });
    }

    vm.mapColorToCountry = function(){
      
      return function(code){
        var colors =  {'Hulprelatie': "#FFDFBF",'Overgangsrelatie': "#FF7F00", 'EXIT relatie': "#DDD", 'Handelsrelatie': "#999"};
        if($scope.colorData[code] != null){
          return colors[$scope.colorData[code]];

        }
        else{
          return '#444';
        }
      }

    }
    vm.changeColors = function(values, range){
      vm.chart.fill_color = d3.scale.ordinal().domain(values).range(range);
    }
    //console.log('colormap = '+vm.colorMapUrl);
    

    vm.loadColorData( vm.colorMapUrl);
    activate();
    console.log($scope);
    vm.setColorFunction = function(){
      if(vm.sourceUrl.indexOf('3.json') != -1){
        vm.chart.fill_color = vm.mapColorToCountry( );
      }
      else{
        vm.chart.fill_color = d3.scale.ordinal().domain([100000, 200000, 300000, 500000, 1000000, 2000000]).range(["#FFDFBF", "#FFC688", "#FF7F00", "#DDD", "#000", "#000"]);
      }
    }
  }
})();