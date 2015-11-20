(function () {
  'use strict';

  angular
    .module('oipa.charts')
    .controller('FinancialsLinechartController', FinancialsLinechartController);

  FinancialsLinechartController.$inject = ['$scope', 'Aggregations', 'FilterSelection', '$filter'];


  function FinancialsLinechartController($scope, Aggregations, FilterSelection, $filter) {
    var vm = this;
    vm.filterSelection = FilterSelection;
    var loadedCount = 0;
    var hasToContain = '';
    vm.transactionData = [];
    vm.transactionChartOptions = {
      chart: {
        type: 'multiBarChart',
        height: 450,
        margin : {
            top: 20,
            right: 20,
            bottom: 60,
            left: 85
        },
        x: function(d){ return d[0]; },
        y: function(d){ return d[1]; },
        color: d3.scale.category10().range(),
        transitionDuration: 300,
        noData: 'loading...',
        // useInteractiveGuideline: true,
        // clipVoronoi: false,
        // interpolate: 'step',
        showControls: false, 
        xAxis: {
            axisLabel: '',
            tickFormat: function(d) {
                return d3.format('r')(d);
                return d3.time.format('%Y-%m-%d')(new Date(d))
            },
            showMaxMin: false,
            staggerLabels: true
        },
        yAxis: {
            axisLabel: '',
            tickFormat: function(d){
              return $filter('shortcurrency')(d,'€');
            },
            axisLabelDistance: 20
        }
      }
    };

    activate();

    function activate() {

        if($scope.hasToContain != undefined) vm.hasToContain = $scope.hasToContain; 

        $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
            vm.update(selectionString);
        }, true);
    }

    vm.update = function(selectionString){

      if (selectionString.indexOf(vm.hasToContain) < 0){ return false;}

      function errorFn(data, status, headers, config){
        console.log(data);
      }

      Aggregations.aggregation('transaction__transaction-date_year', 'disbursement', selectionString, 'transaction_date_year').then(function(data, status, headers, config){
        vm.disbursements_by_year = data.data.results;
        vm.startReformatTransactionData();
      }, errorFn);

      Aggregations.aggregation('transaction__transaction-date_year', 'commitment', selectionString, 'transaction_date_year').then(function(data, status, headers, config){
        vm.commitments_by_year = data.data.results;
        vm.startReformatTransactionData();
      }, errorFn);

      Aggregations.aggregation('budget__period_start_year', 'budget__value', selectionString, 'budget__period_start_year').then(function(data, status, headers, config){
        vm.budget_by_year = data.data.results;
        vm.startReformatTransactionData();
      }, errorFn);
    }

    vm.startReformatTransactionData = function(){
        loadedCount++;
        if(loadedCount > 2){
            vm.transactionChartOptions.chart.noData = 'No data available';
            vm.transactionData = vm.reformatTransactionData();
            $scope.api.updateWithData(vm.transactionData);
            loadedCount = 0;
        }
    }

    vm.reformatTransactionData = function(){

      var data = [
          {
              values: [],      //values - represents the array of {x,y} data points
              key: 'Commitment', 
              color: '#2077B4'  
          },
          {
              values: [],
              key: 'Expenditure',
              color: '#FF7F0E'
          },
          {
              values: [],
              key: 'Budget',
              color: '#555555'
          },
      ];

      var min = 0;
      var max = 0;

      if(vm.commitments_by_year.length){
        min = vm.commitments_by_year[0]['transaction_date_year'];
        max = vm.commitments_by_year[(vm.commitments_by_year.length - 1)]['transaction_date_year'];
      }

      if(vm.disbursements_by_year.length){
        if(vm.disbursements_by_year[0]['transaction_date_year'] < min){
          min = vm.disbursements_by_year[0]['transaction_date_year'];
        }
        if(vm.disbursements_by_year[(vm.disbursements_by_year.length - 1)]['transaction_date_year'] > max){
          max = vm.disbursements_by_year[(vm.disbursements_by_year.length - 1)]['transaction_date_year'];
        }
      }

      if(vm.budget_by_year.length){
        if(vm.budget_by_year[0]['budget__period_start_year'] < min){
          min = vm.budget_by_year[0]['budget__period_start_year'];
        }
        if(vm.budget_by_year[(vm.budget_by_year.length - 1)]['budget__period_start_year'] > max){
          max = vm.budget_by_year[(vm.budget_by_year.length - 1)]['budget__period_start_year'];
        }
      }


      function valuesObjToArr(min, max, variable, year_attr, value_attr){
        
        function setValuesObj(min, max){
          var values = {};
          for(var i = min; i < max;i++){
            values[i] = 0;
          }
          return values;
        }
        var valuesObj = setValuesObj(min, max);
        for (var i = 0; i < vm[variable].length;i++){
          valuesObj[vm[variable][i][year_attr]] = vm[variable][i][value_attr];
        }

        var values = [];
        for (var year in valuesObj) {
          values.push([year,valuesObj[year]]);
        }

        return values;
      }

      data[0].values = valuesObjToArr(min, max, 'commitments_by_year', 'transaction_date_year', 'total_commitments');
      data[1].values = valuesObjToArr(min, max, 'disbursements_by_year', 'transaction_date_year', 'total_disbursements');
      data[2].values = valuesObjToArr(min, max, 'budget_by_year', 'budget__period_start_year', 'budget__value');
      
      return data;
    }


  }
})();