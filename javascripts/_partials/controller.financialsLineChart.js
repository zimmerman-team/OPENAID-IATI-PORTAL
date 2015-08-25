(function () {
  'use strict';

  angular
    .module('oipa.charts')
    .controller('FinancialsLinechartController', FinancialsLinechartController);

  FinancialsLinechartController.$inject = ['Aggregations', '$scope'];


  function FinancialsLinechartController(Aggregations, $scope) {
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

    function activate() {

        if($scope.hasToContain != undefined) vm.hasToContain = $scope.hasToContain; 

        $scope.$watch('vm.filterSelection.selectionString', function (selectionString) {
            vm.update(selectionString);
        }, true);
    }

    vm.update = function(selectionString){

      if (selectionString.indexOf("sectors__in") < 0){ return false;}

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
                key: 'Budgets',
                color: '#FF7F0E'
            },
        ];





      for (var i =0; i < vm.activity.transactions.length;i++){

        if(vm.activity.transactions[i]['transaction_type'] == 'C'){
          data[0]['values'].push([(new Date(vm.activity.transactions[i]['transaction_date']).getTime()), parseInt(vm.activity.transactions[i]['value'])]);
        } else if(vm.activity.transactions[i]['transaction_type'] == 'D'){
          data[1]['values'].push([(new Date(vm.activity.transactions[i]['transaction_date']).getTime()), parseInt(vm.activity.transactions[i]['value'])]);
        }
      }

      function sortFunction(a, b) {
          if (a[0] === b[0]) {
              return 0;
          }
          else {
              return (a[0] < b[0]) ? -1 : 1;
          }
      }

      data[0]['values'].sort(sortFunction);
      data[1]['values'].sort(sortFunction);

      for (var i = 1; i < data[0]['values'].length;i++){
        data[0]['values'][i][1] += data[0].values[(i-1)][1];
      }

      for (var i = 1; i < data[1]['values'].length;i++){
        data[1]['values'][i][1] += data[1].values[(i-1)][1];
      }

      return data;
    }


    



  }
})();