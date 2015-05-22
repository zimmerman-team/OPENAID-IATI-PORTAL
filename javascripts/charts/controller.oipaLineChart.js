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
    vm.xAxis = $scope.chartXAxis;
    vm.yAxis = $scope.chartYAxis;
    vm.chartType = $scope.chartType;
    vm.axisLabelDistance = $scope.axisLabelDistance;
    vm.mapping = $scope.mapping;

    vm.chartData = [];
    vm.chartOptions = {
      chart: {
        type: vm.chartType,
        height: 300,
        margin : {
            top: 20,
            right: 20,
            bottom: 60,
            left: 140
        },
        x: function(d){ return d[0]; },
        y: function(d){ return d[1]; },
        color: d3.scale.category10(),
        transitionDuration: 300,
        useInteractiveGuideline: true,
        clipVoronoi: false,
        showControls: false,
        xAxis: {
            axisLabel: vm.xAxis,
            tickFormat: function(d) {
                return d3.format("")(d);
            },
            showMaxMin: false,
            staggerLabels: true
        },
        yAxis: {
            axisLabel: vm.yAxis,
            tickFormat: function(d){
                return d3.format(",.0f")(d);
            },
            axisLabelDistance: vm.axisLabelDistance
        }
      }
    };

    vm.loadData = function(){
      Aggregations.aggregation(vm.groupBy, vm.aggregationKey, vm.aggregationFilters).then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        
        if(vm.mapping != undefined){
          data.data = vm[vm.mapping + 'ReMap'](data.data);
        }
   
        vm.chartData = vm.reformatData(data.data);
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data for controller.stackedBarChart');
      }
    }

    function activate() {
      
      $scope.$watch('aggregationFilters', function (aggregationFilters) {
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
      var formattedData = [];

      
        var mappedData = {
          key: '',
          values: [],
        }

        for (var i = 0; i < data.length;i++){
          mappedData.values.push([data[i]['name'],data[i]['total_disbursements']]);
        }

        formattedData.push(mappedData);
      

      return formattedData;
    }

    vm.historicalBarChartReformatData = function(data){

      var formattedData = [{
          "key" : "Aantal activiteiten",
          "bar": true,
          "values" : []
      }];

      for (var i = 0; i < data.length;i++){
        formattedData[0].values.push([data[i][vm.groupById],data[i][vm.aggregationKeyId]]);
      }

      return formattedData;
    }

    vm.discreteBarChartReformatData = function(data){
      vm.chartOptions.chart.color = d3.scale.category10();
      vm.chartOptions.chart.xAxis.tickFormat = null;

      var formattedData = [{
          "key" : "key",
          "values" : []
      }];

      for (var i = 0; i < data.length;i++){
        formattedData[0].values.push([data[i][vm.groupByName],data[i][vm.aggregationKeyId]]);
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
          var partnerstatus = 'Overige';
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