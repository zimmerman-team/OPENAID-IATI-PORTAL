(function () {
  'use strict';

  angular
    .module('oipa.charts')
    .controller('FinancialsLinechartController', FinancialsLinechartController);

  FinancialsLinechartController.$inject = ['$scope', 'Aggregations', 'FilterSelection'];


  function FinancialsLinechartController($scope, Aggregations, FilterSelection) {
    var vm = this;
    vm.filterSelection = FilterSelection;
    var loadedCount = 0;
    var hasToContain = '';
    vm.transactionData = [];
    vm.transactionChartOptions = {
      chart: {
        type: 'lineChart',
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
        useInteractiveGuideline: true,
        clipVoronoi: false,
        interpolate: 'step',
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
                return d3.format('r')(d);
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

      Aggregations.aggregation('transaction__transaction-date_year', 'disbursement', selectionString).then(function(data, status, headers, config){
        vm.disbursements_by_year = data.data.results;
        vm.startReformatTransactionData();
      }, errorFn);

      Aggregations.aggregation('transaction__transaction-date_year', 'commitment', selectionString).then(function(data, status, headers, config){
        vm.commitments_by_year = data.data.results;
        vm.startReformatTransactionData();
      }, errorFn);

      Aggregations.aggregation('budget__period_start_year', 'budget__value', selectionString).then(function(data, status, headers, config){
        vm.budget_by_year = data.data.results;
        vm.startReformatTransactionData();
      }, errorFn);
    }

    vm.startReformatTransactionData = function(){
        loadedCount++;
        if(loadedCount > 2){
            vm.transactionData = vm.reformatTransactionData();
            loadedCount = 0;
        }
    }

    vm.reformatTransactionData = function(){

      var data = [
          {
              values: [],      //values - represents the array of {x,y} data points
              key: 'Commitments', 
              color: '#2077B4'  
          },
          {
              values: [],
              key: 'Disbursements',
              color: '#FF7F0E'
          },
          {
              values: [],
              key: 'Budget',
              color: '#555555'
          },
      ];

      var values = [];
      for (var i = 0; i < vm.commitments_by_year.length;i++){
        values.push([vm.commitments_by_year[i]['transaction_date_year'], vm.commitments_by_year[i]['total_commitments']]);
      }
      data[0].values = values;

      values = [];
      for (var i = 0; i < vm.disbursements_by_year.length;i++){
        values.push([vm.disbursements_by_year[i]['transaction_date_year'], vm.disbursements_by_year[i]['total_disbursements']]);
      }
      data[1].values = values;

      values = [];
      for (var i = 0; i < vm.budget_by_year.length;i++){
        values.push([vm.budget_by_year[i]['budget__period_start_year'], vm.budget_by_year[i]['budget__value']]);
      }
      data[2].values = values;

      return data;
    }


  }
})();