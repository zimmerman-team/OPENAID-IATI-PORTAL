/**
* OipaLineChartController
* @namespace oipa.charts.controllers
*/
(function () {
  'use strict';

  angular
    .module('oipa.charts')
    .controller('OipaLineChartController', OipaLineChartController);

  OipaLineChartController.$inject = ['$scope', 'Aggregations'];

  /**
  * @namespace ActivitiesController
  */
  function OipaLineChartController($scope, Aggregations) {
    
    var vm = this;
    vm.groupBy = $scope.groupBy;
    vm.groupById = $scope.groupById;
    vm.groupByName = $scope.groupByName;
    vm.aggregationKey = $scope.aggregationKey;
    vm.aggregationKeyId = $scope.aggregationKeyId;
    vm.aggregationFilters = $scope.aggregationFilters;
    vm.hasToContain = $scope.hasToContain;
    vm.xAxis = $scope.chartXAxis;
    vm.yAxis = $scope.chartYAxis;
    vm.chartType = $scope.chartType;
    vm.axisLabelDistance = $scope.chartYAxisLabelDistance;
    vm.mapping = $scope.mapping;
    vm.colorRange = $scope.colorRange;
    vm.leftMargin = $scope.leftMargin;
    vm.yAxisEuroFormat = $scope.chartYAxisEuroFormat;
    vm.xAxisEuroFormat = $scope.chartXAxisEuroFormat;
    vm.chartXAxisStaggerLabels = $scope.chartXAxisStaggerLabels;
    vm.chartData = [];
    vm.chartOptions = {
      chart: {
        type: vm.chartType,
        height: 300,
        margin : {
            top: 40,
            right: 20,
            bottom: 60,
            left: 100
        },
        x: function(d){ return d[0]; },
        y: function(d){ return d[1]; },
        color: d3.scale.category10().range(),
        transitionDuration: 300,
        useInteractiveGuideline: true,
        clipVoronoi: false,
        showControls: false,
        interpolate: 'monotone',
        xAxis: {
            axisLabel: vm.xAxis,
            tickFormat: function(d) {
                return d3.format("")(d);
            },
            showMaxMin: false
        },
        yAxis: {
            axisLabel: vm.yAxis,
            tickFormat: function(d){
                return d3.format(",.0f")(d);
            },
            showMaxMin: false,
            axisLabelDistance: vm.axisLabelDistance
        }
      }
    };


    vm.loadData = function(){
      Aggregations.aggregation(vm.groupBy, vm.aggregationKey, vm.aggregationFilters).then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        
        if(vm.mapping != undefined){
          data.data.results = vm[vm.mapping + 'ReMap'](data.data.results);
        }
        vm.chartData = vm.reformatData(data.data.results);
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data for controller.stackedBarChart');
      }
    }

    function activate() {

      if(vm.chartXAxisStaggerLabels == 'true'){
        vm.chartOptions.chart.xAxis.staggerLabels = true;
      } else {
        vm.chartOptions.chart.xAxis.staggerLabels = false;
      }
    
      if(vm.leftMargin !== undefined){
        vm.chartOptions.chart.margin.left = parseInt(vm.leftMargin);
      }

      if(vm.yAxisEuroFormat !== undefined){
        vm.chartOptions.chart.yAxis.tickFormat = function(d){
          return d3.format(",.0f")(d/1000000) + 'M';
        }
      }

      if(vm.xAxisEuroFormat !== undefined){
        vm.chartOptions.chart.xAxis.tickFormat = function(d){
          return '€ ' + d3.format(",.0f")(d/1000000);
        }
      }
      
      $scope.$watch('aggregationFilters', function (aggregationFilters) {

        if(vm.hasToContain != undefined){
          if(aggregationFilters.indexOf(vm.hasToContain) < 0){
            return false;
          }
        }

        vm.groupBy = $scope.groupBy;
        vm.groupById = $scope.groupById;
        vm.aggregationFilters = aggregationFilters;
        vm.loadData();
      }, true);
    }
    activate();

    vm.reformatData = function(data){
      var formattedData = vm[vm.chartType + 'ReformatData'](data);
      return formattedData;
    }

    vm.lineChartReformatData = function(data){
      var mappedData = {};

      for (var i = 0; i < data.length;i++){
        if(mappedData[data[i][vm.groupById]] === undefined){
          mappedData[data[i][vm.groupById]] = {
            key: data[i]['name'],
            values: [],
          }
        }

        mappedData[data[i][vm.groupById]].values.push([data[i]['transaction_date_year'], data[i]['total_disbursements']]);
      }

      var formattedData = [];
      for (var key in mappedData){
        formattedData.push(mappedData[key]);
      }

      return formattedData;
    }

    vm.multiBarChartReformatData = function(data){

      var mappedData = {};

      for (var i = 0; i < data.length;i++){
        if(mappedData[data[i][vm.groupById]] === undefined){
          mappedData[data[i][vm.groupById]] = {
            key: data[i]['name'],
            values: {},
          }
        }

        mappedData[data[i][vm.groupById]].values[data[i]['transaction_date_year']] = data[i]['total_disbursements'];
      }

      var min = 2100;
      var max = 1900;

      // define min max
      for (var key in mappedData){
        for(var ikey in mappedData[key].values){
          if(ikey < min){min = ikey;}
          if(ikey > max){max = ikey;}
        }
      }

      for (var key in mappedData){
        for(var i = min;i < max;i++){
          if(mappedData[key].values[i] == undefined){
            mappedData[key].values[i] = 0;
          }
        }
      }

      var formattedData = [];
      for (var key in mappedData){
        var values = [];
        for (var ikey in mappedData[key].values){
          values.push([ikey,mappedData[key].values[ikey]]);
        }
        mappedData[key].values = values;

        formattedData.push(mappedData[key]);
      }

      return formattedData;
    }

    vm.stackedAreaChartReformatData = function(data){
      var mappedData = {};
      var years = {};



      for (var i = 0; i < data.length;i++){
        years[data[i]['transaction_date_year']] = data[i]['transaction_date_year'];
      }

      for (var i = 0; i < data.length;i++){
        if(mappedData[data[i][vm.groupById]] === undefined){
          mappedData[data[i][vm.groupById]] = {
            key: data[i]['name'],
            values: {},
          }
          for (var year in years){
            mappedData[data[i][vm.groupById]].values[year] = 0;
          }
        }
        mappedData[data[i][vm.groupById]].values[data[i]['transaction_date_year']] = data[i]['total_disbursements'];
      }

      var formattedData = [];
      for (var key in mappedData){
        var yeardata = [];
        for(var year in mappedData[key].values){
          yeardata.push([year, mappedData[key].values[year]]);
        }
        mappedData[key].values = yeardata;
        formattedData.push(mappedData[key]);
      }

      return formattedData;
    }

    vm.multiBarHorizontalChartReformatData = function(data){

      vm.chartOptions.chart.xAxis.tickFormat = null;
      vm.chartOptions.chart.height = 300;
      vm.chartOptions.chart.x = function(d){return d.label;};
      vm.chartOptions.chart.y = function(d){return d.value;};
      var formattedData = [];

      var mappedData = {
        'key': '',
        'color': '#1f77b4',
        'values': [],
      }

      for (var i = 0; i < data.length;i++){
        mappedData.values.push({
          "label": data[i]['name'],
          "value": data[i]['total_disbursements']});
      }

      formattedData.push(mappedData);      
      return formattedData;
    }

    vm.historicalBarChartReformatData = function(data){

      var formattedData = [{
          "key" : "Project count",
          "bar": true,
          "values" : []
      }];

      for (var i = 0; i < data.length;i++){
        formattedData[0].values.push([data[i][vm.groupById],data[i][vm.aggregationKeyId]]);
      }

      return formattedData;
    }

    vm.discreteBarChartReformatData = function(data){
      
      vm.chartOptions.chart.xAxis.tickFormat = null;
      vm.chartOptions.chart.color = d3.scale.category10();
      vm.chartOptions.chart.x = function(d){return d.label;};
      vm.chartOptions.chart.y = function(d){return d.value;};

      if(vm.colorRange){
        vm.chartOptions.chart.color = d3.scale.category10().range();
      }

      var formattedData = [{
          "key" : "key",
          "values" : []
      }];

      for (var i = 0; i < data.length;i++){
        formattedData[0].values.push({
          'label' : data[i][vm.groupByName], 
          'value' : data[i][vm.aggregationKeyId]
        });
      }

      return formattedData;
    }


    vm.partnerlandenReMap = function(data){
      // we've got the partnerlanden mapping, remap country grouped data to them
      var partnerData = {};

      for (var i = 0; i < data.length;i++){
        if(partnerlanden[data[i]['country_id']] != undefined){
          var partnerstatus = partnerlanden[data[i]['country_id']];
        } else {
          var partnerstatus = 'Other';
        }

        if(partnerData[partnerstatus] == undefined){
          partnerData[partnerstatus] = 0;
        }
        partnerData[partnerstatus] += data[i][vm.aggregationKeyId];

      }

      data = [];

      for (var key in partnerData){
        var item = {
          'country_id': key,
          'name': key
        }
        item[vm.aggregationKeyId] = partnerData[key];
        data.push(item);
      }

      return data;
    }
  }
})();